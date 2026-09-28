import { ArrowUpRight, Phone } from "@phosphor-icons/react";
import { projects } from "../utils/constants";
import { BUSINESS, formatUGX, telHref } from "../utils/business";

const Hero = () => {
	const faces = [projects.find((p) => p.id === 9), projects.find((p) => p.id === 1), projects.find((p) => p.id === 5)].filter(Boolean);

	return (
		<section aria-labelledby="hero-title" className="px-3 pt-3 md:px-4">
			<div className="on-navy relative isolate overflow-hidden rounded-[28px]" style={{ background: "var(--navy)" }}>
				<img
					src="/photos/hero-laptop.jpg"
					alt=""
					width="1200"
					height="740"
					fetchPriority="high"
					className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_40%]"
				/>
				{/* navy wash: solid behind the text, photo breathing on the right */}
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-10"
					style={{
						background:
							"linear-gradient(90deg, rgba(7,9,12,0.97) 0%, rgba(7,9,12,0.88) 38%, rgba(7,9,12,0.4) 75%, rgba(7,9,12,0.25) 100%), linear-gradient(0deg, rgba(7,9,12,0.92) 0%, rgba(7,9,12,0) 55%)",
					}}
				/>

				<div className="mx-auto grid min-h-[min(760px,calc(100dvh-7.5rem))] max-w-6xl items-end gap-10 px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-36 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<span className="chip">
							<span className="flex -space-x-2" aria-hidden="true">
								{faces.map((p) => (
									<img key={p.id} src={p.thumb} alt="" width="900" height="482" className="h-6 w-6 rounded-full border-2 object-cover object-top" style={{ borderColor: "var(--bg)" }} />
								))}
							</span>
							<span className="num">{projects.length} live client websites</span>
						</span>

						<h1 id="hero-title" className="h-hero mt-6 text-[2.6rem] text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem]">
							Websites that make your business look <span className="hl">established.</span>
						</h1>

						<p className="lede mt-6 text-[1.15rem] md:text-xl">
							We design and build websites and brands for Ugandan businesses, so the people searching for you trust
							you before they call.
						</p>

						<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
							<a href="#book" className="btn btn-azure group">
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
						<div className="float-card w-full p-5 lg:max-w-[300px]" style={{ "--d": "250ms" }}>
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
						<div className="float-card flex w-full items-center gap-3.5 p-4 lg:max-w-[300px]" style={{ "--d": "450ms" }}>
							<img src="/Martin2.jpeg" alt="" width="1024" height="1280" className="h-12 w-12 shrink-0 rounded-full object-cover object-[50%_25%]" />
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
