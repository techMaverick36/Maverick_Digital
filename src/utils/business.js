/*
 * One source of truth for business details. Every CTA, the booking flow, the
 * footer and the Google structured data read from here, so they always match
 * the Google Business Profile. Update this file, not the components.
 */

export const BUSINESS = {
	name: "Maverick Digital Hub",
	founder: "Martin Ssemugabi",
	/* TODO: switch to a domain address (e.g. hello@maverickdigitalhub.com). A Gmail address on a
	   company site is one of the first things a corporate buyer reads as "not a real company". */
	email: "info@maverickdigitalhub.com",
	phones: [
		{ display: "+256 770 302 731", tel: "+256770302731" },
		{ display: "+256 745 496 783", tel: "+256745496783" },
	],
	whatsapp: "256770302731",
	/* TODO (owner): the office address exactly as it appears on the Google Business Profile
	   (e.g. street: "Plot 12, Kira Road", area: "Kamwokya"). Google ranks local businesses partly on the
	   name, address and phone matching everywhere: this site, Google, Apple Maps, LinkedIn, Yellow Pages Uganda.
	   Leave empty until confirmed; the site then shows "Kampala, Uganda" only. */
	address: { street: "", area: "" },
	city: "Kampala",
	country: "Uganda",
	/* Public profiles that should be linked to this business in Google's eyes (LinkedIn, Facebook, Instagram...). */
	profiles: [],
	countryCode: "UG",
	startingPrice: 1000000,
	currency: "UGX",

	/* TODO: paste the public link to the Google Business Profile (share > copy link).
	   Leave empty to hide every "Find us on Google" link. */
	googleProfileUrl: "https://share.google/kymwrr793GjsnrHFv",

	/* TODO: when a Google Calendar appointment schedule exists, paste its booking
	   page link here; the booking panel then offers it as an extra option. */
	calendarBookingUrl: "https://calendar.app.google/hkgw9sF5sRicGuJL8",

	/* TODO: match these to the hours on the Google Business Profile.
	   day: 0 = Sunday ... 6 = Saturday. Times are East Africa Time (EAT, UTC+3). */
	hours: [
		{
			days: [1, 2, 3, 4, 5],
			open: 9,
			close: 17,
			label: "Mon to Fri, 9am to 5pm",
		},
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
