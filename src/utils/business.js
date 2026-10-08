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

	/* Public link to the Google Business Profile (share > copy link). Empty hides every "Find us on Google" link. */
	googleProfileUrl: "https://share.google/fAEl2JP380kyIzuV0",

	/* Google's ID for the business (confirmed 2026-10-08: opens "Maverick Digital Hub" on Google Maps).
	   Used for the direct "write a review" link. Not a secret. */
	googlePlaceId: "ChIJx5VFe--9fRcRQwwyp7xlPP0",

	/* Star rating shown on the Google Business Profile. Update it by hand when it changes
	   (reviews themselves are copied into `testimonials` in utils/constants.jsx). */
	googleRating: 5.0,

	/* TODO: when a Google Calendar appointment schedule exists, paste its booking
	   page link here; the booking panel then offers it as an extra option. */
	calendarBookingUrl: "https://calendar.app.google/hkgw9sF5sRicGuJL8",

	/* Matches the Google Business Profile (checked 2026-10-08): Mon to Fri 8am to 4pm, closed weekends.
	   Change both together. Booking slots come from these hours.
	   day: 0 = Sunday ... 6 = Saturday. Times are East Africa Time (EAT, UTC+3). */
	hours: [
		{
			days: [1, 2, 3, 4, 5],
			open: 8,
			close: 16,
			label: "Mon to Fri, 8am to 4pm",
		},
	],
	responseTime: "within one business day",
};

export const formatUGX = (amount) => `UGX ${amount.toLocaleString("en-UG")}`;

export const telHref = (tel = BUSINESS.phones[0].tel) => `tel:${tel}`;

export const whatsappHref = (text = "") =>
	`https://wa.me/${BUSINESS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* Opens Google's "write a review" box for this business directly. */
export const googleReviewHref = () =>
	BUSINESS.googlePlaceId ? `https://search.google.com/local/writereview?placeid=${BUSINESS.googlePlaceId}` : BUSINESS.googleProfileUrl;

export const mailHref =(subject = "") =>
	`mailto:${BUSINESS.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
