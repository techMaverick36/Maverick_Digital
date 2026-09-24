import { Browser, ChatsCircle, CursorClick, PenNib, Plugs } from "@phosphor-icons/react";
import { services, techStack } from "../utils/constants";
import Reveal from "./Reveal";

/*
 * Bento: 5 services, 5 cells, every cell carries a real visual.
 *   A A B B
 *   A A C D
 *   E E E E
 * `index` points into utils/constants `services`.
 * Data Analysis (index 5) is hidden for now; it is still in constants.
 */
const cells = [
	{ index: 0, icon: Browser, span: "sm:col-span-2 lg:row-span-2", tone: "var(--surface)", visual: "screenshot" },
	/* spans both columns at sm too, so the 2-col tablet grid pairs UI/UX + Social with no gap */
	{ index: 3, icon: PenNib, span: "sm:col-span-2", tone: "var(--accent-soft)", visual: "logo" },
	{ index: 4, icon: CursorClick, span: "", tone: "var(--surface)", visual: "desk" },
	{ index: 2, icon: ChatsCircle, span: "", tone: "var(--surface-2)", visual: "standing" },
	/* full-width closing row: 2 cols at sm, all 4 at lg */
	{ index: 1, icon: Plugs, span: "sm:col-span-2 lg:col-span-4", tone: "var(--accent-soft)", visual: "stack" },
];

function Visual({ kind }) {
	switch (kind) {
		case "screenshot":
			return (
				<div className="relative -mx-7 -mb-7 mt-8 min-h-[240px] flex-1 md:-mx-8 md:-mb-8">
					<div
						className="zoom-img absolute inset-y-0 left-7 right-0 overflow-hidden rounded-tl-[var(--r-inner)] border-l border-t md:left-8"
						style={{ borderColor: "var(--line)" }}
					>
						<img
							src="/jope.jpg"
							alt="JOPE Forwarders website we designed and built"
							loading="lazy"
							width="1908"
							height="1025"
							className="h-full w-full object-cover object-left-top"
						/>
					</div>
				</div>
			);
		case "logo":
			return (
				<div className="zoom-img mt-6 flex aspect-square w-28 shrink-0 items-center justify-center overflow-hidden rounded-[var(--r-inner)] bg-white shadow-sm sm:mt-0 lg:w-36">
					<img src="/logo.png" alt="Maverick Digital Hub logo" loading="lazy" width="1024" height="1024" className="w-full" />
				</div>
			);
		case "desk":
		case "standing": {
			const desk = kind === "desk";
			return (
				<div className="relative -mb-7 mt-6 flex flex-1 items-end justify-center pb-5 md:-mb-8">
					{/* soft floor shadow grounds the figure on the card */}
					<span
						aria-hidden="true"
						className="absolute bottom-3 left-1/2 h-4 -translate-x-1/2 rounded-[50%] blur-md"
						style={{ width: desk ? "70%" : "42%", background: "rgba(0, 0, 0, 0.22)" }}
					/>
					<img
						src={desk ? "/cartoons/desk.webp" : "/cartoons/phone.webp"}
						alt={desk ? "Illustration of Martin designing at a computer" : "Illustration of Martin on a call, phone in hand"}
						loading="lazy"
						width={desk ? 548 : 287}
						height="720"
						className={`zoom-bg relative h-auto ${desk ? "w-[86%] max-w-[250px]" : "w-auto max-h-[260px]"}`}
					/>
				</div>
			);
		}
		case "stack":
			return (
				<ul className="mt-6 flex flex-wrap gap-2 lg:mt-0 lg:max-w-[58%] lg:justify-end" aria-label="Technologies we use">
					{techStack.map((t) => (
						<li
							key={t}
							className="rounded-[10px] border px-3 py-1.5 text-sm"
							style={{ borderColor: "var(--line-strong)", color: "var(--ink-2)" }}
						>
							{t}
						</li>
					))}
				</ul>
			);
		default:
			return null;
	}
}

const Services = () => {
	return (
		<section id="services" className="px-5 py-24 md:px-8 md:py-32" aria-labelledby="services-title">
			<div className="mx-auto max-w-7xl">
				<Reveal className="mb-14 max-w-3xl">
					<h2 id="services-title" className="h-section text-4xl md:text-5xl" style={{ color: "var(--ink)" }}>
						Look better, work better, <em>reach more people.</em>
					</h2>
					<p className="lede mt-5 text-lg">
						Whether you need a stronger website, clearer branding, or better digital support, we focus
						on work that makes your business easier to choose.
					</p>
				</Reveal>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{cells.map((cell, i) => {
						const service = services[cell.index];
						const Icon = cell.icon;
						const layout =
							cell.visual === "logo"
								? "flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-8"
								: cell.visual === "stack"
									? "flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12"
									: "flex-col";
						return (
							<Reveal key={service.title} delay={(i % 3) * 70} className={cell.span}>
								<article
									className={`group lift flex h-full overflow-hidden rounded-[var(--r-surface)] border p-7 md:p-8 ${layout}`}
									style={{ background: cell.tone, borderColor: "var(--line)" }}
								>
									<div>
										<Icon size={26} style={{ color: "var(--accent-text)" }} aria-hidden="true" />
										<h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
											{service.title}
										</h3>
										<p className="mt-2.5 max-w-[46ch] text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-2)" }}>
											{service.description}
										</p>
									</div>
									<Visual kind={cell.visual} />
								</article>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Services;
