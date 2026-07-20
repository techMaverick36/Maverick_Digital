import { useEffect, useRef } from "react";

/* Fades content in on first scroll into view. Delay is in ms. */
const Reveal = ({ children, delay = 0, className = "" }) => {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add("in-view");
					observer.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
			{children}
		</div>
	);
};

export default Reveal;
