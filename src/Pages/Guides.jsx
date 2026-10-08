import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaPanel from "../components/CtaPanel";
import Seo from "../components/Seo";
import { guides, readMinutes } from "../content/guides";
import { guidesMeta } from "../seo/pages";
import { panelPhoto } from "../utils/panelPhoto";

export default function Guides() {
	return (
		<>
			<Seo {...guidesMeta} />
			<Navbar />

			<main id="main">
				<section aria-labelledby="page-title" className="px-3 pt-3 md:px-4">
					<div className="on-navy rounded-[28px] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36" style={panelPhoto("/photos/digital-profiles.webp", "60% 40%")}>
						<div className="mx-auto max-w-6xl">
							<p className="chip">
								<span className="chip-dot" aria-hidden="true" />
								Guides for business owners
							</p>
							<h1 id="page-title" className="h-hero mt-6 max-w-4xl text-5xl text-white md:text-[4rem]">
								Clear answers about <span className="hl">your website.</span>
							</h1>
							<p className="lede mt-5 max-w-2xl">
								What a website costs in Uganda, how to tell if yours needs updating, and what to prepare before you hire a web designer. Written for business
								owners, in plain English.
							</p>
						</div>
					</div>
				</section>

				<section aria-label="Guides" className="px-5 py-14 md:px-10 md:py-20">
					<ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
						{guides.map((g) => (
							<li key={g.slug}>
								<Link to={`/guides/${g.slug}`} className="card spot group flex h-full flex-col p-3">
									<div className="zoom overflow-hidden rounded-[14px]">
										<img
											src={g.image}
											alt=""
											width="1600"
											height="900"
											loading="lazy"
											className="block aspect-[16/7] w-full object-cover"
											style={{ objectPosition: g.imagePosition }}
										/>
									</div>
									<div className="flex flex-1 flex-col px-4 pb-4 pt-6 md:px-5">
										<p className="text-sm" style={{ color: "var(--ink-3)" }}>
											{readMinutes(g)} min read
										</p>
										<h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]" style={{ color: "var(--ink)" }}>
											{g.title}
										</h2>
										<p className="mt-3 leading-relaxed" style={{ color: "var(--ink-2)" }}>
											{g.intro}
										</p>
										<span className="link mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold">
											Read the guide
											<ArrowUpRight size={16} weight="bold" aria-hidden="true" />
										</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</section>

				<CtaPanel title="Have a question about" highlight="your website?" lede="Book a free 30-minute consultation and ask us directly. No obligation." />
			</main>

			<Footer />
		</>
	);
}
