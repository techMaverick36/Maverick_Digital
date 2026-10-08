import { ping } from "../../api/keepalive.js";

/* Scheduled function: runs once a day on Netlify so the free Supabase project never pauses. */
export default async () => {
	const result = await ping();
	console.log("keepalive:", JSON.stringify(result));
	return new Response(null, { status: result.ok ? 200 : 503 });
};

export const config = { schedule: "@daily" };
