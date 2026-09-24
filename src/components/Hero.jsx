import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "../utils/constants";

const lead = ["Websites", "that", "make", "your", "business"];
const emphasis = ["easy", "to", "trust."];


/* Two columns of real client sites, split so neighbours differ. */
const colA = projects.filter((_, i) => i % 2 === 0);
const colB = projects.filter((_, i) => i % 2 === 1);

function ReelColumn({ items, direction }) {
	/* Rendered twice so translateY(-50%) loops seamlessly. */
	const loop = [...items, ...items];
	return (
		<div className={`reel-col ${direction === "down" ? "reel-down" : ""}`}>
			{loop.map((p, i) => (
				<img
					key={`${p.id}-${i}`}
					src={p.thumb}
					alt={i < items.length ? `${p.title} website` : ""}
					aria-hidden={i >= items.length || undefined}
					width="900"
					height="482"
					className="reel-shot"
				/>
			))}
		</div>
	);
}

const Hero = () => {
	return (
		<section
			className="relative overflow-x-clip px-5 md:px-8"
			style={{ paddingTop: "calc(var(--nav-h) + 3rem)", paddingBottom: "3rem" }}
			aria-labelledby="hero-title"
		>
			<div className="mx-auto grid max-w-7xl items-center gap-12 lg:min-h-[min(calc(100dvh-var(--nav-h)-6rem),720px)] lg:grid-cols-12 lg:gap-8">
				<div className="relative z-10 lg:col-span-7">
					<h1
						id="hero-title"
						className="h-display text-[2.6rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.65rem] 2xl:text-[4rem]"
						style={{ color: "var(--ink)" }}
					>
						{lead.map((w, i) => (
							<span key={w + i}>
								<span className="enter inline-block" style={{ "--d": `${i * 55}ms` }}>
									{w}
								</span>{" "}
							</span>
						))}
						<em className="accent">
							{emphasis.map((w, i) => (
								<span key={w + i}>
									<span className="enter inline-block pb-1" style={{ "--d": `${(lead.length + i) * 55}ms` }}>
										{w}
									</span>
									{i < emphasis.length - 1 ? " " : ""}
								</span>
							))}
						</em>
					</h1>

					<p className="lede enter mt-6 text-lg md:text-xl" style={{ "--d": "480ms" }}>
					We create strategic websites, brand identities, and digital campaigns that build credibility and drive growth.
					</p>

					<div className="enter mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ "--d": "560ms" }}>
						<a href="#contact" className="btn btn-primary">
							Start a project
							<ArrowUpRight size={16} weight="bold" className="arrow" />
						</a>
						<Link to="/portfolio" className="link-arrow">
							See the work
							<ArrowUpRight size={15} className="arrow" />
						</Link>
					</div>
				</div>

				{/* Perspective wall of shipped client sites; bleeds past the grid on the right */}
				<div className="enter relative lg:col-span-5 lg:-mr-[12vw]" style={{ "--d": "250ms" }}>
					<div className="reel" aria-label="Websites we have launched" role="img">
						<div className="reel-plane">
							<ReelColumn items={colA} direction="up" />
							<ReelColumn items={colB} direction="down" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
