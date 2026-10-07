import { useEffect, useRef } from "react";
import { ArrowUpRight, Phone } from "@phosphor-icons/react";
import { projects } from "../utils/constants";
import { BUSINESS, formatUGX, telHref } from "../utils/business";
import { TypeCycle } from "./Typewriter";

/* What the site does for the business, typed in turn at the end of the headline. */
const OUTCOMES = ["established.", "credible.", "professional.", "trustworthy."];

/* Each column cycles through the client sites from its own offset; the set is
   rendered twice so the slow drift loops without a seam. */
const COLUMN_LENGTH = 6;
const wallColumns = [0, 3, 6].map((offset) => Array.from({ length: COLUMN_LENGTH }, (_, i) => projects[(offset + i) % projects.length]));

/* Splits a phrase into masked words so the headline can rise into place word by word.
   Screen readers still read the h1 as one sentence. */
const Words = ({ text, from = 0 }) =>
	text.split(" ").map((w, i) => (
		<span key={i}>
			<span className="hero-word">
				<span style={{ "--i": from + i }}>{w}</span>
			</span>{" "}
		</span>
	));

const Hero = () => {
	const wall = useRef(null);

	/* The drift is a loop, so it stops whenever the hero is off screen. */
	useEffect(() => {
		const el = wall.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			el.dataset.paused = entry.isIntersecting ? "false" : "true";
		});
		io.observe(el);

		/* Desktop: the wall leans gently away from the pointer, so the hero answers the visitor. */
		const panel = el.parentElement;
		const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		if (!fine || !document.documentElement.classList.contains("motion")) return () => io.disconnect();
		let frame = 0;
		const onMove = (e) => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const r = panel.getBoundingClientRect();
				el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
				el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
			});
		};
		const onLeave = () => {
			el.style.setProperty("--px", "0");
			el.style.setProperty("--py", "0");
		};
		panel.addEventListener("pointermove", onMove, { passive: true });
		panel.addEventListener("pointerleave", onLeave);
		return () => {
			io.disconnect();
			cancelAnimationFrame(frame);
			panel.removeEventListener("pointermove", onMove);
			panel.removeEventListener("pointerleave", onLeave);
		};
	}, []);

	return (
		<section aria-labelledby="hero-title" className="px-3 pt-3 md:px-4">
			<div className="on-navy relative isolate overflow-hidden rounded-[28px]" style={{ background: "var(--navy)" }}>
				{/* Real client sites as the hero visual, replacing stock imagery (critique 2026-09-28).
				    They come into focus on load, then drift slowly in opposing columns (desktop).
				    To go back to the photo: <img src="/photos/hero-laptop.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_40%]" /> */}
				<div ref={wall} aria-hidden="true" className="hero-wall absolute inset-0 -z-10">
					<div className="hero-wall-grid">
						{wallColumns.map((column, c) => (
							<div key={c} className="hero-col">
								{[...column, ...column].map((p, i) => (
									<img
										key={`${p.id}-${i}`}
										src={p.thumb}
										alt=""
										width="900"
										height="482"
										loading={i < 3 ? "eager" : "lazy"}
										decoding="async"
										fetchPriority={c === 1 && i === 0 ? "high" : undefined}
										className="block aspect-[16/10] w-full rounded-[12px] border object-cover object-top"
										style={{ borderColor: "rgba(255,255,255,0.08)" }}
									/>
								))}
							</div>
						))}
					</div>
				</div>
				{/* navy wash: solid behind the text, photo breathing on the right */}
				<div aria-hidden="true" className="hero-wash absolute inset-0 -z-10" />

				<div className="mx-auto grid min-h-[min(760px,calc(100dvh-7.5rem))] max-w-6xl items-end gap-10 px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-36 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<span className="chip hero-rise" style={{ "--d": "120ms" }}>
							<span className="chip-dot" aria-hidden="true" />
							Web design company in Kampala, Uganda
						</span>

						<h1 id="hero-title" className="h-hero mt-6 text-[2.6rem] text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem]">
							<Words text="Websites that make your business look" />
							<span className="hl">
								<TypeCycle phrases={OUTCOMES} startDelay={650} />
							</span>
						</h1>

						<p className="lede hero-rise mt-6 text-[1.15rem] md:text-xl" style={{ "--d": "620ms" }}>
							We design and build websites, online shops and brands for businesses across Uganda, so the people
							searching for you trust you before they call.
						</p>

						<div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ "--d": "720ms" }}>
							<a href="#book" className="btn btn-primary group">
								Book a free consultation
								<span className="btn-disc" aria-hidden="true">
									<ArrowUpRight size={17} weight="bold" />
								</span>
							</a>
							<a href={telHref()} className="btn btn-outline btn-plain">
								<Phone size={18} weight="bold" aria-hidden="true" />
								<span className="num">Call {BUSINESS.phones[0].display}</span>
							</a>
						</div>
					</div>

					{/* Floating proof cards */}
					<div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:justify-items-end">
						<div className="float-card w-full p-5 lg:max-w-[300px]" style={{ "--d": "850ms" }}>
							<p className="text-sm font-medium" style={{ color: "var(--ink-3)" }}>
								Websites from
							</p>
							<p className="num mt-1 text-[1.9rem] font-bold leading-none tracking-[-0.03em]" style={{ color: "var(--ink)" }}>
								{formatUGX(BUSINESS.startingPrice)}
							</p>
							<p className="mt-2 text-sm" style={{ color: "var(--ink-2)" }}>
								Written quote before any work begins.
							</p>
						</div>
						<div className="float-card flex w-full items-center gap-3.5 p-4 lg:max-w-[300px]" style={{ "--d": "1000ms" }}>
							<img src="/Martin2.webp" alt="" width="1024" height="1280" className="h-12 w-12 shrink-0 rounded-full object-cover object-[50%_25%]" />
							<p className="text-sm leading-snug" style={{ color: "var(--ink-2)" }}>
								<span className="block font-semibold" style={{ color: "var(--ink)" }}>
									Talk to {BUSINESS.founder.split(" ")[0]} directly
								</span>
								Founder. Replies {BUSINESS.responseTime}.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
