import { BUSINESS, formatUGX } from "./business";

/* Plain-text answers: rendered on the page and reused for Google's FAQ structured data. */
export const FAQ = [
	{
		q: "How much does a website cost?",
		a: `Our websites start from ${formatUGX(BUSINESS.startingPrice)}. The final fee depends on the number of pages, the features you need and whether you also need branding. You get a written quote after the free consultation, before any work begins.`,
	},
	{
		q: "How long does it take?",
		a: "It depends on the scope. Our past projects have taken between two weeks and three months. We agree a timeline with you before we start.",
	},
	{
		q: "What happens during the free consultation?",
		a: `A 30-minute call or meeting with ${BUSINESS.founder}. We talk about your business, your goals and your budget, and recommend what makes sense for you. There is no obligation.`,
	},
	{
		q: "Who will work on my project?",
		a: `${BUSINESS.founder} leads every project personally, from the first call to launch. On larger builds he brings in trusted partner developers and designers, and he stays your single point of contact throughout.`,
	},
	{
		q: "Do I need my content and photos ready?",
		a: "No. We tell you exactly what to prepare and help you shape the text for your pages as we go.",
	},
	{
		q: "Can I update the website myself?",
		a: "Yes, where you need to. We can build your site with a simple content editor and show you how to use it.",
	},
	{
		q: `Do you work with businesses outside ${BUSINESS.city}?`,
		a: "Yes. We work with clients across Uganda and beyond, over the phone, WhatsApp and Google Meet.",
	},
];
