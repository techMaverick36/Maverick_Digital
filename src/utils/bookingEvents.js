/* Lets any "Book" button preselect a service in the booking slip before scrolling to it. */
const EVENT = "maverick:book";

export const requestBooking = (service) => window.dispatchEvent(new CustomEvent(EVENT, { detail: { service } }));

export const onBookingRequest = (handler) => {
	const listener = (e) => handler(e.detail?.service);
	window.addEventListener(EVENT, listener);
	return () => window.removeEventListener(EVENT, listener);
};
