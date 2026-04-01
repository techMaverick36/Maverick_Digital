import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const envPath = path.join(rootDir, ".env");

const readEnvFile = (filePath) => {
	if (!fs.existsSync(filePath)) {
		return {};
	}

	return fs
		.readFileSync(filePath, "utf8")
		.split(/\r?\n/)
		.reduce((acc, line) => {
			const trimmed = line.trim();

			if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
				return acc;
			}

			const [key, ...valueParts] = trimmed.split("=");
			acc[key.trim()] = valueParts.join("=").trim();
			return acc;
		}, {});
};

const env = readEnvFile(envPath);
const configuredUrl = env.VITE_SITE_URL || env.SITE_URL || "https://your-domain.com";
const siteUrl = configuredUrl.replace(/\/+$/, "");
const today = new Date().toISOString().split("T")[0];

const routes = [
	{ path: "/", changefreq: "weekly", priority: "1.0" },
	{ path: "/portfolio", changefreq: "monthly", priority: "0.8" },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `  <url>
    <loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`SEO files generated for ${siteUrl}`);
