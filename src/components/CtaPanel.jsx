import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "@phosphor-icons/react";
import { BUSINESS, telHref } from "../utils/business";
import { bookHref } from "../utils/bookingEvents";

/* Closing call to action for inner pages: book (with a topic preselected) or call. */
const CtaPanel = ({
	id = "next-title",
	title = "Want your business to be",
	highlight = "next?",
	lede = "Book a free 30-minute consultation. No obligation.",
	cta = "Book a free consultation",
	topic,
}) => (
	<section aria-labelledby={id} className="px-5 pb-20 md:px-10">
		<div
			className="card mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-10"
			style={{ background: "var(--azure-tint)", borderColor: "transparent" }}
		>
			<div>
				<h2 id={id} className="h-section text-3xl md:text-4xl">
					{title} <span className="hl">{highlight}</span>
				</h2>
				<p className="lede mt-3">{lede}</p>
			</div>
			<div className="flex shrink-0 flex-col gap-3 sm:flex-row">
				<Link to={bookHref(topic)} className="btn btn-primary group">
					{cta}
					<span className="btn-disc" aria-hidden="true">
						<ArrowUpRight size={17} weight="bold" />
					</span>
				</Link>
				<a href={telHref()} className="btn btn-outline btn-plain">
					<Phone size={18} weight="bold" aria-hidden="true" />
					<span className="num">{BUSINESS.phones[0].display}</span>
				</a>
			</div>
		</div>
	</section>
);

export default CtaPanel;
