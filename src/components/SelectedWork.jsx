import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "../utils/constants";
import Reveal from "./Reveal";

const MotionArticle = motion.article;
const MotionDiv = motion.div;
/* Home page case studies, in this exact order (project ids from utils/constants):
   Acts of Love, Kainiu, High Flyer, JOPE, RAC Gadgets. */
const FEATURED_IDS = [5, 1, 6, 2, 7];
const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean);

/* "+250% Sales" -> { figure: "+250%", label: "Sales" }; text-only results stay whole. */
function splitImpact(impact) {
	if (!impact) return null;
	const [first, ...rest] = impact.split(" ");
	return /\d/.test(first) ? { figure: first, label: rest.join(" ") } : { figure: impact, label: "" };
}

function useWide() {
	const [wide, setWide] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const update = () => setWide(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return wide;
}

/* Earlier cards shrink and dim as later ones slide over them. */
function StackCard({ project, index, total, progress, animate }) {
	const depth = total - 1 - index;
	const scale = useTransform(progress, [index / total, 1], [1, 1 - depth * 0.05]);
	const shade = useTransform(progress, [index / total, 1], [0, depth * 0.14]);
	const transform = useMotionTemplate`scale(${scale})`;
	const impact = splitImpact(project.stats.impact);

	return (
		<div
			className="md:sticky"
			style={{ top: `calc(var(--nav-h) + 1.5rem + ${index * 22}px)`, marginBottom: index < total - 1 ? "var(--stack-gap)" : 0 }}
		>
			<MotionArticle
				className="group relative origin-top overflow-hidden rounded-[var(--r-surface)] border"
				style={{
					transform: animate ? transform : undefined,
					background: "var(--surface)",
					borderColor: "var(--line)",
					boxShadow: "var(--shadow)",
				}}
			>
				<a
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					className="grid gap-7 p-4 md:grid-cols-12 md:gap-10 md:p-6 lg:p-7"
				>
					<div className="zoom-img overflow-hidden rounded-[var(--r-inner)] border md:col-span-7" style={{ borderColor: "var(--line)" }}>
						<img
							src={project.image}
							alt={`${project.title} website`}
							width="1920"
							height="1028"
							loading="lazy"
							className="aspect-[16/10] w-full object-cover object-top"
						/>
					</div>

					<div className="flex flex-col justify-between gap-10 px-2 pb-3 md:col-span-5 md:px-0 md:py-3">
						<div>
							<p className="text-sm" style={{ color: "var(--ink-3)" }}>
								{project.tags.join(", ")}
							</p>
							<h3 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] lg:text-4xl" style={{ color: "var(--ink)" }}>
								{project.title}
							</h3>
							<p className="mt-4 leading-relaxed" style={{ color: "var(--ink-2)" }}>
								{project.description}
							</p>
						</div>

						<div className="flex items-end justify-between gap-6">
							{impact ? (
								<div>
									<p className="text-5xl font-semibold leading-none tracking-[-0.045em] lg:text-6xl" style={{ color: "var(--accent-text)" }}>
										{impact.figure}
									</p>
									{impact.label && (
										<p className="mt-3 text-[0.95rem] font-medium" style={{ color: "var(--ink-2)" }}>
											{impact.label}
										</p>
									)}
									{project.stats.duration && (
										<p className={`${impact.label ? "mt-0.5" : "mt-3"} text-sm`} style={{ color: "var(--ink-3)" }}>
											Built in {project.stats.duration}
										</p>
									)}
								</div>
							) : (
								<p className="text-[0.95rem] font-medium" style={{ color: "var(--ink-2)" }}>
									Visit the live site
								</p>
							)}
							<span
								className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
								style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}
								aria-hidden="true"
							>
								<ArrowUpRight size={18} className="arrow" />
							</span>
							<span className="sr-only">Visit {project.title} (opens in a new tab)</span>
						</div>
					</div>
				</a>

				{/* depth shade for cards that have been covered */}
				{animate && (
					<MotionDiv
						aria-hidden="true"
						className="pointer-events-none absolute inset-0"
						style={{ opacity: shade, background: "var(--bg)" }}
					/>
				)}
			</MotionArticle>
		</div>
	);
}

const SelectedWork = () => {
	const ref = useRef(null);
	const wide = useWide();
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
	const animate = wide && !reduce;

	return (
		<section id="work" className="px-5 pb-24 pt-8 md:px-8 md:pb-32" aria-labelledby="work-title">
			<div className="mx-auto max-w-7xl">
				<Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
					<h2 id="work-title" className="h-section text-4xl md:text-5xl" style={{ color: "var(--ink)" }}>
						Selected work
					</h2>
					<Link to="/portfolio" className="link-arrow">
						See the work
						<ArrowUpRight size={15} className="arrow" />
					</Link>
				</Reveal>

				<div ref={ref} className="relative" style={{ "--stack-gap": wide ? "22vh" : "1.5rem" }}>
					{featured.map((project, i) => (
						<StackCard
							key={project.id}
							project={project}
							index={i}
							total={featured.length}
							progress={scrollYProgress}
							animate={animate}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default SelectedWork;
