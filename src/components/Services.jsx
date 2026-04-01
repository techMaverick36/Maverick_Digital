import { useState } from "react";
import { services, techStack } from "../utils/constants";

const tabs = ["Services", "Technologies", "Industries"];

const industries = [
	"E-Commerce & Retail",
	"Finance & Banking",
	"Healthcare",
	"Real Estate",
	"Education & Training",
	"Logistics & Forwarding",
	"Hospitality & Tourism",
	"Public Sector & NGOs",
	"Manufacturing",
];

const cardGradients = [
	"from-[#1b2430] to-[#151a21]",
	"from-[#1d2734] to-[#171c23]",
	"from-[#1c2330] to-[#161b21]",
	"from-[#202938] to-[#161a20]",
	"from-[#1a2230] to-[#151a1f]",
	"from-[#1c2635] to-[#171c22]",
];

const Services = () => {
	const [activeTab, setActiveTab] = useState("Services");

	return (
		<>
			<div className="section-divider" />
			<section
				id="services"
				className="py-24 px-6"
				style={{ background: "linear-gradient(160deg, #17202c 0%, #131820 100%)" }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
						<div className="md:w-1/2">
							<span className="section-label mb-5">Services</span>
							<h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight roboto_condensed text-balance mt-5">
								Services that help your business look better, work better, and
								reach more people.
							</h2>
						</div>
						<div className="md:w-1/2 flex items-center">
							<div className="border-l-2 border-(--border-strong) pl-5">
								<p className="text-(--text-secondary) text-base leading-relaxed">
									Whether you need a stronger website, clearer branding, or
									better digital support, we focus on work that makes your
									business easier to trust and easier to choose.
								</p>
							</div>
						</div>
					</div>

					<div className="flex gap-8 border-b border-white/10 mb-10">
						{tabs.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`pb-3 text-sm font-semibold tracking-wide transition-all relative ${
									activeTab === tab
										? "text-white"
										: "text-slate-500 hover:text-slate-300"
								}`}
							>
								{tab}
								{activeTab === tab && (
									<span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--accent-strong) rounded-full shadow-[0_0_8px_rgba(43,94,168,0.6)]" />
								)}
							</button>
						))}
					</div>

					{activeTab === "Services" && (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
							{services.map((service, index) => (
								<div
									key={index}
									className="group relative rounded-2xl overflow-hidden border border-(--border-soft) card-glow"
									style={{ minHeight: "320px" }}
								>
									<div
										className={`absolute inset-0 bg-linear-to-br ${cardGradients[index % cardGradients.length]} opacity-95`}
									/>
									{/* Top accent bar */}
									<div className="absolute top-0 left-0 w-16 h-0.5 bg-linear-to-r from-(--accent-strong) to-transparent" />
									{/* Hover inner glow */}
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
										style={{ background: "radial-gradient(ellipse at top left, rgba(33,74,132,0.1), transparent 65%)" }}
									/>

									<div className="relative z-10 p-7 h-full flex flex-col justify-between">
										<div>
											<div className="text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-4">
												{service.eyebrow}
											</div>
											<h3 className="text-xl font-semibold text-white mb-3 leading-snug raleway">
												{service.title}
											</h3>
											<p className="text-(--text-secondary) text-sm leading-relaxed">
												{service.description}
											</p>
										</div>

										<div>
											<ul className="mt-6 space-y-2 text-sm text-(--text-secondary)">
												{service.features.map((feature) => (
													<li key={feature} className="border-t border-white/6 pt-2">
														{feature}
													</li>
												))}
											</ul>
											<div className="mt-6 text-sm font-semibold text-[#a8c0ea]">
												Let&apos;s shape the right scope for your business.
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					{activeTab === "Technologies" && (
						<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
							{techStack.map((tech, i) => (
								<div
									key={i}
									className="flex flex-col items-center justify-center py-5 px-3 rounded-xl border border-(--border-soft) hover:border-(--border-strong) hover:shadow-[0_4px_20px_rgba(33,74,132,0.18)] transition-all duration-300 cursor-default"
									style={{ background: "var(--bg-elevated)" }}
								>
									<span className="text-white text-sm font-semibold text-center">{tech}</span>
								</div>
							))}
						</div>
					)}

					{activeTab === "Industries" && (
						<div className="grid md:grid-cols-3 gap-5">
							{industries.map((industry) => (
								<div
									key={industry}
									className="px-6 py-5 rounded-xl border border-(--border-soft) hover:border-(--border-strong) hover:shadow-[0_4px_20px_rgba(33,74,132,0.18)] transition-all duration-300"
									style={{ background: "var(--bg-elevated)" }}
								>
									<span className="text-white font-semibold">{industry}</span>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Services;
