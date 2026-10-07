import { Phone, Plus, WhatsappLogo } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { FAQ } from "../utils/faq";
import { BUSINESS, telHref, whatsappHref } from "../utils/business";

const Questions = () => {
	const first = BUSINESS.founder.split(" ")[0];
	return (
		<Section id="faq" tone="mist" labelledBy="faq-title">
			<div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
				<div className="lg:col-span-7">
					<SectionHead id="faq-title" label="FAQ" title="Questions business owners" highlight="ask us." align="stack" />
					<div className="mt-10 grid gap-3">
						{FAQ.map((item, i) => (
							<details key={item.q} className="faq card px-6" open={i === 0}>
								<summary className="flex items-center justify-between gap-6 py-5 text-[1.08rem] font-semibold" style={{ color: "var(--ink)" }}>
									{item.q}
									<span className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "var(--azure-tint)", color: "var(--azure-ink)" }} aria-hidden="true">
										<Plus size={17} weight="bold" />
									</span>
								</summary>
								<p className="max-w-[62ch] pb-6 leading-relaxed" style={{ color: "var(--ink-2)" }}>
									{item.a}
								</p>
							</details>
						))}
					</div>
				</div>

				{/* A question that is not listed: ask Martin directly. Booking follows right
				    below, so this aside offers the quick channels, not another Book button. */}
				<aside className="lg:col-span-5 lg:pt-4" aria-label="Ask a question">
					<div className="on-navy sticky top-28 rounded-[var(--r-card)] p-7" style={{ background: "var(--navy)" }}>
						<h3 className="text-2xl font-semibold tracking-[-0.025em] text-white">Question not here?</h3>
						<p className="lede mt-2 !text-base">
							Ask {first} on WhatsApp or call directly. You will get a straight answer, whether or not we end up working together.
						</p>
						<div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
							<a href={whatsappHref(`Hello ${first}, I have a question about working with ${BUSINESS.name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-plain">
								<WhatsappLogo size={18} weight="fill" aria-hidden="true" />
								Ask on WhatsApp
							</a>
							<a href={telHref()} className="btn btn-outline btn-plain">
								<Phone size={18} weight="bold" aria-hidden="true" />
								Call {first}
							</a>
						</div>
					</div>
				</aside>
			</div>
		</Section>
	);
};

export default Questions;
