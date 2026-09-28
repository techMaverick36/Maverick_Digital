import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, Envelope, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { BUSINESS, mailHref, telHref, whatsappHref } from "../utils/business";
import { CALL_TYPES, bookingMessage, bookingReference, formatHour, googleCalendarLink, upcomingDays } from "../utils/booking";
import { onBookingRequest } from "../utils/bookingEvents";

const SERVICES = ["Website", "Branding", "UI/UX design", "Social media", "Online shop or system", "IT support", "Not sure yet"];
const BUDGETS = ["UGX 1,000,000 to 2,000,000", "UGX 2,000,000 to 5,000,000", "UGX 5,000,000 and above", "Not sure yet"];
const STEPS = ["What and how", "When", "Your details"];

const emptyDetails = { fullname: "", company: "", phone: "", email: "", budget: "", notes: "" };

function validateDetails(d) {
	const errors = {};
	if (!d.fullname.trim()) errors.fullname = "Enter your name so we know who to expect.";
	const digits = d.phone.replace(/\D/g, "");
	if (!digits) errors.phone = "Enter a phone number we can call or WhatsApp.";
	else if (digits.length < 9) errors.phone = "That number looks too short. Include the full number, e.g. 0770 123 456.";
	if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) errors.email = "Check the email address, e.g. name@company.com.";
	return errors;
}

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

function Field({ id, label, optional, error, children }) {
	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--ink)" }}>
				{label}
				{optional && <span style={{ color: "var(--ink-3)" }}> (optional)</span>}
			</label>
			{children}
			{error && (
				<p id={`${id}-error`} className="field-error" role="alert">
					{error}
				</p>
			)}
		</div>
	);
}

