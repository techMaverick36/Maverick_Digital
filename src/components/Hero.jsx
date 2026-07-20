import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

const stats = [
	{ value: "10+", label: "Projects delivered" },
	{ value: "6+", label: "Industries served" },
	{ value: "1 day", label: "Average response" },
];

const Hero = () => {
	return (
		<section className="relative overflow-hidden pt-36 pb-20 px-6">
			{/* Background atmosphere */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="float-slow absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full blur-[110px]"
					style={{ background: "var(--orb-1)" }}
				/>
				<div
					className="float-slower absolute top-40 -right-32 h-[26rem] w-[26rem] rounded-full blur-[110px]"
					style={{ background: "var(--orb-2)" }}
				/>
				<div
					className="absolute bottom-0 left-1/3 h-72 w-96 rounded-full blur-[120px]"
					style={{ background: "var(--orb-3)" }}
				/>
				<div
					className="absolute inset-0"
					style={{
						backgroundImage:
							"linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
						backgroundSize: "72px 72px",
						maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
						WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
					}}
				/>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
				{/* Left column */}
				<div>
					<span className="section-label animate-fade-up">Available for new projects</span>

					<h1
						className="display animate-fade-up-1 mt-7 text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] text-balance"
						style={{ color: "var(--text-primary)" }}
					>
						Digital experiences that make your business{" "}
						<span className="grad-text">impossible to ignore.</span>
					</h1>

					<p
						className="animate-fade-up-2 mt-6 max-w-xl text-lg leading-8"
						style={{ color: "var(--text-secondary)" }}
					>
						Maverick Digital Hub designs websites, brand systems, and digital
						experiences that make people trust what you do — and choose you with
						confidence.
					</p>

					<div className="animate-fade-up-3 mt-9 flex flex-col sm:flex-row gap-4">
						<a href="#contact" className="btn-primary px-8 py-4 text-base">
							Start a Project
							<FiArrowUpRight className="btn-arrow" size={18} />
						</a>
						<a href="#services" className="btn-ghost px-8 py-4 text-base">
							Explore Services
						</a>
					</div>

					<div
						className="animate-fade-up-4 mt-12 grid grid-cols-3 gap-6 border-t pt-8 max-w-lg"
						style={{ borderColor: "var(--border-soft)" }}
					>
						{stats.map((stat) => (
							<div key={stat.label}>
								<div className="display text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
									{stat.value}
								</div>
								<div className="mt-1 text-xs md:text-sm" style={{ color: "var(--text-muted)" }}>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right column — portrait card */}
				<div className="relative animate-fade-up-2 max-w-md mx-auto lg:max-w-none w-full">
					<div
						className="absolute -inset-4 rounded-[2.5rem] rotate-3 opacity-70"
						style={{ background: "var(--accent-gradient)", filter: "blur(2px)" }}
						aria-hidden="true"
					/>
					<div
						className="relative overflow-hidden rounded-[2.25rem] border"
						style={{ background: "var(--bg-elevated)", borderColor: "var(--border-soft)" }}
					>
						<img
							src="/martin.jpeg"
							alt="Martin Ssemugabi, founder of Maverick Digital Hub"
							className="h-[26rem] md:h-[30rem] w-full object-cover object-top"
							style={{ filter: "var(--hero-img-filter)" }}
							width="480"
							height="480"
						/>
						<div className="p-6">
							<div className="flex items-start justify-between gap-4">
								<div>
									<div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
										Founder
									</div>
									<div className="display mt-1.5 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
										Martin Ssemugabi
									</div>
								</div>
								<span
									className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
									style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}
								>
									<FiMapPin size={12} />
									Kampala, UG
								</span>
							</div>
							<p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
								&ldquo;I started Maverick Digital Hub to help businesses show up
								better online and communicate their value with confidence.&rdquo;
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
