/*
 * Google Calendar and Gmail, called with plain fetch on behalf of the business
 * account (mavericktech750@gmail.com) through a stored OAuth refresh token.
 * Server only: these credentials must never reach the browser.
 */

const CALENDAR_ID = () => encodeURIComponent(process.env.GOOGLE_CALENDAR_ID || "primary");
const CAL = "https://www.googleapis.com/calendar/v3";

export const googleConfigured = () =>
	Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);

let cached = { token: null, expires: 0 };

async function accessToken() {
	if (cached.token && Date.now() < cached.expires - 60e3) return cached.token;
	const res = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
			grant_type: "refresh_token",
		}),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(`Google token refresh failed: ${data.error ?? res.status} ${data.error_description ?? ""}`);
	cached = { token: data.access_token, expires: Date.now() + data.expires_in * 1000 };
	return cached.token;
}

async function google(url, { method = "GET", body } = {}) {
	const res = await fetch(url, {
		method,
		headers: { Authorization: `Bearer ${await accessToken()}`, ...(body ? { "Content-Type": "application/json" } : {}) },
		body: body ? JSON.stringify(body) : undefined,
	});
	if (res.status === 204) return null;
	const data = await res.json().catch(() => ({}));
	if (!res.ok && !(method === "DELETE" && res.status === 410)) {
		throw new Error(`Google ${method} ${url.split("?")[0]} failed: ${res.status} ${data.error?.message ?? ""}`);
	}
	return data;
}

/* Busy intervals on the calendar between two instants: [{ start, end }] (ISO). */
export async function busyTimes(timeMin, timeMax) {
	const id = process.env.GOOGLE_CALENDAR_ID || "primary";
	const data = await google(`${CAL}/freeBusy`, {
		method: "POST",
		body: { timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString(), items: [{ id }] },
	});
	const cal = data.calendars?.[id];
	if (cal?.errors?.length) throw new Error(`Google freeBusy error: ${cal.errors[0].reason}`);
	return cal?.busy ?? [];
}

/* Creates the event and emails the client a calendar invite (with a Meet link when asked). */
export async function createEvent({ summary, description, start, end, timeZone, attendee, location, meet, requestId }) {
	const params = new URLSearchParams({ sendUpdates: "all", conferenceDataVersion: meet ? "1" : "0" });
	const event = await google(`${CAL}/calendars/${CALENDAR_ID()}/events?${params}`, {
		method: "POST",
		body: {
			summary,
			description,
			location,
			start: { dateTime: start.toISOString(), timeZone },
			end: { dateTime: end.toISOString(), timeZone },
			attendees: attendee ? [attendee] : [],
			reminders: { useDefault: true },
			...(meet ? { conferenceData: { createRequest: { requestId, conferenceSolutionKey: { type: "hangoutsMeet" } } } } : {}),
		},
	});
	return { id: event.id, meetLink: event.hangoutLink ?? null, htmlLink: event.htmlLink ?? null };
}

/* Deletes the event and emails the client a cancellation. */
export async function cancelEvent(eventId) {
	await google(`${CAL}/calendars/${CALENDAR_ID()}/events/${encodeURIComponent(eventId)}?sendUpdates=all`, { method: "DELETE" });
}

const b64url = (s) => Buffer.from(s, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const encodeHeader = (s) => `=?UTF-8?B?${Buffer.from(s, "utf8").toString("base64")}?=`;
const cleanHeader = (s) => String(s).replace(/[\r\n]+/g, " ");

/* Plain-text email sent from the business Gmail account. */
export async function sendEmail({ to, subject, text, replyTo }) {
	const mime = [
		`To: ${cleanHeader(to)}`,
		replyTo ? `Reply-To: ${cleanHeader(replyTo)}` : null,
		`Subject: ${encodeHeader(cleanHeader(subject))}`,
		"MIME-Version: 1.0",
		'Content-Type: text/plain; charset="UTF-8"',
		"Content-Transfer-Encoding: base64",
		"",
		Buffer.from(text, "utf8").toString("base64"),
	]
		.filter((line) => line !== null)
		.join("\r\n");
	await google("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", { method: "POST", body: { raw: b64url(mime) } });
}
