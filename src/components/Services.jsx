import { ArrowUpRight, Browser, CursorClick, PenNib, Plugs } from "@phosphor-icons/react";
import { Section, SectionHead } from "./Section";
import { services } from "../utils/constants";
import { Link } from "react-router-dom";

/* A calm list (owner asked for less busy): one row per service, no imagery.
   `index` points into utils/constants `services`; Social Media Management (2) and Data Analysis (5)
   are hidden for now (owner, 2026-10-08); add a row back to show one again. */
const rows = [
	{ index: 0, icon: Browser, slug: "web-design" },
	{ index: 3, icon: PenNib, slug: "branding" },
	{ index: 4, icon: CursorClick, slug: "ui-ux-design" },
	{ index: 1, icon: Plugs, slug: "it-support" },
];

const Services = () => {
	return (
		<Section id="services" tone="mist" labelledBy="services-title">
			<SectionHead
				id="services-title"
				label="Web design services in Kampala"
				title="From your first website"
				highlight="to ongoing support."
				lede="Most clients start with a website, then add branding, app design or IT support as they grow. Pick a service to see what is included and what it costs."
			/>

			<ul className="mt-14 border-b" style={{ borderColor: "var(--rule)" }}>
				{rows.map((r) => {
					const s = services[r.index];
					const Icon = r.icon;
					return (
						<li key={s.title}>
							<Link
								to={`/services/${r.slug}`}
								className="service-row group grid items-center gap-4 border-t py-7 md:grid-cols-12 md:gap-8 md:py-8"
								style={{ borderColor: "var(--rule)" }}
							>
								<span className="flex items-center gap-4 md:col-span-5">
									<span className="icon-tile shrink-0">
										<Icon size={24} weight="duotone" aria-hidden="true" />
									</span>
									<span className="service-name text-xl font-semibold tracking-[-0.02em] md:text-[1.45rem]" style={{ color: "var(--ink)" }}>
										{s.title}
									</span>
								</span>
								<span className="leading-relaxed md:col-span-6" style={{ color: "var(--ink-2)" }}>
									{s.description}
								</span>
								<span className="hidden justify-self-end md:col-span-1 md:flex">
									<span
										className="service-arrow grid h-11 w-11 place-items-center rounded-full border"
										style={{ borderColor: "var(--rule-strong)" }}
										aria-hidden="true"
									>
										<ArrowUpRight size={18} weight="bold" />
									</span>
								</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</Section>
	);
};

export default Services;
