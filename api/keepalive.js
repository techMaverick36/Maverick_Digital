import { json } from "./_lib/http.js";
import { db, supabaseConfigured } from "./_lib/supabase.js";

/*
 * GET /api/keepalive, run daily by the Vercel cron in vercel.json.
 * Supabase pauses free projects after a week without activity; one small
 * query a day keeps the booking database awake.
 */
export async function GET(request) {
	const secret = process.env.CRON_SECRET;
	if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) return json({ error: "Unauthorised." }, 401);
	if (!supabaseConfigured()) return json({ ok: false, reason: "not configured" }, 503);
	const { error } = await db().from("bookings").select("id", { head: true, count: "exact" }).limit(1);
	return error ? json({ ok: false }, 500) : json({ ok: true });
}
