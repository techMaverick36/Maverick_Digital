/*
 * One source of truth for business details. Every CTA, the booking flow, the
 * footer and the Google structured data read from here, so they always match
 * the Google Business Profile. Update this file, not the components.
 */

export const BUSINESS = {
	name: "Maverick Digital Hub",
	founder: "Martin Ssemugabi",
	email: "mavericktech750@gmail.com",
	phones: [
		{ display: "+256 770 302 731", tel: "+256770302731" },
		{ display: "+256 745 496 783", tel: "+256745496783" },
	],
	whatsapp: "256770302731",
	city: "Kampala",
	country: "Uganda",
	countryCode: "UG",
	startingPrice: 1000000,
	currency: "UGX",

	/* TODO: paste the public link to the Google Business Profile (share > copy link).
	   Leave empty to hide every "Find us on Google" link. */
	googleProfileUrl: "",

	/* TODO: when a Google Calendar appointment schedule exists, paste its booking
	   page link here; the booking panel then offers it as an extra option. */
	calendarBookingUrl: "",

	/* TODO: match these to the hours on the Google Business Profile.
	   day: 0 = Sunday ... 6 = Saturday. Times are East Africa Time (EAT, UTC+3). */
	hours: [
		{ days: [1, 2, 3, 4, 5], open: 9, close: 17, label: "Mon to Fri, 9am to 5pm" },
		{ days: [6], open: 10, close: 13, label: "Sat, 10am to 1pm" },
	],
	responseTime: "within one business day",
};

export const formatUGX = (amount) => `UGX ${amount.toLocaleString("en-UG")}`;

export const telHref = (tel = BUSINESS.phones[0].tel) => `tel:${tel}`;

export const whatsappHref = (text = "") =>
	`https://wa.me/${BUSINESS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mailHref = (subject = "") =>
	`mailto:${BUSINESS.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
