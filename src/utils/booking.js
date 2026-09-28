import { BUSINESS } from "./business";

/*
 * Booking helpers. All times are East Africa Time (EAT, UTC+3, no daylight
 * saving), whatever time zone the visitor's device is in.
 */

const EAT_OFFSET_H = 3;
const MIN_LEAD_H = 2; /* never offer a slot that starts within 2 hours */
export const SLOT_MINUTES = 30;

export const CALL_TYPES = [
	{ id: "phone", label: "Phone call" },
	{ id: "meet", label: "Google Meet" },
	{ id: "office", label: "In person, Kampala" },
];

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
export function googleCalendarLink({ day, hour, service, callType }) {
	const d = day.date;
	const startUtc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), hour - EAT_OFFSET_H));
	const endUtc = new Date(startUtc.getTime() + SLOT_MINUTES * 60e3);
	const stamp = (t) =>
		`${t.getUTCFullYear()}${pad(t.getUTCMonth() + 1)}${pad(t.getUTCDate())}T${pad(t.getUTCHours())}${pad(t.getUTCMinutes())}00Z`;
	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: `Consultation with ${BUSINESS.name}`,
		dates: `${stamp(startUtc)}/${stamp(endUtc)}`,
		details: `Free consultation about: ${service}. Format: ${callType}. Requested through maverickdigitalhub website; ${BUSINESS.founder} will confirm on WhatsApp.`,
		location: callType === "In person, Kampala" ? `${BUSINESS.city}, ${BUSINESS.country}` : "",
	});
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* Short, human reference so both sides can quote the same booking. */
export function bookingReference({ day, hour }) {
	return `MDH-${day.key.slice(5).replace("-", "")}-${pad(hour)}${String(Math.floor(Math.random() * 90) + 10)}`;
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
