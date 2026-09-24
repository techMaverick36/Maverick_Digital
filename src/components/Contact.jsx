import { useState } from "react";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import Reveal from "./Reveal";

const WHATSAPP_NUMBER = "256770302731";
const EMAIL = "mavericktech750@gmail.com";

const serviceOptions = [
	"Web Design & Development",
	"IT & Tech Solutions",
	"Social Media Management",
	"Branding & Identity",
	"UI/UX Design",
	"Digital Marketing & SEO",
];

const budgetOptions = [
	"UGX 800,000 - 2,000,000",
	"UGX 2,000,000 - 5,000,000",
	"UGX 5,000,000+",
];

const emptyForm = {
	fullname: "",
	email: "",
	phone: "",
	service: "",
	budget: "",
	details: "",
};
const fieldOrder = [
	"fullname",
	"email",
	"phone",
	"service",
	"budget",
	"details",
];

function validateField(name, value) {
	const v = value.trim();
	switch (name) {
		case "fullname":
			return v ? "" : "Enter your full name.";
		case "email":
			if (!v) return "Enter your email address.";
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
				? ""
				: "Enter an email like name@company.com.";
		case "service":
			return v ? "" : "Choose the service you need.";
		case "details":
			return v ? "" : "Tell us a little about the project.";
		default:
			return "";
	}
}

function Field({ id, label, required, error, hint, children }) {
	return (
		<div className="flex flex-col gap-2">
			<label
				htmlFor={id}
				className="text-sm font-medium"
				style={{ color: "var(--ink)" }}
			>
				{label}
				{required && (
					<span style={{ color: "var(--ink-3)" }} aria-hidden="true">
						{" "}
						*
					</span>
				)}
			</label>
			{children}
			{error ? (
				<p id={`${id}-error`} className="field-error">
					{error}
				</p>
			) : hint ? (
				<p
					id={`${id}-hint`}
					className="text-sm"
					style={{ color: "var(--ink-3)" }}
				>
					{hint}
				</p>
			) : null}
		</div>
	);
}

