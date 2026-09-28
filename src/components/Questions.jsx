import { ArrowUpRight, Phone, Plus, WhatsappLogo } from "@phosphor-icons/react";
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

				{/* Still deciding: talk to a person */}
				<aside className="lg:col-span-5 lg:pt-4" aria-label="Talk to us">
					<div className="on-navy sticky top-28 overflow-hidden rounded-[var(--r-card)]" style={{ background: "var(--navy)" }}>
						<img src="/photos/digital-profiles.jpg" alt="" width="1200" height="653" loading="lazy" className="aspect-[16/9] w-full object-cover" />
						<div className="p-7">
							<h3 className="text-2xl font-semibold tracking-[-0.025em] text-white">Still deciding?</h3>
							<p className="lede mt-2 !text-base">
								Tell {first} what you have in mind. You will get honest advice, whether or not we end up working together.
							</p>
							<div className="mt-6 grid gap-2.5">
								<a href="#book" className="btn btn-azure group justify-between">
									Book a free consultation
									<span className="btn-disc" aria-hidden="true">
										<ArrowUpRight size={17} weight="bold" />
									</span>
								</a>
								<div className="grid grid-cols-2 gap-2.5">
									<a href={telHref()} className="btn btn-outline btn-plain btn-sm">
										<Phone size={17} weight="bold" aria-hidden="true" />
										Call
									</a>
									<a href={whatsappHref(`Hello ${first}, I have a question about working with ${BUSINESS.name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain btn-sm">
										<WhatsappLogo size={17} weight="fill" aria-hidden="true" />
										WhatsApp
									</a>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</Section>
	);
};

export default Questions;
