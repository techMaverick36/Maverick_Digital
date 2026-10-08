import { Link, useLocation } from "react-router-dom";
import { servicePages } from "../content/services";
import { BUSINESS, mailHref, telHref, whatsappHref } from "../utils/business";
import ActionBar from "./ActionBar";
import BackToTop from "./BackToTop";

const pageLinks = [
	{ label: "Book a free consultation", hash: "book" },
	{ label: "Pricing", hash: "pricing" },
	{ label: "How it works", hash: "process" },
	{ label: "FAQ", hash: "faq" },
];

const Footer = () => {
	const { pathname } = useLocation();
	const to = (hash) => (pathname === "/" ? `#${hash}` : `/#${hash}`);
	const year = new Date().getFullYear();

	return (
		<>
			<footer className="on-navy px-3 pb-3 md:px-4 md:pb-4">
				<div className="rounded-[28px] px-5 pt-16 md:px-10" style={{ background: "var(--navy)", color: "var(--on-navy-2)" }}>
					<div className="mx-auto max-w-6xl">
						<div className="grid gap-12 pb-14 md:grid-cols-12 md:gap-10">
							<div className="md:col-span-3">
								<Link to="/" className="flex items-center gap-2.5" aria-label={`${BUSINESS.name}, home`}>
									<img src="/brand-mark-96.png" alt="" width="38" height="38" className="h-[38px] w-[38px]" />
									<span className="text-lg font-bold tracking-[-0.02em] text-white">{BUSINESS.name}</span>
								</Link>
								<p className="mt-5 max-w-sm leading-relaxed">Websites and brands for Ugandan businesses that want to be taken seriously.</p>
							</div>

							<div className="md:col-span-3">
								<h2 className="text-sm font-semibold text-white">Contact</h2>
								<ul className="mt-4 grid gap-2.5">
									{BUSINESS.phones.map((p) => (
										<li key={p.tel}>
											<a href={telHref(p.tel)} className="num hover:text-white">
												{p.display}
											</a>
										</li>
									))}
									<li>
										<a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
											WhatsApp
										</a>
									</li>
									<li>
										<a href={mailHref()} className="break-all hover:text-white">
											{BUSINESS.email}
										</a>
									</li>
								</ul>
							</div>

							<div className="md:col-span-2">
								<h2 className="text-sm font-semibold text-white">Hours</h2>
								<ul className="mt-4 grid gap-2.5">
									{BUSINESS.hours.map((h) => (
										<li key={h.label}>{h.label}</li>
									))}
									{BUSINESS.googleProfileUrl && (
										<li>
											<a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="link">
												Find us on Google
											</a>
										</li>
									)}
								</ul>
							</div>

							<nav aria-label="Services" className="md:col-span-2">
								<h2 className="text-sm font-semibold text-white">Services</h2>
								<ul className="mt-4 grid gap-2.5">
									{servicePages.map((s) => (
										<li key={s.slug}>
											<Link to={`/services/${s.slug}`} className="hover:text-white">
												{s.name}
											</Link>
										</li>
									))}
								</ul>
							</nav>

							<nav aria-label="Footer" className="md:col-span-2">
								<h2 className="text-sm font-semibold text-white">Company</h2>
								<ul className="mt-4 grid gap-2.5">
									{pageLinks.map((l) => (
										<li key={l.hash}>
											<Link to={to(l.hash)} className="hover:text-white">
												{l.label}
											</Link>
										</li>
									))}
									<li>
										<Link to="/portfolio" className="hover:text-white">
											All projects
										</Link>
									</li>
									<li>
										<Link to="/guides" className="hover:text-white">
											Guides
										</Link>
									</li>
								</ul>
							</nav>
						</div>

						<div className="flex flex-col gap-2 border-t py-6 text-sm sm:flex-row sm:justify-between" style={{ borderColor: "var(--navy-3)", color: "var(--on-navy-3)" }}>
							<p>
								&copy; {year} {BUSINESS.name}. All rights reserved.
							</p>
							<p>
								{[BUSINESS.address?.street, BUSINESS.address?.area, BUSINESS.city, BUSINESS.country].filter(Boolean).join(", ")}
							</p>
						</div>
					</div>
				</div>
			</footer>
			<ActionBar />
			<BackToTop />
		</>
	);
};

export default Footer;
