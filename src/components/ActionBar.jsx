import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, WhatsappLogo } from "@phosphor-icons/react";
import { telHref, whatsappHref } from "../utils/business";

/* Phones only: call, WhatsApp and book are always one tap away. On the home page the
   bar waits until the hero (which carries its own Book and Call buttons) scrolls away,
   so the first screen is not three stacked Book buttons. */
const ActionBar = () => {
	const { pathname } = useLocation();
	const bookTo = pathname === "/" ? "#book" : "/#book";
	const [heroInView, setHeroInView] = useState(true);
	const heroVisible = pathname === "/" && heroInView;

	useEffect(() => {
		const hero = document.querySelector('[aria-labelledby="hero-title"]');
		if (!hero) return;
		const io = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { rootMargin: "0px 0px -35% 0px" });
		io.observe(hero);
		return () => io.disconnect();
	}, [pathname]);

	return (
		<>
			<div className="h-[72px] lg:hidden" aria-hidden="true" />
			<nav
				aria-label="Quick contact"
				data-hidden={heroVisible || undefined}
				inert={heroVisible || undefined}
				className="action-bar fixed inset-x-0 bottom-0 z-30 border-t lg:hidden"
				style={{ borderColor: "var(--rule)", background: "var(--bg-2)" }}
			>
				<div className="grid grid-cols-[1fr_1fr_1.5fr] gap-2 px-3 py-2.5">
					<a href={telHref()} className="btn btn-outline btn-sm btn-plain !min-h-[48px] !px-2 !gap-1.5">
						<Phone size={18} weight="bold" aria-hidden="true" />
						Call
					</a>
					<a href={whatsappHref("Hello Martin, I would like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm btn-plain !min-h-[48px] !px-2 !gap-1.5">
						<WhatsappLogo size={18} weight="fill" aria-hidden="true" />
						WhatsApp
					</a>
					<Link to={bookTo} className="btn btn-primary btn-sm btn-plain !min-h-[48px] !px-2">
						Free consultation
					</Link>
				</div>
			</nav>
		</>
	);
};

export default ActionBar;
