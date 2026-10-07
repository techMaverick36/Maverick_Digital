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
/* Vercel sets VITE_SITE_URL as an environment variable; locally it comes from .env */
const configuredUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL || env.SITE_URL || "https://maverickdigitalhub.com";
const siteUrl = configuredUrl.replace(/\/+$/, "");
const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.mkdirSync(publicDir, { recursive: true });
/* sitemap.xml is written by scripts/prerender.mjs after the build, from every page in src/seo/pages.js */
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`SEO files generated for ${siteUrl}`);
