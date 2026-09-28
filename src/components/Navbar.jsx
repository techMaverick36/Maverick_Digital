import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, List, X } from "@phosphor-icons/react";
import { BUSINESS } from "../utils/business";

const links = [
	{ label: "Services", hash: "services" },
	{ label: "About", hash: "about" },
	{ label: "Work", hash: "work" },
	{ label: "Pricing", hash: "pricing" },
	{ label: "FAQ", hash: "faq" },
];

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const sentinel = useRef(null);
	const { pathname } = useLocation();
	const to = (hash) => (pathname === "/" ? `#${hash}` : `/#${hash}`);

	/* Scrolled once the page moves (sentinel observer, no scroll listener). */
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

	const close = () => setMenuOpen(false);

	return (
		<>
			<a href="#main" className="skip-link">
				Skip to content
			</a>

			{/* Page-top sentinel: the nav settles to the top once the contact bar scrolls away */}
			<div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-12 w-px" />

			{/* Floating glass nav: hovers inside the hero panel, then floats at the top */}
			<header className="float-nav fixed inset-x-0 top-3 z-40 px-5 md:px-8" data-scrolled={scrolled || menuOpen}>
				<div className="relative mx-auto max-w-6xl">
					<nav aria-label="Primary" className="nav-pill flex items-center justify-between gap-6 rounded-full pl-4 pr-2 md:pl-5" style={{ height: "var(--nav-h)" }}>
						<Link to="/" className="flex items-center gap-2.5" aria-label={`${BUSINESS.name}, home`}>
							<img src="/brand-mark.png" alt="" width="32" height="32" className="h-8 w-8" />
							<span className="whitespace-nowrap text-[0.98rem] font-bold tracking-[-0.02em] md:text-[1.02rem]" style={{ color: "var(--ink)" }}>
								Maverick <span style={{ color: "var(--azure-ink)" }}>Digital Hub</span>
							</span>
						</Link>

						<ul className="hidden items-center gap-7 lg:flex">
							{links.map((l) => (
								<li key={l.hash}>
									<Link to={to(l.hash)} className="nav-link">
										{l.label}
									</Link>
								</li>
							))}
							<li>
								<Link to="/portfolio" className="nav-link" aria-current={pathname === "/portfolio" ? "page" : undefined}>
									Projects
								</Link>
							</li>
						</ul>

						<div className="flex items-center gap-2">
							<Link to={to("book")} className="btn btn-azure btn-sm group hidden sm:inline-flex">
								Book a free consultation
								<span className="btn-disc" aria-hidden="true">
									<ArrowUpRight size={15} weight="bold" />
								</span>
							</Link>
							<button
								type="button"
								onClick={() => setMenuOpen((o) => !o)}
								className="btn btn-outline btn-sm btn-plain !px-3 sm:!px-4 lg:hidden"
								aria-label={menuOpen ? "Close menu" : "Open menu"}
								aria-expanded={menuOpen}
								aria-controls="site-menu"
							>
								{menuOpen ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
								<span className="hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
							</button>
						</div>
					</nav>

					<div
						id="site-menu"
						className="menu-panel absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-[24px] border px-5 pb-5 pt-1 lg:hidden"
						style={{ borderColor: "var(--rule-strong)", background: "#0c1016", boxShadow: "var(--shadow-float)" }}
						data-open={menuOpen}
					>
						<ul>
							{[...links, { label: "Book a free consultation", hash: "book" }].map((l) => (
								<li key={l.hash}>
									<Link to={to(l.hash)} onClick={close} className="flex items-center justify-between border-b py-4 text-lg font-semibold" style={{ borderColor: "var(--rule)", color: "var(--ink)" }}>
										{l.label}
										<ArrowRight size={18} aria-hidden="true" style={{ color: "var(--azure-ink)" }} />
									</Link>
								</li>
							))}
							<li>
								<Link to="/portfolio" onClick={close} className="flex items-center justify-between py-4 text-lg font-semibold" style={{ color: "var(--ink)" }}>
									All projects
									<ArrowRight size={18} aria-hidden="true" style={{ color: "var(--azure-ink)" }} />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
