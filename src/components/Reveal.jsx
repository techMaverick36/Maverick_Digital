import { useEffect, useRef } from "react";

/*
 * Adds `.is-in` the first time the element scrolls into view.
 * `fade` applies the default opacity/translate/blur entrance; turn it off when
 * a child (e.g. `.img-wipe`) owns the entrance. `delay` (ms) staggers siblings
 * and is inherited by children through the `--d` custom property.
 */
const Reveal = ({ as = "div", delay = 0, fade = true, className = "", style, children, ...rest }) => {
	const Tag = as;
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add("is-in");
					observer.disconnect();
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<Tag
			ref={ref}
			className={`${fade ? "reveal " : ""}${className}`}
			style={delay ? { "--d": `${delay}ms`, ...style } : style}
			{...rest}
		>
			{children}
		</Tag>
	);
};

export default Reveal;
