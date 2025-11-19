import React from "react";
import { services } from "../utils/constants";
import { FiCheck } from "react-icons/fi";

const Services = () => {
	return (
		<section
			id="services"
			className="relative py-28 px-6 bg-white overflow-hidden"
		>
			{/* Floating Cartoon */}
			<div className="absolute left-10 bottom-80 hidden md:block pointer-events-none">
				<div className="relative w-[380px] h-[500px] hero-float group animate-[float_6s_ease-in-out_infinite]">
					{/* Glow backdrop */}
					<div className="absolute  inset-0 bg-blue-600/30 blur-3xl rounded-3xl opacity-70 group-hover:opacity-90 transition-all"></div>

					{/* Main Image */}
					<img
						src="./person4.png"
						alt="portrait"
						className="relative w-full object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,60,255,0.15)] group-hover:shadow-[0_25px_80px_rgba(0,60,255,0.25)] transition-transform duration-700 group-hover:scale-[1.03]"
					/>
				</div>
			</div>
			<div className="absolute right-10 top-80 hidden md:block pointer-events-none">
				<div className="relative w-[380px] h-[500px] hero-float group animate-[float_6s_ease-in-out_infinite]">
					{/* Glow backdrop */}
					<div className="absolute  inset-0 bg-blue-600/30 blur-3xl rounded-3xl opacity-70 group-hover:opacity-90 transition-all"></div>

					{/* Main Image */}
					<img
						src="./person6.png"
						alt="portrait"
						className="relative w-full object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,60,255,0.15)] group-hover:shadow-[0_25px_80px_rgba(0,60,255,0.25)] transition-transform duration-700 group-hover:scale-[1.03]"
					/>
				</div>
			</div>

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Section Header */}
				<div className="text-center mb-20">
					<div className="inline-block px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4 shadow-sm raleway">
						What We Offer
					</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight roboto-condensed">
						Comprehensive Digital Services
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						End-to-end solutions designed to accelerate your digital
						transformation and drive measurable business growth.
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-500 hover:shadow-2xl shadow-sm transition-all duration-300 hover:-translate-y-3 backdrop-blur-sm"
						>
							<div
								className={`bg-gradient-to-br from-${service.color}-500/10 to-${service.color}-600/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-${service.color}-600 group-hover:scale-110 transition-transform shadow-inner`}
							>
								{service.icon}
							</div>

							<h3 className="text-2xl font-bold mb-4 text-gray-900 raleway">
								{service.title}
							</h3>

							<p className="text-gray-600 mb-6 leading-relaxed">
								{service.description}
							</p>

							<ul className="space-y-3">
								{service.features.map((feature, idx) => (
									<li
										key={idx}
										className="flex items-center gap-3 text-sm text-gray-700"
									>
										<div
											className={`w-6 h-6 rounded-full bg-${service.color}-100 flex items-center justify-center flex-shrink-0 shadow-sm`}
										>
											<FiCheck
												className={`text-${service.color}-600 w-3.5 h-3.5`}
											/>
										</div>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
