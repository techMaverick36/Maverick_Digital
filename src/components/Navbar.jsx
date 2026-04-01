import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ lightBg = false }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === "/";

	const navItems = [
		{ label: "Home", href: "/", type: "link" },
		{ label: "Services", href: isHome ? "#services" : "/#services", type: "anchor" },
		{ label: "About", href: isHome ? "#about" : "/#about", type: "anchor" },
		{ label: "Process", href: isHome ? "#process" : "/#process", type: "anchor" },
		{ label: "Portfolio", href: "/portfolio", type: "link" },
	];

	const useDarkText = scrolled || lightBg;

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-xl ${scrolled ? "shadow-lg" : "bg-transparent"}`}
			style={
				scrolled
					? {
							background: "rgba(22, 26, 32, 0.94)",
							borderBottom: "1px solid rgba(69, 105, 168, 0.18)",
						}
					: { borderBottom: "1px solid rgba(69, 105, 168, 0.08)" }
			}
		>
			<div className="max-w-7xl mx-auto px-6 py-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[var(--border-strong)] bg-[rgba(33,74,132,0.18)]">
							<span className="text-white font-semibold text-base">M</span>
						</div>
						<Link
							to={"/"}
							className={`text-xl md:text-2xl font-semibold tracking-tight roboto_condensed ${useDarkText ? "text-white" : "text-white"}`}
						>
							Maverick Digital Hub
						</Link>
					</div>

					<div className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) =>
							item.type === "link" ? (
								<Link
									key={item.label}
									to={item.href}
									className="transition font-medium text-slate-300 hover:text-white"
								>
									{item.label}
								</Link>
							) : (
								<a
									key={item.label}
									href={item.href}
									className="transition font-medium text-slate-300 hover:text-white"
								>
									{item.label}
								</a>
							),
						)}
						<a
							href={isHome ? "#contact" : "/#contact"}
							className="accent-button px-6 py-2.5 rounded-lg transition font-medium shadow-md shadow-blue-950/30"
						>
							Start a Project
						</a>
					</div>

					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="lg:hidden text-white transition-colors duration-300 text-sm font-semibold tracking-[0.18em] uppercase"
					>
						{mobileMenuOpen ? "Close" : "Menu"}
					</button>
				</div>
			</div>

			{mobileMenuOpen && (
				<div className="lg:hidden bg-[var(--bg-elevated)] border-t border-[var(--border-soft)] shadow-xl">
					<div className="px-6 py-6 space-y-4">
						{navItems.map((item) =>
							item.type === "link" ? (
								<Link
									key={item.label}
									to={item.href}
									className="block text-slate-300 hover:text-white transition font-medium"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							) : (
								<a
									key={item.label}
									href={item.href}
									className="block text-slate-300 hover:text-white transition font-medium"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.label}
								</a>
							),
						)}
						<a
							href={isHome ? "#contact" : "/#contact"}
							className="block accent-button px-6 py-3 rounded-lg text-center font-medium"
							onClick={() => setMobileMenuOpen(false)}
						>
							Start a Project
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
