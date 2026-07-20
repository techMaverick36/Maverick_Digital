import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { testimonials } from "../utils/constants";
import Seo from "../components/Seo";

const whyItems = [
	{
		num: "01",
		title: "Commercially focused work",
		copy: "Everything is built around how people see your business, what they understand quickly, and what moves them to take action.",
	},
	{
		num: "02",
		title: "Structured delivery",
		copy: "From the first conversation to launch, the process stays organised so you always know what is happening and what comes next.",
	},
	{
		num: "03",
		title: "Long-term reliability",
		copy: "The goal is not just to launch something nice. It is to leave you with work you can keep using, growing, and feeling proud of.",
	},
];

const processSteps = [
	{
		step: "01",
		title: "Brief and alignment",
		desc: "We start by understanding your business, your audience, and what you want this project to achieve.",
	},
	{
		step: "02",
		title: "Planning and structure",
		desc: "Next, we shape the structure, content flow, and direction so the project has a strong foundation.",
	},
	{
		step: "03",
		title: "Design and production",
		desc: "Then we design and build with care, making sure everything feels aligned, polished, and ready to perform.",
	},
	{
		step: "04",
		title: "Review and refinement",
		desc: "We review the details, refine the experience, and make sure the final product feels clean and professional.",
	},
	{
		step: "05",
		title: "Launch",
		desc: "When everything is ready, we launch with care so the handover feels smooth and complete.",
	},
	{
		step: "06",
		title: "Support and iteration",
		desc: "After launch, we can keep supporting you with updates, improvements, and the next stage of growth.",
	},
];

const contactCards = [
	{ icon: FiMail, label: "Email", value: "mavericktech750@gmail.com" },
	{ icon: FiPhone, label: "Phone", value: "+256 770 302 731 / +256 745 496 783" },
	{ icon: FiMapPin, label: "Location", value: "Kampala, Uganda" },
	{
		icon: FiClock,
		label: "Response",
		value: "Most enquiries get a response within one business day.",
	},
];

