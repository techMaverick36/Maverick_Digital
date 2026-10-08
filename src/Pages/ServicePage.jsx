import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle, Phone } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaPanel from "../components/CtaPanel";
import Seo from "../components/Seo";
import NotFound from "./NotFound";
import { findService, servicePages } from "../content/services";
import { guides } from "../content/guides";
import { projects } from "../utils/constants";
import { serviceMeta } from "../seo/pages";
import { BUSINESS, formatUGX, telHref } from "../utils/business";
import { bookHref } from "../utils/bookingEvents";
import { panelPhoto } from "../utils/panelPhoto";

/* How every service starts: true for all of them, and the main worry it answers is "what am I committing to?" */
const START_STEPS = [
	{ title: "Free consultation", text: `A 30-minute call or meeting with ${BUSINESS.founder.split(" ")[0]} about your business and what you need.` },
	{ title: "Written quote", text: "The scope, timeline and fee, in writing." },
	{ title: "Work starts when you approve", text: "Nothing begins until you have agreed the quote." },
];

/* "Web design" → "web design", but "UI/UX design" and "IT support" keep their capitals */
const lowerFirst = (t) => (/^[A-Z][a-z]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t);

const H2 =({ id, children }) => (
	<h2 id={id} className="h-section text-2xl md:text-3xl">
		{children}
	</h2>
);

