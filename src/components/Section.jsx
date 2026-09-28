/*
 * Page section. `tone`:
 *   paper  page black, full width
 *   mist   one step lighter, full width
 *   navy   a rounded panel inset from the viewport edges (StratEdge-style)
 */
export const Section = ({ id, tone = "paper", labelledBy, className = "", innerClassName = "", children }) => {
	if (tone === "navy") {
		return (
			<section id={id} aria-labelledby={labelledBy} className={`px-3 py-3 md:px-4 ${className}`}>
				<div className="on-navy rounded-[28px] px-5 py-20 md:px-10 md:py-24" style={{ background: "var(--navy)", color: "var(--on-navy)" }}>
					<div className={`mx-auto max-w-6xl ${innerClassName}`}>{children}</div>
				</div>
			</section>
		);
	}
	return (
		<section
			id={id}
			aria-labelledby={labelledBy}
			className={`px-5 py-20 md:px-10 md:py-28 ${className}`}
			style={{ background: tone === "mist" ? "var(--mist)" : "var(--bg)" }}
		>
			<div className={`mx-auto max-w-6xl ${innerClassName}`}>{children}</div>
		</section>
	);
};

/* Label chip + headline (with an azure highlight) + optional lede on the right. */
export const SectionHead = ({ id, label, title, highlight, lede, align = "split" }) => (
	<div className={align === "split" ? "grid gap-6 md:grid-cols-12 md:items-end md:gap-10" : "max-w-3xl"}>
		<div className={align === "split" ? "md:col-span-7" : ""}>
			<span className="chip">
				<span className="chip-dot" aria-hidden="true">
					<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
						<circle cx="5" cy="5" r="3" />
					</svg>
				</span>
				{label}
			</span>
			<h2 id={id} className="h-section mt-5 text-[2.1rem] md:text-5xl">
				{title} {highlight && <span className="hl">{highlight}</span>}
			</h2>
		</div>
		{lede && <p className={`lede ${align === "split" ? "md:col-span-5 md:pb-1" : "mt-5"}`}>{lede}</p>}
	</div>
);
