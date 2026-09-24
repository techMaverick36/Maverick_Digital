import { useEffect, useState } from "react";
import { ThemeContext } from "./theme";

const STORAGE_KEY = "mdh-theme";

/* Stored choice wins; otherwise follow the OS setting. */
function initialTheme() {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "dark" || stored === "light") return stored;
	} catch {
		/* storage unavailable (private mode) */
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(initialTheme);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.style.colorScheme = theme;
	}, [theme]);

	const toggle = () =>
		setTheme((t) => {
			const next = t === "dark" ? "light" : "dark";
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				/* storage unavailable */
			}
			return next;
		});

	return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
