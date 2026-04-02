import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="12" r="5" />
		<line x1="12" y1="1" x2="12" y2="3" />
		<line x1="12" y1="21" x2="12" y2="23" />
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
		<line x1="1" y1="12" x2="3" y2="12" />
		<line x1="21" y1="12" x2="23" y2="12" />
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	</svg>
);

const MoonIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
);

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === "/";
	const { theme, toggle } = useTheme();

	const navItems = [
		{ label: "Home", href: "/", type: "link" },
		{ label: "Services", href: isHome ? "#services" : "/#services", type: "anchor" },
		{ label: "About", href: isHome ? "#about" : "/#about", type: "anchor" },
		{ label: "Process", href: isHome ? "#process" : "/#process", type: "anchor" },
		{ label: "Portfolio", href: "/portfolio", type: "link" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-xl ${scrolled ? "shadow-sm" : "bg-transparent"}`}
			style={
				scrolled
					? {
							background: "var(--navbar-scrolled-bg)",
							borderBottom: "1px solid var(--navbar-border)",
						}
					: { borderBottom: "1px solid var(--sticky-bar-border)" }
			}
		>
			<div className="max-w-7xl mx-auto px-6 py-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Link
							to={"/"}
							className="text-xl md:text-2xl font-semibold tracking-tight roboto_condensed"
							style={{ color: "var(--text-primary)" }}
						>
							Maverick Digital Hub
						</Link>
					</div>

					<div className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.label}
								to={item.href}
								className="transition font-medium"
								style={{ color: "var(--text-nav-link)" }}
								onMouseEnter={e => e.target.style.color = "var(--text-nav-link-hover)"}
								onMouseLeave={e => e.target.style.color = "var(--text-nav-link)"}
							>
								{item.label}
							</Link>
						))}

						<button
							onClick={toggle}
							className="theme-toggle"
							aria-label="Toggle theme"
						>
							{theme === "dark" ? <SunIcon /> : <MoonIcon />}
						</button>

						<Link
							to="/#contact"
							className="accent-button px-6 py-2.5 rounded-lg transition font-medium shadow-md"
						>
							Start a Project
						</Link>
					</div>

					<div className="lg:hidden flex items-center gap-3">
						<button
							onClick={toggle}
							className="theme-toggle"
							aria-label="Toggle theme"
						>
							{theme === "dark" ? <SunIcon /> : <MoonIcon />}
						</button>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="transition-colors duration-300 text-sm font-semibold tracking-[0.18em] uppercase"
							style={{ color: "var(--text-primary)" }}
						>
							{mobileMenuOpen ? "Close" : "Menu"}
						</button>
					</div>
				</div>
			</div>

			{mobileMenuOpen && (
				<div
					className="lg:hidden border-t shadow-xl"
					style={{
						background: "var(--bg-elevated)",
						borderColor: "var(--border-soft)",
					}}
				>
					<div className="px-6 py-6 space-y-4">
						{navItems.map((item) => (
							<Link
								key={item.label}
								to={item.href}
								className="block transition font-medium"
								style={{ color: "var(--text-nav-link)" }}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<Link
							to="/#contact"
							className="block accent-button px-6 py-3 rounded-lg text-center font-medium"
							onClick={() => setMobileMenuOpen(false)}
						>
							Start a Project
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
