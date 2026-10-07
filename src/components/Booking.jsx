import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, CircleNotch, Envelope, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { BUSINESS, mailHref, telHref, whatsappHref } from "../utils/business";
import {
	BOOKABLE_DAYS,
	BUDGETS,
	CALL_TYPES,
	SERVICES,
	bookingMessage,
	bookingReference,
	formatHour,
	googleCalendarLink,
	isBusy,
	upcomingDays,
	validateDetails,
} from "../utils/booking";
import { onBookingRequest, topicFromUrl } from "../utils/bookingEvents";

const STEPS = ["Topic", "When and how", "Your details"];
const FIRST = BUSINESS.founder.split(" ")[0];
const TURNSTILE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const emptyDetails = { fullname: "", company: "", phone: "", email: "", budget: "", notes: "" };

/* Draft kept for this browser session only (day and time are not kept: slots go stale). */
const DRAFT_KEY = "mdh-booking-draft";
const readDraft = () => {
	try {
		return JSON.parse(sessionStorage.getItem(DRAFT_KEY)) ?? {};
	} catch {
		return {};
	}
};
const writeDraft = (draft) => {
	try {
		sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
	} catch {
		/* storage unavailable (private mode): the form still works, it just is not kept */
	}
};
const clearDraft = () => {
	try {
		sessionStorage.removeItem(DRAFT_KEY);
	} catch {
		/* ignore */
	}
};

/* Progress: done steps are filled with a tick, the current step is outlined, later steps are a thin rule. */
function Progress({ step }) {
	return (
		<ol className="grid grid-cols-3 gap-2" aria-label="Booking progress">
			{STEPS.map((label, i) => {
				const state = i < step ? "done" : i === step ? "current" : "todo";
				return (
					<li key={label} aria-current={state === "current" ? "step" : undefined}>
						<span
							className="block h-1.5 rounded-full"
							style={{
								background: state === "done" ? "var(--azure)" : "transparent",
								border: state === "todo" ? "1px solid var(--rule-strong)" : "2px solid var(--azure)",
								height: 6,
							}}
						/>
						<span className="mt-2 flex items-center gap-1.5 text-[0.8rem] font-medium" style={{ color: state === "todo" ? "var(--ink-3)" : "var(--ink)" }}>
							{state === "done" && <Check size={13} weight="bold" style={{ color: "var(--azure)" }} aria-hidden="true" />}
							<span className="hidden sm:inline">{label}</span>
							<span className="sm:hidden">Step {i + 1}</span>
							<span className="sr-only">{state === "done" ? " (done)" : state === "current" ? " (current)" : ""}</span>
						</span>
					</li>
				);
			})}
		</ol>
	);
}

function Field({ id, label, optional, hint, error, children }) {
	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--ink)" }}>
				{label}
				{optional && <span style={{ color: "var(--ink-3)" }}> (optional)</span>}
			</label>
			{children}
			{hint && !error && (
				<p id={`${id}-hint`} className="text-[0.8rem]" style={{ color: "var(--ink-3)" }}>
					{hint}
				</p>
			)}
			{error && (
				<p id={`${id}-error`} className="field-error" role="alert">
					{error}
				</p>
			)}
		</div>
	);
}

/* Cloudflare Turnstile spam check, only when a site key is configured. */
function Turnstile({ onToken }) {
	const ref = useRef(null);
	useEffect(() => {
		let widget;
		let live = true;
		const render = () => {
			if (!live || !ref.current || !window.turnstile) return;
			widget = window.turnstile.render(ref.current, {
				sitekey: TURNSTILE_KEY,
				theme: "dark",
				callback: onToken,
				"expired-callback": () => onToken(""),
				"error-callback": () => onToken(""),
			});
		};
		let script = document.getElementById("cf-turnstile");
		if (window.turnstile) render();
		else {
			if (!script) {
				script = Object.assign(document.createElement("script"), {
					id: "cf-turnstile",
					src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
					async: true,
				});
				document.head.appendChild(script);
			}
			script.addEventListener("load", render);
		}
		return () => {
			live = false;
			script?.removeEventListener("load", render);
			if (widget !== undefined) window.turnstile?.remove(widget);
		};
	}, [onToken]);
	return <div ref={ref} className="mt-6 min-h-[65px]" />;
}

