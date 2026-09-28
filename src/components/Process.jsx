import { Section, SectionHead } from "./Section";

const steps = [
	{ title: "Free consultation", desc: "A 30-minute call or meeting. We learn about your business, your goals and your budget." },
	{ title: "Proposal and quote", desc: "You receive a written proposal with the scope, timeline and fee. Nothing starts until you approve it." },
	{ title: "Design", desc: "We design your pages in your brand and share them for your feedback before anything is built." },
	{ title: "Build and review", desc: "We build the site, test it on phones and computers, and refine it with you." },
	{ title: "Launch", desc: "Your site goes live, with the basics in place so customers can find you on Google." },
	{ title: "Support", desc: "After launch we stay available for updates, improvements and the next stage of growth." },
];

const Process = () => {
	return (
		<Section id="process" labelledBy="process-title">
			<SectionHead
				id="process-title"
				label="How it works"
				title="From first call to launch in"
				highlight="six clear steps."
				lede="You always know what happens next, what it costs and when it will be ready."
			/>

			<ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
				{steps.map((s, i) => (
					<li key={s.title} className="relative flex gap-5">
						<span
							className="num grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-semibold"
							style={i === 0 ? { background: "var(--azure)", color: "var(--on-azure)" } : { background: "var(--azure-tint)", color: "var(--azure-ink)" }}
							aria-hidden="true"
						>
							{i + 1}
						</span>
						<div>
							<h3 className="text-[1.2rem] font-semibold tracking-[-0.015em]" style={{ color: "var(--ink)" }}>
								<span className="sr-only">Step {i + 1}: </span>
								{s.title}
							</h3>
							<p className="mt-1.5 leading-relaxed" style={{ color: "var(--ink-2)" }}>
								{s.desc}
							</p>
						</div>
					</li>
				))}
			</ol>
		</Section>
	);
};

export default Process;
