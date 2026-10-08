import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
	ArrowClockwise,
	CalendarBlank,
	CircleNotch,
	Envelope,
	LinkSimple,
	Phone,
	SignOut,
	Star,
	VideoCamera,
	WarningCircle,
	WhatsappLogo,
} from "@phosphor-icons/react";
import Seo from "../components/Seo";
import { supabase } from "../utils/supabase";
import { TIME_ZONE } from "../utils/booking";
import { BUSINESS, googleReviewHref } from "../utils/business";

/* Asking is fine; Google forbids offering anything in return or asking only happy clients. */
const reviewRequest = (firstName) =>
	`Hello ${firstName}, thank you for working with ${BUSINESS.name}. If you have a minute, would you share your experience in a short Google review? It helps other businesses find us. ${googleReviewHref()}`;

const STATUS_LABELS = { confirmed: "Confirmed", done: "Done", no_show: "No-show", cancelled: "Cancelled" };
const TABS = [
	{ id: "upcoming", label: "Upcoming" },
	{ id: "past", label: "Past" },
	{ id: "cancelled", label: "Cancelled" },
];

const dayKeyEAT = (date) => date.toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
const fmt = (iso, opts) => new Date(iso).toLocaleString("en-GB", { timeZone: TIME_ZONE, ...opts });

function relativeDay(iso) {
	const key = dayKeyEAT(new Date(iso));
	const today = dayKeyEAT(new Date());
	const tomorrow = dayKeyEAT(new Date(Date.now() + 86400e3));
	return key === today ? "Today" : key === tomorrow ? "Tomorrow" : null;
}

const waLink = (phone, text) => {
	let digits = phone.replace(/\D/g, "");
	if (digits.startsWith("0")) digits = `256${digits.slice(1)}`;
	return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
};

/* ── Sign in ── */

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [busy, setBusy] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError("");
		const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
		setBusy(false);
		if (err) setError(err.message === "Invalid login credentials" ? "That email and password do not match." : err.message);
	};

	return (
		<div className="mx-auto mt-[12vh] w-full max-w-sm">
			<img src="/brand-mark-96.png" alt="" width="40" height="40" className="h-10 w-10" />
			<h1 className="mt-6 text-2xl font-semibold tracking-[-0.025em]" style={{ color: "var(--ink)" }}>
				Bookings dashboard
			</h1>
			<p className="mt-1.5 text-sm" style={{ color: "var(--ink-3)" }}>
				Maverick Digital Hub, staff only.
			</p>
			<form onSubmit={submit} className="mt-8 grid gap-4">
				<label className="grid gap-1.5 text-sm font-medium" style={{ color: "var(--ink)" }}>
					Email
					<input className="input" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</label>
				<label className="grid gap-1.5 text-sm font-medium" style={{ color: "var(--ink)" }}>
					Password
					<input className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</label>
				{error && (
					<p className="field-error" role="alert">
						{error}
					</p>
				)}
				<button type="submit" className="btn btn-primary btn-plain mt-2 justify-center" disabled={busy}>
					{busy && <CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden="true" />}
					Sign in
				</button>
			</form>
		</div>
	);
}

/* ── One booking ── */

