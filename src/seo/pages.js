import { BUSINESS, formatUGX } from "../utils/business.js";
import { projects } from "../utils/constants.jsx";
import { FAQ } from "../utils/faq.js";
import { guides } from "../content/guides.js";

/*
 * Titles, descriptions, preview images and structured data for every public page.
 * Read by the <Seo> component in the browser and by scripts/prerender.mjs at build
 * time (which writes them into each page's HTML, so Google and WhatsApp/Facebook/
 * LinkedIn link previews see them without running JavaScript).
 *
 * Keywords follow what Ugandan business owners search for: "web design company in
 * Kampala", "website developers in Kampala", "website design cost in Uganda".
 * Use them naturally; never stuff them.
 */

export const SITE_NAME = BUSINESS.name;
export const DEFAULT_IMAGE = "/og/default.jpg";

const crumbs = (site, items) => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site}${path}` })),
});

export const homeMeta = {
	title: "Web Design Company in Kampala, Uganda",
	description: `Web design company in Kampala. Professional websites, online shops and branding for Ugandan businesses, from ${formatUGX(BUSINESS.startingPrice)}. Book a free consultation.`,
	path: "/",
	faq: FAQ,
};

export const portfolioMeta = {
	title: "Website Design Portfolio, Uganda",
	description: `Websites we have designed and built for Ugandan businesses, including ${projects
		.slice(0, 4)
		.map((p) => p.title)
		.join(", ")}. Every one is live.`,
	path: "/portfolio",
	schema: (site) => [crumbs(site, [["Home", "/"], ["Our work", "/portfolio"]])],
};

export const guidesMeta = {
	title: "Website Guides for Ugandan Businesses",
	description: "Plain-English guides for business owners in Uganda: what a website costs, signs your website is outdated, accepting Mobile Money, and how to prepare for a web designer.",
	path: "/guides",
	schema: (site) => [crumbs(site, [["Home", "/"], ["Guides", "/guides"]])],
};

export const caseStudyMeta = (p) => ({
	title: `${p.title} Website Case Study`,
	description: `${p.title}: ${p.delivered.charAt(0).toLowerCase()}${p.delivered.slice(1)}. See how ${SITE_NAME} designed and built this ${p.sector.toLowerCase()} website in Uganda.`,
	path: `/work/${p.slug}`,
	image: `/og/${p.slug}.jpg`,
	type: "article",
	schema: (site) => [
		crumbs(site, [["Home", "/"], ["Our work", "/portfolio"], [p.title, `/work/${p.slug}`]]),
		{
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			name: `${p.title} website`,
			description: p.description,
			url: `${site}/work/${p.slug}`,
			image: `${site}/og/${p.slug}.jpg`,
			creator: { "@type": "Organization", name: SITE_NAME, url: site },
			about: { "@type": "Organization", name: p.title, url: p.link },
			keywords: p.tags.join(", "),
		},
	],
});

export const guideMeta = (g) => ({
	title: g.title,
	description: g.description,
	path: `/guides/${g.slug}`,
	image: `/og/guide-${g.slug}.jpg`,
	type: "article",
	lastmod: g.date,
	schema: (site) => [
		crumbs(site, [["Home", "/"], ["Guides", "/guides"], [g.title, `/guides/${g.slug}`]]),
		{
			"@context": "https://schema.org",
			"@type": "Article",
			headline: g.title,
			description: g.description,
			datePublished: g.date,
			dateModified: g.date,
			image: `${site}/og/guide-${g.slug}.jpg`,
			mainEntityOfPage: `${site}/guides/${g.slug}`,
			author: { "@type": "Person", name: BUSINESS.founder },
			publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${site}/brand-mark.png` } },
		},
	],
});

/* Every page that should be in the sitemap and get its own prerendered HTML. */
export const publicPages = () => [
	{ ...homeMeta, priority: "1.0" },
	{ ...portfolioMeta, priority: "0.8" },
	...projects.filter((p) => p.slug).map((p) => ({ ...caseStudyMeta(p), priority: "0.7" })),
	{ ...guidesMeta, priority: "0.8" },
	...guides.map((g) => ({ ...guideMeta(g), priority: "0.7" })),
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (h) => `${String(h).padStart(2, "0")}:00`;

/* Matches the Google Business Profile: keep src/utils/business.js in sync with it (same name, phone, address). */
const organization = (site, image) => ({
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	"@id": `${site}/#business`,
	name: SITE_NAME,
	url: site,
	logo: `${site}/brand-mark.png`,
	image,
	description: "Web design company in Kampala: websites, online shops, branding and digital services for businesses across Uganda.",
	email: BUSINESS.email,
	telephone: BUSINESS.phones[0].tel,
	priceRange: `From ${formatUGX(BUSINESS.startingPrice)}`,
	currenciesAccepted: BUSINESS.currency,
	founder: { "@type": "Person", name: BUSINESS.founder },
	address: {
		"@type": "PostalAddress",
		...(BUSINESS.address?.street ? { streetAddress: BUSINESS.address.street } : {}),
		addressLocality: BUSINESS.city,
		...(BUSINESS.address?.area ? { addressRegion: BUSINESS.address.area } : {}),
		addressCountry: BUSINESS.countryCode,
	},
	areaServed: [
		{ "@type": "City", name: BUSINESS.city },
		{ "@type": "Country", name: BUSINESS.country },
	],
	knowsAbout: ["Web design", "Website development", "E-commerce websites", "Branding", "UI/UX design", "IT support"],
	openingHoursSpecification: BUSINESS.hours.map((h) => ({
		"@type": "OpeningHoursSpecification",
		dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
		opens: hhmm(h.open),
		closes: hhmm(h.close),
	})),
	sameAs: [BUSINESS.googleProfileUrl, ...(BUSINESS.profiles ?? [])].filter(Boolean),
});

/*
 * Everything that goes in <head> for one page, as plain data:
 * { title, meta: [{ name|property, content }], links: [{ rel, href }], jsonLd: [{ id, data }] }
 */
export function headFor(page, site) {
	const url = `${site}${page.path === "/" ? "/" : page.path}`;
	const image = `${site}${page.image ?? DEFAULT_IMAGE}`;
	const title = page.title ? `${page.title} | ${SITE_NAME}` : SITE_NAME;

	const jsonLd = [
		{ id: "organization-schema", data: organization(site, `${site}${DEFAULT_IMAGE}`) },
		{ id: "website-schema", data: { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: site } },
	];
	if (page.faq?.length) {
		jsonLd.push({
			id: "faq-schema",
			data: {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
			},
		});
	}
	(page.schema?.(site) ?? []).forEach((data, i) => jsonLd.push({ id: `page-schema-${i}`, data }));

	return {
		title,
		meta: [
			{ name: "description", content: page.description },
			{ name: "robots", content: page.noindex ? "noindex, nofollow" : "index, follow" },
			{ property: "og:type", content: page.type ?? "website" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: "en_UG" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: page.description },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: page.description },
			{ name: "twitter:image", content: image },
		],
		links: [{ rel: "canonical", href: url }],
		jsonLd,
	};
}
