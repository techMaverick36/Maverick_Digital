import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiSearch, FiPenTool, FiSmartphone, FiRefreshCw } from "react-icons/fi";
import { projects } from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

const approach = [
	{
		icon: FiSearch,
		title: "Structured discovery",
		copy: "We define the scope before design and development begin.",
	},
	{
		icon: FiPenTool,
		title: "Clear visual standards",
		copy: "Every design choice is shaped to make the business feel clear, credible, and consistent.",
	},
	{
		icon: FiSmartphone,
		title: "Responsive delivery",
		copy: "The final result is reviewed across devices so it feels smooth and polished wherever people see it.",
	},
	{
		icon: FiRefreshCw,
		title: "Support after launch",
		copy: "When needed, we keep improving the work so it continues to support the business well.",
	},
];

export default function PortfolioPage() {
	const [activeFilter, setActiveFilter] = useState("all");

	const filters = [
		{ id: "all", label: "All Projects" },
		{ id: "web", label: "Web Design" },
	];

	const filteredProjects =
		activeFilter === "all"
			? projects
			: projects.filter((p) => p.category === activeFilter);

	return (
		<div className="theme-shell min-h-screen" style={{ color: "var(--text-primary)" }}>
			<Seo
				title="Portfolio"
				description="Explore Maverick Digital Hub portfolio projects in web design and digital delivery for businesses that want a clearer, more credible online presence."
				path="/portfolio"
			/>
			<Navbar />

			{/* ── Page hero ── */}
			<section className="relative pt-36 pb-16 px-6 overflow-hidden">
				<div
					className="float-slow absolute -top-20 left-10 w-80 h-80 rounded-full blur-[110px] pointer-events-none"
					style={{ background: "var(--orb-1)" }}
				/>
				<div
					className="float-slower absolute top-10 -right-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
					style={{ background: "var(--orb-2)" }}
				/>

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="max-w-4xl">
						<span className="section-label animate-fade-up">Selected work</span>
						<h1
							className="display animate-fade-up-1 mt-6 mb-6 text-5xl md:text-7xl font-bold leading-[1.05] text-balance"
							style={{ color: "var(--text-primary)" }}
						>
							Work made to help businesses{" "}
							<span className="grad-text">show up better.</span>
						</h1>
						<p className="animate-fade-up-2 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
							These projects show how thoughtful design and clear communication
							can help a business feel more credible, more polished, and easier
							to trust.
						</p>
					</div>
				</div>
			</section>

			{/* ── Filters ── */}
			<section className="px-6 pb-4">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-wrap gap-3">
						{filters.map((filter) => (
							<button
								key={filter.id}
								onClick={() => setActiveFilter(filter.id)}
								className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer ${
									activeFilter === filter.id ? "btn-primary" : "btn-ghost"
								}`}
							>
								{filter.label}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* ── Projects grid ── */}
			<section className="py-12 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-2 gap-8">
						{filteredProjects.map((project, index) => (
							<Reveal key={project.id} delay={(index % 2) * 90}>
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="group block rounded-[2rem] overflow-hidden border card-lift"
									style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
								>
									<div className="relative h-72 md:h-80 overflow-hidden">
										<img
											src={project.image}
											alt={project.title}
											loading="lazy"
											className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
										/>
										<div
											className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
											style={{ background: "linear-gradient(to top, rgba(10,10,20,0.55), transparent 55%)" }}
											aria-hidden="true"
										/>
										<span
											className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0b1e33] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
											aria-hidden="true"
										>
											<FiArrowUpRight size={20} />
										</span>
									</div>

									<div className="p-7">
										<div className="flex flex-wrap gap-2 mb-4">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="text-xs px-3 py-1.5 rounded-full font-medium"
													style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}
												>
													{tag}
												</span>
											))}
										</div>
										<h3 className="display text-2xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
											{project.title}
										</h3>
										<p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
											{project.description}
										</p>

										<div
											className="flex items-center gap-8 text-xs pt-5 border-t"
											style={{ color: "var(--text-muted)", borderColor: "var(--border-soft)" }}
										>
											<div>
												<div className="display text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
													{Object.values(project.stats)[0]}
												</div>
												<div className="capitalize">{Object.keys(project.stats)[0]}</div>
											</div>
											<div>
												<div className="display text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
													{Object.values(project.stats)[2]}
												</div>
												<div className="capitalize">{Object.keys(project.stats)[2]}</div>
											</div>
										</div>
									</div>
								</a>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ── Approach ── */}
			<section className="py-24 px-6" style={{ background: "var(--bg-elevated)" }}>
				<div className="max-w-7xl mx-auto">
					<Reveal>
						<div className="max-w-3xl mb-14">
							<span className="section-label">Working approach</span>
							<h2
								className="display mt-5 mb-4 text-4xl md:text-5xl font-bold leading-tight text-balance"
								style={{ color: "var(--text-primary)" }}
							>
								Work that looks good <span className="grad-text">and works hard.</span>
							</h2>
							<p className="text-lg" style={{ color: "var(--text-secondary)" }}>
								We care about work that not only looks good, but also represents
								the client well and supports real business goals.
							</p>
						</div>
					</Reveal>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
						{approach.map((item, i) => (
							<Reveal key={item.title} delay={i * 80}>
								<div
									className="h-full rounded-3xl border p-7 card-lift"
									style={{ background: "var(--bg-base)", borderColor: "var(--border-soft)" }}
								>
									<div
										className="flex h-11 w-11 items-center justify-center rounded-2xl mb-5"
										style={{ background: "var(--tag-bg)", color: "var(--accent-text)" }}
									>
										<item.icon size={19} />
									</div>
									<h3 className="display text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
										{item.title}
									</h3>
									<p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
										{item.copy}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA ── */}
			<section className="py-24 px-6" style={{ background: "var(--bg-base)" }}>
				<Reveal>
					<div className="max-w-4xl mx-auto">
						<div
							className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 text-center"
							style={{ background: "var(--cta-band-bg)" }}
						>
							<div
								className="float-slow absolute -top-20 -right-16 h-64 w-64 rounded-full blur-[90px] bg-white/10 pointer-events-none"
								aria-hidden="true"
							/>
							<h2 className="display relative z-10 text-3xl md:text-5xl font-bold mb-5 text-white text-balance">
								Want your business to feel this polished online?
							</h2>
							<p className="relative z-10 text-lg mb-9 text-white/75 max-w-2xl mx-auto leading-relaxed">
								We can help you shape the brief, define the scope, and create
								something that makes a strong first impression.
							</p>
							<Link
								to="/#contact"
								className="group relative z-10 inline-flex items-center gap-2.5 bg-white text-[#0b1e33] px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5"
							>
								Start Your Project
								<FiArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
							</Link>
						</div>
					</div>
				</Reveal>
			</section>

			<Footer />
		</div>
	);
}