export default function AgencyWebsite() {
	const [activeTestimonial, setActiveTestimonial] = useState(0);
	const [formData, setFormData] = useState({
		fullname: "",
		email: "",
		phone: "",
		service: "",
		budget: "",
		details: "",
	});

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { fullname, email, phone, service, budget, details } = formData;

		if (!fullname?.trim() || !email?.trim() || !details?.trim()) {
			alert("Please fill in Full Name, Email and Project Details.");
			return;
		}

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

		const whatsappUrl = `https://wa.me/256770302731?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank", "noopener,noreferrer");

		setFormData({
			fullname: "",
			email: "",
			phone: "",
			service: "Web Design & Development",
			budget: "Under UGX 300,000",
			details: "",
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen theme-shell" style={{ color: "var(--text-primary)" }}>
			<Seo
				title="Web Design, Branding and Digital Solutions"
				description="Maverick Digital Hub helps businesses in Kampala and beyond build polished websites, stronger branding, and credible digital experiences."
				path="/"
			/>
			<Navbar />
			<Hero />
			<Marquee />
			<Services />

			{/* ── About / Why ── */}
			<section id="about" className="py-24 px-6" style={{ background: "var(--bg-elevated)" }}>
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-start">
						<div>
							<Reveal>
								<span className="section-label">Why Maverick</span>
								<h2
									className="display mt-5 mb-6 text-4xl md:text-5xl font-bold leading-tight text-balance"
									style={{ color: "var(--text-primary)" }}
								>
									Built for businesses that want to feel{" "}
									<span className="grad-text">polished and credible.</span>
								</h2>
								<p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
									We keep things simple and practical. You get thoughtful design,
									clear communication, and work that actually supports the way
									your business operates.
								</p>
							</Reveal>

							<div className="space-y-4">
								{whyItems.map((item, i) => (
									<Reveal key={item.title} delay={i * 80}>
										<div
											className="group flex gap-5 rounded-3xl border p-6 card-lift"
											style={{ background: "var(--bg-base)", borderColor: "var(--border-soft)" }}
										>
											<div
												className="display text-2xl font-bold shrink-0 transition-colors duration-300"
												style={{ color: "var(--accent)" }}
											>
												{item.num}
											</div>
											<div>
												<h3 className="display text-lg font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
													{item.title}
												</h3>
												<p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
													{item.copy}
												</p>
											</div>
										</div>
									</Reveal>
								))}
							</div>
						</div>

						{/* Testimonials */}
						<Reveal delay={120} className="lg:sticky lg:top-28">
							<div
								className="relative rounded-[2rem] border p-8 md:p-10 overflow-hidden"
								style={{ background: "var(--bg-base)", borderColor: "var(--border-soft)", boxShadow: "var(--shadow-card)" }}
							>
								<div
									className="absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl"
									style={{ background: "var(--orb-1)" }}
									aria-hidden="true"
								/>
								<svg
									width="42"
									height="32"
									viewBox="0 0 42 32"
									fill="var(--accent)"
									aria-hidden="true"
									className="mb-8 opacity-80"
								>
									<path d="M0 32V19.2C0 8.6 6.4 1.5 16.6 0l1.9 4.6c-5.8 1.7-9 5.3-9.4 10h9.4V32H0zm23.5 0V19.2C23.5 8.6 29.9 1.5 40.1 0L42 4.6c-5.8 1.7-9 5.3-9.4 10H42V32H23.5z" />
								</svg>

								<div className="relative min-h-[190px]">
									{testimonials.map((testimonial, index) => (
										<div
											key={index}
											className={`transition-all duration-500 ${
												activeTestimonial === index
													? "opacity-100 translate-y-0"
													: "opacity-0 translate-y-3 absolute inset-0 pointer-events-none"
											}`}
										>
											<p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--text-primary)" }}>
												&ldquo;{testimonial.content}&rdquo;
											</p>
											<div className="mt-8 flex items-center gap-4">
												<div
													className="display flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
													style={{ background: "var(--accent-gradient)" }}
												>
													{testimonial.avatar}
												</div>
												<div>
													<div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
														{testimonial.name}
													</div>
													<div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
														{testimonial.role}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

								<div className="mt-8 flex gap-2">
									{testimonials.map((_, index) => (
										<button
											key={index}
											onClick={() => setActiveTestimonial(index)}
											aria-label={`Show testimonial ${index + 1}`}
											className="h-2 rounded-full transition-all duration-300 cursor-pointer"
											style={{
												background: activeTestimonial === index ? "var(--accent)" : "var(--dot-inactive)",
												width: activeTestimonial === index ? "2rem" : "0.5rem",
											}}
										/>
									))}
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* ── Process ── */}
			<section id="process" className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
				<div className="max-w-7xl mx-auto">
					<Reveal>
						<div className="max-w-3xl mb-16">
							<span className="section-label">How we work</span>
							<h2
								className="display mt-5 mb-5 text-4xl md:text-5xl font-bold leading-tight text-balance"
								style={{ color: "var(--text-primary)" }}
							>
								A simple process that keeps the work clear and the{" "}
								<span className="grad-text">results strong.</span>
							</h2>
							<p className="text-lg" style={{ color: "var(--text-secondary)" }}>
								Good work feels easier when the process makes sense. Each stage
								stays clear so decisions are easier and the final result feels
								well thought through.
							</p>
						</div>
					</Reveal>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
						{processSteps.map((item, index) => (
							<Reveal key={item.step} delay={(index % 3) * 80}>
								<div
									className="group relative h-full rounded-3xl border p-8 card-lift overflow-hidden"
									style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
								>
									<div
										className="display absolute -top-3 right-5 text-[5.5rem] font-bold leading-none select-none opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-300"
										style={{ color: "var(--accent)" }}
										aria-hidden="true"
									>
										{item.step}
									</div>
									<div
										className="h-1 w-10 rounded-full mb-6 transition-all duration-300 group-hover:w-16"
										style={{ background: "var(--accent-gradient)" }}
										aria-hidden="true"
									/>
									<h3 className="display text-xl font-semibold mb-3 relative z-10" style={{ color: "var(--text-primary)" }}>
										{item.title}
									</h3>
									<p className="text-sm leading-relaxed relative z-10" style={{ color: "var(--text-secondary)" }}>
										{item.desc}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA band ── */}
			<section className="relative py-24 px-6 overflow-hidden" style={{ background: "var(--cta-band-bg)" }}>
				<div
					className="absolute inset-0 pointer-events-none opacity-40"
					style={{
						backgroundImage:
							"linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
						backgroundSize: "56px 56px",
					}}
					aria-hidden="true"
				/>
				<div
					className="float-slow absolute -top-24 right-10 h-72 w-72 rounded-full blur-[100px] bg-white/10 pointer-events-none"
					aria-hidden="true"
				/>
				<Reveal className="relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="display text-4xl md:text-6xl font-bold mb-6 text-white text-balance">
							Ready to stand out online?
						</h2>
						<p className="text-lg md:text-xl mb-10 text-white/75 leading-relaxed max-w-2xl mx-auto">
							If your website or brand no longer reflects the quality of your
							business, this is a good time to fix that and move forward with
							confidence.
						</p>
						<a
							href="#contact"
							className="group inline-flex items-center gap-2.5 bg-white text-[#0b1e33] px-9 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5"
						>
							Start the Conversation
							<FiArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
						</a>
					</div>
				</Reveal>
			</section>

			{/* ── Contact ── */}
			<section id="contact" className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
				<div className="max-w-7xl mx-auto">
					<Reveal>
						<div className="max-w-3xl mb-16">
							<span className="section-label">Contact</span>
							<h2
								className="display mt-5 mb-5 text-4xl md:text-5xl font-bold leading-tight text-balance"
								style={{ color: "var(--text-primary)" }}
							>
								Tell us what you need. <span className="grad-text">Let&apos;s talk.</span>
							</h2>
							<p className="text-lg" style={{ color: "var(--text-secondary)" }}>
								Share a bit about your business, what you need help with, and any
								timing or budget details that matter to you.
							</p>
						</div>
					</Reveal>

					<div className="grid lg:grid-cols-5 gap-10">
						<div className="lg:col-span-2 space-y-4">
							{contactCards.map((item, i) => (
								<Reveal key={item.label} delay={i * 70}>
									<div
										className="flex items-start gap-4 rounded-3xl border p-6 card-lift"
										style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
									>
										<div
											className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
											style={{ background: "var(--tag-bg)", color: "var(--accent-text)" }}
										>
											<item.icon size={19} />
										</div>
										<div>
											<div className="text-xs uppercase tracking-[0.18em] mb-1.5" style={{ color: "var(--text-muted)" }}>
												{item.label}
											</div>
											<div className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
												{item.value}
											</div>
										</div>
									</div>
								</Reveal>
							))}
						</div>

						<Reveal delay={140} className="lg:col-span-3">
							<div
								className="rounded-[2rem] border p-8 md:p-10"
								style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)", boxShadow: "var(--shadow-card)" }}
							>
								<form className="space-y-6" onSubmit={handleSubmit}>
									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<label htmlFor="fullname" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
												Full Name *
											</label>
											<input
												id="fullname"
												type="text"
												name="fullname"
												className="input"
												placeholder="John Doe"
												autoComplete="name"
												value={formData?.fullname || ""}
												onChange={onChange}
											/>
										</div>
										<div>
											<label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
												Email Address *
											</label>
											<input
												id="email"
												type="email"
												name="email"
												className="input"
												placeholder="john@company.com"
												autoComplete="email"
												value={formData?.email || ""}
												onChange={onChange}
											/>
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
												Phone Number
											</label>
											<input
												id="phone"
												type="tel"
												name="phone"
												className="input"
												placeholder="+256 XXX XXX XXX"
												autoComplete="tel"
												value={formData?.phone || ""}
												onChange={onChange}
											/>
										</div>
										<div>
											<label htmlFor="service" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
												Service Required *
											</label>
											<select
												id="service"
												name="service"
												className="input"
												value={formData?.service || "--- select ---"}
												onChange={onChange}
											>
												<option>--- select ---</option>
												<option>Web Design & Development</option>
												<option>IT & Tech Solutions</option>
												<option>Social Media Management</option>
												<option>Branding & Identity</option>
												<option>UI/UX Design</option>
												<option>Digital Marketing & SEO</option>
											</select>
										</div>
									</div>

									<div>
										<label htmlFor="budget" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
											Project Budget
										</label>
										<select
											id="budget"
											name="budget"
											className="input"
											value={formData?.budget || "--- select ---"}
											onChange={onChange}
										>
											<option>--- select ---</option>
											<option>Under UGX 300,000</option>
											<option>UGX 300,000 - 800,000</option>
											<option>UGX 800,000 - 2,000,000</option>
											<option>UGX 2,000,000 - 5,000,000</option>
											<option>UGX 5,000,000+</option>
										</select>
									</div>

									<div>
										<label htmlFor="details" className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
											Project Details *
										</label>
										<textarea
											id="details"
											name="details"
											rows="5"
											className="input resize-y"
											placeholder="Tell us about your business, what you need, and what success would look like..."
											value={formData?.details || ""}
											onChange={onChange}
										></textarea>
									</div>

									<button type="submit" className="btn-primary w-full px-8 py-4 text-base">
										Send Message
										<FiArrowUpRight className="btn-arrow" size={18} />
									</button>
								</form>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
