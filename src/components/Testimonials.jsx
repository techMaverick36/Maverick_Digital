import { Quotes, Star } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { projects, testimonials } from "../utils/constants";
import { BUSINESS } from "../utils/business";

const MAX_CARDS = 6;

/* Only approved reviews (drafts carry `approved: false`), one per person (two quotes under the
   same name read like placeholder text). Google reviews first: anyone can check them on Google. */
const reviews = testimonials
	.filter((t) => t.content?.trim() && t.approved !== false)
	.filter((t, i, all) => all.findIndex((o) => o.name === t.name) === i)
	.sort((a, b) => (b.source === "google") - (a.source === "google"))
	.slice(0, MAX_CARDS)
	/* client quotes show the live site they are about, so the words point at checkable work */
	.map((t) => ({ ...t, project: t.role ? projects.find((p) => t.role.includes(p.title.replace(/ (Limited|Ltd)$/, ""))) : null }));

/* A company-only attribution ("Byoreko" / "Byoreko Holdings Limited") shows once, as the company.
   TODO (owner): ask Byoreko Holdings for the name and role of the person quoted. */
const attribution = (t) => (t.role.startsWith(t.name) ? { name: t.role, role: "Client" } : { name: t.name, role: t.role });

const Stars = ({ value, size = 16 }) => (
	<span className="flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
		{[1, 2, 3, 4, 5].map((n) => (
			<Star key={n} size={size} weight={n <= Math.round(value) ? "fill" : "regular"} style={{ color: "#f5b100" }} aria-hidden="true" />
		))}
	</span>
);

const Testimonials = () => {
	return (
		<Section id="clients" labelledBy="clients-title">
			<SectionHead id="clients-title" label="Client reviews" title="What our clients" highlight="say." align="stack" />

			{BUSINESS.googleRating && BUSINESS.googleProfileUrl && (
				<a
					href={BUSINESS.googleProfileUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border px-4 py-2 text-[0.95rem]"
					style={{ borderColor: "var(--rule-strong)", color: "var(--ink)" }}
				>
					<span className="num text-lg font-semibold">{BUSINESS.googleRating.toFixed(1)}</span>
					<Stars value={BUSINESS.googleRating} />
					<span style={{ color: "var(--ink-2)" }}>on Google</span>
					<span className="sr-only">(opens our Google reviews in a new tab)</span>
				</a>
			)}

			<div className={`mt-12 grid gap-4 md:grid-cols-2 ${reviews.length >= 3 ? "lg:grid-cols-3" : "lg:max-w-4xl"}`}>
				{reviews.map((t) =>
					t.source === "google" ? (
						<figure key={`g-${t.name}`} className="spot card flex flex-col p-7">
							<Stars value={t.rating ?? 5} />
							<blockquote className="mt-4 text-[1.05rem] leading-relaxed" style={{ color: "var(--ink)" }}>
								{t.content}
							</blockquote>
							<figcaption className="mt-auto pt-6 text-sm">
								<span className="block font-semibold" style={{ color: "var(--ink)" }}>
									{t.name}
								</span>
								<span className="block" style={{ color: "var(--ink-3)" }}>
									Review on Google
								</span>
							</figcaption>
						</figure>
					) : (
						<figure key={`${t.name}-${t.role}`} className="spot card flex flex-col p-7">
							<Quotes size={28} weight="fill" style={{ color: "var(--azure)" }} aria-hidden="true" />
							<blockquote className="mt-4 text-[1.05rem] leading-relaxed" style={{ color: "var(--ink)" }}>
								{t.content}
							</blockquote>
							<figcaption className="mt-auto flex items-center gap-3.5 pt-6 text-sm">
								{t.project && (
									<a href={t.project.link} target="_blank" rel="noopener noreferrer" className="zoom group block w-20 shrink-0 overflow-hidden rounded-[8px] border" style={{ borderColor: "var(--rule-strong)" }}>
										<img src={t.project.thumb} alt={`${t.project.title} website`} width="900" height="482" loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
										<span className="sr-only">(opens in a new tab)</span>
									</a>
								)}
								<span>
									<span className="block font-semibold" style={{ color: "var(--ink)" }}>
										{attribution(t).name}
									</span>
									<span className="block" style={{ color: "var(--ink-3)" }}>
										{attribution(t).role}
									</span>
								</span>
							</figcaption>
						</figure>
					)
				)}
			</div>

			{BUSINESS.googleProfileUrl && (
				<a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="link mt-8 inline-block">
					Read all our reviews on Google
				</a>
			)}
		</Section>
	);
};

export default Testimonials;
