import { BUSINESS } from "./business.js"; /* explicit .js: this file also runs on the server (Node) */

/*
 * Booking helpers. All times are East Africa Time (EAT, UTC+3, no daylight
 * saving), whatever time zone the visitor's device is in.
 *
 * Shared by the booking form and the server (api/book.js), so both apply the
 * same slots and the same validation.
 */

const EAT_OFFSET_H = 3;
const MIN_LEAD_H = 2; /* never offer a slot that starts within 2 hours */
export const SLOT_MINUTES = 30;
export const BOOKABLE_DAYS = 8;
export const TIME_ZONE = "Africa/Kampala";

export const CALL_TYPES = [
	{ id: "phone", label: "Phone call" },
	{ id: "meet", label: "Google Meet" },
	{ id: "office", label: "In person, Kampala" },
];

export const SERVICES = ["Website", "Website review", "Branding", "UI/UX design", "Online shop or system", "IT support", "Not sure yet"];
export const BUDGETS = ["UGX 1,000,000 to 2,000,000", "UGX 2,000,000 to 5,000,000", "UGX 5,000,000 and above", "Not sure yet"];

/* One form for a Ugandan number, so "0770 123 456" and "+256 770 123 456" count as the same person. */
export function normalizePhone(phone = "") {
	const digits = phone.replace(/\D/g, "");
	if (digits.length === 10 && digits.startsWith("0")) return `256${digits.slice(1)}`;
	if (digits.length === 9 && digits.startsWith("7")) return `256${digits}`;
	return digits;
}

export const LIMITS ={ fullname: 80, company: 100, phone: 30, email: 120, notes: 1500 };

export function validateDetails(d) {
	const errors = {};
	if (!d.fullname?.trim()) errors.fullname = "Enter your name so we know who to expect.";
	const digits = (d.phone ?? "").replace(/\D/g, "");
	if (!digits) errors.phone = "Enter a phone number we can call or WhatsApp.";
	else if (digits.length < 9) errors.phone = "That number looks too short. Include the full number, e.g. 0770 123 456.";
	if (!d.email?.trim()) errors.email = "Enter your email so we can send your confirmation.";
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) errors.email = "Check the email address, e.g. name@company.com.";
	for (const [field, max] of Object.entries(LIMITS)) {
		if ((d[field] ?? "").length > max) errors[field] = `Please keep this under ${max} characters.`;
	}
	return errors;
}

/* Start of a slot as a real instant (UTC), from an EAT day key "YYYY-MM-DD" and hour. */
export function slotStart(dayKey, hour) {
	const [y, m, d] = dayKey.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d, hour - EAT_OFFSET_H));
}

export const slotEnd = (start) => new Date(start.getTime() + SLOT_MINUTES * 60e3);

/* True when the slot is one the form offers right now (business hours, lead time, horizon). */
export function isBookableSlot(dayKey, hour) {
	return Boolean(upcomingDays(BOOKABLE_DAYS).find((d) => d.key === dayKey)?.slots.includes(hour));
}

/* True when a slot overlaps any busy interval ([{ start, end }] as ISO strings). */
export function isBusy(dayKey, hour, busy = []) {
	const start = slotStart(dayKey, hour).getTime();
	const end = start + SLOT_MINUTES * 60e3;
	return busy.some((b) => new Date(b.start).getTime() < end && new Date(b.end).getTime() > start);
}

/* "Now" expressed as an EAT wall clock stored in a Date's UTC fields. */
const eatNow = () => new Date(Date.now() + EAT_OFFSET_H * 3600e3);

const hoursFor = (weekday) => BUSINESS.hours.find((h) => h.days.includes(weekday));

/**
 * Upcoming days with at least one bookable slot.
 * Each day: { key, weekday, day, month, date (EAT wall clock), slots: [hour] }
 */
export function upcomingDays(count = 8, horizon = 21) {
	const now = eatNow();
	const earliest = now.getTime() + MIN_LEAD_H * 3600e3;
	const days = [];

	for (let i = 0; i < horizon && days.length < count; i++) {
		const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + i));
		const h = hoursFor(d.getUTCDay());
		if (!h) continue;

		const slots = [];
		for (let hour = h.open; hour < h.close; hour++) {
			const start = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), hour);
			if (start >= earliest) slots.push(hour);
		}
		if (!slots.length) continue;

		days.push({
			key: d.toISOString().slice(0, 10),
			date: d,
			weekday: d.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" }),
			day: d.getUTCDate(),
			month: d.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }),
			long: d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }),
			slots,
		});
	}
	return days;
}

export const formatHour = (hour) => {
	const suffix = hour >= 12 ? "pm" : "am";
	const h12 = hour % 12 === 0 ? 12 : hour % 12;
	return `${h12}:00 ${suffix}`;
};

const pad = (n) => String(n).padStart(2, "0");

/* Google Calendar "add event" link for the visitor's own calendar. */
export function googleCalendarLink({ day, hour, service, callType, meetLink }) {
	const startUtc = slotStart(day.key, hour);
	const endUtc = slotEnd(startUtc);
	const stamp = (t) =>
		`${t.getUTCFullYear()}${pad(t.getUTCMonth() + 1)}${pad(t.getUTCDate())}T${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}00Z`;
	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: `Consultation with ${BUSINESS.name}`,
		dates: `${stamp(startUtc)}/${stamp(endUtc)}`,
		details: `Free consultation about: ${service}. Format: ${callType}.${meetLink ? ` Join: ${meetLink}` : ""}`,
		location: meetLink || (callType === "In person, Kampala" ? `${BUSINESS.city}, ${BUSINESS.country}` : ""),
	});
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* Short, human reference so both sides can quote the same booking. */
export function bookingReference({ day, hour }) {
	const key = typeof day === "string" ? day : day.key;
	const tail = Math.random().toString(36).slice(2, 5).toUpperCase().padEnd(3, "X");
	return `MDH-${key.slice(5).replace("-", "")}-${pad(hour)}${tail}`;
}

export function bookingMessage({ reference, day, hour, service, callType, details }) {
	return [
		`Hello ${BUSINESS.founder.split(" ")[0]},`,
		"",
		"I would like to book a free consultation with Maverick Digital Hub.",
		"",
		`Reference: ${reference}`,
		`Preferred time: ${day.long}, ${formatHour(hour)} (EAT)`,
		`Format: ${callType}`,
		`Interested in: ${service}`,
		"",
		`Name: ${details.fullname}`,
		details.company ? `Company: ${details.company}` : null,
		`Phone: ${details.phone}`,
		details.email ? `Email: ${details.email}` : null,
		details.budget ? `Budget: ${details.budget}` : null,
		details.notes ? ["", "About the project:", details.notes].join("\n") : null,
	]
		.filter((line) => line !== null)
		.join("\n");
}
