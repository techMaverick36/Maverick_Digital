import { Quotes } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { testimonials } from "../utils/constants";
import { BUSINESS } from "../utils/business";

/* Subtle by request: the clients' words and names only. */
const Testimonials = () => {
	return (
		<Section id="clients" labelledBy="clients-title">
			<SectionHead id="clients-title" label="Client reviews" title="What our clients" highlight="say." align="stack" />

			<div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{testimonials.map((t) => (
					<figure key={`${t.name}-${t.role}`} className="card flex flex-col p-7">
						<Quotes size={28} weight="fill" style={{ color: "var(--azure)" }} aria-hidden="true" />
						<blockquote className="mt-4 text-[1.05rem] leading-relaxed" style={{ color: "var(--ink)" }}>
							{t.content}
						</blockquote>
						<figcaption className="mt-auto pt-6 text-sm">
							<span className="block font-semibold" style={{ color: "var(--ink)" }}>
								{t.name}
							</span>
							<span className="block" style={{ color: "var(--ink-3)" }}>
								{t.role}
							</span>
						</figcaption>
					</figure>
				))}
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
