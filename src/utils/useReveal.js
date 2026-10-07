import { useEffect, useRef } from "react";

/* Marks an element data-in="true" the first time it scrolls into view.
   The hidden pre-reveal state only exists under html.motion (set in main.jsx),
   so content stays visible when scripts fail or motion is reduced. */
export const useReveal = (threshold = 0.2) => {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || !document.documentElement.classList.contains("motion")) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.dataset.in = "true";
					io.disconnect();
				}
			},
			{ threshold, rootMargin: "0px 0px -8% 0px" }
		);
		io.observe(el);
		return () => io.disconnect();
	}, [threshold]);

	return ref;
};
