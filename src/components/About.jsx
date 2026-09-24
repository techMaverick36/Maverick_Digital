import Reveal from "./Reveal";

const principles = [
	{
		title: "Commercially focused work",
		copy: "Everything is built around how people see your business, what they understand quickly, and what moves them to take action.",
	},
	{
		title: "Structured delivery",
		copy: "From the first conversation to launch, the process stays organised so you always know what is happening and what comes next.",
	},
	{
		title: "Long-term reliability",
		copy: "The goal is not just to launch something nice. It is to leave you with work you can keep using, growing, and feeling proud of.",
	},
];

const industries = [
	"E-Commerce & Retail",
	"Finance & Banking",
	"Healthcare",
	"Real Estate",
	"Education & Training",
	"Logistics & Forwarding",
	"Hospitality & Tourism",
	"Public Sector & NGOs",
	"Manufacturing",
];

const About = () => {
	return (
		<section id="about" className="px-5 py-24 md:px-8 md:py-32" aria-labelledby="about-title">
			<div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
				{/* Founder */}
				<Reveal fade={false} className="lg:col-span-5">
					<figure className="lg:sticky lg:top-28">
						<div className="img-wipe overflow-hidden rounded-[var(--r-surface)]">
							<div className="settle">
								<img
									src="/Martin2.jpeg"
									alt="Martin Ssemugabi, founder of Maverick Digital Hub"
									width="1024"
									height="1280"
									loading="lazy"
									className="aspect-[4/5] w-full object-cover object-[50%_20%]"
								/>
							</div>
						</div>
						<figcaption className="mt-6">
							<blockquote className="text-lg leading-relaxed" style={{ color: "var(--ink)" }}>
								&ldquo;I started Maverick Digital Hub to help businesses show up better online and
								communicate their value with confidence.&rdquo;
							</blockquote>
							<p className="mt-3 text-sm" style={{ color: "var(--ink-3)" }}>
								Martin Ssemugabi, Founder
							</p>
						</figcaption>
					</figure>
				</Reveal>

				{/* Why */}
				<div className="lg:col-span-7 lg:pt-4">
					<Reveal>
						<h2 id="about-title" className="h-section text-4xl md:text-5xl" style={{ color: "var(--ink)" }}>
							Built for businesses that want to feel <em>polished, clear, and credible.</em>
						</h2>
						<p className="lede mt-6 text-lg">
							We keep things simple and practical. You get thoughtful design, clear communication, and
							work that actually supports the way your business operates.
						</p>
					</Reveal>

					<dl className="mt-14">
						{principles.map((item, i) => (
							<Reveal
								key={item.title}
								delay={i * 70}
								className="grid gap-2 border-t py-7 md:grid-cols-[14rem_1fr] md:gap-8"
								style={{ borderColor: "var(--line)" }}
							>
								<dt className="font-semibold tracking-[-0.01em]" style={{ color: "var(--ink)" }}>
									{item.title}
								</dt>
								<dd className="leading-relaxed" style={{ color: "var(--ink-2)" }}>
									{item.copy}
								</dd>
							</Reveal>
						))}
					</dl>

					<Reveal className="mt-14 rounded-[var(--r-surface)] p-7 md:p-8" style={{ background: "var(--surface-2)" }}>
						<h3 className="font-semibold" style={{ color: "var(--ink)" }}>
							Industries we work with
						</h3>
						<ul className="mt-5 grid gap-x-8 gap-y-2.5 text-[0.95rem] sm:grid-cols-2 xl:grid-cols-3" style={{ color: "var(--ink-2)" }}>
							{industries.map((industry) => (
								<li key={industry}>{industry}</li>
							))}
						</ul>
					</Reveal>
				</div>
			</div>
		</section>
	);
};

export default About;
