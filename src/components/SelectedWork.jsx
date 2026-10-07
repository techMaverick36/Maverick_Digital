import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { projects } from "../utils/constants";
import { useReveal } from "../utils/useReveal";

/* Featured, in this exact order (project ids from utils/constants):
   Acts of Love, Kainiu, High Flyer, JOPE, RAC Gadgets. */
const FEATURED_IDS = [5, 1, 6, 2, 7];
const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean);

/* What was delivered, as a light line of type. Unsourced result figures were removed
   (a corporate buyer reads identical percentages as invented). */
const ResultPill = ({ project }) => (
	<span className="flex items-center gap-2.5">
		<CheckCircle size={20} weight="fill" style={{ color: "var(--azure)" }} aria-hidden="true" />
		<span className="leading-tight">
			<span className="block text-[0.72rem] font-medium" style={{ color: "var(--on-navy-3)" }}>
				Delivered
			</span>
			<span className="block text-[0.95rem] font-semibold text-white">{project.delivered ?? "A live website"}</span>
		</span>
	</span>
);

/* Cards rise in and their screenshot wipes up as they reach the viewport (once). */
const WorkCard = ({ project, wide = false, delay = 0 }) => {
	const ref = useReveal(0.25);
	return (
		<Link
			ref={ref}
			to={`/work/${project.slug}`}
			className={`spot work-reveal group flex overflow-hidden rounded-[var(--r-card)] p-3 ${wide ? "flex-col md:col-span-2 md:flex-row md:items-center md:gap-8" : "flex-col"}`}
			style={{ background: "var(--navy-2)", "--d": `${delay}ms` }}
		>
			<div className={`zoom overflow-hidden rounded-[14px] ${wide ? "md:w-[58%] md:shrink-0" : ""}`}>
				<img
					src={wide ? project.image : project.thumb}
					alt={`${project.title} website, designed by Maverick Digital Hub`}
					width={wide ? 1920 : 900}
					height={wide ? 1028 : 482}
					loading="lazy"
					className="block aspect-[16/10] w-full object-cover object-top"
				/>
			</div>
			<div className={wide ? "px-3 pb-4 pt-5 md:p-4" : "flex flex-1 flex-col px-3 pb-3 pt-5"}>
				<p className="text-sm" style={{ color: "var(--on-navy-3)" }}>
					{project.tags.join(", ")}
				</p>
				<h3 className={`mt-2 font-semibold tracking-[-0.025em] text-white ${wide ? "text-3xl md:text-4xl" : "text-xl"}`}>{project.title}</h3>
				{wide && (
					<p className="mt-3 max-w-md leading-relaxed" style={{ color: "var(--on-navy-2)" }}>
						{project.description}
					</p>
				)}
				<div className={`flex items-center justify-between gap-4 ${wide ? "mt-6" : "mt-auto pt-5"}`}>
					<ResultPill project={project} />
					<span className="work-arrow grid h-10 w-10 place-items-center rounded-full border text-white" style={{ borderColor: "var(--navy-3)" }} aria-hidden="true">
						<ArrowUpRight size={17} weight="bold" />
					</span>
				</div>
			</div>
			<span className="sr-only">Read the case study</span>
		</Link>
	);
};

const SelectedWork = () => {
	const [lead, ...rest] = featured;
	return (
		<Section id="work" tone="navy" labelledBy="work-title">
			<SectionHead
				id="work-title"
				label="Selected work"
				title="Real websites for"
				highlight="real businesses."
				lede="Every project below is live. Open any of them and judge the work for yourself."
			/>

			<div className="mt-14 grid gap-4 md:grid-cols-2">
				<WorkCard project={lead} wide />
				{rest.map((p, i) => (
					<WorkCard key={p.id} project={p} delay={(i % 2) * 110} />
				))}
			</div>

			<div className="mt-10 flex justify-center">
				<Link to="/portfolio" className="btn btn-outline group">
					See all {projects.length} projects
					<span className="btn-disc" style={{ background: "var(--navy-3)", color: "#fff" }} aria-hidden="true">
						<ArrowUpRight size={17} weight="bold" />
					</span>
				</Link>
			</div>
		</Section>
	);
};

export default SelectedWork;
