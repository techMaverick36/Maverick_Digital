import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { BUSINESS, formatUGX } from "../utils/business";
import { requestBooking } from "../utils/bookingEvents";

/* TODO (owner): confirm package names and inclusions. Only the starting fee
   (UGX 1,000,000) is confirmed; the other two are quoted after consultation. */
const packages = [
	{
		name: "Business Website",
		for: "For companies that need a credible, professional website.",
		includes: ["Custom design in your brand", "Mobile-friendly on every device", "Call and WhatsApp buttons", "Enquiry form", "Google search basics"],
		fee: formatUGX(BUSINESS.startingPrice),
		prefix: "From",
		service: "Website",
		featured: true,
	},
	{
		name: "Brand and Website",
		for: "For new businesses, or a business ready for a new look.",
		includes: ["Logo and brand identity", "Brand guidelines", "Everything in Business Website"],
		fee: "Custom quote",
		service: "Branding",
	},
	{
		name: "Systems and Support",
		for: "For online shops, customer portals and ongoing care.",
		includes: ["Online shops and web applications", "Social media management", "Business IT setup and support"],
		fee: "Custom quote",
		service: "Online shop or system",
	},
];

const Fees = () => {
	return (
		<Section id="pricing" tone="mist" labelledBy="pricing-title">
			<SectionHead
				id="pricing-title"
				label="Pricing"
				title="Clear pricing, so you can"
				highlight="plan with confidence."
				lede="Every project is confirmed in a written quote after your free consultation, before any work begins."
			/>

			<div className="mt-14 grid gap-4 lg:grid-cols-3">
				{packages.map((p) => {
					const dark = p.featured;
					return (
						<article
							key={p.name}
							className={`spot flex flex-col rounded-[var(--r-card)] border p-7 md:p-8 ${dark ? "on-navy" : ""}`}
							style={dark ? { background: "var(--navy)", borderColor: "var(--azure)", boxShadow: "var(--shadow-card)" } : { background: "var(--paper)", borderColor: "var(--rule)" }}
						>
							<h3 className="text-xl font-semibold tracking-[-0.02em]" style={{ color: dark ? "#fff" : "var(--ink)" }}>
								{p.name}
							</h3>
							<p className="mt-2 leading-relaxed" style={{ color: dark ? "var(--on-navy-2)" : "var(--ink-2)" }}>
								{p.for}
							</p>

							<p className="mt-7 border-t pt-6" style={{ borderColor: dark ? "var(--navy-3)" : "var(--rule)" }}>
								{p.prefix && (
									<span className="block text-sm font-medium" style={{ color: dark ? "var(--on-navy-3)" : "var(--ink-3)" }}>
										{p.prefix}
									</span>
								)}
								<span className="num mt-1 block text-[2.1rem] font-semibold leading-none tracking-[-0.035em]" style={{ color: dark ? "#fff" : "var(--ink)" }}>
									{p.fee}
								</span>
							</p>

							<ul className="mb-9 mt-7 grid gap-2.5">
								{p.includes.map((item) => (
									<li key={item} className="flex items-start gap-2.5" style={{ color: dark ? "#fff" : "var(--ink)" }}>
										<Check size={17} weight="bold" className="mt-[3px] shrink-0" style={{ color: "var(--azure)" }} aria-hidden="true" />
										{item}
									</li>
								))}
							</ul>

							{/* One Book button on the featured package; the quoted packages get a quieter link
							    that still preselects their topic in the booking form. */}
							{dark ? (
								<a href="#book" onClick={() => requestBooking(p.service)} className="btn btn-primary group mt-auto w-full justify-between">
									Book a free consultation
									<span className="btn-disc" aria-hidden="true">
										<ArrowUpRight size={17} weight="bold" />
									</span>
								</a>
							) : (
								<a href="#book" onClick={() => requestBooking(p.service)} className="link group mt-auto inline-flex items-center gap-1.5 self-start">
									Ask for a quote
									<ArrowUpRight size={16} weight="bold" className="link-arrow" aria-hidden="true" />
								</a>
							)}
						</article>
					);
				})}
			</div>

			<p className="mt-8 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
				Comparing quotes?{" "}
				<Link to="/guides/website-cost-in-uganda" className="link">
					Read what a website really costs in Uganda
				</Link>
				, including the yearly costs most quotes leave out.
			</p>
		</Section>
	);
};

export default Fees;
