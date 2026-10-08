/*
 * The site is hosted on Netlify. The API itself lives in api/ as plain
 * (Request) => Response handlers named after HTTP methods; each file in
 * netlify/functions wraps one of them with this helper. public/_redirects maps /api/<name> to
 * /.netlify/functions/<name>.
 */
export const route = (handlers) => async (request) => {
	const handler = handlers[request.method];
	if (!handler) return new Response(null, { status: 405, headers: { Allow: Object.keys(handlers).join(", ") } });
	try {
		return await handler(request);
	} catch (err) {
		console.error(err);
		return Response.json({ error: "Something went wrong on our side." }, { status: 500 });
	}
};
