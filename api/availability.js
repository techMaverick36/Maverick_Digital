import { json } from "./_lib/http.js";
import { busyTimes, googleConfigured } from "./_lib/google.js";
import { db, supabaseConfigured } from "./_lib/supabase.js";
import { BOOKABLE_DAYS, slotStart, upcomingDays } from "../src/utils/booking.js";

/*
 * GET /api/availability → { busy: [{ start, end }] }
 * Times only, never event titles or client details. Busy = the Google Calendar
 * (anything Martin has on) plus every live booking in the database.
 */
export async function GET() {
	/* Both are needed for instant booking; until then the form falls back to WhatsApp. */
	if (!supabaseConfigured() || !googleConfigured()) return json({ error: "Booking is not set up yet." }, 503);

	const days = upcomingDays(BOOKABLE_DAYS);
	const from = new Date();
	const last = days.at(-1);
	const to = last ? slotStart(last.key, 24) : new Date(from.getTime() + 86400e3);

	try {
		const [calendar, rows] = await Promise.all([
			busyTimes(from, to),
			db()
				.from("bookings")
				.select("starts_at, ends_at")
				.neq("status", "cancelled")
				.gte("ends_at", from.toISOString())
				.lte("starts_at", to.toISOString())
				.then(({ data, error }) => {
					if (error) throw error;
					return data.map((r) => ({ start: r.starts_at, end: r.ends_at }));
				}),
		]);
		return json({ busy: [...calendar, ...rows] }, 200, { "Cache-Control": "no-store" });
	} catch (err) {
		console.error("availability:", err);
		return json({ error: "Could not load free times." }, 502);
	}
}
