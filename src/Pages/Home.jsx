import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { testimonials } from "../utils/constants";
import Seo from "../components/Seo";

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
		<div className="min-h-screen montserrat theme-shell" style={{ color: "var(--text-primary)" }}>
			<Seo
				title="Web Design, Branding and Digital Solutions"
				description="Maverick Digital Hub helps businesses in Kampala and beyond build polished websites, stronger branding, and credible digital experiences."
				path="/"
			/>
			<Navbar />
			<Hero />
			<Services />

			{/* ── About ── */}
			<div className="section-divider" />
			<section
				id="about"
				className="py-24 px-6"
				style={{ background: "var(--section-about-bg)" }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<div className="section-label mb-6">Why Maverick</div>
							<h2
								className="text-4xl md:text-5xl font-semibold mb-6 roboto_condensed text-balance mt-4"
								style={{ color: "var(--text-primary)" }}
							>
								The right fit if you want your business to feel more polished,
								clear, and credible online.
							</h2>
							<p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
								We keep things simple and practical. You get thoughtful design,
								clear communication, and work that actually supports the way your
								business operates.
							</p>

							<div className="space-y-4">
								{[
									{
										title: "Commercially focused work",
										copy: "Everything is built around how people see your business, what they understand quickly, and what moves them to take action.",
									},
									{
										title: "Structured delivery",
										copy: "From the first conversation to launch, the process stays organised so you always know what is happening and what comes next.",
									},
									{
										title: "Long-term reliability",
										copy: "The goal is not just to launch something nice. It is to leave you with work you can keep using, growing, and feeling proud of.",
									},
								].map((item) => (
									<div key={item.title} className="surface-panel-accent rounded-2xl p-6 card-glow">
										<h3
											className="text-xl font-semibold mb-2 roboto_condensed"
											style={{ color: "var(--text-primary)" }}
										>
											{item.title}
										</h3>
										<p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
											{item.copy}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className="relative z-0">
							<div className="relative z-10 rounded-2xl p-8 border shadow-2xl surface-panel" style={{ borderColor: "var(--border-soft)" }}>
								<div className="space-y-6 relative h-[170px]">
									{testimonials.map((testimonial, index) => (
										<div
											key={index}
											className={`transition-all duration-500 ${
												activeTestimonial === index
													? "opacity-100 scale-100"
													: "opacity-0 scale-95 absolute inset-0 p-8"
											}`}
										>
											<div className="flex items-center gap-4 mb-4">
												<div
													className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-lg text-white"
													style={{ background: "var(--accent-gradient)" }}
												>
													{testimonial.avatar}
												</div>
												<div>
													<div className="font-bold" style={{ color: "var(--text-primary)" }}>
														{testimonial.name}
													</div>
													<div className="text-sm" style={{ color: "var(--text-muted)" }}>
														{testimonial.role}
													</div>
												</div>
											</div>
											<p className="leading-relaxed italic" style={{ color: "var(--text-secondary)" }}>
												&ldquo;{testimonial.content}&rdquo;
											</p>
										</div>
									))}
								</div>

								<div className="flex gap-2 mt-6 justify-center">
									{testimonials.map((_, index) => (
										<button
											key={index}
											onClick={() => setActiveTestimonial(index)}
											className="h-2 rounded-full transition-all duration-300"
											style={{
												background: activeTestimonial === index ? "var(--accent-strong)" : "var(--testimonial-dot-inactive)",
												width: activeTestimonial === index ? "2rem" : "0.5rem",
											}}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── Process ── */}
			<div className="section-divider" />
			<section
				id="process"
				className="py-24 px-6"
				style={{ background: "var(--section-process-bg)" }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<div className="section-label mb-4">Process</div>
						<h2
							className="text-4xl md:text-5xl font-semibold mb-6 roboto_condensed mt-4"
							style={{ color: "var(--text-primary)" }}
						>
							A simple process that keeps the work clear and the results strong.
						</h2>
						<p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-secondary)" }}>
							Good work feels easier when the process makes sense. We keep each
							stage clear so decisions are easier and the final result feels well
							thought through.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
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
						].map((item, index) => (
							<div
								key={index}
								className="group relative rounded-2xl p-8 border card-glow"
								style={{
									background: "var(--bg-process-card)",
									borderColor: "var(--border-soft)",
								}}
							>
								<div
									className="absolute top-6 right-6 text-6xl font-bold select-none transition-colors duration-300"
									style={{ color: "var(--glow-accent)" }}
								>
									{item.step}
								</div>
								<div
									className="text-sm uppercase tracking-[0.18em] mb-4 relative z-10"
									style={{ color: "var(--text-muted)" }}
								>
									Step {item.step}
								</div>
								<h3
									className="text-xl font-semibold mb-3 relative z-10 roboto_condensed"
									style={{ color: "var(--text-primary)" }}
								>
									{item.title}
								</h3>
								<p className="leading-relaxed relative z-10" style={{ color: "var(--text-secondary)" }}>
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA band ── */}
			<section
				className="relative py-24 px-6 text-white overflow-hidden"
				style={{ background: "var(--cta-band-bg)" }}
			>
				{/* Inner atmospheric glow */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(43,94,168,0.22), transparent 65%)" }}
				/>
				<div className="relative z-10 max-w-4xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-semibold mb-6 roboto_condensed text-white">
						Ready to give your business a stronger online presence?
					</h2>
					<p className="text-xl mb-10 text-blue-100/80 leading-relaxed max-w-2xl mx-auto">
						If your website or brand no longer reflects the quality of your
						business, this is a good time to fix that and move forward with
						confidence.
					</p>
					<a
						href="#contact"
						className="inline-flex items-center bg-white text-[#183a68] px-10 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-950/40 transition-all text-lg"
					>
						Start the Conversation
					</a>
				</div>
			</section>

			{/* ── Contact ── */}
			<div className="section-divider" />
			<section
				id="contact"
				className="py-24 px-6"
				style={{ background: "var(--bg-contact)" }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<div className="section-label mb-4">Contact</div>
						<h2
							className="text-4xl md:text-5xl font-semibold mb-6 roboto_condensed mt-4"
							style={{ color: "var(--text-primary)" }}
						>
							Tell us what you need, and let&apos;s talk about the right next step.
						</h2>
						<p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-secondary)" }}>
							Share a bit about your business, what you need help with, and any
							timing or budget details that matter to you.
						</p>
					</div>

					<div className="grid lg:grid-cols-5 gap-12">
						<div className="lg:col-span-2 space-y-6">
							{[
								{ label: "Email", value: "mavericktech750@gmail.com" },
								{ label: "Phone", value: "+256 770 302 731 / +256 745496783" },
								{ label: "Location", value: "Kampala, Uganda" },
							].map((item) => (
								<div key={item.label} className="surface-panel rounded-2xl p-6">
									<div
										className="text-sm uppercase tracking-[0.18em] mb-2"
										style={{ color: "var(--text-muted)" }}
									>
										{item.label}
									</div>
									<div style={{ color: "var(--text-secondary)" }}>{item.value}</div>
								</div>
							))}

							<div className="surface-panel rounded-2xl p-6">
								<div
									className="text-sm uppercase tracking-[0.18em] mb-2"
									style={{ color: "var(--text-muted)" }}
								>
									Response
								</div>
								<p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
									Most enquiries get a response within one business day, usually
									with a suggested call or a practical next step.
								</p>
							</div>
						</div>

						<div className="lg:col-span-3 rounded-2xl p-8 border surface-panel" style={{ borderColor: "var(--border-soft)" }}>
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label
											className="block text-sm font-bold mb-2"
											style={{ color: "var(--text-secondary)" }}
										>
											Full Name *
										</label>
										<input
											type="text"
											name="fullname"
											className="w-full border rounded-lg px-4 py-3 focus:outline-none transition"
											style={{
												background: "var(--bg-input)",
												borderColor: "var(--border-soft)",
												color: "var(--text-primary)",
											}}
											placeholder="John Doe"
											value={formData?.fullname || ""}
											onChange={onChange}
											onFocus={e => e.target.style.borderColor = "var(--accent-strong)"}
											onBlur={e => e.target.style.borderColor = "var(--border-soft)"}
										/>
									</div>
									<div>
										<label
											className="block text-sm font-bold mb-2"
											style={{ color: "var(--text-secondary)" }}
										>
											Email Address *
										</label>
										<input
											type="email"
											name="email"
											className="w-full border rounded-lg px-4 py-3 focus:outline-none transition"
											style={{
												background: "var(--bg-input)",
												borderColor: "var(--border-soft)",
												color: "var(--text-primary)",
											}}
											placeholder="john@company.com"
											value={formData?.email || ""}
											onChange={onChange}
											onFocus={e => e.target.style.borderColor = "var(--accent-strong)"}
											onBlur={e => e.target.style.borderColor = "var(--border-soft)"}
										/>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label
											className="block text-sm font-bold mb-2"
											style={{ color: "var(--text-secondary)" }}
										>
											Phone Number
										</label>
										<input
											type="tel"
											name="phone"
											className="w-full border rounded-lg px-4 py-3 focus:outline-none transition"
											style={{
												background: "var(--bg-input)",
												borderColor: "var(--border-soft)",
												color: "var(--text-primary)",
											}}
											placeholder="+256 XXX XXX XXX"
											value={formData?.phone || ""}
											onChange={onChange}
											onFocus={e => e.target.style.borderColor = "var(--accent-strong)"}
											onBlur={e => e.target.style.borderColor = "var(--border-soft)"}
										/>
									</div>
									<div>
										<label
											className="block text-sm font-bold mb-2"
											style={{ color: "var(--text-secondary)" }}
										>
											Service Required *
										</label>
										<select
											name="service"
											className="w-full border rounded-lg px-4 py-3 focus:outline-none transition"
											style={{
												background: "var(--bg-input)",
												borderColor: "var(--border-soft)",
												color: "var(--text-primary)",
											}}
											value={formData?.service || "--- select ---"}
											onChange={onChange}
											onFocus={e => e.target.style.borderColor = "var(--accent-strong)"}
											onBlur={e => e.target.style.borderColor = "var(--border-soft)"}
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
									<label
										className="block text-sm font-bold mb-2"
										style={{ color: "var(--text-secondary)" }}
									>
										Project Budget
									</label>
									<select
										name="budget"
										className="w-full border rounded-lg px-4 py-3 focus:outline-none transition"
										style={{
											background: "var(--bg-input)",
											borderColor: "var(--border-soft)",
											color: "var(--text-primary)",
										}}
										value={formData?.budget || "--- select ---"}
										onChange={onChange}
										onFocus={e => e.target.style.borderColor = "var(--accent-strong)"}
										onBlur={e => e.target.style.borderColor = "var(--border-soft)"}
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
									<label
										className="block text-sm font-bold mb-2"
										style={{ color: "var(--text-secondary)" }}
									>
										Project Details *
									</label>
									<textarea
										name="details"
										rows="5"
										className="w-full border rounded-lg px-4 py-3 focus:outline-none transition"
										style={{
											background: "var(--bg-input)",
											borderColor: "var(--border-soft)",
											color: "var(--text-primary)",
										}}
										placeholder="Tell us about your business, what you need, and what success would look like..."
										value={formData?.details || ""}
										onChange={onChange}
										onFocus={e => e.target.style.borderColor = "var(--accent-strong)"}
										onBlur={e => e.target.style.borderColor = "var(--border-soft)"}
									></textarea>
								</div>

								<button
									type="submit"
									className="w-full accent-button px-8 py-4 rounded-lg font-semibold transition-all"
								>
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
