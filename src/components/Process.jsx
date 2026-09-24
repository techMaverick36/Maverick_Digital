import Reveal from "./Reveal";

const steps = [
	{
		title: "Brief and alignment",
		desc: "We start by understanding your business, your audience, and what you want this project to achieve.",
	},
	{
		title: "Planning and structure",
		desc: "Next, we shape the structure, content flow, and direction so the project has a strong foundation.",
	},
	{
		title: "Design and production",
		desc: "Then we design and build with care, making sure everything feels aligned, polished, and ready to perform.",
	},
	{
		title: "Review and refinement",
		desc: "We review the details, refine the experience, and make sure the final product feels clean and professional.",
	},
	{
		title: "Launch",
		desc: "When everything is ready, we launch with care so the handover feels smooth and complete.",
	},
	{
		title: "Support and iteration",
		desc: "After launch, we can keep supporting you with updates, improvements, and the next stage of growth.",
	},
];

const Process = () => {
	return (
		<section id="process" className="px-5 py-24 md:px-8 md:py-32" aria-labelledby="process-title">
			<div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
				<Reveal className="lg:col-span-5">
					<div className="lg:sticky lg:top-28">
						<h2 id="process-title" className="h-section text-4xl md:text-5xl" style={{ color: "var(--ink)" }}>
							A simple process that keeps the work <em>clear.</em>
						</h2>
						<p className="lede mt-6 text-lg">
							Good work feels easier when the process makes sense. Each stage stays clear, so decisions
							are easier and the result feels well thought through.
						</p>
					</div>
				</Reveal>

				<div className="relative lg:col-span-7">
					{/* Rail: fills with scroll progress where supported, static elsewhere */}
					<div className="absolute bottom-3 left-[11px] top-3 w-px" style={{ background: "var(--line)" }} aria-hidden="true">
						<div className="rail-fill h-full w-full" style={{ background: "var(--accent)" }} />
					</div>

					<ol className="relative space-y-14 md:space-y-20">
						{steps.map((step, i) => (
							<li key={step.title} className="lit lit-step grid grid-cols-[24px_1fr] gap-6 md:gap-8">
								<span
									className="mono mt-2 flex h-6 w-6 items-center justify-center rounded-full border text-[0.7rem] md:mt-3"
									style={{ borderColor: "var(--line-strong)", background: "var(--bg)", color: "var(--ink-2)" }}
									aria-hidden="true"
								>
									{i + 1}
								</span>
								<div>
									<h3 className="text-3xl font-semibold tracking-[-0.035em] md:text-[2.6rem] md:leading-[1.1]" style={{ color: "var(--ink)" }}>
										{step.title}
									</h3>
									<p className="mt-3 max-w-[52ch] text-lg leading-relaxed" style={{ color: "var(--ink-2)" }}>
										{step.desc}
									</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
};

export default Process;
