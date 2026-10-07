import { useEffect } from "react";
import { headFor } from "../seo/pages";

const FALLBACK_SITE_URL = "https://maverickdigitalhub.com";

const resolveSiteUrl = () => {
	const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();
	if (configuredUrl) return configuredUrl.replace(/\/+$/, "");
	if (typeof window !== "undefined" && window.location?.origin) return window.location.origin.replace(/\/+$/, "");
	return FALLBACK_SITE_URL;
};

const upsert = (tag, selector, attributes) => {
	let element = document.head.querySelector(selector);
	if (!element) {
		element = document.createElement(tag);
		document.head.appendChild(element);
	}
	Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

/*
 * Keeps <head> in step with the page while browsing. The same tags are written into
 * each page's HTML at build time (scripts/prerender.mjs), both from seo/pages.js.
 * Props: a page object from seo/pages.js (title, description, path, type, image, faq, schema, noindex).
 */
const Seo = (page) => {
	const head = JSON.stringify(headFor(page, resolveSiteUrl()));

	useEffect(() => {
		const { title, meta, links, jsonLd } = JSON.parse(head);
		document.title = title;
		meta.forEach(({ name, property, content }) =>
			name ? upsert("meta", `meta[name="${name}"]`, { name, content }) : upsert("meta", `meta[property="${property}"]`, { property, content })
		);
		links.forEach((l) => upsert("link", `link[rel="${l.rel}"]`, l));

		const ids = new Set(jsonLd.map((s) => s.id));
		document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => !ids.has(s.id) && s.remove());
		jsonLd.forEach(({ id, data }) => {
			let script = document.getElementById(id);
			if (!script) {
				script = Object.assign(document.createElement("script"), { id, type: "application/ld+json" });
				document.head.appendChild(script);
			}
			script.textContent = JSON.stringify(data);
		});
	}, [head]);

	return null;
};

export default Seo;
