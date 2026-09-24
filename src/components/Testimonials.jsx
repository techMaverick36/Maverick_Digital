import { testimonials } from "../utils/constants";
import Reveal from "./Reveal";

/* Deliberately quiet: quotes and attribution only, no images or cards. */
const Testimonials = () => {
	return (
		<section className="px-5 py-24 md:px-8 md:py-28" aria-labelledby="testimonials-title">
			<div className="mx-auto max-w-7xl">
				<Reveal className="mb-12">
					<h2 id="testimonials-title" className="h-section text-3xl md:text-4xl" style={{ color: "var(--ink)" }}>
						What clients say
					</h2>
				</Reveal>

				<div className="grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
					{testimonials.map((t, i) => (
						<Reveal key={`${t.name}-${t.role}`} delay={i * 80}>
							<figure className="border-t pb-10 pt-8" style={{ borderColor: "var(--line)" }}>
								<blockquote className="text-lg leading-relaxed" style={{ color: "var(--ink)" }}>
									&ldquo;{t.content}&rdquo;
								</blockquote>
								<figcaption className="mt-6 text-sm">
									<span className="block font-semibold" style={{ color: "var(--ink)" }}>
										{t.name}
									</span>
									<span className="block" style={{ color: "var(--ink-3)" }}>
										{t.role}
									</span>
								</figcaption>
							</figure>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
