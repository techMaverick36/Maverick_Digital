import React, { useState } from "react";
import {
	FiMenu,
	FiX,
	FiExternalLink,
	FiArrowRight,
	FiCode,
	FiLayout,
	FiTrendingUp,
} from "react-icons/fi";
import { BsPalette, BsLightning } from "react-icons/bs";
import {
	AiOutlineInstagram,
	AiOutlineLinkedin,
	AiOutlineTwitter,
} from "react-icons/ai";
import { projects } from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PortfolioPage() {
	const [activeFilter, setActiveFilter] = useState("all");

	const filters = [
		{ id: "all", label: "All Projects" },
		{ id: "web", label: "Web Design" },
		{ id: "branding", label: "Branding" },
		{ id: "uiux", label: "UI/UX" },
		{ id: "social", label: "Social Media" },
	];

	const filteredProjects =
		activeFilter === "all"
			? projects
			: projects.filter((p) => p.category === activeFilter);

	return (
		<div className="bg-white text-gray-900 min-h-screen montserrat">
			{/* Navigation */}
			<Navbar />

			{/* Hero Section */}
			<section className="relative pt-32 pb-16 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

				<div className="max-w-7xl mx-auto relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<div className="inline-block mb-6 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-600 text-sm font-medium raleway">
							🎨 Our Work
						</div>
						<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 raleway">
							Creative Projects That
							<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								{" "}
								Drive Results
							</span>
						</h1>
						<p className="text-xl text-gray-600 mb-8 leading-relaxed">
							Explore our diverse portfolio of successful projects across web
							design, branding, UI/UX, and digital marketing.
						</p>
					</div>
				</div>
			</section>

			{/* Filter Section */}
			<section className="py-8 px-6 bg-white border-b border-gray-200 sticky top-[73px] z-40">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-wrap gap-3 justify-center">
						{filters.map((filter) => (
							<button
								key={filter.id}
								onClick={() => setActiveFilter(filter.id)}
								className={`px-6 py-2 rounded-full font-medium transition ${
									activeFilter === filter.id
										? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{filter.label}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Portfolio Grid */}
			<section className="py-16 px-6 bg-gray-50">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredProjects.map((project, index) => (
							<div
								key={project.id}
								className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Project Image */}
								<div className="relative h-64 overflow-hidden">
									<div
										className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10 flex items-center justify-center`}
									>
										<div className="text-white text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-2xl font-bold mb-2 roboto_condensed">
												{project.title}
											</h3>
											<p className="text-sm opacity-90 mb-4">
												{project.description}
											</p>
											<a
												href={project.link}
												className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
											>
												View Project <FiExternalLink />
											</a>
										</div>
										a{" "}
									</div>
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
									/>
								</div>

								{/* Project Info */}
								<div className="p-6">
									<div className="flex flex-wrap gap-2 mb-3">
										{project.tags.map((tag, idx) => (
											<span
												key={idx}
												className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium"
											>
												{tag}
											</span>
										))}
									</div>
									<h3 className="text-xl font-bold mb-2 text-gray-900 roboto_condensed">
										{project.title}
									</h3>
									<p className="text-gray-600 text-sm mb-4 line-clamp-2">
										{project.description}
									</p>

									{/* Stats */}
									<div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
										<div>
											<div className="font-semibold text-gray-900">
												{Object.values(project.stats)[0]}
											</div>
											<div>{Object.keys(project.stats)[0]}</div>
										</div>
										<div className="text-right">
											<div className="font-semibold text-gray-900">
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

			{/* Stats Section */}
			<section className="py-20 px-6 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold mb-4 text-gray-900">
							Project Impact
						</h2>
						<p className="text-xl text-gray-600">
							Real results from our portfolio
						</p>
					</div>

					<div className="grid md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<FiCode className="text-white w-10 h-10" />
							</div>
							<div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
								4
							</div>
							<div className="text-gray-600">Projects Completed</div>
						</div>

						<div className="text-center">
							<div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<FiLayout className="text-white w-10 h-10" />
							</div>
							<div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
								35+
							</div>
							<div className="text-gray-600">Happy Clients</div>
						</div>

						<div className="text-center">
							<div className="bg-gradient-to-br from-pink-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<BsLightning className="text-white w-10 h-10" />
							</div>
							<div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
								98%
							</div>
							<div className="text-gray-600">Satisfaction Rate</div>
						</div>

						<div className="text-center">
							<div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<FiTrendingUp className="text-white w-10 h-10" />
							</div>
							<div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
								250%
							</div>
							<div className="text-gray-600">Avg. ROI Increase</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-6 bg-gray-50">
				<div className="max-w-4xl mx-auto text-center">
					<div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-12">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
							Let's Create Together
						</h2>
						<p className="text-xl text-gray-600 mb-8">
							Ready to bring your vision to life? Let's discuss your project and
							create something amazing.
						</p>
						<a
							href="#contact"
							className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition"
						>
							Start Your Project <FiArrowRight />
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
}
