import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === "/";
	const { theme, toggle } = useTheme();

	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "Services", href: isHome ? "#services" : "/#services" },
		{ label: "About", href: isHome ? "#about" : "/#about" },
		{ label: "Process", href: isHome ? "#process" : "/#process" },
		{ label: "Portfolio", href: "/portfolio" },
	];

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 40);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className="fixed w-full z-50 transition-all duration-300"
			style={
				scrolled || mobileMenuOpen
					? {
							background: "var(--navbar-bg)",
							borderBottom: "1px solid var(--navbar-border)",
							backdropFilter: "blur(16px)",
							WebkitBackdropFilter: "blur(16px)",
						}
					: { borderBottom: "1px solid transparent" }
			}
		>
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex items-center justify-between h-[72px]">
					<Link to="/" className="flex items-center gap-2.5 group">
						<span
							className="display flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold text-white transition-transform duration-300 group-hover:rotate-[-8deg]"
							style={{ background: "var(--accent-gradient)" }}
						>
							M
						</span>
						<span className="display text-lg font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
							Maverick<span style={{ color: "var(--accent)" }}>.</span>
						</span>
					</Link>

					<div className="hidden lg:flex items-center gap-9">
						{navItems.map((item) => (
							<Link key={item.label} to={item.href} className="nav-link">
								{item.label}
							</Link>
						))}
					</div>

					<div className="hidden lg:flex items-center gap-3">
						<button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
							{theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
						</button>
						<Link to="/#contact" className="btn-primary px-6 py-2.5 text-sm">
							Start a Project
							<FiArrowUpRight className="btn-arrow" size={16} />
						</Link>
					</div>

					<div className="lg:hidden flex items-center gap-3">
						<button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
							{theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
						</button>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="theme-toggle"
							aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={mobileMenuOpen}
						>
							{mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
						</button>
					</div>
				</div>
			</div>

			{mobileMenuOpen && (
				<div
					className="lg:hidden border-t"
					style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
				>
					<div className="px-6 py-6 space-y-1">
						{navItems.map((item, i) => (
							<Link
								key={item.label}
								to={item.href}
								className="display block py-3 text-2xl font-medium animate-fade-up"
								style={{ color: "var(--text-primary)", animationDelay: `${i * 50}ms` }}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<Link
							to="/#contact"
							className="btn-primary w-full px-6 py-3.5 mt-4 text-base"
							onClick={() => setMobileMenuOpen(false)}
						>
							Start a Project
							<FiArrowUpRight className="btn-arrow" size={18} />
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
