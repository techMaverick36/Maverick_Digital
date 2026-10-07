import { json, readJson } from "./_lib/http.js";
import { cancelEvent, googleConfigured } from "./_lib/google.js";
import { adminFrom, db, supabaseConfigured } from "./_lib/supabase.js";

const STATUSES = ["confirmed", "done", "no_show", "cancelled"];

/*
 * POST /api/manage { id, status?, adminNotes? }  (dashboard only, admin token required)
 * Cancelling also deletes the Google Calendar event, which emails the client.
 */
export async function POST(request) {
	if (!supabaseConfigured()) return json({ error: "Not set up." }, 503);
	const admin = await adminFrom(request);
	if (!admin) return json({ error: "Please sign in again." }, 401);

	let body;
	try {
		body = await readJson(request);
	} catch {
		return json({ error: "Invalid request." }, 400);
	}

	const changes = {};
	if (body.status !== undefined) {
		if (!STATUSES.includes(body.status)) return json({ error: "Unknown status." }, 400);
		changes.status = body.status;
	}
	if (body.adminNotes !== undefined) changes.admin_notes = String(body.adminNotes).slice(0, 4000) || null;
	if (!body.id || !Object.keys(changes).length) return json({ error: "Nothing to change." }, 400);

	const supabase = db();
	const { data: booking, error } = await supabase.from("bookings").select("id, status, google_event_id").eq("id", body.id).maybeSingle();
	if (error || !booking) return json({ error: "Booking not found." }, 404);

	/* Save first, so the client is only told about a cancellation that was really recorded. */
	const { data: updated, error: updateError } = await supabase.from("bookings").update(changes).eq("id", body.id).select("*").single();
	if (updateError) {
		/* re-opening a cancelled booking whose time has since been taken */
		if (updateError.code === "23505") return json({ error: "Someone else has booked that time since." }, 409);
		console.error("manage: update", updateError);
		return json({ error: "Could not save." }, 500);
	}

	let warning = null;
	let result = updated;
	const cancelling = changes.status === "cancelled" && booking.status !== "cancelled";
	if (cancelling && booking.google_event_id) {
		try {
			if (!googleConfigured()) throw new Error("Google not configured");
			await cancelEvent(booking.google_event_id);
			const { data } = await supabase.from("bookings").update({ calendar_synced: false }).eq("id", body.id).select("*").single();
			if (data) result = data;
		} catch (err) {
			console.error("manage: cancel event", err);
			warning = "Cancelled here, but the Google Calendar event could not be removed. Delete it in Google Calendar so the client is told.";
		}
	}
	return json({ booking: result, warning });
}
