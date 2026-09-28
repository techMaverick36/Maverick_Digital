import { Link, useLocation } from "react-router-dom";
import { CalendarCheck, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { telHref, whatsappHref } from "../utils/business";

/* Phones only: call, WhatsApp and book are always one tap away. */
const ActionBar = () => {
	const { pathname } = useLocation();
	const bookTo = pathname === "/" ? "#book" : "/#book";

	return (
		<>
			<div className="h-[72px] lg:hidden" aria-hidden="true" />
			<nav aria-label="Quick contact" className="action-bar fixed inset-x-0 bottom-0 z-30 border-t lg:hidden" style={{ borderColor: "var(--rule)", background: "var(--bg-2)" }}>
				<div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2 px-3 py-2.5">
					<a href={telHref()} className="btn btn-outline btn-sm btn-plain !min-h-[48px] !px-2 !gap-1.5">
						<Phone size={18} weight="bold" aria-hidden="true" />
						Call
					</a>
					<a href={whatsappHref("Hello Martin, I would like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm btn-plain !min-h-[48px] !px-2 !gap-1.5">
						<WhatsappLogo size={18} weight="fill" aria-hidden="true" />
						WhatsApp
					</a>
					<Link to={bookTo} className="btn btn-navy btn-sm btn-plain !min-h-[48px] !px-2 !gap-1.5">
						<CalendarCheck size={18} weight="bold" aria-hidden="true" />
						Book free call
					</Link>
				</div>
			</nav>
		</>
	);
};

export default ActionBar;
