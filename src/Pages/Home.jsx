import React, { useState, useEffect } from "react";
import {
	FiMenu,
	FiX,
	FiArrowRight,
	FiCode,
	FiLayout,
	FiUsers,
	FiTrendingUp,
	FiCheck,
	FiMail,
	FiPhone,
	FiMapPin,
	FiMonitor,
	FiZap,
	FiTarget,
} from "react-icons/fi";
import {
	BsLightning,
	BsPalette,
	BsShield,
	BsRocket,
	BsGraphUp,
	BsCpu,
} from "react-icons/bs";
import {
	AiOutlineInstagram,
	AiOutlineLinkedin,
	AiOutlineTwitter,
} from "react-icons/ai";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { testimonials } from "../utils/constants";
import emailjs from "@emailjs/browser";

const service_id = import.meta.env.VITE_SERVICE_ID;
const template_id = import.meta.env.VITE_TEMPLATE_ID;
const public_key = import.meta.env.VITE_PUBLIC_KEY;

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

		// basic required-field validation
		if (!fullname?.trim() || !email?.trim() || !details?.trim()) {
			alert("Please fill in Full Name, Email and Project Details.");
			return;
		}

		console.log("Form submitted:", formData);
		alert(
			"Thank you for your inquiry! Our team will get back to you within 24 hours."
		);

		// prepare template parameters for EmailJS
		const templateParams = {
			fullname,
			email,
			phone,
			service,
			budget,
			details,
		};

		// send using emailjs.send with template params, then reset form on success
		emailjs.send(service_id, template_id, templateParams, public_key).then(
			(response) => {
				console.log("SUCCESS!", response.status);
				// reset form to sensible defaults after successful send
				setFormData({
					fullname: "",
					email: "",
					phone: "",
					service: "Web Design & Development",
					budget: "Under $500",
					details: "",
				});
			},
			(error) => {
				console.log("FAILED...", error);
				alert("Failed to send message. Please try again later.");
			}
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-white text-gray-900 min-h-screen montserrat">
			{/* Navigation */}
			<Navbar />
			{/* Hero Section */}
			<Hero />
			{/* Services Section */}
			<Services />
			<style>
				{`
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
`}
			</style>
			{/* Why Choose Us */}
			<section
				id="about"
				className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50"
			>
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						{/* ---- LEFT SIDE CONTENT ---- */}
						<div>
							<div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 raleway">
								Why Maverick Digital Hub
							</div>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 roboto-condensed">
								Your Strategic Partner in Digital Innovation
							</h2>
							<p className="text-lg text-gray-600 mb-10 leading-relaxed">
								We combine technical excellence with strategic thinking to
								deliver solutions that don't just meet expectations, they exceed
								them. Our team of specialists brings deep expertise across
								design, development, and digital marketing.
							</p>

							<div className="space-y-6">
								<div className="flex gap-5 group">
									<div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl h-fit shadow-lg group-hover:shadow-xl transition-shadow">
										<BsRocket className="text-white w-6 h-6" />
									</div>
									<div>
										<h3 className="text-xl font-bold mb-2 text-gray-900 roboto-condensed">
											Cutting-Edge Technology
										</h3>
										<p className="text-gray-600 leading-relaxed">
											We leverage the latest frameworks and tools to build
											scalable, future-proof solutions.
										</p>
									</div>
								</div>

								<div className="flex gap-5 group">
									<div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl h-fit shadow-lg group-hover:shadow-xl transition-shadow">
										<FiUsers className="text-white w-6 h-6" />
									</div>
									<div>
										<h3 className="text-xl font-bold mb-2 text-gray-900 roboto-condensed">
											Collaborative Approach
										</h3>
										<p className="text-gray-600 leading-relaxed">
											We work as an extension of your team, ensuring alignment
											at every stage.
										</p>
									</div>
								</div>

								<div className="flex gap-5 group">
									<div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-xl h-fit shadow-lg group-hover:shadow-xl transition-shadow">
										<BsShield className="text-white w-6 h-6" />
									</div>
									<div>
										<h3 className="text-xl font-bold mb-2 text-gray-900 roboto-condensed">
											Proven Results
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Our track record speaks for itself—98% client satisfaction
											and 150+ successful projects.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* ---- RIGHT SIDE — TESTIMONIAL WITH IMAGE BEHIND ---- */}
						<div className="relative z-0">
							{/* Floating Image Behind Card */}
							<div className="absolute -right-10 -top-80 hidden md:block -z-10">
								<div className="w-[350px] h-[400px] hero-float relative">
									<div className="absolute inset-0 bg-blue-700/20 blur-3xl rounded-3xl opacity-60"></div>
									<img
										src="./person3.png"
										alt="portrait"
										className="relative w-[350] h-[500px] object-cover rounded-3xl shadow-2xl shadow-blue-900/10"
									/>
								</div>
							</div>

							{/* Testimonial Card */}
							<div className="relative z-10 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-2xl">
								<div className="space-y-6 relative h-[150px]">
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
												<div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
													{testimonial.avatar}
												</div>
												<div>
													<div className="font-bold text-gray-900">
														{testimonial.name}
													</div>
													<div className="text-sm text-gray-600">
														{testimonial.role}
													</div>
												</div>
											</div>
											<p className="text-gray-700 leading-relaxed italic">
												"{testimonial.content}"
											</p>
										</div>
									))}
								</div>

								{/* Navigation Dots */}
								<div className="flex gap-2 mt-6 justify-center">
									{testimonials.map((_, index) => (
										<button
											key={index}
											onClick={() => setActiveTestimonial(index)}
											className={`w-2 h-2 rounded-full transition-all ${
												activeTestimonial === index
													? "bg-blue-600 w-8"
													: "bg-gray-300"
											}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Process Section */}
			<section id="process" className="py-24 px-6 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4 raleway">
							Our Methodology
						</div>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 roboto-condensed">
							A Proven Process That Delivers
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							From discovery to deployment, our structured approach ensures
							every project is executed flawlessly.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								step: "01",
								title: "Discovery & Strategy",
								desc: "Deep dive into your business goals, target audience, and competitive landscape.",
								icon: <FiTarget />,
							},
							{
								step: "02",
								title: "Design & Planning",
								desc: "Create wireframes, prototypes, and comprehensive project roadmaps.",
								icon: <FiLayout />,
							},
							{
								step: "03",
								title: "Development",
								desc: "Build with clean, scalable code using industry best practices.",
								icon: <FiCode />,
							},
							{
								step: "04",
								title: "Testing & QA",
								desc: "Rigorous testing across devices, browsers, and use cases.",
								icon: <BsShield />,
							},
							{
								step: "05",
								title: "Launch & Deploy",
								desc: "Seamless deployment with monitoring and performance optimization.",
								icon: <BsRocket />,
							},
							{
								step: "06",
								title: "Support & Growth",
								desc: "Ongoing maintenance, updates, and strategic enhancements.",
								icon: <FiTrendingUp />,
							},
						].map((item, index) => (
							<div
								key={index}
								className="group relative bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
							>
								<div className="absolute top-6 right-6 text-6xl font-bold text-blue-100 group-hover:text-blue-200 transition-colors">
									{item.step}
								</div>
								<div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-blue-600 shadow-md group-hover:scale-110 transition-transform">
									{React.cloneElement(item.icon, { className: "w-6 h-6" })}
								</div>
								<h3 className="text-xl font-bold mb-3 text-gray-900 relative z-10 roboto-condensed">
									{item.title}
								</h3>
								<p className="text-gray-600 leading-relaxed relative z-10">
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* CTA Section */}
			<section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-6 roboto-condensed">
						Ready to Transform Your Digital Presence?
					</h2>
					<p className="text-xl mb-10 opacity-90 leading-relaxed">
						Let's discuss how we can help you achieve your business goals.
						Schedule a free consultation with our team.
					</p>
					<a
						href="#contact"
						className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg"
					>
						Get Started Today
						<FiArrowRight />
					</a>
				</div>
			</section>
			{/* Contact Section */}
			<section id="contact" className="py-24 px-6 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
							Get In Touch
						</div>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 roboto-condensed">
							Let's Start a Conversation
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Have a project in mind? We'd love to hear about it. Reach out and
							we'll respond within 24 hours.
						</p>
					</div>

					<div className="grid lg:grid-cols-5 gap-12">
						<div className="lg:col-span-2 space-y-8">
							<div className="flex items-start gap-4 group">
								<div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-600 transition-colors">
									<FiMail className="text-blue-600 group-hover:text-white w-6 h-6 transition-colors" />
								</div>
								<div>
									<div className="font-bold text-gray-900 mb-1 roboto-condensed">
										Email Us
									</div>
									<div className="text-gray-600">mavericktech750@gmail.com</div>
								</div>
							</div>

							<div className="flex items-start gap-4 group">
								<div className="bg-purple-100 p-4 rounded-xl group-hover:bg-purple-600 transition-colors">
									<FiPhone className="text-purple-600 group-hover:text-white w-6 h-6 transition-colors" />
								</div>
								<div>
									<div className="font-bold text-gray-900 mb-1 roboto-condensed">
										Call Us
									</div>
									<div className="text-gray-600">
										+256 770 302 731 / +256 745496783
									</div>
								</div>
							</div>

							<div className="flex items-start gap-4 group">
								<div className="bg-pink-100 p-4 rounded-xl group-hover:bg-pink-600 transition-colors">
									<FiMapPin className="text-pink-600 group-hover:text-white w-6 h-6 transition-colors" />
								</div>
								<div>
									<div className="font-bold text-gray-900 mb-1 roboto-condensed">
										Visit Us
									</div>
									<div className="text-gray-600">Kampala, Uganda</div>
								</div>
							</div>

							<div className="flex gap-4 pt-6">
								<a
									href="#"
									className="bg-gray-100 p-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all group"
								>
									<AiOutlineLinkedin className="w-6 h-6" />
								</a>
								<a
									href="#"
									className="bg-gray-100 p-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all group"
								>
									<AiOutlineTwitter className="w-6 h-6" />
								</a>
								<a
									href="#"
									className="bg-gray-100 p-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all group"
								>
									<AiOutlineInstagram className="w-6 h-6" />
								</a>
							</div>
							<div className=" right-10 top-20 hidden md:block pointer-events-none">
								<div className=" w-[380px] h-[500px] hero-float group animate-[float_6s_ease-in-out_infinite]">
									{/* Glow backdrop */}
									<div className="  inset-0 bg-blue-600/30 blur-3xl rounded-3xl opacity-70 group-hover:opacity-90 transition-all"></div>

									<img
										src="./person5.png"
										alt="portrait"
										className="relative w-full object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,60,255,0.15)] group-hover:shadow-[0_25px_80px_rgba(0,60,255,0.25)] transition-transform duration-700 group-hover:scale-[1.03]"
									/>
								</div>
							</div>
						</div>

						<div className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-8 shadow-xl">
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-bold mb-2 text-gray-900">
											Full Name *
										</label>
										<input
											type="text"
											name="fullname"
											className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition text-gray-900"
											placeholder="John Doe"
											value={formData?.fullname || ""}
											onChange={onChange}
										/>
									</div>
									<div>
										<label className="block text-sm font-bold mb-2 text-gray-900">
											Email Address *
										</label>
										<input
											type="email"
											name="email"
											className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition text-gray-900"
											placeholder="john@company.com"
											value={formData?.email || ""}
											onChange={onChange}
										/>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-bold mb-2 text-gray-900">
											Phone Number
										</label>
										<input
											type="tel"
											name="phone"
											className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition text-gray-900"
											placeholder="+256 XXX XXX XXX"
											value={formData?.phone || ""}
											onChange={onChange}
										/>
									</div>
									<div>
										<label className="block text-sm font-bold mb-2 text-gray-900">
											Service Required *
										</label>
										<select
											name="service"
											className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition text-gray-900"
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
									<label className="block text-sm font-bold mb-2 text-gray-900">
										Project Budget
									</label>
									<select
										name="budget"
										className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition text-gray-900"
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
									<label className="block text-sm font-bold mb-2 text-gray-900">
										Project Details *
									</label>
									<textarea
										name="details"
										rows="5"
										className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-600 focus:outline-none transition text-gray-900"
										placeholder="Tell us about your project, goals, and timeline..."
										value={formData?.details || ""}
										onChange={onChange}
									></textarea>
								</div>

								<button
									type="submit"
									className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
								>
									Send Message
									<FiArrowRight className="group-hover:translate-x-1 transition-transform" />
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
			{/* Footer */}
			<Footer />
		</div>
	);
}
