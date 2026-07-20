const items = [
	"Web Design",
	"Development",
	"Branding",
	"UI/UX",
	"Social Media",
	"SEO",
	"IT Solutions",
	"Data Analysis",
];

const Star = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mx-6 shrink-0" style={{ color: "var(--accent)" }}>
		<path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
	</svg>
);

/* Infinite scrolling ticker of what we do. */
const Marquee = () => {
	const track = (ariaHidden) => (
		<div className="marquee-track" aria-hidden={ariaHidden}>
			{items.map((item) => (
				<span key={item} className="flex items-center whitespace-nowrap">
					<span
						className="display text-sm md:text-base font-medium uppercase tracking-[0.22em]"
						style={{ color: "var(--text-muted)" }}
					>
						{item}
					</span>
					<Star />
				</span>
			))}
		</div>
	);

	return (
		<div
			className="marquee py-5 border-y"
			style={{ borderColor: "var(--border-soft)", background: "var(--bg-elevated)" }}
		>
			{track(false)}
			{track(true)}
		</div>
	);
};

export default Marquee;
