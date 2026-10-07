---
target: the website (home + portfolio)
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\user\\Desktop\\Dev\\Maverick_Digital\\src\\Pages\\Home.jsx"
target_fingerprint: "sha256:578e13d40cd743d93f0b8a0db4bd0928f7e9f20168e1caee4be35da1c925117a"
target_path: "C:\\Users\\user\\Desktop\\Dev\\Maverick_Digital\\src\\Pages\\Home.jsx"
timestamp: 2026-10-01T19-48-39Z
slug: src-pages-home-jsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score: 28/40 (Good, low end)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Booking progress is good; every Book tap lands on the section preamble, not the form |
| 2 | Match system / real world | 3 | Plain UGX/EAT language; "Book free call" vs "consultation"; "UI/UX" jargon |
| 3 | User control and freedom | 3 | Booking has Back + draft; all service rows hijack to #book |
| 4 | Consistency and standards | 2 | "Work" and "Projects" nav items; btn-azure/btn-navy both render white; arrow hover ±45° conflict; specs disagree |
| 5 | Error prevention | 3 | Inline validation, 409 recheck; email mandatory for WhatsApp-first audience |
| 6 | Recognition over recall | 3 | Step 3 recap |
| 7 | Flexibility | 3 | In-site, calendar, call, WhatsApp, email |
| 8 | Aesthetic and minimalist | 2 | Fee x4, "one point of contact" x5, ~9 Book CTAs, empty stat tiles |
| 9 | Error recovery | 3 | 5xx falls back to prefilled WhatsApp |
| 10 | Help and documentation | 3 | FAQ covers price, time, who does the work |

## Design specificity
Competent but category-interchangeable: every section is chip + two-tone headline + lede, stat tiles, icon list, 3-tier pricing, numbered process, quote grid, FAQ. Specific: hero wall of real client sites, the booking slip. Detector: CLI 1 finding (overused-font Plus Jakarta Sans, owner-chosen); browser 14 on /, 12 on /portfolio: cramped-padding x21 (false positive, min-height buttons), dark-glow + thin-border-wide-shadow on featured Fees card (real, Fees.jsx:52), wide shadow on booking card, marquee (mitigated), tight-leading x2, line-length on portfolio lede.

## Priority issues
- [P1] Book anchors land on preamble; mobile form ~800px below #book (Booking.jsx:305-388). layout
- [P1] Proof buried: work is 5th section after marquee, statement, filler stats, services, about (Home.jsx). distill
- [P2] Flat single-tone dark plane (#07090c/#0b0f14/#10151c) erases rhythm; brief + PRODUCT brand commitments contradict dark-only theme. colorize
- [P2] Message/CTA repetition (fee x4, one point of contact x5, ~9 Book CTAs). distill
- [P2] Weak mobile first viewport: wall washed out, fake-avatar chip, action bar stacks 3rd Book CTA. adapt
- [P3] Testimonials: one quote has no named person; 2 cards only. clarify

## Persona red flags
Jordan: Work vs Projects; service rows jump to form; "Custom quote" tiers. Riley: email required; slots offered when availability API is offline; marquee names clipped under reduced motion. Casey: lands on preamble; 7 topic buttons; 17k px page. Kampala owner: unnamed testimonial, cropped JOPE thumbnail looks broken, empty stat stacks read as padding.

## Minor
.lift unused; About float-card @starting-style fires offscreen; Booking/Footer panels merge; portfolio hero uses laptop photo while home doesn't; 8 identical CaseSheets; unused 1–2.7MB PNGs in public/ ship with build.

## Questions
- If the eight live sites are the argument, why isn't the page mostly the work?
- Is the dullness the colour, or the identical section skeleton?
- Would a WhatsApp-first primary action convert better than a 3-step form?
