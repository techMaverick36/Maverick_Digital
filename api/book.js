import { json, readJson, verifyTurnstile } from "./_lib/http.js";
import { busyTimes, createEvent, googleConfigured, sendEmail } from "./_lib/google.js";
import { db, supabaseConfigured } from "./_lib/supabase.js";
import {
	BUDGETS,
	CALL_TYPES,
	SERVICES,
	TIME_ZONE,
	bookingReference,
	formatHour,
	isBookableSlot,
	isBusy,
	normalizePhone,
	slotEnd,
	slotStart,
	validateDetails,
} from "../src/utils/booking.js";
import { BUSINESS } from "../src/utils/business.js";

const MAX_UPCOMING_PER_CLIENT = 2;
const first = BUSINESS.founder.split(" ")[0];
const TAKEN = { error: "That time was just taken. Please pick another.", code: "slot" };

const eatLong = (date) =>
	date.toLocaleString("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIME_ZONE });

/*
 * POST /api/book → { reference, startsAt, meetLink, invited }
 * Checks the slot is still free, saves the booking, puts it on Martin's Google
 * Calendar (which emails the client an invite), then emails Martin.
 * Needs both Supabase and Google: without either, it answers 503 and the form
 * falls back to WhatsApp, so a booking is never saved without anyone being told.
 */
export async function POST(request) {
	if (!supabaseConfigured() || !googleConfigured()) return json({ error: "Online booking is not set up yet." }, 503);

	let body;
	try {
		body = await readJson(request);
	} catch {
		return json({ error: "Invalid request." }, 400);
	}

	/* Bots fill every field; people never see this one. Pretend it worked. */
	if (body.website) return json({ reference: "MDH-OK", startsAt: null, meetLink: null, invited: false });

	if (!(await verifyTurnstile(body.turnstileToken, request))) {
		return json({ error: "We could not confirm you are not a robot. Please try again.", code: "turnstile" }, 400);
	}

	const d = {
		fullname: String(body.fullname ?? "").trim(),
		company: String(body.company ?? "").trim(),
		phone: String(body.phone ?? "").trim(),
		email: String(body.email ?? "").trim().toLowerCase(),
		budget: String(body.budget ?? "").trim(),
		notes: String(body.notes ?? "").trim(),
	};
	const errors = validateDetails(d);
	const hour = Number(body.hour);
	const dayKey = String(body.day ?? "");
	const service = SERVICES.includes(body.service) ? body.service : null;
	const callType = CALL_TYPES.find((c) => c.label === body.callType);
	if (d.budget && !BUDGETS.includes(d.budget)) d.budget = "";

	if (Object.keys(errors).length || !service || !callType) return json({ error: "Please check your details.", errors }, 400);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(dayKey) || !Number.isInteger(hour) || !isBookableSlot(dayKey, hour)) {
		return json({ error: "That time is no longer available. Please pick another.", code: "slot" }, 409);
	}

	const start = slotStart(dayKey, hour);
	const end = slotEnd(start);
	const supabase = db();
	const phoneDigits = normalizePhone(d.phone);

	/* One person cannot hold more than a couple of future slots, and Martin's own
	   calendar may have something at that time. Both checks run together. */
	const [limit, calendarBusy] = await Promise.all([
		supabase
			.from("bookings")
			.select("id", { count: "exact", head: true })
			.neq("status", "cancelled")
			.gte("starts_at", new Date().toISOString())
			.or(`email.eq.${JSON.stringify(d.email)},phone_digits.eq.${phoneDigits}`),
		/* This call also proves the Google connection works. If it does not (e.g. the refresh token
		   was revoked), no email or invite could be sent, so the booking is not saved: the form then
		   hands it to WhatsApp, which always reaches Martin. */
		busyTimes(start, end)
			.then((busy) => isBusy(dayKey, hour, busy))
			.catch((err) => {
				console.error("book: Google unavailable, sending client to WhatsApp:", err.message);
				return "google-down";
			}),
	]);
	if (calendarBusy === "google-down") return json({ error: "Online booking is unavailable right now." }, 503);
	if (limit.error) {
		console.error("book: count", limit.error);
		return json({ error: "Something went wrong on our side." }, 500);
	}
	if (limit.count >= MAX_UPCOMING_PER_CLIENT) {
		return json({ error: `You already have ${limit.count} upcoming consultations with us. To change one, message ${first} on WhatsApp.`, code: "limit" }, 429);
	}
	if (calendarBusy) return json(TAKEN, 409);

	/* Insert, retrying with a fresh reference if (rarely) the reference itself collides. */
	let reference;
	let row;
	for (let attempt = 0; attempt < 3 && !row; attempt++) {
		reference = bookingReference({ day: dayKey, hour });
		const { data, error } = await supabase
			.from("bookings")
			.insert({
				reference,
				starts_at: start.toISOString(),
				ends_at: end.toISOString(),
				service,
				call_type: callType.label,
				fullname: d.fullname,
				company: d.company || null,
				phone: d.phone,
				phone_digits: phoneDigits,
				email: d.email,
				budget: d.budget || null,
				notes: d.notes || null,
			})
			.select("id")
			.single();
		if (!error) row = data;
		else if (error.code === "23505" && /reference/.test(`${error.message} ${error.details}`)) continue;
		else if (error.code === "23505") return json(TAKEN, 409); /* someone booked this time a moment ago */
		else {
			console.error("book: insert", error);
			return json({ error: "Something went wrong on our side." }, 500);
		}
	}
	if (!row) return json({ error: "Something went wrong on our side." }, 500);

	const when = eatLong(start);
	const who = d.company ? `${d.fullname} (${d.company})` : d.fullname;
	let meetLink = null;
	let invited = false;
	let calendarNote;

	try {
		const how =
			callType.id === "phone"
				? `${first} will call you on ${d.phone}.`
				: callType.id === "meet"
					? "Join with the Google Meet link in this invite."
					: `${first} will confirm the meeting place in Kampala with you before the day.`;
		const event = await createEvent({
			summary: `${BUSINESS.name} consultation: ${who}`,
			description: [
				`Free 30-minute consultation with ${BUSINESS.founder}, ${BUSINESS.name}.`,
				"",
				how,
				"",
				`About: ${service}`,
				`Reference: ${reference}`,
				"",
				`Need to change the time? WhatsApp ${BUSINESS.phones[0].display} or reply to this email.`,
				"",
				"Booked by client:",
				`Phone: ${d.phone}`,
				d.budget ? `Budget: ${d.budget}` : null,
				d.notes ? `Notes: ${d.notes}` : null,
			]
				.filter((l) => l !== null)
				.join("\n"),
			start,
			end,
			timeZone: TIME_ZONE,
			attendee: { email: d.email, displayName: d.fullname },
			location: callType.id === "office" ? `${BUSINESS.city}, ${BUSINESS.country}` : callType.id === "phone" ? `Phone: ${d.phone}` : undefined,
			meet: callType.id === "meet",
			requestId: reference,
		});
		meetLink = event.meetLink;
		invited = true;
		calendarNote = "Added to Google Calendar. The client has been sent an invite.";
		const { error: linkError } = await supabase.from("bookings").update({ google_event_id: event.id, meet_link: meetLink, calendar_synced: true }).eq("id", row.id);
		if (linkError) {
			console.error("book: link event", linkError);
			calendarNote = `Added to Google Calendar and the client has an invite, but the dashboard could not record it (event id ${event.id}). Do not add it again; cancel it in Google Calendar if needed.`;
		}
	} catch (err) {
		console.error("book: calendar", err);
		calendarNote = "NOT added to Google Calendar (the calendar connection failed). Add it by hand and send the client the details.";
	}

	try {
		await sendEmail({
			to: process.env.NOTIFY_EMAIL || BUSINESS.email,
			replyTo: d.email,
			subject: `New booking: ${who}, ${when}`,
			text: [
				`New consultation booked on the website.`,
				"",
				`When: ${when} (EAT)`,
				`How: ${callType.label}${meetLink ? ` (${meetLink})` : ""}`,
				`About: ${service}`,
				`Reference: ${reference}`,
				"",
				`Name: ${d.fullname}`,
				d.company ? `Company: ${d.company}` : null,
				`Phone: ${d.phone}`,
				`Email: ${d.email}`,
				d.budget ? `Budget: ${d.budget}` : null,
				d.notes ? `\nNotes:\n${d.notes}` : null,
				"",
				calendarNote,
				process.env.VITE_SITE_URL ? `Dashboard: ${process.env.VITE_SITE_URL.replace(/\/+$/, "")}/admin` : null,
			]
				.filter((l) => l !== null)
				.join("\n"),
		});
	} catch (err) {
		console.error("book: notify email", err);
	}

	return json({ reference, startsAt: start.toISOString(), meetLink, invited, time: formatHour(hour) }, 201);
}
