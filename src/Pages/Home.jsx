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
		<div className="text-white min-h-screen montserrat theme-shell">
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
				style={{ background: "linear-gradient(180deg, #141920 0%, #161c24 100%)" }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<div className="section-label mb-6">Why Maverick</div>
							<h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white roboto_condensed text-balance mt-4">
								The right fit if you want your business to feel more polished,
								clear, and credible online.
							</h2>
							<p className="text-lg text-(--text-secondary) mb-10 leading-relaxed">
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
										<h3 className="text-xl font-semibold mb-2 text-white roboto_condensed">
											{item.title}
										</h3>
										<p className="text-(--text-secondary) leading-relaxed">
											{item.copy}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className="relative z-0">
							<div className="relative z-10 rounded-2xl p-8 border border-(--border-soft) shadow-2xl surface-panel">
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
												<div className="w-14 h-14 bg-(--accent-gradient) rounded-full flex items-center justify-center text-white font-semibold text-lg"
													style={{ background: "var(--accent-gradient)" }}
												>
													{testimonial.avatar}
												</div>
												<div>
													<div className="font-bold text-white">{testimonial.name}</div>
													<div className="text-sm text-(--text-muted)">
														{testimonial.role}
													</div>
												</div>
											</div>
											<p className="text-(--text-secondary) leading-relaxed italic">
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
											className={`h-2 rounded-full transition-all duration-300 ${
												activeTestimonial === index
													? "bg-(--accent-strong) w-8"
													: "bg-slate-600 w-2"
											}`}
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
				style={{ background: "linear-gradient(160deg, #181e28 0%, #141920 100%)" }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<div className="section-label mb-4">Process</div>
						<h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white roboto_condensed mt-4">
							A simple process that keeps the work clear and the results strong.
						</h2>
						<p className="text-xl text-(--text-secondary) max-w-3xl mx-auto">
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
								className="group relative rounded-2xl p-8 border border-(--border-soft) card-glow"
								style={{ background: "#1d232c" }}
							>
								<div
									className="absolute top-6 right-6 text-6xl font-bold select-none transition-colors duration-300 group-hover:text-[rgba(59,130,246,0.12)]"
									style={{ color: "rgba(59,130,246,0.07)" }}
								>
									{item.step}
								</div>
								<div className="text-sm uppercase tracking-[0.18em] text-(--text-muted) mb-4 relative z-10">
									Step {item.step}
								</div>
								<h3 className="text-xl font-semibold mb-3 text-white relative z-10 roboto_condensed">
									{item.title}
								</h3>
								<p className="text-(--text-secondary) leading-relaxed relative z-10">
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
				style={{ background: "linear-gradient(135deg, #18202a 0%, #1c2a3e 40%, #1e4a8a 100%)" }}
			>
				{/* Inner atmospheric glow */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(43,94,168,0.22), transparent 65%)" }}
				/>
				<div className="relative z-10 max-w-4xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-semibold mb-6 roboto_condensed">
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
						<h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white roboto_condensed mt-4">
							Tell us what you need, and let&apos;s talk about the right next step.
						</h2>
						<p className="text-xl text-(--text-secondary) max-w-3xl mx-auto">
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
									<div className="text-sm uppercase tracking-[0.18em] text-(--text-muted) mb-2">
										{item.label}
									</div>
									<div className="text-(--text-secondary)">{item.value}</div>
								</div>
							))}

							<div className="surface-panel rounded-2xl p-6">
								<div className="text-sm uppercase tracking-[0.18em] text-(--text-muted) mb-2">
									Response
								</div>
								<p className="text-(--text-secondary) leading-relaxed">
									Most enquiries get a response within one business day, usually
									with a suggested call or a practical next step.
								</p>
							</div>
						</div>

						<div className="lg:col-span-3 rounded-2xl p-8 border border-(--border-soft) surface-panel">
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-bold mb-2 text-slate-300">Full Name *</label>
										<input
											type="text"
											name="fullname"
											className="w-full border border-(--border-soft) rounded-lg px-4 py-3 focus:border-(--accent-strong) focus:outline-none transition text-white placeholder-slate-500"
											style={{ background: "#0e151e" }}
											placeholder="John Doe"
											value={formData?.fullname || ""}
											onChange={onChange}
										/>
									</div>
									<div>
										<label className="block text-sm font-bold mb-2 text-slate-300">Email Address *</label>
										<input
											type="email"
											name="email"
											className="w-full border border-(--border-soft) rounded-lg px-4 py-3 focus:border-(--accent-strong) focus:outline-none transition text-white placeholder-slate-500"
											style={{ background: "#0e151e" }}
											placeholder="john@company.com"
											value={formData?.email || ""}
											onChange={onChange}
										/>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-bold mb-2 text-slate-300">Phone Number</label>
										<input
											type="tel"
											name="phone"
											className="w-full border border-(--border-soft) rounded-lg px-4 py-3 focus:border-(--accent-strong) focus:outline-none transition text-white placeholder-slate-500"
											style={{ background: "#0e151e" }}
											placeholder="+256 XXX XXX XXX"
											value={formData?.phone || ""}
											onChange={onChange}
										/>
									</div>
									<div>
										<label className="block text-sm font-bold mb-2 text-slate-300">Service Required *</label>
										<select
											name="service"
											className="w-full border border-(--border-soft) rounded-lg px-4 py-3 focus:border-(--accent-strong) focus:outline-none transition text-white"
											style={{ background: "#0e151e" }}
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
									<label className="block text-sm font-bold mb-2 text-slate-300">Project Budget</label>
									<select
										name="budget"
										className="w-full border border-(--border-soft) rounded-lg px-4 py-3 focus:border-(--accent-strong) focus:outline-none transition text-white"
										style={{ background: "#0e151e" }}
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
									<label className="block text-sm font-bold mb-2 text-slate-300">Project Details *</label>
									<textarea
										name="details"
										rows="5"
										className="w-full border border-(--border-soft) rounded-lg px-4 py-3 focus:border-(--accent-strong) focus:outline-none transition text-white placeholder-slate-500"
										style={{ background: "#0e151e" }}
										placeholder="Tell us about your business, what you need, and what success would look like..."
										value={formData?.details || ""}
										onChange={onChange}
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

			{/* ── Contact → Footer transition ── */}
			<div
				className="h-20 pointer-events-none"
				style={{
					background: "linear-gradient(to bottom, var(--bg-contact) 0%, var(--bg-footer) 100%)",
				}}
			/>

			<Footer />
		</div>
	);
}
