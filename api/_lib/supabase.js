import { createClient } from "@supabase/supabase-js";

/*
 * Server-side Supabase client with the secret key. It bypasses row level
 * security, so it lives only in api/ and is never imported by the site.
 */

export const supabaseConfigured = () => Boolean(process.env.VITE_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);

let client;
export function db() {
	client ??= createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
	return client;
}

/* The signed-in dashboard user from a "Bearer <access token>" header, if they are an admin. */
export async function adminFrom(request) {
	const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
	if (!token) return null;
	const { data, error } = await db().auth.getUser(token);
	const email = data?.user?.email?.toLowerCase();
	if (error || !email) return null;
	const { data: admin } = await db().from("admins").select("email").eq("email", email).maybeSingle();
	return admin ? { email } : null;
}
