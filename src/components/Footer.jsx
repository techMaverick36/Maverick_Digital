import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

/* Footer always uses a dark surface regardless of theme. */
const Footer = () => {
	return (
		<footer className="relative pt-20 pb-8 px-6 overflow-hidden" style={{ background: "var(--bg-footer)" }}>
			{/* Top accent rule */}
			<div
				className="absolute top-0 left-0 right-0 h-px"
				style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.55), transparent)" }}
			/>
			<div
				className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[36rem] rounded-full blur-[110px] pointer-events-none"
				style={{ background: "rgba(14,165,233,0.13)" }}
				aria-hidden="true"
			/>

			<div className="relative z-10 max-w-7xl mx-auto">
				<div className="grid md:grid-cols-4 gap-12 mb-16">
					<div className="md:col-span-2">
						<div className="flex items-center gap-2.5 mb-6">
							<span
								className="display flex h-9 w-9 items-center justify-center rounded-xl text-base font-bold text-white"
								style={{ background: "linear-gradient(120deg, #0ea5e9, #0369a1)" }}
							>
								M
							</span>
							<span className="display text-lg font-semibold tracking-tight text-white">
								Maverick<span style={{ color: "#38bdf8" }}>.</span>
							</span>
						</div>
						<p className="leading-relaxed mb-6 max-w-sm text-[#aebccb]">
							Maverick Digital Hub helps businesses look more polished online
							through thoughtful websites, stronger branding, and digital work
							that feels clear and credible.
						</p>
						<a
							href="mailto:mavericktech750@gmail.com"
							className="group inline-flex items-center gap-2 text-sm font-medium text-[#7dd3fc] hover:text-white transition-colors duration-200"
						>
							mavericktech750@gmail.com
							<FiArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
					</div>

					<div>
						<h4 className="font-semibold text-xs uppercase tracking-[0.18em] mb-5 text-[#7a8ba0]">
							Services
						</h4>
						<ul className="space-y-3 text-sm text-[#aebccb]">
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">Web Development</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">UI/UX Design</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">Branding</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">Digital Marketing</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">IT Solutions</Link></li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-xs uppercase tracking-[0.18em] mb-5 text-[#7a8ba0]">
							Company
						</h4>
						<ul className="space-y-3 text-sm text-[#aebccb]">
							<li><Link to="/#about" className="hover:text-white transition-colors duration-200">About</Link></li>
							<li><Link to="/portfolio" className="hover:text-white transition-colors duration-200">Portfolio</Link></li>
							<li><Link to="/#process" className="hover:text-white transition-colors duration-200">Process</Link></li>
							<li><Link to="/#contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
							<li><Link to="/#contact" className="hover:text-white transition-colors duration-200">Start a Project</Link></li>
						</ul>
					</div>
				</div>

				{/* Big wordmark */}
				<div
					className="display select-none text-center font-bold leading-none tracking-tight text-[16vw] md:text-[9rem] lg:text-[11rem]"
					style={{
						background: "linear-gradient(180deg, rgba(56,189,248,0.20), rgba(56,189,248,0.02))",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
					aria-hidden="true"
				>
					MAVERICK
				</div>

				<div
					className="mt-4 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#7a8ba0]"
					style={{ borderColor: "rgba(255,255,255,0.08)" }}
				>
					<p>&copy; 2026 Maverick Digital Hub. All rights reserved.</p>
					<p className="text-xs uppercase tracking-[0.16em]">Kampala, Uganda</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
