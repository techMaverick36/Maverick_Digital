import { useEffect, useRef, useState } from "react";

const motionOn = () => typeof document !== "undefined" && document.documentElement.classList.contains("motion");

/*
 * Hero: types a phrase, holds it, deletes it, types the next one.
 * Every phrase sits invisibly in the same grid cell, so the slot is always as wide as
 * the longest phrase and the rest of the headline never reflows while typing.
 * Screen readers get the first phrase once; the loop stops when the hero is off
 * screen, and reduced motion shows the first phrase with no caret.
 */
export const TypeCycle = ({ phrases, startDelay = 0 }) => {
	const ref = useRef(null);
	const [state, setState] = useState(() => ({ i: 0, n: motionOn() ? 0 : phrases[0].length, deleting: false }));
	const [visible, setVisible] = useState(true);
	const [started, setStarted] = useState(false);
	const animate = motionOn();

	useEffect(() => {
		if (!animate) return;
		const t = setTimeout(() => setStarted(true), startDelay);
		const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
		if (ref.current) io.observe(ref.current);
		return () => {
			clearTimeout(t);
			io.disconnect();
		};
	}, [animate, startDelay]);

	useEffect(() => {
		if (!animate || !started || !visible) return;
		const { i, n, deleting } = state;
		const phrase = phrases[i];
		let delay;
		let next;
		if (!deleting && n < phrase.length) {
			delay = 70 + Math.random() * 60; // a human, uneven rhythm
			next = { i, n: n + 1, deleting };
		} else if (!deleting) {
			delay = 2400;
			next = { i, n, deleting: true };
		} else if (n > 0) {
			delay = 32;
			next = { i, n: n - 1, deleting };
		} else {
			delay = 320;
			next = { i: (i + 1) % phrases.length, n: 0, deleting: false };
		}
		const t = setTimeout(() => setState(next), delay);
		return () => clearTimeout(t);
	}, [animate, started, visible, state, phrases]);

	const typing = state.n < phrases[state.i].length;

	/* No animation: just the first phrase, so the headline reads once (to people and to Google). */
	if (!animate) return phrases[0];

	return (
		<>
			<span ref={ref} className="type-slot" aria-hidden="true">
				{phrases.map((p) => (
					<span key={p} className="type-ghost" data-text={p} />
				))}
				<span className="type-live">
					{phrases[state.i].slice(0, state.n)}
					{animate && <span className="caret" data-typing={typing || undefined} />}
				</span>
			</span>
			<span className="sr-only">{phrases[0]}</span>
		</>
	);
};

/*
 * Section headlines: the highlighted phrase types itself the first time it scrolls into
 * view. Untyped letters stay in the layout (hidden), so nothing shifts; the caret blinks
 * a few times at the end and fades out.
 */
export const TypeOnView = ({ text }) => {
	const ref = useRef(null);
	const animate = motionOn();
	const [n, setN] = useState(animate ? 0 : text.length);
	const [go, setGo] = useState(false);

	useEffect(() => {
		if (!animate || !ref.current) return;
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					setGo(true);
					io.disconnect();
				}
			},
			{ threshold: 1, rootMargin: "0px 0px -12% 0px" }
		);
		io.observe(ref.current);
		return () => io.disconnect();
	}, [animate]);

	useEffect(() => {
		if (!go || n >= text.length) return;
		const t = setTimeout(() => setN((v) => v + 1), n === 0 ? 260 : 38 + Math.random() * 40);
		return () => clearTimeout(t);
	}, [go, n, text.length]);

	const done = n >= text.length;

	return (
		<>
			<span ref={ref} aria-hidden="true">
				{text.slice(0, n)}
				{animate && <span className="caret caret-inline" data-typing={(go && !done) || undefined} data-done={done || undefined} />}
				<span style={{ visibility: "hidden" }}>{text.slice(n)}</span>
			</span>
			<span className="sr-only">{text}</span>
		</>
	);
};
