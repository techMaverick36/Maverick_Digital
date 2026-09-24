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
			<main id="main" className="px-5 md:px-8" style={{ paddingTop: "calc(var(--nav-h) + 6rem)", paddingBottom: "8rem" }}>
				<div className="mx-auto max-w-7xl">
					<p className="mono text-sm" style={{ color: "var(--ink-3)" }}>
						404
					</p>
					<h1 className="h-display enter mt-4 max-w-3xl text-5xl md:text-6xl" style={{ color: "var(--ink)" }}>
						This page does not exist.
					</h1>
					<p className="lede enter mt-6 text-lg" style={{ "--d": "90ms" }}>
						The link may be old, or the page may have moved.
					</p>
					<div className="enter mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ "--d": "180ms" }}>
						<Link to="/" className="btn btn-primary">
							Back to home
						</Link>
						<Link to="/portfolio" className="link-arrow">
							See the work
							<ArrowUpRight size={15} className="arrow" />
						</Link>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
