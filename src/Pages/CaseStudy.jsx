import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, CheckCircle, Quotes } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaPanel from "../components/CtaPanel";
import Seo from "../components/Seo";
import NotFound from "./NotFound";
import { projects, testimonials } from "../utils/constants";
import { caseStudyMeta } from "../seo/pages";
import { bookHref } from "../utils/bookingEvents";

const host = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/* One project told as a short story: what the client needed, what we built, the facts. */
export default function CaseStudy() {
	const { slug } = useParams();
	const index = projects.findIndex((p) => p.slug === slug);
	if (index < 0) return <NotFound />;

	const p = projects[index];
	const { stats = {} } = p;
	const quote = testimonials.find((t) => t.approved !== false && t.content?.trim() && t.role?.includes(p.title));
	const more = [1, 2, 3].map((n) => projects[(index + n) % projects.length]).filter((o) => o.slug && o.id !== p.id);

	const facts = [
		["Client", p.title],
		["Industry", p.sector],
		["Scope", p.tags.join(", ")],
		["Delivered in", stats.duration],
		["Built with", stats.tech],
	].filter(([, v]) => v);

	return (
		<>
			<Seo {...caseStudyMeta(p)} />
			<Navbar />

			<main id="main">
				<section aria-labelledby="page-title" className="px-3 pt-3 md:px-4">
					<div className="on-navy rounded-[28px] px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36" style={{ background: "var(--navy)" }}>
						<div className="mx-auto max-w-6xl">
							<nav aria-label="Breadcrumb">
								<ol className="flex flex-wrap items-center gap-2 text-[0.95rem]" style={{ color: "var(--on-navy-3)" }}>
									<li>
										<Link to="/portfolio" className="link">
											Our work
										</Link>
									</li>
									<li aria-hidden="true">/</li>
									<li aria-current="page">{p.title}</li>
								</ol>
							</nav>
							<p className="chip mt-7">
								<span className="chip-dot" aria-hidden="true" />
								{p.sector} website, Uganda
							</p>
							<h1 id="page-title" className="h-hero mt-5 max-w-4xl text-[2.6rem] text-white md:text-6xl">
								{p.title}
							</h1>
							<p className="lede mt-5 max-w-2xl">{p.description}</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
								<a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
									Visit {host(p.link)}
									<span className="btn-disc" aria-hidden="true">
										<ArrowUpRight size={17} weight="bold" />
									</span>
									<span className="sr-only">(opens in a new tab)</span>
								</a>
								<Link to={bookHref("Website")} className="btn btn-outline btn-plain">
									Talk to us about a similar project
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section aria-label="Screenshot" className="px-5 pt-10 md:px-10 md:pt-14">
					<div className="card relative mx-auto max-w-6xl p-3 md:p-4">
						<img
							src={p.image}
							alt={`${p.title} website homepage, designed and built by Maverick Digital Hub`}
							width="1920"
							height="1028"
							fetchPriority="high"
							className="block aspect-[16/10] w-full rounded-[14px] object-cover object-top"
						/>
						{p.detail && (
							<div className="absolute -bottom-4 right-6 hidden w-[30%] overflow-hidden rounded-[12px] border-4 sm:block" style={{ boxShadow: "var(--shadow-float)", borderColor: "var(--paper)" }}>
								<img src={p.detail} alt={`${p.title} shop page on the website`} width="1200" height="604" loading="lazy" className="block w-full" />
							</div>
						)}
					</div>
				</section>

				<section aria-label="The project" className="px-5 py-14 md:px-10 md:py-20">
					<div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
						<article className="min-w-0 md:col-span-7">
							<h2 className="h-section text-2xl md:text-3xl">What they needed</h2>
							<p className="mt-4 text-[1.08rem] leading-[1.75]" style={{ color: "var(--ink-2)" }}>
								{p.brief}
							</p>

							{p.built?.length > 0 && (
								<>
									<h2 className="h-section mt-12 text-2xl md:text-3xl">What we built</h2>
									<ul className="mt-5 grid gap-3">
										{p.built.map((item) => (
											<li key={item} className="flex gap-3 text-[1.05rem] leading-relaxed" style={{ color: "var(--ink-2)" }}>
												<CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0" style={{ color: "var(--azure)" }} aria-hidden="true" />
												{item}
											</li>
										))}
									</ul>
								</>
							)}

							{p.results?.length > 0 && (
								<>
									<h2 className="h-section mt-12 text-2xl md:text-3xl">Results</h2>
									<dl className="mt-5 grid gap-3 sm:grid-cols-2">
										{p.results.map((r) => (
											<div key={r.label} className="card p-5">
												<dt className="text-sm" style={{ color: "var(--ink-3)" }}>
													{r.label}
												</dt>
												<dd className="num mt-1 text-3xl font-bold tracking-[-0.03em]" style={{ color: "var(--ink)" }}>
													{r.value}
												</dd>
												{r.source && (
													<dd className="mt-2 text-[0.8rem]" style={{ color: "var(--ink-3)" }}>
														Source: {r.source}
													</dd>
												)}
											</div>
										))}
									</dl>
								</>
							)}

							{quote && (
								<figure className="card mt-12 p-7">
									<Quotes size={28} weight="fill" style={{ color: "var(--azure)" }} aria-hidden="true" />
									<blockquote className="mt-4 text-[1.1rem] leading-relaxed" style={{ color: "var(--ink)" }}>
										{quote.content}
									</blockquote>
									<figcaption className="mt-5 text-sm">
										<span className="block font-semibold" style={{ color: "var(--ink)" }}>
											{quote.name}
										</span>
										<span style={{ color: "var(--ink-3)" }}>{quote.role}</span>
									</figcaption>
								</figure>
							)}
						</article>

						<aside className="min-w-0 md:col-span-5" aria-label="Project facts">
							<div className="card p-6 md:sticky md:top-24">
								<h2 className="text-sm font-semibold" style={{ color: "var(--ink-3)" }}>
									Project facts
								</h2>
								<table className="facts mt-3 text-[0.95rem]">
									<tbody>
										{facts.map(([label, value]) => (
											<tr key={label}>
												<th scope="row">{label}</th>
												<td style={{ color: "var(--ink)" }}>{value}</td>
											</tr>
										))}
										<tr>
											<th scope="row">Delivered</th>
											<td className="font-semibold" style={{ color: "var(--azure-ink)" }}>
												{p.delivered}
											</td>
										</tr>
										<tr>
											<th scope="row">Live site</th>
											<td>
												<a href={p.link} target="_blank" rel="noopener noreferrer" className="link break-all">
													{host(p.link)}
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</aside>
					</div>
				</section>

				{more.length > 0 && (
					<section aria-labelledby="more-title" className="px-5 pb-16 md:px-10 md:pb-20">
						<div className="mx-auto max-w-6xl">
							<div className="flex items-end justify-between gap-4">
								<h2 id="more-title" className="h-section text-2xl md:text-3xl">
									More of our work
								</h2>
								<Link to="/portfolio" className="link text-[0.95rem]">
									All projects
								</Link>
							</div>
							<ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{more.map((o) => (
									<li key={o.id}>
										<Link to={`/work/${o.slug}`} className="card group block h-full p-3">
											<div className="zoom overflow-hidden rounded-[12px]">
												<img src={o.thumb} alt={`${o.title} website`} width="900" height="482" loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
											</div>
											<p className="mt-4 px-2 text-lg font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
												{o.title}
											</p>
											<p className="mt-1 px-2 pb-2 text-[0.95rem]" style={{ color: "var(--ink-3)" }}>
												{o.delivered}
											</p>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}

				<CtaPanel title="Want a website like" highlight="this one?" lede="Book a free 30-minute consultation. You get a written quote before any work begins." topic="Website" />
			</main>

			<Footer />
		</>
	);
}
