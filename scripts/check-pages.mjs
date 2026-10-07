/*
 * Smoke test: renders every public page to HTML in Node and checks each one has its
 * heading and no crash. Run with `node scripts/check-pages.mjs`.
 */
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createServer } from "vite";

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom", logLevel: "error" });
let failed = 0;

try {
	const load = async (p) => (await vite.ssrLoadModule(p)).default;
	const [Home, Portfolio, CaseStudy, Guides, Guide] = await Promise.all(
		["/src/Pages/Home.jsx", "/src/Pages/Portfolio.jsx", "/src/Pages/CaseStudy.jsx", "/src/Pages/Guides.jsx", "/src/Pages/Guide.jsx"].map(load)
	);
	const { publicPages } = await vite.ssrLoadModule("/src/seo/pages.js");

	const routes = [
		["/", Home],
		["/portfolio", Portfolio],
		["/work/:slug", CaseStudy],
		["/guides", Guides],
		["/guides/:slug", Guide],
	];
	const render = (path) =>
		renderToString(h(MemoryRouter, { initialEntries: [path] }, h(Routes, null, ...routes.map(([p, C]) => h(Route, { key: p, path: p, element: h(C) })))));

	for (const page of [...publicPages(), { path: "/work/no-such-project", expect404: true }]) {
		try {
			const html = render(page.path);
			const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
			const ok = page.expect404 ? /does not/.test(h1 ?? "") : Boolean(h1);
			if (!ok) failed++;
			console.log(`${ok ? "ok  " : "FAIL"} ${page.path.padEnd(48)} ${Math.round(html.length / 1024)}KB  h1: ${h1?.slice(0, 70)}`);
		} catch (err) {
			failed++;
			console.log(`FAIL ${page.path}: ${err.message}`);
		}
	}
} finally {
	await vite.close();
}
process.exit(failed ? 1 : 0);
