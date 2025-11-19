import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed w-full z-50 transition-all duration-300 ${
				scrolled ? "bg-white/98 backdrop-blur-xl shadow-md" : "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-6 py-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-xl">M</span>
						</div>
						<span className="text-2xl font-bold tracking-tight robot_condensed">
							Maverick Digital Hub
						</span>
					</div>

					<div className="hidden lg:flex items-center space-x-8">
						<a
							href="#services"
							className="text-gray-700 hover:text-blue-600 transition font-medium"
						>
							Services
						</a>
						<a
							href="#about"
							className="text-gray-700 hover:text-blue-600 transition font-medium"
						>
							About
						</a>
						<a
							href="#process"
							className="text-gray-700 hover:text-blue-600 transition font-medium"
						>
							Process
						</a>
						<a
							href="#portfolio"
							className="text-gray-700 hover:text-blue-600 transition font-medium"
						>
							Portfolio
						</a>
						<a
							href="#contact"
							className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition font-medium"
						>
							Get Started
						</a>
					</div>

					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="lg:hidden text-gray-900"
					>
						{mobileMenuOpen ? (
							<FiX className="w-6 h-6" />
						) : (
							<FiMenu className="w-6 h-6" />
						)}
					</button>
				</div>
			</div>

			{mobileMenuOpen && (
				<div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
					<div className="px-6 py-6 space-y-4">
						<a
							href="#services"
							className="block text-gray-700 hover:text-blue-600 transition font-medium"
						>
							Services
						</a>
						<a
							href="#about"
							className="block text-gray-700 hover:text-blue-600 transition font-medium"
						>
							About
						</a>
						<a
							href="#process"
							className="block text-gray-700 hover:text-blue-600 transition font-medium"
						>
							Process
						</a>
						<a
							href="#portfolio"
							className="block text-gray-700 hover:text-blue-600 transition font-medium"
						>
							Portfolio
						</a>
						<a
							href="#contact"
							className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg text-center font-medium"
						>
							Get Started
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
