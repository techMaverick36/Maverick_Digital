import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { BUSINESS } from "../utils/business";

const reasons = [
	{
		title: "Work built to win you business",
		copy: "Every page is shaped around what your customers need to see, understand and do next.",
	},
	{
		title: "A clear process, start to finish",
		copy: "A written quote, agreed timelines and regular updates, so you always know where things stand.",
	},
	{
		title: "Support after launch",
		copy: "We stay with you for updates, improvements and the next stage of growth.",
	},
];

const About = () => {
	const first = BUSINESS.founder.split(" ")[0];
	return (
		<Section id="about" labelledBy="about-title">
			<div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
				{/* Photo collage */}
				<div className="relative lg:col-span-6">
					<img
						src="/Martin2.jpeg"
						alt={`${BUSINESS.founder}, founder of ${BUSINESS.name}`}
						width="1024"
						height="1280"
						loading="lazy"
						className="aspect-[4/5] w-[82%] rounded-[var(--r-card)] object-cover"
					/>
					<img
						src="/photos/wireframe-sketch.jpg"
						alt="Website wireframes sketched on paper beside a laptop"
						width="1200"
						height="801"
						loading="lazy"
						className="absolute bottom-[-6%] right-0 aspect-[4/3] w-[52%] rounded-[var(--r-card)] border-[6px] object-cover"
						style={{ boxShadow: "var(--shadow-card)", borderColor: "var(--bg)" }}
					/>
					<div className="float-card absolute left-4 top-4 flex items-center gap-3 px-4 py-3" style={{ "--d": "0ms" }}>
						<img src="/brand-mark.png" alt="" width="28" height="28" className="h-7 w-7" />
						<p className="text-sm font-semibold leading-tight" style={{ color: "var(--ink)" }}>
							You speak to {first},
							<br />
							<span className="font-normal" style={{ color: "var(--ink-3)" }}>
								not a sales team
							</span>
						</p>
					</div>
				</div>

				<div className="lg:col-span-6">
					<SectionHead id="about-title" label="About us" title="A founder-led studio you can" highlight="actually reach." align="stack" />
					<p className="lede mt-6">
						{BUSINESS.name} was started by {BUSINESS.founder} to help Ugandan businesses show up online with the same
						quality they bring to their work. Small enough to know your business, organised enough to deliver.
					</p>

					<ul className="mt-8 grid gap-5">
						{reasons.map((r) => (
							<li key={r.title} className="flex gap-4">
								<CheckCircle size={26} weight="fill" className="shrink-0" style={{ color: "var(--azure)" }} aria-hidden="true" />
								<div>
									<h3 className="text-[1.1rem] font-semibold tracking-[-0.01em]" style={{ color: "var(--ink)" }}>
										{r.title}
									</h3>
									<p className="mt-1 leading-relaxed" style={{ color: "var(--ink-2)" }}>
										{r.copy}
									</p>
								</div>
							</li>
						))}
					</ul>

					<div className="mt-10 flex flex-wrap items-center gap-5">
						<a href="#book" className="btn btn-navy group">
							Meet {first} on a free call
							<span className="btn-disc" aria-hidden="true">
								<ArrowUpRight size={17} weight="bold" />
							</span>
						</a>
						<p className="text-sm" style={{ color: "var(--ink-3)" }}>
							<span className="block font-semibold" style={{ color: "var(--ink)" }}>
								{BUSINESS.founder}
							</span>
							Founder, {BUSINESS.name}
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default About;
