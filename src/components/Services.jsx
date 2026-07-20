import { useState } from "react";
import {
	FiCode,
	FiServer,
	FiShare2,
	FiPenTool,
	FiLayout,
	FiBarChart2,
	FiCheck,
} from "react-icons/fi";
import { services, techStack } from "../utils/constants";
import Reveal from "./Reveal";

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

/* One icon per service, in the same order as utils/constants.jsx */
const serviceIcons = [FiCode, FiServer, FiShare2, FiPenTool, FiLayout, FiBarChart2];

const Services = () => {
	const [activeTab, setActiveTab] = useState("Services");

	return (
		<section id="services" className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
			<div className="max-w-7xl mx-auto">
				<Reveal>
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
						<div className="max-w-2xl">
							<span className="section-label">What we do</span>
							<h2
								className="display mt-5 text-4xl md:text-5xl font-bold leading-tight text-balance"
								style={{ color: "var(--text-primary)" }}
							>
								Services that make your business{" "}
								<span className="grad-text">easier to choose.</span>
							</h2>
						</div>
						<p className="max-w-md text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
							Whether you need a stronger website, clearer branding, or better
							digital support, we focus on work that builds trust and drives
							action.
						</p>
					</div>
				</Reveal>

				<Reveal delay={80}>
					<div className="flex gap-8 border-b mb-12" style={{ borderColor: "var(--border-soft)" }}>
						{tabs.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className="relative pb-3.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
								style={{ color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)" }}
							>
								{tab}
								{activeTab === tab && (
									<span
										className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
										style={{ background: "var(--accent-gradient)" }}
									/>
								)}
							</button>
						))}
					</div>
				</Reveal>

				{activeTab === "Services" && (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
						{services.map((service, index) => {
							const Icon = serviceIcons[index % serviceIcons.length];
							return (
								<Reveal key={service.title} delay={(index % 3) * 70}>
									<div
										className="group relative h-full rounded-3xl border p-7 card-lift overflow-hidden"
										style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
									>
										<div
											className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
											style={{ background: "var(--glow-accent)" }}
											aria-hidden="true"
										/>
										<div className="relative z-10 flex h-full flex-col">
											<div
												className="flex h-12 w-12 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
												style={{ background: "var(--accent-gradient)" }}
											>
												<Icon size={22} />
											</div>
											<h3 className="display mt-5 text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
												{service.title}
											</h3>
											<p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
												{service.description}
											</p>
											<ul className="mt-6 space-y-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
												{service.features.map((feature) => (
													<li key={feature} className="flex items-center gap-2.5">
														<FiCheck size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
														{feature}
													</li>
												))}
											</ul>
										</div>
									</div>
								</Reveal>
							);
						})}
					</div>
				)}

				{activeTab === "Technologies" && (
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
						{techStack.map((tech, i) => (
							<Reveal key={tech} delay={(i % 6) * 40}>
								<div
									className="flex items-center justify-center py-5 px-3 rounded-2xl border card-lift cursor-default"
									style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
								>
									<span className="text-sm font-semibold text-center" style={{ color: "var(--text-primary)" }}>
										{tech}
									</span>
								</div>
							</Reveal>
						))}
					</div>
				)}

				{activeTab === "Industries" && (
					<div className="grid md:grid-cols-3 gap-4">
						{industries.map((industry, i) => (
							<Reveal key={industry} delay={(i % 3) * 60}>
								<div
									className="px-6 py-5 rounded-2xl border card-lift"
									style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
								>
									<span className="font-semibold" style={{ color: "var(--text-primary)" }}>
										{industry}
									</span>
								</div>
							</Reveal>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Services;
