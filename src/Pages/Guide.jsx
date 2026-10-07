import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaPanel from "../components/CtaPanel";
import Seo from "../components/Seo";
import NotFound from "./NotFound";
import { formatGuideDate, guides, readMinutes } from "../content/guides";
import { guideMeta } from "../seo/pages";
import { BUSINESS } from "../utils/business";
import { bookHref } from "../utils/bookingEvents";

const headingId = (t) => `h-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const Paragraphs = ({ items }) =>
	items?.map((t) => (
		<p key={t.slice(0, 40)} className="mt-5 text-[1.08rem] leading-[1.8]" style={{ color: "var(--ink-2)" }}>
			{t}
		</p>
	));

export default function Guide() {
	const { slug } = useParams();
	const g = guides.find((x) => x.slug === slug);
	if (!g) return <NotFound />;
	const others = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

	return (
		<>
			<Seo {...guideMeta(g)} />
			<Navbar />

			<main id="main">
				<article>
					<header className="px-3 pt-3 md:px-4">
						<div className="on-navy rounded-[28px] px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36" style={{ background: "var(--navy)" }}>
							<div className="mx-auto max-w-3xl">
								<nav aria-label="Breadcrumb">
									<ol className="flex flex-wrap items-center gap-2 text-[0.95rem]" style={{ color: "var(--on-navy-3)" }}>
										<li>
											<Link to="/guides" className="link">
												Guides
											</Link>
										</li>
										<li aria-hidden="true">/</li>
										<li aria-current="page" className="line-clamp-1">
											{g.title}
										</li>
									</ol>
								</nav>
								<h1 className="h-hero mt-7 text-[2.4rem] text-white md:text-[3.4rem]">{g.title}</h1>
								<p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem]" style={{ color: "var(--on-navy-3)" }}>
									<span className="flex items-center gap-2.5">
										<img src="/Martin2.webp" alt="" width="32" height="32" className="h-8 w-8 rounded-full object-cover object-[50%_25%]" />
										<span>
											By <span className="font-semibold text-white">{BUSINESS.founder}</span>
										</span>
									</span>
									<span aria-hidden="true">·</span>
									<time dateTime={g.date}>{formatGuideDate(g.date)}</time>
									<span aria-hidden="true">·</span>
									<span>{readMinutes(g)} min read</span>
								</p>
							</div>
						</div>
					</header>

					<div className="px-5 py-12 md:px-10 md:py-16">
						<div className="mx-auto max-w-3xl">
							<p className="text-[1.2rem] leading-[1.75]" style={{ color: "var(--ink)" }}>
								{g.intro}
							</p>

							{g.sections.map((s) => (
								<section key={s.heading} aria-labelledby={headingId(s.heading)} className="mt-12">
									<h2 id={headingId(s.heading)} className="h-section text-2xl md:text-[1.75rem]">
										{s.heading}
									</h2>
									<Paragraphs items={s.paragraphs} />
									{s.list && s.ordered && (
										<ol className="mt-5 grid gap-3">
											{s.list.map((item, i) => (
												<li key={item} className="flex gap-3 text-[1.05rem] leading-[1.7]" style={{ color: "var(--ink-2)" }}>
													<span className="num mt-[0.15em] grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.8rem] font-semibold" style={{ background: "var(--azure-tint)", color: "var(--azure-ink)" }} aria-hidden="true">
														{i + 1}
													</span>
													{item}
												</li>
											))}
										</ol>
									)}
									{s.list && !s.ordered && (
										<ul className="mt-5 grid gap-3">
											{s.list.map((item) => (
												<li key={item} className="flex gap-3 text-[1.05rem] leading-[1.7]" style={{ color: "var(--ink-2)" }}>
													<span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--azure)" }} aria-hidden="true" />
													{item}
												</li>
											))}
										</ul>
									)}
									<Paragraphs items={s.after} />
								</section>
							))}

							<div className="card mt-14 flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between" style={{ background: "var(--azure-tint)", borderColor: "transparent" }}>
								<p className="text-lg font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
									Free, 30 minutes, with {BUSINESS.founder.split(" ")[0]}. No obligation.
								</p>
								<Link to={bookHref(g.topic)} className="btn btn-primary group shrink-0">
									{g.cta}
									<span className="btn-disc" aria-hidden="true">
										<ArrowUpRight size={17} weight="bold" />
									</span>
								</Link>
							</div>
						</div>
					</div>
				</article>

				{others.length > 0 && (
					<section aria-labelledby="more-guides" className="px-5 pb-16 md:px-10 md:pb-20">
						<div className="mx-auto max-w-6xl">
							<h2 id="more-guides" className="h-section text-2xl md:text-3xl">
								More guides
							</h2>
							<ul className="mt-6 grid gap-4 md:grid-cols-3">
								{others.map((o) => (
									<li key={o.slug}>
										<Link to={`/guides/${o.slug}`} className="card spot block h-full p-6">
											<p className="text-sm" style={{ color: "var(--ink-3)" }}>
												{readMinutes(o)} min read
											</p>
											<p className="mt-2 text-lg font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
												{o.title}
											</p>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}

				<CtaPanel topic={g.topic} />
			</main>

			<Footer />
		</>
	);
}