export default function ServicePage() {
	const { slug } = useParams();
	const s = findService(slug);
	if (!s) return <NotFound />;

	const work = s.workTag ? projects.filter((p) => p.slug && p.tags.includes(s.workTag)).slice(0, 6) : [];
	const reading = s.guides.map((g) => guides.find((x) => x.slug === g)).filter(Boolean);
	const others = servicePages.filter((o) => o.slug !== s.slug);

	return (
		<>
			<Seo {...serviceMeta(s)} />
			<Navbar />

			<main id="main">
				<section aria-labelledby="page-title" className="px-3 pt-3 md:px-4">
					<div className="on-navy rounded-[28px] px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36" style={s.image ? panelPhoto(s.image, s.imagePosition) : { background: "var(--navy)" }}>
						<div className="mx-auto max-w-6xl">
							<nav aria-label="Breadcrumb">
								<ol className="flex flex-wrap items-center gap-2 text-[0.95rem]" style={{ color: "var(--on-navy-3)" }}>
									<li>
										<Link to="/#services" className="link">
											Services
										</Link>
									</li>
									<li aria-hidden="true">/</li>
									<li aria-current="page">{s.name}</li>
								</ol>
							</nav>
							<h1 id="page-title" className="h-hero mt-7 max-w-4xl text-[2.6rem] text-white md:text-6xl">
								{s.title} <span className="hl">{s.highlight}</span>
							</h1>
							<p className="lede mt-5 max-w-2xl">{s.lede}</p>
							<p className="mt-6 text-[1.05rem] text-white">
								{s.price ? (
									<>
										From <span className="num font-semibold">{formatUGX(s.price.from)}</span>
										<span style={{ color: "var(--on-navy-3)" }}>, with a written quote before any work begins.</span>
									</>
								) : (
									<span style={{ color: "var(--on-navy-2)" }}>Priced in a written quote after your free consultation.</span>
								)}
							</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
								<Link to={bookHref(s.topic)} className="btn btn-primary group">
									Book a free consultation
									<span className="btn-disc" aria-hidden="true">
										<ArrowUpRight size={17} weight="bold" />
									</span>
								</Link>
								<a href={telHref()} className="btn btn-outline btn-plain">
									<Phone size={18} weight="bold" aria-hidden="true" />
									<span className="num">Call {BUSINESS.phones[0].display}</span>
								</a>
							</div>
						</div>
					</div>
				</section>

				<div className="px-5 py-14 md:px-10 md:py-20">
					<div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-12">
						<div className="min-w-0 lg:col-span-7">
							{s.explainer && (
								<section aria-labelledby="meaning" className="mb-14">
									<H2 id="meaning">What UI/UX means</H2>
									<p className="mt-4 text-[1.08rem] leading-[1.75]" style={{ color: "var(--ink-2)" }}>
										{s.explainer}
									</p>
								</section>
							)}

							<section aria-labelledby="includes">
								<H2 id="includes">What you get</H2>
								{s.forWho && (
									<p className="mt-3 text-[1.05rem]" style={{ color: "var(--ink-3)" }}>
										{s.forWho}
									</p>
								)}
								<ul className="mt-6 grid gap-5 sm:grid-cols-2">
									{s.includes.map((item) => (
										<li key={item.title} className="flex gap-3">
											<CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0" style={{ color: "var(--azure)" }} aria-hidden="true" />
											<span>
												<span className="block font-semibold" style={{ color: "var(--ink)" }}>
													{item.title}
												</span>
												<span className="mt-1 block leading-relaxed" style={{ color: "var(--ink-2)" }}>
													{item.text}
												</span>
											</span>
										</li>
									))}
								</ul>
							</section>

							{s.extras?.length > 0 && (
								<section aria-labelledby="extras" className="mt-14">
									<H2 id="extras">Also available</H2>
									<p className="mt-3 text-[1.05rem]" style={{ color: "var(--ink-3)" }}>
										Quoted separately, after your free consultation.
									</p>
									<ul className="mt-6 grid gap-4">
										{s.extras.map((item) => (
											<li key={item.title} className="card p-5">
												<span className="block font-semibold" style={{ color: "var(--ink)" }}>
													{item.title}
												</span>
												<span className="mt-1 block leading-relaxed" style={{ color: "var(--ink-2)" }}>
													{item.text}
												</span>
											</li>
										))}
									</ul>
								</section>
							)}

							{s.faqs.length > 0 && (
								<section aria-labelledby="questions" className="mt-14">
									<H2 id="questions">Questions</H2>
									<dl className="mt-6 grid gap-6">
										{s.faqs.map((f) => (
											<div key={f.q} className="border-t pt-6" style={{ borderColor: "var(--rule)" }}>
												<dt className="text-lg font-semibold tracking-[-0.015em]" style={{ color: "var(--ink)" }}>
													{f.q}
												</dt>
												<dd className="mt-2 leading-relaxed" style={{ color: "var(--ink-2)" }}>
													{f.a}
												</dd>
											</div>
										))}
									</dl>
								</section>
							)}
						</div>

						<aside className="min-w-0 lg:col-span-5" aria-label="How it starts">
							{/* Price is in the header and timelines are in the questions: this card only says how to start. */}
							<div className="card p-6 md:p-7 lg:sticky lg:top-24">
								<h2 className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
									How it starts
								</h2>
								<ol className="mt-4 grid gap-4">
									{START_STEPS.map((step, i) => (
										<li key={step.title} className="flex gap-3">
											<span className="num grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-semibold" style={{ background: "var(--azure-tint)", color: "var(--azure-ink)" }} aria-hidden="true">
												{i + 1}
											</span>
											<span className="text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-2)" }}>
												<span className="block font-semibold" style={{ color: "var(--ink)" }}>
													{step.title}
												</span>
												{step.text}
											</span>
										</li>
									))}
								</ol>
								<Link to={bookHref(s.topic)} className="btn btn-primary group mt-7 w-full justify-between">
									Book a free consultation
									<span className="btn-disc" aria-hidden="true">
										<ArrowUpRight size={17} weight="bold" />
									</span>
								</Link>
							</div>
						</aside>
					</div>
				</div>

				{work.length > 0 && (
					<section aria-labelledby="work" className="px-5 pb-16 md:px-10 md:pb-20">
						<div className="mx-auto max-w-6xl">
							<div className="flex items-end justify-between gap-4">
								<H2 id="work">Our {s.name === "Web design" ? "websites" : `${s.name} work`}</H2>
								<Link to="/portfolio" className="link text-[0.95rem]">
									All projects
								</Link>
							</div>
							<ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{work.map((p) => (
									<li key={p.id}>
										<Link to={`/work/${p.slug}`} className="card group block h-full p-3">
											<div className="zoom overflow-hidden rounded-[12px]">
												<img src={p.thumb} alt={`${p.title} website`} width="900" height="482" loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
											</div>
											<p className="mt-4 px-2 text-lg font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
												{p.title}
											</p>
											<p className="mt-1 px-2 pb-2 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
												{p.delivered}
											</p>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}

				<section aria-labelledby="more" className="px-5 pb-16 md:px-10 md:pb-20">
					<div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
						{reading.length > 0 && (
							<div>
								<h2 id="more" className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
									Read before you decide
								</h2>
								<ul className="mt-4 grid gap-1">
									{reading.map((g) => (
										<li key={g.slug}>
											<Link to={`/guides/${g.slug}`} className="link inline-flex items-center gap-2 py-1.5 text-[1.05rem]">
												{g.title}
												<ArrowRight size={15} aria-hidden="true" />
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
						<div>
							<h2 id={reading.length ? undefined : "more"} className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
								Other services
							</h2>
							<ul className="mt-4 grid gap-1">
								{others.map((o) => (
									<li key={o.slug}>
										<Link to={`/services/${o.slug}`} className="link inline-flex items-center gap-2 py-1.5 text-[1.05rem]">
											{o.name}
											<ArrowRight size={15} aria-hidden="true" />
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				<CtaPanel title="Talk to us about" highlight={`${lowerFirst(s.name)}.`} lede={`A free 30-minute call or meeting with ${BUSINESS.founder.split(" ")[0]}. No obligation.`} topic={s.topic} />
			</main>

			<Footer />
		</>
	);
}
