import React from "react";
import { stats, techStack } from "../utils/constants";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
	return (
		<section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-blue-100">
			{/* Background Glow */}
			<div className="absolute inset-0">
				<div className="absolute top-16 left-10 w-[28rem] h-[28rem] bg-blue-700/10 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-16 right-10 w-[32rem] h-[32rem] bg-indigo-700/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				></div>
			</div>

			{/* Floating Portrait */}

			{/* Tech Stack Floating Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{techStack.map((tech, index) => (
					<div
						key={index}
						className="absolute opacity-[0.10] hover:opacity-25 transition-opacity duration-300"
						style={{
							left: `${10 + ((index * 5.5) % 90)}%`,
							top: `${10 + ((index * 6) % 80)}%`,
							animation: `float ${25 + (index % 8)}s ease-in-out infinite`,
							animationDelay: `${index * 0.5}s`,
						}}
					>
						<div className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xl shadow-indigo-900/20 whitespace-nowrap">
							{tech}
						</div>
					</div>
				))}
			</div>

			{/* Hero Content */}
			<div className="relative max-w-7xl mx-auto">
				<div className="text-center max-w-4xl mx-auto">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-8 animate-fade-in">
						<span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse raleway"></span>
						Enterprise-Grade Digital Solutions
					</div>

					<h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight text-slate-900 animate-fade-in-up roboto_condensed">
						Building the Future of
						<span className="block bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
							Digital Excellence
						</span>
					</h1>

					<p
						className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed animate-fade-in-up"
						style={{ animationDelay: "0.2s" }}
					>
						We partner with forward-thinking organizations to craft world-class
						digital products, combining strategy, design, engineering, and
						data-driven execution.
					</p>

					<div
						className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
						style={{ animationDelay: "0.4s" }}
					>
						<a
							href="#contact"
							className="group bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-700/30 transition-all flex items-center justify-center gap-2"
						>
							Start Your Project
							<FiArrowRight className="group-hover:translate-x-1 transition-transform" />
						</a>

						<a
							href="#portfolio"
							className="border-2 border-slate-300 bg-white px-8 py-4 rounded-lg font-semibold hover:border-blue-700 hover:text-blue-700 transition-all text-slate-700"
						>
							View Our Work
						</a>
					</div>
				</div>

				{/* Stats */}
				<div
					className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in-up"
					style={{ animationDelay: "0.6s" }}
				>
					{stats.map((stat, index) => (
						<div
							key={index}
							className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
						>
							<div className="flex justify-center mb-3 text-blue-700">
								{React.cloneElement(stat.icon, { className: "w-8 h-8" })}
							</div>
							<div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
								{stat.number}
							</div>
							<div className="text-sm text-slate-600 font-medium">
								{stat.label}
							</div>
						</div>
					))}
				</div>
				<div className="absolute -right-40 top-32 hidden md:block pointer-events-none">
					<div className="relative w-[370px] h-[480px] hero-float group">
						<div className="absolute inset-0 bg-blue-700/20 blur-3xl rounded-3xl opacity-60 group-hover:opacity-80 transition-all"></div>

						<img
							src="./person2.png"
							alt="portrait"
							className="relative w-full h-full object-cover rounded-3xl shadow-2xl shadow-blue-900/10 group-hover:shadow-blue-900/20 transition-transform duration-500"
						/>
					</div>
				</div>
			</div>

			{/* Animations */}
			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translate(0, 0) rotate(0deg);
					}
					25% {
						transform: translate(10px, -20px) rotate(2deg);
					}
					50% {
						transform: translate(-10px, -40px) rotate(-2deg);
					}
					75% {
						transform: translate(10px, -20px) rotate(1deg);
					}
				}

				@keyframes heroFloat {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-18px);
					}
				}

				.hero-float {
					animation: heroFloat 6.5s ease-in-out infinite;
					transition: transform 0.4s ease;
				}

				.hero-float:hover {
					transform: translateY(-25px) scale(1.02);
				}

				@keyframes fade-in {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 1s ease-out;
				}
				.animate-fade-in-up {
					animation: fade-in-up 1s ease-out;
				}
			`}</style>
		</section>
	);
};

export default Hero;
