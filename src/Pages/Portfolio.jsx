import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Phone } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CaseSheet from "../components/CaseSheet";
import Seo from "../components/Seo";
import { projects } from "../utils/constants";
import { BUSINESS, telHref } from "../utils/business";

export default function PortfolioPage() {
	return (
		<>
			<Seo
				title="Our Work"
				description={`Websites Maverick Digital Hub has designed and built for Ugandan businesses, including ${projects
					.slice(0, 4)
					.map((p) => p.title)
					.join(", ")}.`}
				path="/portfolio"
			/>
			<Navbar />

			<main id="main">
				<section aria-labelledby="page-title" className="px-3 pt-3 md:px-4">
					<div className="on-navy rounded-[28px] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36" style={{
							backgroundColor: "var(--navy)",
							backgroundImage:
								"linear-gradient(90deg, rgba(16,21,28,0.94) 0%, rgba(16,21,28,0.82) 55%, rgba(16,21,28,0.6) 100%), url('/photos/hero-laptop.jpg')",
							backgroundSize: "cover",
							backgroundPosition: "center 40%",
						}}>
						<div className="mx-auto max-w-6xl">
							<Link to="/" className="link inline-flex items-center gap-1.5 text-[0.95rem]">
								<ArrowLeft size={16} aria-hidden="true" />
								Back to home
							</Link>
							<h1 id="page-title" className="h-hero mt-7 max-w-4xl text-5xl text-white md:text-[4rem]">
								Every project, <span className="hl">all live.</span>
							</h1>
							<p className="lede mt-5">
								{projects.length} websites for Ugandan organisations, from forwarders and retailers to a foundation and a
								scholarship platform. Open any of them and judge the work for yourself.
							</p>
						</div>
					</div>
				</section>

				<section aria-label="Projects" className="px-5 py-14 md:px-10 md:py-20">
					<div className="mx-auto grid max-w-6xl gap-5">
						{projects.map((p, i) => (
							<CaseSheet key={p.id} project={p} eager={i === 0} />
						))}
					</div>
				</section>

				<section aria-labelledby="next-title" className="px-5 pb-20 md:px-10">
					<div className="card mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-10" style={{ background: "var(--azure-tint)", borderColor: "transparent" }}>
						<div>
							<h2 id="next-title" className="h-section text-3xl md:text-4xl">
								Want your business to be <span className="hl">next?</span>
							</h2>
							<p className="lede mt-3">Book a free 30-minute consultation. No obligation.</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Link to="/#book" className="btn btn-navy group">
								Book a free consultation
								<span className="btn-disc" aria-hidden="true">
									<ArrowUpRight size={17} weight="bold" />
								</span>
							</Link>
							<a href={telHref()} className="btn btn-outline btn-plain">
								<Phone size={18} weight="bold" aria-hidden="true" />
								<span className="num">{BUSINESS.phones[0].display}</span>
							</a>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
