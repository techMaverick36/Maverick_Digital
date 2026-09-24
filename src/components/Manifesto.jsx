/* One big statement; each word brightens as it crosses the viewport (CSS scroll-driven, no JS). */
const text = "For most customers, your website is the first conversation they have with your business.";
const close = "We make sure it says the right things.";

const Manifesto = () => {
	return (
		<section className="px-5 py-24 md:px-8 md:py-36" aria-label="Our approach">
			<p className="mx-auto max-w-6xl text-[2rem] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-5xl lg:text-[4.1rem]" style={{ color: "var(--ink)" }}>
				{text.split(" ").map((w, i) => (
					<span key={i}>
						<span className="lit inline-block">{w}</span>{" "}
					</span>
				))}
				{close.split(" ").map((w, i) => (
					<span key={`c${i}`}>
						<span className="lit inline-block italic" style={{ color: "var(--accent-text)", fontWeight: 500 }}>
							{w}
						</span>{" "}
					</span>
				))}
			</p>
		</section>
	);
};

export default Manifesto;
