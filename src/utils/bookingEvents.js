/* Lets any "Book" button preselect a service in the booking slip before scrolling to it. */
const EVENT = "maverick:book";

export const requestBooking = (service) => window.dispatchEvent(new CustomEvent(EVENT, { detail: { service } }));

/* Link to the booking form from another page, optionally with a topic chosen (read once by Booking). */
export const bookHref = (topic) => `/${topic ? `?topic=${encodeURIComponent(topic)}` : ""}#book`;

export const topicFromUrl = () => {
	try {
		return new URLSearchParams(window.location.search).get("topic");
	} catch {
		return null;
	}
};

export const onBookingRequest = (handler) => {
	const listener = (e) => handler(e.detail?.service);
	window.addEventListener(EVENT, listener);
	return () => window.removeEventListener(EVENT, listener);
};
