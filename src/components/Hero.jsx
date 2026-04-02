const Hero = () => {
	return (
		<section className="relative overflow-hidden pt-36 pb-28 px-6">
			{/* Background atmosphere */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="glow-orb absolute -top-16 -left-24 h-144 w-xl rounded-full blur-[80px]"
					style={{ background: "var(--glow-orb-1)" }}
				/>
				<div
					className="glow-orb absolute -bottom-32 -right-24 h-120 w-120 rounded-full blur-[70px]"
					style={{ background: "var(--glow-orb-2)", animationDelay: "3s" }}
				/>
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-160 rounded-full blur-[90px]"
					style={{ background: "var(--glow-orb-3)" }}
				/>
				<div
					className="absolute inset-0 opacity-[0.6]"
					style={{
						backgroundImage:
							"linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
						backgroundSize: "64px 64px",
					}}
				/>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
				{/* Left column */}
				<div className="space-y-8">
					<span className="section-label animate-fade-up">
						Digital Strategy, Design, and Delivery
					</span>

					<div className="space-y-5 animate-fade-up-1">
						<h1
							className="text-5xl md:text-6xl font-semibold leading-tight roboto_condensed text-balance"
							style={{ color: "var(--text-primary)" }}
						>
							Websites and digital branding that help your business look sharp,
							feel trustworthy, and win more attention.
						</h1>
						<p className="max-w-2xl text-lg leading-8 text-balance" style={{ color: "var(--text-secondary)" }}>
							At Maverick Digital Hub, we create websites, brand systems, and
							digital experiences that make it easier for people to trust what
							you do and choose your business with confidence.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 animate-fade-up-2">
						<a
							href="#contact"
							className="accent-button rounded-lg px-7 py-3.5 font-semibold transition text-center"
						>
							Start a Project
						</a>
						<a
							href="#services"
							className="secondary-button rounded-lg px-7 py-3.5 font-semibold transition text-center"
						>
							Review Services
						</a>
					</div>

					<div className="grid sm:grid-cols-3 gap-4 pt-3 animate-fade-up-3">
						{[
							{ value: "Websites", label: "Designed to present your business clearly and professionally" },
							{ value: "Branding", label: "Built to make your business look consistent and memorable" },
							{ value: "Campaigns", label: "Planned to attract attention and turn interest into action" },
						].map((item) => (
							<div key={item.value} className="surface-panel rounded-2xl p-5 card-glow">
								<div
									className="text-sm uppercase tracking-[0.18em]"
									style={{ color: "var(--text-muted)" }}
								>
									{item.value}
								</div>
								<p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
									{item.label}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Right column */}
				<div className="relative animate-fade-up-2">
					<div
						className="absolute inset-6 rounded-4xl blur-[50px]"
						style={{ background: "var(--glow-orb-1)" }}
					/>
					<div className="surface-panel relative overflow-hidden rounded-4xl p-4">
						<div className="overflow-hidden rounded-3xl border" style={{ borderColor: "var(--border-soft)" }}>
							<img
								src="/martin.jpeg"
								alt="Maverick Digital Hub team lead"
								className="h-128 w-full object-cover object-top"
								style={{ filter: "var(--hero-img-filter)" }}
							/>
						</div>
						<div className="mt-4 grid sm:grid-cols-2 gap-4">
							<div
								className="rounded-2xl border p-5 transition-all duration-300"
								style={{
									background: "var(--card-surface)",
									borderColor: "var(--border-soft)",
								}}
								onMouseEnter={e => {
									e.currentTarget.style.borderColor = "var(--border-strong)";
									e.currentTarget.style.background = "var(--card-surface-hover)";
								}}
								onMouseLeave={e => {
									e.currentTarget.style.borderColor = "var(--border-soft)";
									e.currentTarget.style.background = "var(--card-surface)";
								}}
							>
								<div
									className="text-[11px] uppercase tracking-[0.22em]"
									style={{ color: "var(--text-muted)" }}
								>
									Founder
								</div>
								<div
									className="mt-3 text-base font-semibold uppercase tracking-[0.14em] leading-snug"
									style={{ color: "var(--text-primary)" }}
								>
									MARTIN SSEMUGABI
								</div>
								<p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
									I started Maverick Digital Hub to help businesses show up
									better online and communicate their value with confidence.
								</p>
							</div>
							<div
								className="rounded-2xl border p-5 transition-all duration-300"
								style={{
									background: "var(--card-surface)",
									borderColor: "var(--border-soft)",
								}}
								onMouseEnter={e => {
									e.currentTarget.style.borderColor = "var(--border-strong)";
									e.currentTarget.style.background = "var(--card-surface-hover)";
								}}
								onMouseLeave={e => {
									e.currentTarget.style.borderColor = "var(--border-soft)";
									e.currentTarget.style.background = "var(--card-surface)";
								}}
							>
								<div
									className="text-[11px] uppercase tracking-[0.22em]"
									style={{ color: "var(--text-muted)" }}
								>
									Approach
								</div>
								<div
									className="mt-3 text-base font-semibold leading-snug"
									style={{ color: "var(--text-primary)" }}
								>
									Structured planning and clean execution
								</div>
								<p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
									You can expect clear communication, thoughtful design
									decisions, and support that continues after the launch.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom section bleed */}
			<div
				className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
				style={{ background: "linear-gradient(to bottom, transparent, var(--hero-bleed-color))" }}
			/>
		</section>
	);
};

export default Hero;
