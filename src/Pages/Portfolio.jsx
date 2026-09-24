import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "../utils/constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

const approach = [
	{ title: "Structured discovery", copy: "We define the scope before design and development begin." },
	{
		title: "Clear visual standards",
		copy: "Every design choice is shaped to make the business feel clear, credible, and consistent.",
	},
	{
		title: "Responsive delivery",
		copy: "The final result is reviewed across devices so it feels smooth and polished wherever people see it.",
	},
	{
		title: "Support after launch",
		copy: "When needed, we keep improving the work so it continues to support the business well.",
	},
];

/*
 * Rhythm: wide feature row, then a pair, repeating. Adjusted at the end so a
 * pair is never left with one card (empty cell) and two trailing items pair up.
 */
function groupProjects(list) {
	const groups = [];
	let i = 0;
	let wantWide = true;
	while (i < list.length) {
		const remaining = list.length - i;
		const wide = remaining === 1 || (wantWide && remaining !== 2);
		if (wide) {
			groups.push({ type: "wide", items: [list[i]] });
			i += 1;
		} else {
			groups.push({ type: "pair", items: list.slice(i, i + 2) });
			i += 2;
		}
		wantWide = !wide;
	}
	return groups;
}

function Stats({ stats }) {
	if (!stats || Object.keys(stats).length === 0) return null;
	return (
		<dl className="flex flex-wrap gap-x-8 gap-y-3">
			{Object.entries(stats).map(([key, value]) => (
				<div key={key}>
					<dt className="text-xs capitalize" style={{ color: "var(--ink-3)" }}>
						{key}
					</dt>
					<dd className="mono mt-0.5 text-sm" style={{ color: "var(--ink)" }}>
						{value}
					</dd>
				</div>
			))}
		</dl>
	);
}

function ProjectImage({ project, priority }) {
	return (
		<div className="img-wipe relative overflow-hidden rounded-[var(--r-surface)] border" style={{ borderColor: "var(--line)" }}>
			<div className="settle zoom-img">
				<img
					src={project.image}
					alt={`${project.title} website`}
					width="1920"
					height="1028"
					loading={priority ? "eager" : "lazy"}
					className="aspect-[16/9] w-full object-cover object-top"
				/>
			</div>
			{/* optional second screen, e.g. the shop page, layered over the corner */}
			{project.detail && (
				<img
					src={project.detail}
					alt={`${project.title} shop page`}
					width="1200"
					height="604"
					loading="lazy"
					className="reveal-child absolute bottom-4 right-4 hidden w-[38%] rounded-[var(--r-inner)] border sm:block md:bottom-6 md:right-6"
					style={{ borderColor: "var(--line)", boxShadow: "var(--shadow)", "--d": "600ms" }}
				/>
			)}
		</div>
	);
}

function ProjectTitle({ project, className = "" }) {
	return (
		<h2 className={`flex items-start gap-2 font-semibold tracking-[-0.03em] ${className}`} style={{ color: "var(--ink)" }}>
			{project.title}
			<ArrowUpRight size={20} className="arrow mt-1.5 shrink-0" style={{ color: "var(--ink-3)" }} aria-hidden="true" />
			<span className="sr-only">(opens in a new tab)</span>
		</h2>
	);
}

function WideProject({ project, priority }) {
	return (
		<Reveal fade={false}>
			<a
				href={project.link}
				target="_blank"
				rel="noopener noreferrer"
				className="group grid items-end gap-8 lg:grid-cols-12 lg:gap-10"
			>
				<div className="lg:col-span-8">
					<ProjectImage project={project} priority={priority} />
				</div>
				<div className="reveal-child lg:col-span-4 lg:pb-2" style={{ "--d": "200ms" }}>
					<p className="text-sm" style={{ color: "var(--ink-3)" }}>
						{project.tags.join(", ")}
					</p>
					<ProjectTitle project={project} className="mt-2 text-3xl md:text-4xl" />
					<p className="mt-4 leading-relaxed" style={{ color: "var(--ink-2)" }}>
						{project.description}
					</p>
					<div className="mt-7">
						<Stats stats={project.stats} />
					</div>
				</div>
			</a>
		</Reveal>
	);
}