function BookingCard({ b, token, onSaved }) {
	const [notes, setNotes] = useState(b.admin_notes ?? "");
	const [saving, setSaving] = useState(null);
	const [message, setMessage] = useState(null);
	const soon = relativeDay(b.starts_at);
	const first = b.fullname.split(" ")[0];

	const save = async (changes, label) => {
		setSaving(label);
		setMessage(null);
		try {
			const res = await fetch("/api/manage", {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
				body: JSON.stringify({ id: b.id, ...changes }),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(data.error ?? "Could not save.");
			/* warnings go to the page banner: the card may move to another tab */
			onSaved(data.booking, data.warning);
			setMessage({ tone: "ok", text: "Saved." });
		} catch (err) {
			setMessage({ tone: "warn", text: err.message });
		} finally {
			setSaving(null);
		}
	};

	const changeStatus = (status) => {
		if (status === b.status) return;
		if (status === "cancelled" && !window.confirm(`Cancel ${b.fullname}'s consultation? They will get a cancellation email from Google Calendar.`)) return;
		save({ status }, "status");
	};

	return (
		<article className="card p-5 md:p-6" style={{ opacity: b.status === "cancelled" ? 0.7 : 1 }}>
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<p className="num text-sm font-medium" style={{ color: soon ? "var(--azure-ink)" : "var(--ink-3)" }}>
						{soon ? `${soon}, ` : ""}
						{fmt(b.starts_at, { weekday: "short", day: "numeric", month: "short" })} · {fmt(b.starts_at, { hour: "numeric", minute: "2-digit", hour12: true })}
					</p>
					<h2 className="mt-1 text-xl font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
						{b.fullname}
						{b.company && <span style={{ color: "var(--ink-3)" }}>, {b.company}</span>}
					</h2>
					<p className="mt-1 text-[0.95rem]" style={{ color: "var(--ink-2)" }}>
						{b.service} · {b.call_type}
					</p>
				</div>
				<label className="text-sm" style={{ color: "var(--ink-3)" }}>
					<span className="sr-only">Status</span>
					<select className="input !min-h-[40px] !py-1.5 !text-sm" value={b.status} disabled={saving === "status"} onChange={(e) => changeStatus(e.target.value)}>
						{Object.entries(STATUS_LABELS).map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</label>
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				<a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`} className="btn btn-outline btn-plain btn-sm">
					<Phone size={16} weight="bold" aria-hidden="true" />
					<span className="num">{b.phone}</span>
				</a>
				<a href={waLink(b.phone, `Hello ${first}, this is Martin from Maverick Digital Hub about your consultation (${b.reference}).`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain btn-sm">
					<WhatsappLogo size={16} weight="fill" aria-hidden="true" />
					WhatsApp
				</a>
				<a href={`mailto:${b.email}?subject=${encodeURIComponent(`Your consultation with Maverick Digital Hub (${b.reference})`)}`} className="btn btn-outline btn-plain btn-sm">
					<Envelope size={16} weight="bold" aria-hidden="true" />
					{b.email}
				</a>
				{b.meet_link && (
					<a href={b.meet_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain btn-sm">
						<VideoCamera size={16} weight="bold" aria-hidden="true" />
						Join Meet
					</a>
				)}
				{b.status === "done" && (
					<a href={waLink(b.phone, reviewRequest(first))} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain btn-sm">
						<Star size={16} weight="fill" style={{ color: "#f5b100" }} aria-hidden="true" />
						Ask for a Google review
					</a>
				)}
			</div>

			<table className="facts mt-5 text-[0.95rem]">
				<tbody>
					{b.budget && (
						<tr>
							<th scope="row">Budget</th>
							<td>{b.budget}</td>
						</tr>
					)}
					{b.notes && (
						<tr>
							<th scope="row">Their notes</th>
							<td className="whitespace-pre-line">{b.notes}</td>
						</tr>
					)}
					<tr>
						<th scope="row">Reference</th>
						<td className="num">
							{b.reference}
							<span style={{ color: "var(--ink-3)" }}> · booked {fmt(b.created_at, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true })}</span>
						</td>
					</tr>
				</tbody>
			</table>

			{!b.calendar_synced && b.status !== "cancelled" && (
				<p className="mt-4 flex items-start gap-2 text-sm" style={{ color: "var(--danger)" }}>
					<WarningCircle size={18} weight="bold" className="mt-px shrink-0" aria-hidden="true" />
					Not on Google Calendar. Add it by hand and send {first} the details.
				</p>
			)}

			<div className="mt-5 grid gap-2">
				<label htmlFor={`notes-${b.id}`} className="text-sm font-medium" style={{ color: "var(--ink)" }}>
					Private notes
				</label>
				<textarea id={`notes-${b.id}`} rows={2} className="input resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Only you can see these." />
				<div className="flex items-center gap-3">
					<button type="button" className="btn btn-outline btn-plain btn-sm" disabled={saving === "notes" || notes === (b.admin_notes ?? "")} onClick={() => save({ adminNotes: notes }, "notes")}>
						{saving === "notes" && <CircleNotch size={16} weight="bold" className="animate-spin" aria-hidden="true" />}
						Save notes
					</button>
					{message && (
						<span className="text-sm" role="status" style={{ color: message.tone === "ok" ? "var(--ink-3)" : "var(--danger)" }}>
							{message.text}
						</span>
					)}
				</div>
			</div>
		</article>
	);
}

/* ── Dashboard ── */

function Dashboard({ session }) {
	const [rows, setRows] = useState(null);
	const [error, setError] = useState("");
	const [isAdmin, setIsAdmin] = useState(null);
	const [tab, setTab] = useState("upcoming");
	const [notice, setNotice] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadedAt, setLoadedAt] = useState(0);

	const email = session.user.email?.toLowerCase() ?? "";
	const load = useCallback(async () => {
		setLoading(true);
		const [{ data: admin }, { data, error: err }] = await Promise.all([
			supabase.from("admins").select("email").eq("email", email).maybeSingle(),
			supabase.from("bookings").select("*").order("starts_at", { ascending: true }),
		]);
		setIsAdmin(Boolean(admin));
		setError(err ? err.message : "");
		setRows(data ?? []);
		setLoadedAt(Date.now());
		setLoading(false);
	}, [email]);

	useEffect(() => {
		let active = true;
		/* first load, then again whenever the tab comes back into focus */
		Promise.resolve().then(() => active && load());
		const onFocus = () => document.visibilityState === "visible" && load();
		document.addEventListener("visibilitychange", onFocus);
		return () => {
			active = false;
			document.removeEventListener("visibilitychange", onFocus);
		};
	}, [load]);

	const groups = useMemo(() => {
		const now = loadedAt;
		const all = rows ?? [];
		return {
			upcoming: all.filter((b) => b.status === "confirmed" && new Date(b.ends_at).getTime() >= now),
			past: all.filter((b) => b.status !== "cancelled" && (b.status !== "confirmed" || new Date(b.ends_at).getTime() < now)).reverse(),
			cancelled: all.filter((b) => b.status === "cancelled").reverse(),
		};
	}, [rows, loadedAt]);

	const onSaved = (updated, warning) => {
		setRows((list) => list.map((b) => (b.id === updated.id ? updated : b)));
		setNotice(warning ? { tone: "warn", text: `${updated.fullname}: ${warning}` } : null);
	};
	const shown = groups[tab];

	return (
		<div className="mx-auto w-full max-w-4xl">
			<header className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<img src="/brand-mark-96.png" alt="" width="36" height="36" className="h-9 w-9" />
					<div>
						<h1 className="text-xl font-semibold tracking-[-0.02em]" style={{ color: "var(--ink)" }}>
							Bookings
						</h1>
						<p className="text-sm" style={{ color: "var(--ink-3)" }}>
							{session.user.email}
						</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					{/* For past project clients who never booked through the site: paste it anywhere. */}
					<button
						type="button"
						className="btn btn-outline btn-plain btn-sm"
						onClick={() => navigator.clipboard?.writeText(googleReviewHref()).then(() => setNotice({ tone: "ok", text: "Review link copied. Paste it into a WhatsApp message or email to a client." }))}
					>
						<LinkSimple size={16} weight="bold" aria-hidden="true" />
						Copy review link
					</button>
					<button type="button" className="btn btn-outline btn-plain btn-sm" onClick={load} disabled={loading}>
						<ArrowClockwise size={16} weight="bold" className={loading ? "animate-spin" : undefined} aria-hidden="true" />
						Refresh
					</button>
					<button type="button" className="btn btn-outline btn-plain btn-sm" onClick={() => supabase.auth.signOut()}>
						<SignOut size={16} weight="bold" aria-hidden="true" />
						Sign out
					</button>
				</div>
			</header>

			{isAdmin === false ? (
				<p className="card mt-10 p-6" style={{ color: "var(--ink-2)" }}>
					This account is not on the admin list. Add its email to the <code>admins</code> table in Supabase, then refresh.
				</p>
			) : (
				<>
					{notice && (
						<div className="card mt-8 flex items-start gap-3 p-4" role={notice.tone === "warn" ? "alert" : "status"} style={{ borderColor: notice.tone === "warn" ? "var(--danger)" : "var(--rule-strong)" }}>
							{notice.tone === "warn" && <WarningCircle size={20} weight="bold" className="mt-px shrink-0" style={{ color: "var(--danger)" }} aria-hidden="true" />}
							<p className="flex-1 text-[0.95rem]" style={{ color: "var(--ink)" }}>
								{notice.text}
							</p>
							<button type="button" className="link text-sm" onClick={() => setNotice(null)}>
								Dismiss
							</button>
						</div>
					)}

					<div role="tablist" aria-label="Bookings" className="mt-8 flex gap-2 overflow-x-auto">
						{TABS.map((t) => (
							<button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className="option shrink-0 !min-h-[40px] !py-1.5" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
								{t.label}
								<span className="num text-sm opacity-70">{groups[t.id].length}</span>
							</button>
						))}
					</div>

					{error && (
						<p className="field-error mt-6" role="alert">
							Could not load bookings: {error}
						</p>
					)}

					<div role="tabpanel" className="mt-6 grid gap-4">
						{rows === null ? (
							<p className="flex items-center gap-2" style={{ color: "var(--ink-2)" }} role="status">
								<CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden="true" />
								Loading bookings…
							</p>
						) : shown.length ? (
							shown.map((b) => <BookingCard key={b.id} b={b} token={session.access_token} onSaved={onSaved} />)
						) : (
							<div className="card flex items-center gap-3 p-6" style={{ color: "var(--ink-2)" }}>
								<CalendarBlank size={22} aria-hidden="true" />
								{tab === "upcoming" ? "No upcoming consultations yet. New bookings appear here and in your inbox." : "Nothing here yet."}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

/* ── Page ── */

export default function Admin() {
	const [session, setSession] = useState(undefined);

	useEffect(() => {
		if (!supabase) return;
		supabase.auth.getSession().then(({ data }) => setSession(data.session));
		const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
		return () => data.subscription.unsubscribe();
	}, []);

	return (
		<>
			<Seo title="Bookings" description="Staff dashboard." path="/admin" noindex />
			<main id="main" className="min-h-dvh px-4 py-8 md:px-8 md:py-12" style={{ background: "var(--bg)" }}>
				{!supabase ? (
					<div className="mx-auto mt-[12vh] max-w-md" style={{ color: "var(--ink-2)" }}>
						<h1 className="text-2xl font-semibold" style={{ color: "var(--ink)" }}>
							Dashboard not connected
						</h1>
						<p className="mt-3">
							Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> to <code>.env.local</code> (and to Vercel), then restart.
						</p>
						<Link to="/" className="link mt-6 inline-block">
							Back to the website
						</Link>
					</div>
				) : session === undefined ? (
					<p className="mx-auto mt-[12vh] flex max-w-sm items-center gap-2" style={{ color: "var(--ink-2)" }} role="status">
						<CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden="true" />
						Loading…
					</p>
				) : session ? (
					<Dashboard session={session} />
				) : (
					<SignIn />
				)}
			</main>
		</>
	);
}
