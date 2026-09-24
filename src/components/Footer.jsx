import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const links = [
	{ label: "Services", to: "/#services" },
	{ label: "About", to: "/#about" },
	{ label: "Process", to: "/#process" },
	{ label: "Portfolio", to: "/portfolio" },
	{ label: "Contact", to: "/#contact" },
];

const Footer = () => {
	return (
		<footer className="border-t px-5 pb-10 pt-16 md:px-8" style={{ borderColor: "var(--line)" }}>
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-10 md:grid-cols-12">
					<div className="md:col-span-5">
						<Link to="/" className="text-lg font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
							Maverick Digital Hub
						</Link>
						<p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-2)" }}>
							Websites, branding, and digital work that helps businesses look polished and credible online.
						</p>
					</div>

					<nav className="md:col-span-3" aria-label="Footer">
						<ul className="grid grid-cols-2 gap-y-1 text-[0.95rem]">
							{links.map((l) => (
								<li key={l.label}>
									<Link to={l.to} className="nav-link inline-block">
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className="text-[0.95rem] md:col-span-4" style={{ color: "var(--ink-2)" }}>
						<a href="mailto:mavericktech750@gmail.com" className="nav-link inline-block [overflow-wrap:anywhere]">
							mavericktech750@gmail.com
						</a>
						<br />
						<a href="tel:+256770302731" className="nav-link inline-block">
							+256 770 302 731
						</a>
						<p className="mt-1">Kampala, Uganda</p>
					</div>
				</div>

				{/* Signature: the wordmark rises out of a mask when the footer enters */}
				<Reveal fade={false} className="mt-16 overflow-hidden" aria-hidden="true">
					<p
						className="rise-child select-none text-center text-[21vw] font-semibold leading-[0.9] tracking-[-0.065em] lg:text-[17.5rem]"
						style={{ color: "var(--ink)" }}
					>
						Maverick
					</p>
				</Reveal>

				<p className="mt-8 border-t pt-8 text-sm" style={{ borderColor: "var(--line)", color: "var(--ink-3)" }}>
					&copy; {new Date().getFullYear()} Maverick Digital Hub. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
