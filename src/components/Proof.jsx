import { projects } from "../utils/constants";
import { Section } from "./Section";

const clientNames = projects.map((p) => p.title.replace(/ (Limited|Ltd)$/, ""));

/* Client names (no logos yet), straight under the hero and above the work. */
export const Clients = () => {
	const track = (hidden) => (
		<ul className="marquee-track" aria-hidden={hidden || undefined}>
			{clientNames.map((n) => (
				<li key={n} className="whitespace-nowrap text-base font-semibold tracking-[-0.015em] md:text-lg" style={{ color: "var(--ink-3)" }}>
					{n}
				</li>
			))}
		</ul>
	);

	return (
		/* Boxed to the content width, like the rest of the page */
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
	);
};

/* Each word lights up as it scrolls into place (CSS scroll timeline; static where unsupported). */
const Scrub = ({ text }) =>
	text.split(" ").map((w, i) => (
		<span key={i}>
			<span className="scrub-w">{w}</span>{" "}
		</span>
	));

/* The two-tone statement, placed after the work it sums up. The stat tiles that
   used to follow it were removed (critique 2026-10-01): the work already shows
   the client count, and the fee and reply time sit on the hero cards. */
export const Statement = () => (
	<Section labelledBy="statement">
		<p id="statement" className="max-w-4xl text-[1.7rem] font-semibold leading-[1.3] tracking-[-0.025em] md:text-[2.6rem]">
			<span className="text-white">
				<Scrub text="One point of contact, one written quote, and a website you are proud to send to clients." />
			</span>
			{/* grey half no longer restates About (critique 2026-10-01: "one point of contact" appeared 5 times) */}
			<span style={{ color: "var(--ink-3)" }}>
				<Scrub text="That is how every project runs, whatever the size of the job." />
			</span>
		</p>
	</Section>
);
