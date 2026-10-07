import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CaseSheet from "../components/CaseSheet";
import CtaPanel from "../components/CtaPanel";
import Seo from "../components/Seo";
import { projects } from "../utils/constants";
import { portfolioMeta } from "../seo/pages";

export default function PortfolioPage() {
	return (
		<>
			<Seo {...portfolioMeta} />
			<Navbar />

			<main id="main">
				<section aria-labelledby="page-title" className="px-3 pt-3 md:px-4">
					<div className="on-navy rounded-[28px] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36" style={{
							backgroundColor: "var(--navy)",
							backgroundImage:
								"linear-gradient(90deg, rgba(16,21,28,0.94) 0%, rgba(16,21,28,0.82) 55%, rgba(16,21,28,0.6) 100%), url('/photos/hero-laptop.webp')",
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

				<CtaPanel />
			</main>

			<Footer />
		</>
	);
}
