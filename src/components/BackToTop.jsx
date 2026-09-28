import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";

/* Round glass button that appears after the first screen and returns to the top. */
const BackToTop = () => {
	const [visible, setVisible] = useState(false);
	const marker = useRef(null);

	/* Visible once a marker one screen down has scrolled out of view (no scroll listener). */
	useEffect(() => {
		const el = marker.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0));
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const toTop = () => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
	};

	return (
		<>
			<div ref={marker} aria-hidden="true" className="pointer-events-none absolute left-0 top-[100vh] h-px w-px" />
			<button
				type="button"
				onClick={toTop}
				className="back-to-top fixed bottom-[88px] right-4 z-30 grid h-12 w-12 place-items-center rounded-full md:bottom-6 md:right-6 lg:h-14 lg:w-14"
				data-visible={visible}
				aria-label="Back to top"
				title="Back to top"
				tabIndex={visible ? 0 : -1}
			>
				<ArrowUp size={20} weight="bold" aria-hidden="true" />
			</button>
		</>
	);
};

export default BackToTop;
