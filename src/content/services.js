import { BUSINESS, formatUGX } from "../utils/business.js";

/*
 * Service pages (/services/<slug>). One page per service so each can rank for its own
 * search ("web design Kampala", "logo design Uganda", ...).
 *
 * Rule for this file: only facts already confirmed elsewhere on the site (pricing
 * packages, service descriptions, FAQ, case studies). If a fact is not confirmed,
 * leave the field out: the page then hides that part instead of guessing.
 *
 * Fields
 *   slug, name (short), topic (booking topic, must be in SERVICES in utils/booking.js)
 *   seoTitle, seoDescription: for Google and link previews
 *   image, imagePosition: photo behind the header (optional)
 *   title + highlight: the h1;  lede: one-sentence summary
 *   forWho: who it suits (optional);  explainer: plain-English meaning (optional)
 *   includes: [{ title, text }]: what the client gets
 *   extras: [{ title, text }]: available, quoted separately (optional)
 *   price: { from } in UGX, or null for "quoted after a free consultation"
 *   workTag: projects whose tags include this appear as related work (optional)
 *   faqs: [{ q, a }]: only questions with confirmed answers, and nothing already said above
 *   guides: slugs from content/guides.js that help with this service
 */

export const servicePages = [
	{
		slug: "web-design",
		image: "/photos/service-web-design.webp",
		imagePosition: "75% center",
		name: "Web design",
		topic: "Website",
		seoTitle: "Website Design and Development in Kampala",
		seoDescription: `Website design and development in Kampala: company websites, online shops and web apps for Ugandan businesses. Websites from ${formatUGX(BUSINESS.startingPrice)}.`,
		title: "Website design and development",
		highlight: "in Kampala.",
		lede: "Company websites, online shops and web apps for businesses across Uganda. Every site works on phones, has call and WhatsApp buttons, and is set up so Google can read it.",
		forWho: "For companies that need a credible, professional website, and for businesses ready to sell or take bookings online.",
		includes: [
			{ title: "Custom design in your brand", text: "Pages designed around your logo, colours and content." },
			{ title: "Works on every phone", text: "Tested on phones and computers before it goes live." },
			{ title: "Call and WhatsApp buttons", text: "Visitors can reach you with one tap from any page." },
			{ title: "Enquiry form", text: "For visitors who would rather write than call." },
			{ title: "Google search basics", text: "Page titles, descriptions and a sitemap, so Google can read and list your pages." },
			{ title: "Content editor, if you want one", text: "A simple editing tool (often called a CMS), so your team can update pages without a developer." },
		],
		extras: [
			{ title: "Online shops", text: "Product listings and a cart, as we built for Galaxy Pet Store." },
			{ title: "Bookings", text: "Customers book a service online, like grooming and boarding at Galaxy Pet Store." },
			{ title: "Product catalogues your team manages", text: "As we built for High Flyer Trading, with a built-in editor." },
		],
		price: { from: BUSINESS.startingPrice },
		workTag: "Web Design",
		faqs: [
			{
				q: "How long does a website take?",
				a: "Our past projects have taken between two weeks and three months, depending on the number of pages and features. We agree the timeline with you in writing before we start.",
			},
			{
				q: "Can I update the website myself?",
				a: "Yes, where you need to. We can build your site with a simple content editor and show you how to use it.",
			},
			{
				q: "What do you need from me?",
				a: "Your logo, the text and photos you already have, and one person who can approve the design. We tell you exactly what else to prepare and help you shape the text.",
			},
		],
		guides: ["website-cost-in-uganda", "before-you-hire-a-web-designer", "signs-your-website-is-outdated"],
	},
	{
		slug: "branding",
		image: "/photos/service-branding.webp",
		imagePosition: "65% center",
		name: "Branding",
		topic: "Branding",
		seoTitle: "Logo Design and Branding in Kampala, Uganda",
		seoDescription: "Logo design and branding in Kampala: your logo, colours and brand guidelines, so your business looks the same on your website, documents, signage and social media.",
		title: "Logo design and branding",
		highlight: "in Kampala.",
		lede: "Your logo, colours and brand guidelines, so your business looks the same everywhere: on your website, documents, signage and social media.",
		forWho: "For new businesses, and for businesses ready for a new look.",
		includes: [
			{ title: "Logo and brand identity", text: "Your logo and the colours that go with it, designed to suit your business." },
			{ title: "Brand guidelines", text: "A short guide that shows how to use your logo and colours, so anyone who designs for you gets it right." },
			{ title: "Your brand in daily use", text: "Your logo and colours applied to the things customers see, such as documents and signage." },
		],
		/* TODO (owner): starting price, typical timeline, and the exact files a client receives. */
		price: null,
		workTag: null /* TODO (owner): add a "Branding" tag to projects where you designed the brand */,
		faqs: [
			{
				q: "Should I do branding before my website?",
				a: "If you do not have a logo yet, create it before the website or at the same time, so the two match.",
			},
			{
				q: "Can you do the branding and the website together?",
				a: "Yes. Our Brand and Website package covers your logo, brand guidelines and everything in a Business Website, quoted as one project.",
			},
		],
		guides: ["before-you-hire-a-web-designer"],
	},
	{
		slug: "ui-ux-design",
		image: "/photos/service-ui-ux-design.webp",
		imagePosition: "center",
		name: "UI/UX design",
		topic: "UI/UX design",
		seoTitle: "UI/UX Design for Apps and Customer Portals, Uganda",
		seoDescription: "UI/UX design in Kampala for apps, customer portals and websites: we map how people use them, then design screens that are simple to use.",
		title: "UI/UX design for apps",
		highlight: "and customer portals.",
		lede: "We map how people use your app, portal or website, then design screens that are simple to use.",
		explainer:
			"UX (user experience) is how easy something is to use. UI (user interface) is what the screens look like. Good UI/UX means your customers and staff can do what they came to do, without needing help.",
		includes: [
			{ title: "Journey mapping", text: "We map the steps people take, for example from signing up to paying, and find where they get stuck." },
			{ title: "Wireframes", text: "Simple sketches of each screen, so you can agree the layout before any detailed design." },
			{ title: "Interface design", text: "Finished screens in your brand, with the same buttons, forms and colours across the whole product." },
			{ title: "Usability refinement", text: "We check the designs against real tasks and fix whatever slows people down." },
		],
		/* TODO (owner): starting price and typical timeline. */
		price: null,
		workTag: "UI/UX",
		faqs: [
			{
				q: "Do you also build what you design?",
				a: "Yes, for websites and web apps. The live sites below show our UI/UX work.",
			},
		],
		guides: [],
	},
	{
		slug: "it-support",
		image: "/photos/service-it-support.webp",
		imagePosition: "center 40%",
		name: "IT support",
		topic: "IT support",
		seoTitle: "Business IT Setup and Support in Kampala",
		seoDescription: "Business IT setup and support in Kampala: we review how your team works, set up the systems and software that fit, and support them day to day.",
		title: "Business IT setup and support",
		highlight: "in Kampala.",
		lede: "We review how your team works, set up the systems and software that fit, and support them day to day.",
		includes: [
			{ title: "Process review", text: "We look at how your team works today, and where the right software could save time." },
			{ title: "System setup", text: "We set up the systems and software that fit the way you work." },
			{ title: "Day-to-day support", text: "When something stops working, your team has someone to call." },
			{ title: "Technical advice", text: "Clear advice before you buy software or services, so you only pay for what you need." },
		],
		/* TODO (owner): list the systems you actually set up (e.g. business email, office software,
		   networks), a starting price or monthly support fee, and any clients you support. */
		price: null,
		workTag: null,
		faqs: [
			{
				q: "Do you offer ongoing support?",
				a: "Yes. After setup we support your team day to day. We agree what is covered, and the cost, in writing before we start.",
			},
		],
		guides: [],
	},
];

export const findService = (slug) => servicePages.find((s) => s.slug === slug);