const Contact = () => {
	const [form, setForm] = useState(emptyForm);
	const [errors, setErrors] = useState({});
	const [sent, setSent] = useState(false);

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setSent(false);
		/* clear an error as soon as the field becomes valid */
		if (errors[name] && !validateField(name, value)) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const onBlur = (e) => {
		const { name, value } = e.target;
		setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const next = Object.fromEntries(
			fieldOrder.map((f) => [f, validateField(f, form[f])]),
		);
		setErrors(next);
		const firstInvalid = fieldOrder.find((f) => next[f]);
		if (firstInvalid) {
			document.getElementById(firstInvalid)?.focus();
			return;
		}

		const { fullname, email, phone, service, budget, details } = form;
		const message = [
			"Hello Martin,",
			"",
			"I would like to enquire about a project with Maverick Digital Hub.",
			"",
			`Full Name: ${fullname}`,
			`Email: ${email}`,
			`Phone: ${phone || "Not provided"}`,
			`Service: ${service || "Not selected"}`,
			`Budget: ${budget || "Not selected"}`,
			"",
			"Project Details:",
			details,
		].join("\n");

		window.open(
			`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
			"_blank",
			"noopener,noreferrer",
		);
		setForm(emptyForm);
		setSent(true);
	};

	const a11y = (name, hint) => ({
		id: name,
		name,
		onChange,
		onBlur,
		value: form[name],
		"aria-invalid": errors[name] ? "true" : undefined,
		"aria-describedby": errors[name]
			? `${name}-error`
			: hint
				? `${name}-hint`
				: undefined,
	});

	return (
		<section
			id="contact"
			className="px-5 py-24 md:px-8 md:py-32"
			style={{ background: "var(--accent-soft)" }}
			aria-labelledby="contact-title"
		>
			<div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
				<Reveal className="lg:col-span-5">
					<h2
						id="contact-title"
						className="h-section text-4xl md:text-5xl"
						style={{ color: "var(--ink)" }}
					>
						Tell us about your project.
					</h2>
					<p className="lede mt-6 text-lg">
						Share what you need, your timing, and a budget range. Most enquiries
						get a reply within one business day.
					</p>

					<div className="mt-10 flex items-center gap-4">
						<div
							className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[var(--r-inner)]"
							style={{ background: "#0b0b0b" }}
						>
							{/* headshot source: a light zoom keeps the face centred in the square */}
							<img
								src="/Martin2.jpeg"
								alt=""
								width="1024"
								height="1280"
								loading="lazy"
								className="h-full w-full origin-[50%_32%] scale-[1.25] object-cover object-[50%_30%]"
							/>
						</div>
						<p className="leading-snug">
							<span
								className="block font-semibold"
								style={{ color: "var(--ink)" }}
							>
								You will talk to Martin directly.
							</span>
							<span className="block text-sm" style={{ color: "var(--ink-3)" }}>
								Martin Ssemugabi, Founder
							</span>
						</p>
					</div>

					<dl className="mt-10 space-y-6">
						<div>
							<dt className="text-sm" style={{ color: "var(--ink-3)" }}>
								Email
							</dt>
							<dd className="mt-1">
								<a
									href={`mailto:${EMAIL}`}
									className="link-arrow min-h-0 text-lg"
								>
									{EMAIL}
								</a>
							</dd>
						</div>
						<div>
							<dt className="text-sm" style={{ color: "var(--ink-3)" }}>
								Phone and WhatsApp
							</dt>
							<dd className="mt-1 flex flex-wrap gap-x-5 text-lg">
								<a href="tel:+256770302731" className="link-arrow min-h-0">
									+256 770 302 731
								</a>
								<a href="tel:+256745496783" className="link-arrow min-h-0">
									+256 745 496 783
								</a>
							</dd>
						</div>
						<div>
							<dt className="text-sm" style={{ color: "var(--ink-3)" }}>
								Studio
							</dt>
							<dd className="mt-1 text-lg" style={{ color: "var(--ink)" }}>
								Kampala, Uganda
							</dd>
						</div>
					</dl>
				</Reveal>

				<Reveal delay={100} className="lg:col-span-7">
					<form
						noValidate
						onSubmit={handleSubmit}
						className="rounded-[var(--r-surface)] border p-6 md:p-10"
						style={{
							background: "var(--surface)",
							borderColor: "var(--line)",
							boxShadow: "var(--shadow)",
						}}
					>
						<div className="grid gap-6 md:grid-cols-2">
							<Field
								id="fullname"
								label="Full name"
								required
								error={errors.fullname}
							>
								<input
									type="text"
									autoComplete="name"
									className="input"
									placeholder="Your name"
									{...a11y("fullname")}
								/>
							</Field>
							<Field
								id="email"
								label="Email address"
								required
								error={errors.email}
							>
								<input
									type="email"
									autoComplete="email"
									inputMode="email"
									className="input"
									placeholder="you@company.com"
									{...a11y("email")}
								/>
							</Field>
							<Field id="phone" label="Phone number" error={errors.phone}>
								<input
									type="tel"
									autoComplete="tel"
									className="input"
									placeholder="+256 7XX XXX XXX"
									{...a11y("phone")}
								/>
							</Field>
							<Field
								id="service"
								label="Service required"
								required
								error={errors.service}
							>
								<select className="input" {...a11y("service")}>
									<option value="">Select a service</option>
									{serviceOptions.map((o) => (
										<option key={o}>{o}</option>
									))}
								</select>
							</Field>
						</div>

						<div className="mt-6 grid gap-6">
							<Field id="budget" label="Project budget" error={errors.budget}>
								<select className="input" {...a11y("budget")}>
									<option value="">Select a range</option>
									{budgetOptions.map((o) => (
										<option key={o}>{o}</option>
									))}
								</select>
							</Field>
							<Field
								id="details"
								label="Project details"
								required
								error={errors.details}
								hint="What does your business do, what do you need, and what would success look like?"
							>
								<textarea
									rows={5}
									className="input resize-y"
									{...a11y("details", true)}
								/>
							</Field>
						</div>

						<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-sm" style={{ color: "var(--ink-3)" }}>
								Opens WhatsApp with your details filled in.
							</p>
							<button type="submit" className="btn btn-primary">
								Send message
								<ArrowUpRight size={16} weight="bold" className="arrow" />
							</button>
						</div>

						<div role="status" aria-live="polite">
							{sent && (
								<p
									className="mt-6 flex items-start gap-2.5 rounded-[var(--r-inner)] p-4 text-sm"
									style={{
										background: "var(--accent-soft)",
										color: "var(--ink)",
									}}
								>
									<CheckCircle
										size={18}
										weight="fill"
										className="mt-px shrink-0"
										style={{ color: "var(--accent-text)" }}
									/>
									<span>
										Your message is ready in WhatsApp. If it did not open, email
										us at{" "}
										<a
											href={`mailto:${EMAIL}`}
											className="underline underline-offset-4"
										>
											{EMAIL}
										</a>
										.
									</span>
								</p>
							)}
						</div>
					</form>
				</Reveal>
			</div>
		</section>
	);
};

export default Contact;
