import { json } from "./_lib/http.js";
import { db, supabaseConfigured } from "./_lib/supabase.js";

/*
 * Supabase pauses free projects after a week without activity; one small query a
 * day keeps the booking database awake. Run daily by netlify/functions/keepalive.mjs.
 */
export async function ping() {
	if (!supabaseConfigured()) return { ok: false, reason: "not configured" };
	const { error } = await db().from("bookings").select("id", { head: true, count: "exact" }).limit(1);
	return error ? { ok: false, reason: error.message } : { ok: true };
}

/* GET /api/keepalive: manual check; needs "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set. */
export async function GET(request) {
	const secret = process.env.CRON_SECRET;
	if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) return json({ error: "Unauthorised." }, 401);
	const result = await ping();
	return json(result, result.ok ? 200 : 503);
}
