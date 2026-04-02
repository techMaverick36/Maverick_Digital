import { Link } from "react-router-dom";

/* Footer always uses a dark background regardless of theme.
   All text colours are declared as explicit values, not CSS variables. */
const Footer = () => {
	return (
		<footer
			className="relative pt-14 pb-10 px-6"
			style={{ background: "var(--bg-footer)", color: "#f4f7fb" }}
		>
			{/* Top accent rule */}
			<div className="footer-cap absolute top-0 left-0 right-0" />

			{/* Subtle inner glow at top */}
			<div
				className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
				style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(33,74,132,0.12), transparent 70%)" }}
			/>

			<div className="relative z-10 max-w-7xl mx-auto">
				<div className="grid md:grid-cols-4 gap-12 mb-12">
					<div className="md:col-span-2">
						<div className="flex items-center gap-3 mb-5">
							<div
								className="w-10 h-10 rounded-lg flex items-center justify-center"
								style={{
									border: "1px solid rgba(69,105,168,0.45)",
									background: "rgba(33,74,132,0.2)",
								}}
							>
								<span className="font-semibold text-base text-white">M</span>
							</div>
							<span className="text-xl font-semibold roboto_condensed tracking-tight text-white">
								Maverick Digital Hub
							</span>
						</div>
						<p className="leading-relaxed mb-6 max-w-sm" style={{ color: "#b7c0ce" }}>
							Maverick Digital Hub helps businesses look more polished online
							through thoughtful websites, stronger branding, and digital work
							that feels clear and credible.
						</p>
						<p className="text-sm uppercase tracking-[0.18em]" style={{ color: "#8792a3" }}>
							Kampala, Uganda
						</p>
					</div>

					<div>
						<h4
							className="font-semibold text-sm uppercase tracking-[0.14em] mb-5"
							style={{ color: "#8792a3" }}
						>
							Services
						</h4>
						<ul className="space-y-3 text-sm" style={{ color: "#b7c0ce" }}>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">Web Development</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">UI/UX Design</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">Branding</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">Digital Marketing</Link></li>
							<li><Link to="/#services" className="hover:text-white transition-colors duration-200">IT Solutions</Link></li>
						</ul>
					</div>

					<div>
						<h4
							className="font-semibold text-sm uppercase tracking-[0.14em] mb-5"
							style={{ color: "#8792a3" }}
						>
							Company
						</h4>
						<ul className="space-y-3 text-sm" style={{ color: "#b7c0ce" }}>
							<li><Link to="/#about" className="hover:text-white transition-colors duration-200">About</Link></li>
							<li><Link to="/portfolio" className="hover:text-white transition-colors duration-200">Portfolio</Link></li>
							<li><Link to="/#process" className="hover:text-white transition-colors duration-200">Process</Link></li>
							<li><Link to="/#contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
							<li><Link to="/#contact" className="hover:text-white transition-colors duration-200">Start a Project</Link></li>
						</ul>
					</div>
				</div>

				<div
					className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-sm"
					style={{ borderColor: "rgba(255,255,255,0.08)", color: "#8792a3" }}
				>
					<p>&copy; 2026 Maverick Digital Hub. All rights reserved.</p>
					<p className="text-xs uppercase tracking-[0.14em]">Kampala, Uganda</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
