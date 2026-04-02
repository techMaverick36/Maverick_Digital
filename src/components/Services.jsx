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

const cardGradientVars = [
	"var(--card-grad-0)",
	"var(--card-grad-1)",
	"var(--card-grad-2)",
	"var(--card-grad-3)",
	"var(--card-grad-4)",
	"var(--card-grad-5)",
];

const Services = () => {
	const [activeTab, setActiveTab] = useState("Services");

	return (
		<>
			<div className="section-divider" />
			<section
				id="services"
				className="py-24 px-6"
				style={{ background: "var(--section-services-bg)" }}
			>
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
						<div className="md:w-1/2">
							<span className="section-label mb-5">Services</span>
							<h2
								className="text-4xl md:text-5xl font-semibold leading-tight roboto_condensed text-balance mt-5"
								style={{ color: "var(--text-primary)" }}
							>
								Services that help your business look better, work better, and
								reach more people.
							</h2>
						</div>
						<div className="md:w-1/2 flex items-center">
							<div className="border-l-2 pl-5" style={{ borderColor: "var(--border-strong)" }}>
								<p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
									Whether you need a stronger website, clearer branding, or
									better digital support, we focus on work that makes your
									business easier to trust and easier to choose.
								</p>
							</div>
						</div>
					</div>

					<div className="flex gap-8 border-b mb-10" style={{ borderColor: "var(--tab-border)" }}>
						{tabs.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className="pb-3 text-sm font-semibold tracking-wide transition-all relative"
								style={{ color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)" }}
							>
								{tab}
								{activeTab === tab && (
									<span
										className="absolute bottom-0 left-0 w-full h-0.5 rounded-full shadow-[0_0_8px_rgba(43,94,168,0.6)]"
										style={{ background: "var(--accent-strong)" }}
									/>
								)}
							</button>
						))}
					</div>

					{activeTab === "Services" && (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
							{services.map((service, index) => (
								<div
									key={index}
									className="group relative rounded-2xl overflow-hidden border card-glow"
									style={{
										minHeight: "320px",
										borderColor: "var(--border-soft)",
									}}
								>
									<div
										className="absolute inset-0 opacity-95"
										style={{ background: cardGradientVars[index % cardGradientVars.length] }}
									/>
									{/* Top accent bar */}
									<div
										className="absolute top-0 left-0 w-16 h-0.5"
										style={{ background: "linear-gradient(to right, var(--accent-strong), transparent)" }}
									/>
									{/* Hover inner glow */}
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
										style={{ background: "radial-gradient(ellipse at top left, var(--glow-accent), transparent 65%)" }}
									/>

									<div className="relative z-10 p-7 h-full flex flex-col justify-between">
										<div>
											<div
												className="text-xs uppercase tracking-[0.2em] mb-4"
												style={{ color: "var(--text-muted)" }}
											>
												{service.eyebrow}
											</div>
											<h3
												className="text-xl font-semibold mb-3 leading-snug raleway"
												style={{ color: "var(--text-primary)" }}
											>
												{service.title}
											</h3>
											<p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
												{service.description}
											</p>
										</div>

										<div>
											<ul className="mt-6 space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
												{service.features.map((feature) => (
													<li
														key={feature}
														className="border-t pt-2"
														style={{ borderColor: "var(--feature-border)" }}
													>
														{feature}
													</li>
												))}
											</ul>
											<div
												className="mt-6 text-sm font-semibold"
												style={{ color: "var(--accent-light-text)" }}
											>
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
									className="flex flex-col items-center justify-center py-5 px-3 rounded-xl border transition-all duration-300 cursor-default"
									style={{
										background: "var(--bg-elevated)",
										borderColor: "var(--border-soft)",
									}}
									onMouseEnter={e => {
										e.currentTarget.style.borderColor = "var(--border-strong)";
										e.currentTarget.style.boxShadow = "0 4px 20px var(--glow-accent)";
									}}
									onMouseLeave={e => {
										e.currentTarget.style.borderColor = "var(--border-soft)";
										e.currentTarget.style.boxShadow = "none";
									}}
								>
									<span
										className="text-sm font-semibold text-center"
										style={{ color: "var(--text-primary)" }}
									>
										{tech}
									</span>
								</div>
							))}
						</div>
					)}

					{activeTab === "Industries" && (
						<div className="grid md:grid-cols-3 gap-5">
							{industries.map((industry) => (
								<div
									key={industry}
									className="px-6 py-5 rounded-xl border transition-all duration-300"
									style={{
										background: "var(--bg-elevated)",
										borderColor: "var(--border-soft)",
									}}
									onMouseEnter={e => {
										e.currentTarget.style.borderColor = "var(--border-strong)";
										e.currentTarget.style.boxShadow = "0 4px 20px var(--glow-accent)";
									}}
									onMouseLeave={e => {
										e.currentTarget.style.borderColor = "var(--border-soft)";
										e.currentTarget.style.boxShadow = "none";
									}}
								>
									<span className="font-semibold" style={{ color: "var(--text-primary)" }}>
										{industry}
									</span>
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