function PairProject({ project, delay }) {
	return (
		<Reveal fade={false} delay={delay}>
			<a href={project.link} target="_blank" rel="noopener noreferrer" className="group block">
				<ProjectImage project={project} />
				<div className="reveal-child mt-6" style={{ "--d": `${delay + 150}ms` }}>
					<p className="text-sm" style={{ color: "var(--ink-3)" }}>
						{project.tags.join(", ")}
					</p>
					<ProjectTitle project={project} className="mt-2 text-2xl md:text-[1.75rem]" />
					<p className="mt-3 max-w-[52ch] leading-relaxed" style={{ color: "var(--ink-2)" }}>
						{project.description}
					</p>
					<div className="mt-6">
						<Stats stats={project.stats} />
					</div>
				</div>
			</a>
		</Reveal>
	);
}

export default function PortfolioPage() {
	const groups = groupProjects(projects);

	return (
		<>
			<Seo
				title="Portfolio"
				description="Explore Maverick Digital Hub portfolio projects in web design and digital delivery for businesses that want a clearer, more credible online presence."
				path="/portfolio"
			/>
			<Navbar />

			<main id="main">
				<section className="px-5 md:px-8" style={{ paddingTop: "calc(var(--nav-h) + 4rem)", paddingBottom: "4rem" }}>
					<div className="mx-auto max-w-7xl">
						<h1 className="h-display enter max-w-4xl text-[2.6rem] sm:text-5xl lg:text-[4rem]" style={{ color: "var(--ink)" }}>
							Work for businesses ready to <em className="accent">show up better online.</em>
						</h1>
						<p className="lede enter mt-6 text-lg md:text-xl" style={{ "--d": "90ms" }}>
							These projects show how thoughtful design and clear communication can help a business feel
							more credible, more polished, and easier to trust.
						</p>
					</div>
				</section>

				<section className="px-5 pb-24 md:px-8 md:pb-32" aria-label="Projects">
					<div className="mx-auto max-w-7xl space-y-20 md:space-y-28">
						{groups.map((group, gi) =>
							group.type === "wide" ? (
								<WideProject key={group.items[0].id} project={group.items[0]} priority={gi === 0} />
							) : (
								<div key={group.items[0].id} className="grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-10">
									{group.items.map((project, i) => (
										<PairProject key={project.id} project={project} delay={i * 120} />
									))}
								</div>
							)
						)}
					</div>
				</section>

				<section className="border-t px-5 py-24 md:px-8 md:py-32" style={{ borderColor: "var(--line)" }} aria-labelledby="approach-title">
					<div className="mx-auto max-w-7xl">
						<Reveal className="mb-14 max-w-3xl">
							<h2 id="approach-title" className="h-section text-4xl md:text-5xl" style={{ color: "var(--ink)" }}>
								Work that looks good <em>and works hard.</em>
							</h2>
							<p className="lede mt-5 text-lg">
								We care about work that represents the client well and supports real business goals.
							</p>
						</Reveal>
						<div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
							{approach.map((item, i) => (
								<Reveal key={item.title} delay={i * 70} className="border-t py-7" style={{ borderColor: "var(--line-strong)" }}>
									<h3 className="font-semibold" style={{ color: "var(--ink)" }}>
										{item.title}
									</h3>
									<p className="mt-2 leading-relaxed" style={{ color: "var(--ink-2)" }}>
										{item.copy}
									</p>
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<section className="px-5 pb-24 md:px-8 md:pb-32" aria-labelledby="cta-title">
					<Reveal className="mx-auto max-w-7xl">
						<div
							className="grid items-center gap-8 rounded-[var(--r-surface)] p-8 md:grid-cols-[1fr_auto] md:p-14"
							style={{ background: "var(--accent-soft)" }}
						>
							<div>
								<h2 id="cta-title" className="h-section text-3xl md:text-4xl" style={{ color: "var(--ink)" }}>
									Want your business to feel this polished online?
								</h2>
								<p className="lede mt-4 text-lg">
									We can help you shape the brief, define the scope, and make a strong first impression.
								</p>
							</div>
							<Link to="/#contact" className="btn btn-primary justify-self-start">
								Start a project
								<ArrowUpRight size={16} weight="bold" className="arrow" />
							</Link>
						</div>
					</Reveal>
				</section>
			</main>

			<Footer />
		</>
	);
}
