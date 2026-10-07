import { Quotes } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { projects, testimonials } from "../utils/constants";
import { BUSINESS } from "../utils/business";

/* Only reviews the client has approved (drafts carry `approved: false`), and one quote
   per person (two quotes under the same name read like placeholder text). */
const reviews = testimonials
	.filter((t) => t.content?.trim() && t.approved !== false)
	.filter((t, i, all) => all.findIndex((o) => o.name === t.name) === i)
	/* each quote shows the live site it is about, so the words point at checkable work */
	.map((t) => ({ ...t, project: projects.find((p) => t.role.includes(p.title.replace(/ (Limited|Ltd)$/, ""))) }));

/* A company-only attribution ("Byoreko" / "Byoreko Holdings Limited") shows once, as the company.
   TODO (owner): ask Byoreko Holdings for the name and role of the person quoted. */
const attribution = (t) => (t.role.startsWith(t.name) ? { name: t.role, role: "Client" } : { name: t.name, role: t.role });

const Testimonials = () => {
	return (
		<Section id="clients" labelledBy="clients-title">
			<SectionHead id="clients-title" label="Client reviews" title="What our clients" highlight="say." align="stack" />

			<div className={`mt-12 grid gap-4 md:grid-cols-2 ${reviews.length >= 3 ? "lg:grid-cols-3" : "lg:max-w-4xl"}`}>
				{reviews.map((t) => {
					const who = attribution(t);
					return (
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
										{who.name}
									</span>
									<span className="block" style={{ color: "var(--ink-3)" }}>
										{who.role}
									</span>
								</span>
							</figcaption>
						</figure>
					);
				})}
			</div>

			{BUSINESS.googleProfileUrl && (
				<a href={BUSINESS.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="link mt-8 inline-block">
					Read our reviews on Google
				</a>
			)}
		</Section>
	);
};

export default Testimonials;
