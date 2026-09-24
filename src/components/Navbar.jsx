import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, List, Moon, Sun, X } from "@phosphor-icons/react";
import { useTheme } from "../context/theme";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const sentinel = useRef(null);
	const { pathname } = useLocation();
	const isHome = pathname === "/";
	const { theme, toggle } = useTheme();

	const navItems = [
		{ label: "Home", href: "/", current: isHome },
		{ label: "Services", href: isHome ? "#services" : "/#services" },
		{ label: "About", href: isHome ? "#about" : "/#about" },
		{ label: "Process", href: isHome ? "#process" : "/#process" },
		{ label: "Portfolio", href: "/portfolio", current: pathname === "/portfolio" },
	];

	/* Scrolled state from an observer on a sentinel at the top of the page (no scroll listener). */
	useEffect(() => {
		const el = sentinel.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!menuOpen) return;
		const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menuOpen]);

	const ThemeIcon = theme === "dark" ? Sun : Moon;
	const themeLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

	return (
		<>
			<div ref={sentinel} aria-hidden="true" className="absolute top-0 left-0 h-6 w-px" />
			<a href="#main" className="skip-link">
				Skip to content
			</a>

			<header
				className="nav-shell fixed inset-x-0 top-0 z-40 border-b border-transparent"
				data-scrolled={scrolled || menuOpen}
			>
				<nav
					className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8"
					style={{ height: "var(--nav-h)" }}
					aria-label="Primary"
				>
					<Link to="/" className="text-[1.05rem] font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
						Maverick Digital Hub
					</Link>

					<ul className="hidden lg:flex items-center gap-8">
						{navItems.map((item) => (
							<li key={item.label}>
								<Link to={item.href} className="nav-link" aria-current={item.current ? "page" : undefined}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>

					<div className="flex items-center gap-1.5">
						<button type="button" onClick={toggle} className="icon-btn" aria-label={themeLabel} title={themeLabel}>
							<ThemeIcon size={19} />
						</button>
						<Link to="/#contact" className="btn btn-primary btn-sm ml-2 hidden lg:inline-flex">
							Start a project
							<ArrowUpRight size={15} weight="bold" className="arrow" />
						</Link>
						<button
							type="button"
							onClick={() => setMenuOpen((o) => !o)}
							className="icon-btn lg:hidden"
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							aria-expanded={menuOpen}
							aria-controls="mobile-menu"
						>
							{menuOpen ? <X size={20} /> : <List size={20} />}
						</button>
					</div>
				</nav>

				<div
					id="mobile-menu"
					className="mobile-menu absolute inset-x-0 top-full border-t px-5 pb-8 pt-4 lg:hidden"
					data-open={menuOpen}
					style={{ borderColor: "var(--line)", background: "var(--bg)" }}
				>
					<ul className="flex flex-col">
						{navItems.map((item) => (
							<li key={item.label}>
								<Link
									to={item.href}
									onClick={() => setMenuOpen(false)}
									aria-current={item.current ? "page" : undefined}
									className="block py-3 text-[1.6rem] font-semibold tracking-[-0.03em]"
									style={{ color: item.current ? "var(--ink)" : "var(--ink-2)" }}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<Link to="/#contact" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-6 w-full">
						Start a project
						<ArrowUpRight size={16} weight="bold" className="arrow" />
					</Link>
				</div>
			</header>
		</>
	);
};

export default Navbar;
