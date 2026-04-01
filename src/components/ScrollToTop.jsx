import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (hash) {
			// Small delay so the target page fully renders before scrolling
			const timer = setTimeout(() => {
				const el = document.querySelector(hash);
				if (el) {
					el.scrollIntoView({ behavior: "smooth" });
				}
			}, 80);
			return () => clearTimeout(timer);
		} else {
			window.scrollTo({ top: 0, behavior: "instant" });
		}
	}, [pathname, hash]);

	return null;
};

export default ScrollToTop;
