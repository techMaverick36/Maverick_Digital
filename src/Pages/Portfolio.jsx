import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

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
		<div className="theme-shell text-white min-h-screen montserrat">
			<Seo
				title="Portfolio"
				description="Explore Maverick Digital Hub portfolio projects in web design and digital delivery for businesses that want a clearer, more credible online presence."
				path="/portfolio"
			/>
			<Navbar />

			<section className="relative pt-32 pb-16 px-6 overflow-hidden">
				<div className="absolute top-20 left-10 w-72 h-72 bg-[rgba(33,74,132,0.18)] rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgba(33,74,132,0.12)] rounded-full blur-3xl"></div>

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<div className="section-label mb-6">Portfolio</div>
						<h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight text-white raleway text-balance">
							A look at the kind of work we create for businesses ready to show
							up better online.
						</h1>
						<p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
							These projects show how thoughtful design and clear communication
							can help a business feel more credible, more polished, and easier
							to trust.
						</p>
					</div>
				</div>
			</section>

			<section className="py-8 px-6 border-b border-[var(--border-soft)] sticky top-[73px] z-40 backdrop-blur-xl bg-[rgba(22,26,32,0.92)]">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-wrap gap-3 justify-center">
						{filters.map((filter) => (
							<button
								key={filter.id}
								onClick={() => setActiveFilter(filter.id)}
								className={`px-6 py-2 rounded-full font-medium transition border ${
									activeFilter === filter.id
										? "accent-button text-white shadow-lg border-[rgba(83,124,193,0.45)]"
										: "bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)] border-[var(--border-soft)] hover:bg-[rgba(33,74,132,0.08)]"
								}`}
							>
								{filter.label}
							</button>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredProjects.map((project, index) => (
							<div
								key={project.id}
								className="group rounded-2xl overflow-hidden border border-[var(--border-soft)] bg-[var(--bg-elevated)] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div className="relative h-64 overflow-hidden">
									<div
										className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-95 transition-opacity duration-500 z-10 flex items-center justify-center`}
									>
										<div className="text-white text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-2xl font-semibold mb-2 roboto_condensed">
												{project.title}
											</h3>
											<p className="text-sm opacity-90 mb-4">{project.description}</p>
											<a
												href={project.link}
												className="inline-flex items-center bg-white text-[#183a68] px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
											>
												View Project
											</a>
										</div>
									</div>
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
									/>
								</div>

								<div className="p-6">
									<div className="flex flex-wrap gap-2 mb-3">
										{project.tags.map((tag, idx) => (
											<span
												key={idx}
												className="text-xs px-3 py-1 bg-[rgba(33,74,132,0.12)] text-[#a8c0ea] rounded-full font-medium"
											>
												{tag}
											</span>
										))}
									</div>
									<h3 className="text-xl font-semibold mb-2 text-white roboto_condensed">
										{project.title}
									</h3>
									<p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
										{project.description}
									</p>

									<div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-4 border-t border-white/8">
										<div>
											<div className="font-semibold text-white">
												{Object.values(project.stats)[0]}
											</div>
											<div>{Object.keys(project.stats)[0]}</div>
										</div>
										<div className="text-right">
											<div className="font-semibold text-white">
												{Object.values(project.stats)[2]}
											</div>
											<div>{Object.keys(project.stats)[2]}</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 px-6 bg-[rgba(20,25,32,0.82)]">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-semibold mb-4 text-white">Working approach</h2>
						<p className="text-xl text-[var(--text-secondary)]">
							We care about work that not only looks good, but also represents
							the client well and supports real business goals.
						</p>
					</div>

					<div className="grid md:grid-cols-4 gap-8">
						{[
							{ title: "Structured discovery", copy: "We define the scope before design and development begin." },
							{ title: "Clear visual standards", copy: "Every design choice is shaped to make the business feel clear, credible, and consistent." },
							{ title: "Responsive delivery", copy: "The final result is reviewed across devices so it feels smooth and polished wherever people see it." },
							{ title: "Support after launch", copy: "When needed, we keep improving the work so it continues to support the business well." },
						].map((item) => (
							<div key={item.title} className="text-center surface-panel rounded-2xl p-8">
								<div className="text-2xl font-semibold text-[#a8c0ea] mb-3">
									{item.title}
								</div>
								<div className="text-[var(--text-secondary)] leading-7">
									{item.copy}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<div className="surface-panel rounded-3xl p-12">
						<h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
							Want your business to feel this polished online?
						</h2>
						<p className="text-xl text-[var(--text-secondary)] mb-8">
							We can help you shape the brief, define the scope, and create
							something that makes a strong first impression from the moment
							people land on your site.
						</p>
						<Link to="/#contact" className="inline-flex items-center accent-button px-8 py-4 rounded-full font-semibold transition">
							Start Your Project
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
