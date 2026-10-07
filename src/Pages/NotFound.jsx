import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

export default function NotFound() {
	return (
		<>
			<Seo title="Page not found" description="This page does not exist." path="/404" />
			<Navbar />
			<main id="main" className="px-3 py-3 md:px-4">
				<div className="on-navy rounded-[28px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-36" style={{ background: "var(--navy)" }}>
					<div className="mx-auto max-w-6xl">
						<p className="num text-lg font-semibold" style={{ color: "var(--azure)" }}>
							404
						</p>
						<h1 className="h-hero mt-4 max-w-3xl text-5xl text-white md:text-6xl">
							This page does not <span className="hl">exist.</span>
						</h1>
						<p className="lede mt-6">The link may be old, or the page may have moved.</p>
						<div className="mt-9 flex flex-wrap gap-3">
							<Link to="/" className="btn btn-primary group">
								Back to home
								<span className="btn-disc" aria-hidden="true">
									<ArrowUpRight size={17} weight="bold" />
								</span>
							</Link>
							<Link to="/#book" className="btn btn-outline btn-plain">
								Book a free consultation
							</Link>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
