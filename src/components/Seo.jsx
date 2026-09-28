import { useEffect } from "react";
import { BUSINESS, formatUGX } from "../utils/business";

const FALLBACK_SITE_URL = "https://maverickdigitalhub.com";
const SITE_NAME = "Maverick Digital Hub";
const DEFAULT_IMAGE = "/logo.png";

const upsertMeta = (selector, attributes) => {
	let element = document.head.querySelector(selector);

	if (!element) {
		element = document.createElement("meta");
		document.head.appendChild(element);
	}

	Object.entries(attributes).forEach(([key, value]) => {
		element.setAttribute(key, value);
	});
};

const upsertLink = (selector, attributes) => {
	let element = document.head.querySelector(selector);

	if (!element) {
		element = document.createElement("link");
		document.head.appendChild(element);
	}

	Object.entries(attributes).forEach(([key, value]) => {
		element.setAttribute(key, value);
	});
};

const upsertStructuredData = (id, payload) => {
	let script = document.head.querySelector(`#${id}`);

	if (!script) {
		script = document.createElement("script");
		script.id = id;
		script.type = "application/ld+json";
		document.head.appendChild(script);
	}

	script.textContent = JSON.stringify(payload);
};

const resolveSiteUrl = () => {
	const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();

	if (configuredUrl) {
		return configuredUrl.replace(/\/+$/, "");
	}

	if (typeof window !== "undefined" && window.location?.origin) {
		return window.location.origin.replace(/\/+$/, "");
	}

	return FALLBACK_SITE_URL;
};

const Seo = ({ title, description, path = "/", type = "website", faq }) => {
	useEffect(() => {
		const siteUrl = resolveSiteUrl();
		const canonicalUrl = `${siteUrl}${path === "/" ? "/" : path}`;
		const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
		const imageUrl = `${siteUrl}${DEFAULT_IMAGE}`;

		document.title = pageTitle;

		upsertMeta('meta[name="description"]', {
			name: "description",
			content: description,
		});
		upsertMeta('meta[name="robots"]', {
			name: "robots",
			content: "index, follow",
		});
		upsertMeta('meta[property="og:type"]', {
			property: "og:type",
			content: type,
		});
		upsertMeta('meta[property="og:site_name"]', {
			property: "og:site_name",
			content: SITE_NAME,
		});
		upsertMeta('meta[property="og:title"]', {
			property: "og:title",
			content: pageTitle,
		});
		upsertMeta('meta[property="og:description"]', {
			property: "og:description",
			content: description,
		});
		upsertMeta('meta[property="og:url"]', {
			property: "og:url",
			content: canonicalUrl,
		});
		upsertMeta('meta[property="og:image"]', {
			property: "og:image",
			content: imageUrl,
		});
		upsertMeta('meta[name="twitter:card"]', {
			name: "twitter:card",
			content: "summary_large_image",
		});
		upsertMeta('meta[name="twitter:title"]', {
			name: "twitter:title",
			content: pageTitle,
		});
		upsertMeta('meta[name="twitter:description"]', {
			name: "twitter:description",
			content: description,
		});
		upsertMeta('meta[name="twitter:image"]', {
			name: "twitter:image",
			content: imageUrl,
		});
		upsertLink('link[rel="canonical"]', {
			rel: "canonical",
			href: canonicalUrl,
		});

		const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const pad = (h) => `${String(h).padStart(2, "0")}:00`;

		/* Matches the Google Business Profile: keep src/utils/business.js in sync with it. */
		upsertStructuredData("organization-schema", {
			"@context": "https://schema.org",
			"@type": "ProfessionalService",
			name: SITE_NAME,
			url: siteUrl,
			logo: `${siteUrl}/brand-mark.png`,
			image: imageUrl,
			description: "Web design, branding and digital services for businesses in Uganda.",
			email: BUSINESS.email,
			telephone: BUSINESS.phones[0].tel,
			priceRange: `From ${formatUGX(BUSINESS.startingPrice)}`,
			currenciesAccepted: BUSINESS.currency,
			founder: { "@type": "Person", name: BUSINESS.founder },
			address: {
				"@type": "PostalAddress",
				addressLocality: BUSINESS.city,
				addressCountry: BUSINESS.countryCode,
			},
			areaServed: { "@type": "Country", name: BUSINESS.country },
			openingHoursSpecification: BUSINESS.hours.map((h) => ({
				"@type": "OpeningHoursSpecification",
				dayOfWeek: h.days.map((d) => dayNames[d]),
				opens: pad(h.open),
				closes: pad(h.close),
			})),
			sameAs: BUSINESS.googleProfileUrl ? [BUSINESS.googleProfileUrl] : [],
		});

		upsertStructuredData("website-schema", {
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: SITE_NAME,
			url: siteUrl,
		});

		if (faq?.length) {
			upsertStructuredData("faq-schema", {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faq.map((item) => ({
					"@type": "Question",
					name: item.q,
					acceptedAnswer: { "@type": "Answer", text: item.a },
				})),
			});
		} else {
			document.head.querySelector("#faq-schema")?.remove();
		}
	}, [description, path, title, type, faq]);

	return null;
};

export default Seo;
