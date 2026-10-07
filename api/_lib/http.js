export const json = (body, status = 200, headers = {}) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
	});

/* Parses a JSON object body; throws on anything else (too large, invalid, or not an object). */
export async function readJson(request, maxBytes = 16_000) {
	const text = await request.text();
	if (Buffer.byteLength(text, "utf8") > maxBytes) throw new Error("too large");
	const body = JSON.parse(text || "{}");
	if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
	return body;
}

/* Cloudflare Turnstile check. Skipped (passes) until TURNSTILE_SECRET_KEY is set. */
export async function verifyTurnstile(token, request) {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) return true;
	if (!token) return false;
	const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
	try {
		const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({ secret, response: String(token), ...(ip ? { remoteip: ip } : {}) }),
		});
		const data = await res.json().catch(() => ({}));
		return data.success === true;
	} catch (err) {
		console.error("turnstile:", err);
		return false;
	}
}
