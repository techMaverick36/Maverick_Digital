import React from "react";
import {
	AiOutlineInstagram,
	AiOutlineLinkedin,
	AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
	return (
		<footer className="py-12 px-6 bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-4 gap-12 mb-12">
					<div className="md:col-span-2">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-xl">M</span>
							</div>
							<span className="text-xl font-bold">Maverick Digital Hub</span>
						</div>
						<p className="text-gray-400 leading-relaxed mb-6">
							We're a full-service digital agency dedicated to helping
							businesses thrive in the digital age through innovative solutions
							and strategic partnerships.
						</p>
						<div className="flex gap-3">
							<a
								href="#"
								className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
							>
								<AiOutlineLinkedin className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
							>
								<AiOutlineTwitter className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
							>
								<AiOutlineInstagram className="w-5 h-5" />
							</a>
						</div>
					</div>

					<div>
						<h4 className="font-bold text-lg mb-4">Services</h4>
						<ul className="space-y-3 text-gray-400">
							<li>
								<a href="#services" className="hover:text-white transition">
									Web Development
								</a>
							</li>
							<li>
								<a href="#services" className="hover:text-white transition">
									UI/UX Design
								</a>
							</li>
							<li>
								<a href="#services" className="hover:text-white transition">
									Branding
								</a>
							</li>
							<li>
								<a href="#services" className="hover:text-white transition">
									Digital Marketing
								</a>
							</li>
							<li>
								<a href="#services" className="hover:text-white transition">
									IT Solutions
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-bold text-lg mb-4">Company</h4>
						<ul className="space-y-3 text-gray-400">
							<li>
								<a href="#about" className="hover:text-white transition">
									About Us
								</a>
							</li>
							<li>
								<a href="#portfolio" className="hover:text-white transition">
									Portfolio
								</a>
							</li>
							<li>
								<a href="#process" className="hover:text-white transition">
									Our Process
								</a>
							</li>
							<li>
								<a href="#contact" className="hover:text-white transition">
									Contact
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition">
									Careers
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-gray-800 text-center text-gray-400">
					<p>
						&copy; 2025 Maverick Digital Hub. All rights reserved. Crafted with
						excellence in Kampala, Uganda.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