const Booking = () => {
	/* recomputed whenever free times are reloaded, so slots that have passed drop off */
	const [days, setDays] = useState(() => upcomingDays(BOOKABLE_DAYS));
	const [step, setStep] = useState(0);
	const [draft] = useState(readDraft);
	/* a topic in the link (from a guide or case study) wins over the saved draft */
	const [service, setService] = useState(() => (SERVICES.includes(topicFromUrl()) ? topicFromUrl() : (draft.service ?? "")));
	const [callType, setCallType] = useState(draft.callType ?? CALL_TYPES[0].label);
	const [dayKey, setDayKey] = useState(days[0]?.key ?? "");
	const [hour, setHour] = useState(null);
	const [details, setDetails] = useState({ ...emptyDetails, ...draft.details });
	const [errors, setErrors] = useState({});
	const [receipt, setReceipt] = useState(null);

	/* live free times: "idle" → "loading" → "live" | "offline" (then every slot is offered and the server decides) */
	const [busy, setBusy] = useState([]);
	const [availability, setAvailability] = useState("idle");
	const [submitting, setSubmitting] = useState(false);
	const [formError, setFormError] = useState(null);
	const [honeypot, setHoneypot] = useState("");
	const [turnstileToken, setTurnstileToken] = useState("");
	const [turnstileKey, setTurnstileKey] = useState(0);

	const headingRef = useRef(null);
	const firstRender = useRef(true);

	/* Days with at least one free slot, and only the free slots. */
	const openDays = useMemo(
		() => days.map((d) => ({ ...d, slots: d.slots.filter((h) => !isBusy(d.key, h, busy)) })).filter((d) => d.slots.length),
		[days, busy]
	);
	const day = openDays.find((d) => d.key === dayKey) ?? openDays[0];

	const loadAvailability = useCallback(async () => {
		setAvailability("loading");
		setDays(upcomingDays(BOOKABLE_DAYS));
		try {
			const res = await fetch("/api/availability");
			if (!res.ok) throw new Error(String(res.status));
			const data = await res.json();
			setBusy(Array.isArray(data.busy) ? data.busy : []);
			setAvailability("live");
		} catch {
			setBusy([]);
			setAvailability("offline");
		}
	}, []);

	/* "Book" buttons elsewhere on the page preselect a service here. */
	useEffect(
		() =>
			onBookingRequest((s) => {
				if (s) setService(s);
				setReceipt(null);
				setStep(0);
			}),
		[]
	);

	useEffect(() => {
		writeDraft({ service, callType, details });
	}, [service, callType, details]);

	/* Move focus to the step heading on every step change (not on first load). */
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		headingRef.current?.focus({ preventScroll: true });
	}, [step, receipt]);

	const setField = (e) => {
		const { name, value } = e.target;
		setDetails((d) => ({ ...d, [name]: value }));
		if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validateDetails({ ...details, [name]: value })[name] }));
	};

	const next = () => {
		if (step === 0 && !service) return setErrors({ service: "Choose what you would like to talk about." });
		if (step === 1 && hour === null) return setErrors({ hour: "Choose a time that suits you." });
		if (step === 0 && availability !== "live") loadAvailability();
		setErrors({});
		setFormError(null);
		setStep((s) => s + 1);
	};

	const submit = async (e) => {
		e.preventDefault();
		if (submitting) return;
		const found = validateDetails(details);
		setErrors(found);
		const firstError = ["fullname", "phone", "email"].find((f) => found[f]);
		if (firstError) {
			document.getElementById(`book-${firstError}`)?.focus();
			return;
		}

		setSubmitting(true);
		setFormError(null);
		let res = null;
		let data = {};
		try {
			res = await fetch("/api/book", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ service, callType, day: day.key, hour, ...details, website: honeypot, turnstileToken }),
			});
			data = await res.json().catch(() => ({}));
		} catch {
			res = null;
		}
		setSubmitting(false);

		if (res?.ok) {
			clearDraft();
			setReceipt({
				reference: data.reference,
				meetLink: data.meetLink,
				invited: data.invited === true,
				email: details.email.trim(),
				phone: details.phone.trim(),
				day,
				hour,
				calendar: googleCalendarLink({ day, hour, service, callType, meetLink: data.meetLink }),
			});
			setAvailability("idle");
			return;
		}

		/* Turnstile tokens are single use: get a fresh one for the next try. */
		setTurnstileToken("");
		setTurnstileKey((k) => k + 1);

		if (res?.status === 409 && data.code === "slot") {
			setHour(null);
			setStep(1);
			setErrors({ hour: data.error });
			loadAvailability();
			return;
		}
		if (res?.status === 400 && data.errors) {
			setErrors(data.errors);
			return;
		}
		if (!res || res.status >= 500) {
			const reference = bookingReference({ day, hour });
			setFormError({
				/* No answer at all: the booking may still have gone through, so say so. */
				message: res
					? "We could not confirm your booking online just now. Send it to us on WhatsApp instead, and we will confirm your time there."
					: "We lost the connection before we could confirm your booking. If no confirmation email arrives in the next few minutes, send it to us on WhatsApp and we will sort it out.",
				whatsapp: whatsappHref(bookingMessage({ reference, day, hour, service, callType, details })),
			});
			return;
		}
		setFormError({ message: data.error ?? "Something went wrong. Please try again." });
	};

	const reset = () => {
		clearDraft();
		setReceipt(null);
		setStep(0);
		setService("");
		setHour(null);
		setDetails(emptyDetails);
		setErrors({});
		setFormError(null);
	};

	const needsTurnstile = Boolean(TURNSTILE_KEY) && !turnstileToken;

	return (
		<Section id="booking" tone="azure" labelledBy="book-title">
			<SectionHead
				id="book-title"
				label="Free consultation"
				title="Let’s talk about"
				highlight="your business."
				lede={`Pick a time for a free 30-minute consultation with ${FIRST}. It takes under a minute, your time is confirmed straight away, and there is no obligation.`}
			/>
			<div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-10">
				{/* Direct lines */}
				<aside className="min-w-0 md:col-span-5" aria-label="Other ways to reach us">
					<div className="flex items-center gap-4">
						<div className="h-16 w-16 shrink-0 overflow-hidden rounded-[var(--r-input)]">
							<img src="/Martin2.webp" alt="" width="1024" height="1280" loading="lazy" className="h-full w-full scale-[1.2] object-cover object-[50%_28%]" />
						</div>
						<p className="leading-snug">
							<span className="block font-semibold" style={{ color: "#ffffff" }}>
								You will speak with {FIRST} directly.
							</span>
							<span className="block text-sm" style={{ color: "var(--on-navy-3)" }}>
								{BUSINESS.founder}, founder
							</span>
						</p>
					</div>

					<h3 className="mt-10 text-sm font-medium" style={{ color: "var(--on-navy-3)" }}>
						Rather talk now?
					</h3>
					<ul className="mt-3 grid gap-2.5">
						<li>
							<a href={telHref()} className="btn btn-outline btn-plain w-full justify-start">
								<Phone size={18} weight="bold" aria-hidden="true" />
								<span className="num">Call {BUSINESS.phones[0].display}</span>
							</a>
						</li>
						<li>
							<a href={whatsappHref("Hello Martin, I would like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain w-full justify-start">
								<WhatsappLogo size={18} weight="fill" aria-hidden="true" />
								Message on WhatsApp
							</a>
						</li>
						<li>
							<a href={mailHref("Project enquiry")} className="btn btn-outline btn-plain w-full justify-start">
								<Envelope size={18} weight="bold" aria-hidden="true" />
								{BUSINESS.email}
							</a>
						</li>
					</ul>

					<table className="facts mt-8 text-[0.95rem]">
						<tbody>
							<tr>
								<th scope="row">Hours</th>
								<td>
									{BUSINESS.hours.map((h) => (
										<span key={h.label} className="block">
											{h.label}
										</span>
									))}
								</td>
							</tr>
							<tr>
								<th scope="row">Other line</th>
								<td>
									<a href={telHref(BUSINESS.phones[1].tel)} className="link num">
										{BUSINESS.phones[1].display}
									</a>
								</td>
							</tr>
							<tr>
								<th scope="row">Office</th>
								<td>
									{BUSINESS.city}, {BUSINESS.country}
									{BUSINESS.googleProfileUrl && (
										<a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="link mt-1 block">
											Find us on Google
										</a>
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</aside>

				{/* The booking card. It owns #book so every "Book" link lands on step 1,
				    and it comes before the direct lines on phones. */}
				<div id="book" className="min-w-0 order-first md:order-none md:col-span-7">
					<div className="on-paper rounded-[var(--r-card)] border p-6 md:p-9" style={{ background: "var(--paper)", borderColor: "var(--navy-3)", boxShadow: "var(--shadow-float)" }}>
						{receipt ? (
							<div className="step-in" aria-live="polite">
								<h3 ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.025em] flex items-center gap-3 text-2xl outline-none" style={{ color: "var(--ink)" }}>
									{/* drawn tick: the ring closes, then the check strokes in */}
									<svg className="booked-tick" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
										<circle className="booked-ring" cx="16" cy="16" r="14" stroke="var(--azure)" strokeWidth="2.5" pathLength="1" />
										<path className="booked-check" d="M10 16.5l4 4 8-8.5" stroke="var(--azure)" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
									</svg>
									You’re booked
								</h3>
								<p className="mt-3 leading-relaxed" style={{ color: "var(--ink-2)" }}>
									{callType === "Phone call"
										? `${FIRST} will call you on ${receipt.phone} at the time below. `
										: callType === "Google Meet"
											? receipt.meetLink
												? "Join with the Google Meet link below. "
												: `${FIRST} will send you the Google Meet link before the call. `
											: `${FIRST} will confirm the meeting place with you before the day. `}
									{receipt.invited ? (
										<>
											A calendar invite is on its way to <span style={{ color: "var(--ink)" }}>{receipt.email}</span>. If you cannot see it, check your spam folder.
										</>
									) : (
										<>
											{FIRST} will email your confirmation to <span style={{ color: "var(--ink)" }}>{receipt.email}</span> shortly.
										</>
									)}
								</p>
								<table className="facts receipt-facts mt-6">
									<tbody>
										<tr>
											<th scope="row">Time</th>
											<td>
												{receipt.day.long}, {formatHour(receipt.hour)} <span style={{ color: "var(--ink-3)" }}>(EAT)</span>
											</td>
										</tr>
										<tr>
											<th scope="row">Format</th>
											<td>{callType}</td>
										</tr>
										{receipt.meetLink && (
											<tr>
												<th scope="row">Meet link</th>
												<td>
													<a href={receipt.meetLink} target="_blank" rel="noopener noreferrer" className="link break-all">
														{receipt.meetLink.replace(/^https:\/\//, "")}
													</a>
												</td>
											</tr>
										)}
										<tr>
											<th scope="row">About</th>
											<td>{service}</td>
										</tr>
										<tr>
											<th scope="row">Reference</th>
											<td className="num font-semibold">{receipt.reference}</td>
										</tr>
									</tbody>
								</table>
								<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
									<a href={receipt.calendar} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-plain">
										<CalendarPlus size={18} weight="bold" aria-hidden="true" />
										Add to my calendar
									</a>
									<a
										href={whatsappHref(`Hello ${FIRST}, about my consultation ${receipt.reference}: `)}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-outline btn-plain"
									>
										<WhatsappLogo size={18} weight="fill" aria-hidden="true" />
										Need to change it? WhatsApp {FIRST}
									</a>
								</div>
								<button type="button" onClick={reset} className="link mt-6 text-[0.95rem]">
									Make another booking
								</button>
							</div>
						) : (
							<form onSubmit={step === 2 ? submit : (e) => (e.preventDefault(), next())} noValidate>
								<Progress step={step} />

								{step === 0 && (
									<div key="s0" className="step-in mt-8">
										<h3 ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.025em] text-2xl outline-none" style={{ color: "var(--ink)" }}>
											What would you like to talk about?
										</h3>
										<div role="group" aria-label="Topic" className="mt-5 grid gap-2 sm:grid-cols-2">
											{SERVICES.map((s) => (
												<button
													key={s}
													type="button"
													className="option"
													aria-pressed={service === s}
													onClick={() => {
														setService(s);
														setErrors({});
													}}
												>
													{service === s && <Check size={16} weight="bold" aria-hidden="true" />}
													{s}
												</button>
											))}
										</div>
										{errors.service && (
											<p className="field-error mt-3" role="alert">
												{errors.service}
											</p>
										)}
									</div>
								)}

								{step === 1 && (
									<div key="s1" className="step-in mt-8">
										<h3 ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.025em] text-2xl outline-none" style={{ color: "var(--ink)" }}>
											When suits you?
										</h3>
										<p className="mt-1.5 text-sm" style={{ color: "var(--ink-3)" }}>
											Times are East Africa Time. Only times {FIRST} is free are shown, and your booking is confirmed straight away.
										</p>

										<h4 className="mt-6 text-sm font-medium" style={{ color: "var(--ink)" }}>
											How should we meet?
										</h4>
										<div role="group" aria-label="Meeting format" className="mt-3 grid gap-2 sm:grid-cols-3">
											{CALL_TYPES.map((c) => (
												<button key={c.id} type="button" className="option" aria-pressed={callType === c.label} onClick={() => setCallType(c.label)}>
													{callType === c.label && <Check size={16} weight="bold" aria-hidden="true" />}
													{c.label}
												</button>
											))}
										</div>

										<h4 className="mt-7 text-sm font-medium" style={{ color: "var(--ink)" }}>
											Pick a day and time
										</h4>
										{availability === "loading" ? (
											<p className="mt-3 flex items-center gap-2 text-[0.95rem]" style={{ color: "var(--ink-2)" }} role="status">
												<CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden="true" />
												Checking {FIRST}’s calendar for free times…
											</p>
										) : !openDays.length ? (
											<p className="mt-3 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
												Every time in the next week is taken.{" "}
												<a href={whatsappHref(`Hello ${FIRST}, I would like to book a consultation.`)} target="_blank" rel="noopener noreferrer" className="link">
													Message {FIRST} on WhatsApp
												</a>{" "}
												to find another time.
											</p>
										) : (
											<>
												<div role="radiogroup" aria-label="Day" className="mt-3 flex gap-2 overflow-x-auto pb-2">
													{openDays.map((d) => (
														<button
															key={d.key}
															type="button"
															role="radio"
															aria-checked={day?.key === d.key}
															aria-label={d.long}
															className="option shrink-0 flex-col !gap-0.5 !px-3 text-center"
															onClick={() => {
																setDayKey(d.key);
																setHour(null);
															}}
														>
															<span className="text-xs font-medium opacity-80">{d.weekday}</span>
															<span className="num text-lg font-semibold leading-none">{d.day}</span>
															<span className="text-xs opacity-80">{d.month}</span>
														</button>
													))}
												</div>

												<div role="radiogroup" aria-label="Time" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
													{day?.slots.map((h) => (
														<button
															key={h}
															type="button"
															role="radio"
															aria-checked={hour === h}
															className="option num justify-center"
															onClick={() => {
																setHour(h);
																setErrors({});
															}}
														>
															{hour === h && <Check size={15} weight="bold" aria-hidden="true" />}
															{formatHour(h)}
														</button>
													))}
												</div>
											</>
										)}
										{errors.hour && (
											<p className="field-error mt-3" role="alert">
												{errors.hour}
											</p>
										)}
									</div>
								)}

								{step === 2 && (
									<div key="s2" className="step-in mt-8">
										<h3 ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.025em] text-2xl outline-none" style={{ color: "var(--ink)" }}>
											Who should we expect?
										</h3>
										<p className="mt-1.5 text-sm" style={{ color: "var(--ink-3)" }}>
											{service}, {day?.long}, {formatHour(hour)}, {callType.toLowerCase()}.
										</p>
										<div className="mt-6 grid gap-5 sm:grid-cols-2">
											<Field id="book-fullname" label="Your name" error={errors.fullname}>
												<input id="book-fullname" name="fullname" autoComplete="name" maxLength={80} className="input" value={details.fullname} onChange={setField} aria-invalid={errors.fullname ? "true" : undefined} aria-describedby={errors.fullname ? "book-fullname-error" : undefined} />
											</Field>
											<Field id="book-company" label="Company" optional error={errors.company}>
												<input id="book-company" name="company" autoComplete="organization" maxLength={100} className="input" value={details.company} onChange={setField} />
											</Field>
											<Field id="book-phone" label="Phone or WhatsApp" error={errors.phone}>
												<input id="book-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="0770 123 456" className="input num" value={details.phone} onChange={setField} aria-invalid={errors.phone ? "true" : undefined} aria-describedby={errors.phone ? "book-phone-error" : undefined} />
											</Field>
											<Field id="book-email" label="Email" hint="Your confirmation and calendar invite go here." error={errors.email}>
												<input id="book-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={120} className="input" value={details.email} onChange={setField} aria-invalid={errors.email ? "true" : undefined} aria-describedby={errors.email ? "book-email-error" : "book-email-hint"} />
											</Field>
											<Field id="book-budget" label="Budget" optional>
												<select id="book-budget" name="budget" className="input" value={details.budget} onChange={setField}>
													<option value="">Choose a range</option>
													{BUDGETS.map((b) => (
														<option key={b}>{b}</option>
													))}
												</select>
											</Field>
											<div className="sm:col-span-2">
												<Field id="book-notes" label="Anything we should know?" optional error={errors.notes}>
													<textarea id="book-notes" name="notes" rows={3} maxLength={1500} className="input resize-y" value={details.notes} onChange={setField} />
												</Field>
											</div>
										</div>

										{/* Spam trap: hidden from people, filled in by bots. */}
										<div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
											<label>
												Leave this empty
												<input name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
											</label>
										</div>

										{TURNSTILE_KEY && <Turnstile key={turnstileKey} onToken={setTurnstileToken} />}

										{formError && (
											<div className="mt-6 rounded-[var(--r-input)] border p-4" style={{ borderColor: "var(--rule-strong)", background: "var(--bg-2)" }} role="alert">
												<p className="text-[0.95rem]" style={{ color: "var(--ink)" }}>
													{formError.message}
												</p>
												{formError.whatsapp && (
													<a href={formError.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain mt-4">
														<WhatsappLogo size={18} weight="fill" aria-hidden="true" />
														Send my booking on WhatsApp
													</a>
												)}
											</div>
										)}
									</div>
								)}

								<div className="mt-9 flex items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--rule)" }}>
									{step > 0 ? (
										<button type="button" className="btn btn-outline btn-plain" disabled={submitting} onClick={() => (setErrors({}), setFormError(null), setStep((s) => s - 1))}>
											<ArrowLeft size={17} weight="bold" aria-hidden="true" />
											Back
										</button>
									) : (
										<span className="text-sm" style={{ color: "var(--ink-3)" }}>
											Free, 30 minutes
										</span>
									)}
									<button
										type="submit"
										className="btn btn-primary btn-plain group"
										disabled={submitting || (step === 1 && availability === "loading") || (step === 2 && needsTurnstile)}
										aria-busy={submitting || undefined}
									>
										{step === 2 ? (submitting ? "Confirming…" : "Confirm booking") : "Continue"}
										{step === 2 ? (
											submitting ? (
												<CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden="true" />
											) : (
												<Check size={18} weight="bold" aria-hidden="true" />
											)
										) : (
											<ArrowRight size={17} weight="bold" className="arrow" aria-hidden="true" />
										)}
									</button>
								</div>
							</form>
						)}
					</div>

					{BUSINESS.calendarBookingUrl && (
						<p className="mt-4 text-sm" style={{ color: "var(--ink-3)" }}>
							Prefer Google Calendar?{" "}
							<a href={BUSINESS.calendarBookingUrl} target="_blank" rel="noopener noreferrer" className="link">
								Book directly in our calendar
							</a>
						</p>
					)}
				</div>
			</div>
		</Section>
	);
};

export default Booking;
