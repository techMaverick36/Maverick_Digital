/*
 * Runs after `vite build`. For every public page in src/seo/pages.js it writes an HTML
 * file with that page's own <title>, description, canonical link, preview image and
 * structured data, then writes the sitemap.
 *
 * Why: Google, WhatsApp, Facebook and LinkedIn read <head> before (or without) running
 * JavaScript, so a single-page app would otherwise show the home page's title and
 * preview for every link. The page body is still rendered by React as before.
 *
 * Output: dist/index.html for "/", dist/<path>.html for the rest (served at /<path>
 * thanks to "cleanUrls" in vercel.json).
 */
import fs from "node:fs";
import path from "node:path";
import { createServer, loadEnv } from "vite";

const root = process.cwd();
const dist = path.join(root, "dist");
const env = loadEnv("production", root, "");
const site = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || "https://maverickdigitalhub.com").trim().replace(/\/+$/, "");

const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const text = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const json = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

const vite = await createServer({ root, server: { middlewareMode: true, hmr: false }, appType: "custom", logLevel: "error" });

try {
	const { publicPages, headFor } = await vite.ssrLoadModule("/src/seo/pages.js");
	const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
	const region = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
	if (!region.test(template)) throw new Error("index.html is missing the <!-- seo:start --> ... <!-- seo:end --> markers");

	const pages = publicPages();
	for (const page of pages) {
		const head = headFor(page, site);
		const tags = [
			`<title>${text(head.title)}</title>`,
			...head.meta.map((m) => (m.name ? `<meta name="${m.name}" content="${attr(m.content)}" />` : `<meta property="${m.property}" content="${attr(m.content)}" />`)),
			...head.links.map((l) => `<link rel="${l.rel}" href="${attr(l.href)}" />`),
			...head.jsonLd.map(({ id, data }) => `<script type="application/ld+json" id="${id}">${json(data)}</script>`),
		].join("\n\t\t");

		const html = template.replace(region, tags);
		const file = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, `${page.path.replace(/^\//, "")}.html`);
		fs.mkdirSync(path.dirname(file), { recursive: true });
		fs.writeFileSync(file, html, "utf8");
	}

	const today = new Date().toISOString().slice(0, 10);
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.filter((p) => !p.noindex)
	.map((p) => `  <url>\n    <loc>${site}${p.path === "/" ? "/" : p.path}</loc>\n    <lastmod>${p.lastmod ?? today}</lastmod>\n    <priority>${p.priority ?? "0.5"}</priority>\n  </url>`)
	.join("\n")}
</urlset>
`;
	fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap, "utf8");
	fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap, "utf8");

	console.log(`Prerendered <head> for ${pages.length} pages and wrote sitemap.xml for ${site}`);
} finally {
	await vite.close();
}
