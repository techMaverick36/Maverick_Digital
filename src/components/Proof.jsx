import { projects } from "../utils/constants";
import { Section } from "./Section";

const clientNames = projects.map((p) => p.title.replace(/ (Limited|Ltd)$/, ""));

/* Client names (no logos yet), then the statement and real numbers. */
const Proof = () => {
	const track = (hidden) => (
		<ul className="marquee-track" aria-hidden={hidden || undefined}>
			{clientNames.map((n) => (
				<li key={n} className="whitespace-nowrap text-base font-semibold tracking-[-0.015em] md:text-lg" style={{ color: "var(--ink-3)" }}>
					{n}
				</li>
			))}
		</ul>
	);

	const stats = [
		{ figure: String(projects.length), unit: "", label: "Client websites live today, each one open to inspect." },
		{ figure: "5", unit: "", label: "Services under one roof, from website to brand to IT." },
		{ figure: "1M", unit: "UGX", label: "Starting fee, always confirmed in a written quote." },
		{ figure: "1", unit: "day", label: "Reply time for every enquiry." },
	];

	return (
		<>
			{/* Boxed to the content width, like the rest of the page */}
			<section aria-label="Clients" className="px-5 py-8 md:px-10 md:py-10">
				<div
					className="mx-auto flex max-w-6xl flex-col gap-5 rounded-[var(--r-card)] border px-6 py-6 md:flex-row md:items-center md:gap-8 md:px-8"
					style={{ background: "var(--bg-2)", borderColor: "var(--rule)" }}
				>
					<p className="shrink-0 text-sm font-semibold leading-snug md:w-44" style={{ color: "var(--ink-2)" }}>
						Trusted by businesses across Uganda
					</p>
					<span className="hidden h-10 w-px shrink-0 md:block" style={{ background: "var(--rule-strong)" }} aria-hidden="true" />
					<div className="marquee min-w-0 flex-1">
						{track(false)}
						{track(true)}
					</div>
				</div>
			</section>

			<Section tone="navy" labelledBy="statement">
				<p id="statement" className="max-w-4xl text-[1.7rem] font-semibold leading-[1.25] tracking-[-0.025em] md:text-[2.6rem]">
					<span className="text-white">One point of contact, one written quote, and a website you are proud to send to clients.</span>{" "}
					<span style={{ color: "var(--on-navy-3)" }}>
						Martin leads every project from the first call to launch day, brings in trusted partners on larger builds, and we stay on after launch for support.
					</span>
				</p>

				<ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((s) => (
						<li key={s.label} className="flex min-h-[210px] flex-col justify-between rounded-[20px] p-6" style={{ background: "var(--navy-2)" }}>
							<p className="num text-6xl font-bold leading-none tracking-[-0.045em] text-white">
								{s.unit === "UGX" && (
									<>
										<span className="align-top text-lg font-semibold tracking-normal" style={{ color: "var(--azure)" }}>
											UGX
										</span>{" "}
									</>
								)}
								{s.figure}
								{s.unit === "day" && (
									<>
										{" "}
										<span className="text-2xl font-semibold tracking-normal" style={{ color: "var(--azure)" }}>
											day
										</span>
									</>
								)}
							</p>
							<p className="mt-8 text-[0.95rem] leading-snug" style={{ color: "var(--on-navy-2)" }}>
								{s.label}
							</p>
						</li>
					))}
				</ul>
			</Section>
		</>
	);
};

export default Proof;