const Booking = () => {
	const days = useMemo(() => upcomingDays(8), []);
	const [step, setStep] = useState(0);
	const [service, setService] = useState("");
	const [callType, setCallType] = useState(CALL_TYPES[0].label);
	const [dayKey, setDayKey] = useState(days[0]?.key ?? "");
	const [hour, setHour] = useState(null);
	const [details, setDetails] = useState(emptyDetails);
	const [errors, setErrors] = useState({});
	const [receipt, setReceipt] = useState(null);
	const headingRef = useRef(null);
	const firstRender = useRef(true);

	const day = days.find((d) => d.key === dayKey);

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
		setErrors({});
		setStep((s) => s + 1);
	};

	const submit = (e) => {
		e.preventDefault();
		const found = validateDetails(details);
		setErrors(found);
		const first = ["fullname", "phone", "email"].find((f) => found[f]);
		if (first) {
			document.getElementById(`book-${first}`)?.focus();
			return;
		}
		const reference = bookingReference({ day, hour });
		const message = bookingMessage({ reference, day, hour, service, callType, details });
		const wa = whatsappHref(message);
		window.open(wa, "_blank", "noopener,noreferrer");
		setReceipt({ reference, wa, calendar: googleCalendarLink({ day, hour, service, callType }) });
	};

	const reset = () => {
		setReceipt(null);
		setStep(0);
		setService("");
		setHour(null);
		setDetails(emptyDetails);
		setErrors({});
	};

	return (
		<Section id="book" tone="navy" labelledBy="book-title">
			<SectionHead
				id="book-title"
				label="Book a consultation"
				title="Let’s talk about"
				highlight="your business."
				lede={`Pick a time for a free 30-minute consultation with ${BUSINESS.founder.split(" ")[0]}. It takes under a minute, and there is no obligation.`}
			/>
			<div className="mt-14" />
			<div className="grid gap-12 md:grid-cols-12 md:gap-10">
				{/* Direct lines */}
				<aside className="min-w-0 md:col-span-5" aria-label="Other ways to reach us">
					<div className="flex items-center gap-4">
						<div className="h-16 w-16 shrink-0 overflow-hidden rounded-[var(--r-input)]">
							<img src="/Martin2.jpeg" alt="" width="1024" height="1280" loading="lazy" className="h-full w-full scale-[1.2] object-cover object-[50%_28%]" />
						</div>
						<p className="leading-snug">
							<span className="block font-semibold" style={{ color: "#ffffff" }}>
								You will speak with {BUSINESS.founder.split(" ")[0]} directly.
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

				{/* The reply slip */}
				<div className="min-w-0 md:col-span-7">
					<div className="on-paper rounded-[var(--r-card)] border p-6 md:p-9" style={{ background: "var(--paper)", borderColor: "var(--navy-3)", boxShadow: "var(--shadow-float)" }}>
						{receipt ? (
							<div className="step-in" aria-live="polite">
								<h3 ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.025em] flex items-center gap-2 text-2xl outline-none" style={{ color: "var(--ink)" }}>
									<Check size={24} weight="bold" style={{ color: "var(--azure)" }} aria-hidden="true" />
									Request ready to send
								</h3>
								<p className="mt-3 leading-relaxed" style={{ color: "var(--ink-2)" }}>
									WhatsApp has opened with your booking filled in. Press send there, and{" "}
									{BUSINESS.founder.split(" ")[0]} will confirm your time {BUSINESS.responseTime}.
								</p>
								<table className="facts mt-6">
									<tbody>
										<tr>
											<th scope="row">Reference</th>
											<td className="num font-semibold">{receipt.reference}</td>
										</tr>
										<tr>
											<th scope="row">Time</th>
											<td>
												{day.long}, {formatHour(hour)} <span style={{ color: "var(--ink-3)" }}>(EAT)</span>
											</td>
										</tr>
										<tr>
											<th scope="row">Format</th>
											<td>{callType}</td>
										</tr>
										<tr>
											<th scope="row">About</th>
											<td>{service}</td>
										</tr>
									</tbody>
								</table>
								<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
									<a href={receipt.wa} target="_blank" rel="noopener noreferrer" className="btn btn-navy btn-plain">
										<WhatsappLogo size={18} weight="fill" aria-hidden="true" />
										WhatsApp did not open? Send it here
									</a>
									<a href={receipt.calendar} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain">
										<CalendarPlus size={18} weight="bold" aria-hidden="true" />
										Add to my calendar
									</a>
								</div>
								<button type="button" onClick={reset} className="link mt-6 text-[0.95rem]">
									Book a different time
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

										<h4 className="mt-8 text-sm font-medium" style={{ color: "var(--ink)" }}>
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
									</div>
								)}

								{step === 1 && (
									<div key="s1" className="step-in mt-8">
										<h3 ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.025em] text-2xl outline-none" style={{ color: "var(--ink)" }}>
											When suits you?
										</h3>
										<p className="mt-1.5 text-sm" style={{ color: "var(--ink-3)" }}>
											Times are East Africa Time. {BUSINESS.founder.split(" ")[0]} confirms every booking personally.
										</p>

										<div role="radiogroup" aria-label="Day" className="mt-5 flex gap-2 overflow-x-auto pb-2">
											{days.map((d) => (
												<button
													key={d.key}
													type="button"
													role="radio"
													aria-checked={dayKey === d.key}
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
												<input id="book-fullname" name="fullname" autoComplete="name" className="input" value={details.fullname} onChange={setField} aria-invalid={errors.fullname ? "true" : undefined} aria-describedby={errors.fullname ? "book-fullname-error" : undefined} />
											</Field>
											<Field id="book-company" label="Company" optional>
												<input id="book-company" name="company" autoComplete="organization" className="input" value={details.company} onChange={setField} />
											</Field>
											<Field id="book-phone" label="Phone or WhatsApp" error={errors.phone}>
												<input id="book-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0770 123 456" className="input num" value={details.phone} onChange={setField} aria-invalid={errors.phone ? "true" : undefined} aria-describedby={errors.phone ? "book-phone-error" : undefined} />
											</Field>
											<Field id="book-email" label="Email" optional error={errors.email}>
												<input id="book-email" name="email" type="email" inputMode="email" autoComplete="email" className="input" value={details.email} onChange={setField} aria-invalid={errors.email ? "true" : undefined} aria-describedby={errors.email ? "book-email-error" : undefined} />
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
												<Field id="book-notes" label="Anything we should know?" optional>
													<textarea id="book-notes" name="notes" rows={3} className="input resize-y" value={details.notes} onChange={setField} />
												</Field>
											</div>
										</div>
									</div>
								)}

								<div className="mt-9 flex items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--rule)" }}>
									{step > 0 ? (
										<button type="button" className="btn btn-outline btn-plain" onClick={() => (setErrors({}), setStep((s) => s - 1))}>
											<ArrowLeft size={17} weight="bold" aria-hidden="true" />
											Back
										</button>
									) : (
										<span className="text-sm" style={{ color: "var(--ink-3)" }}>
											Free, 30 minutes
										</span>
									)}
									<button type="submit" className="btn btn-navy btn-plain group">
										{step === 2 ? "Send booking request" : "Continue"}
										{step === 2 ? <WhatsappLogo size={18} weight="fill" aria-hidden="true" /> : <ArrowRight size={17} weight="bold" className="arrow" aria-hidden="true" />}
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
