# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Business owners and decision-makers at corporate and established businesses in Uganda (Kampala first), who need a website, brand identity, or digital support and are judging whether Maverick Digital Hub is a serious, trustworthy company to hire. They usually arrive from Google search or the Google Business Profile, often on a phone, and decide within seconds whether to get in touch.

## Product Purpose

The company website for Maverick Digital Hub, a Kampala-based digital studio (web design and development, branding and identity, UI/UX, business IT solutions). It must establish trust before the first conversation and turn visitors into booked consultations, calls, or WhatsApp enquiries in a few clicks. Success is a qualified client booking a consultation.

It is also the studio's portfolio: real shipped client work is the main proof.

## Positioning

A founder-led, partner-backed studio: Martin Ssemugabi (founder) leads every project and stays the single point of contact, bringing in trusted partner developers and designers on larger builds (owner confirmed, 2026-09-28). Real, live client websites across Ugandan businesses are the proof. Pricing is shown openly (projects start from UGX 1,000,000) to set expectations and filter out unserious enquiries.

## Operating Context

- Enquiries are handled over WhatsApp (+256 770 302 731), phone (+256 770 302 731, +256 745 496 783), and email (mavericktech750@gmail.com).
- Booking: an in-site request flow that hands off to WhatsApp with the details prefilled (chosen as the most effective option with no extra setup). A Google Calendar appointment schedule link can replace or supplement it later.
- A Google Business Profile exists but is new. Its public URL, listed hours, and category are not yet recorded here.
- The business is not yet formally registered; present it as a company without making registration or legal claims.

## Capabilities and Constraints

- Stack: React 19 + Vite + Tailwind v4 single-page app with React Router, hosted on Netlify (confirmed from response headers, 2026-10-08). Each public page gets prerendered <head> tags at build; the booking API in api/ runs as Netlify Functions (netlify/functions, routed by public/_redirects).
- Services: Web Design & Development, Business IT & Tech Solutions, Branding & Identity Design, UI/UX Design. Social Media Management and Data Analysis are hidden for now (still in constants.jsx).
- Pricing: starting price UGX 1,000,000 (confirmed). Package names, inclusions, and prices above the starting price are open decisions and must be confirmed by the owner.
- Theme: dark only, StratEdge-style (owner decision 2026-09-28, after a light version read as dull): near-black base, rounded panels, white type, Maverick azure as the single accent. No theme toggle.
- Open: Google Business Profile URL, business hours, star rating, typical turnaround, payment terms.

## Brand Commitments

- Name: Maverick Digital Hub. Brand colours are blue, white, and black (logo at `public/logo.png`, azure mark around #1a8cf0).
- Voice: warm, confident, plain English that sells outcomes to business owners without jargon; no exclamation marks, no hype words.
- Standing direction (owner's choice, 2026-09-28): the lively corporate-services standard, at the craft level of the owner's references (Biztop, Creatix and Finoza consulting templates): deep colour fields alternating with light sections, real photography, floating proof cards over photos, pill buttons, a contact bar above the nav. Executed in Maverick's own blue, white and black; never copy the references' green and lime or their layouts one to one. A quiet, all-white document look was tried and rejected as boring. Executed since 2026-09-28 in the dark-only theme (see Theme): the light-section, contact-bar and photo-hero parts of this direction are superseded; its liveliness, rounded panels, pill buttons and floating proof cards stand.

## Evidence on Hand

- Live client websites with screenshots in `public/` and `public/thumbs/`: Kainiu Investments, JOPE Forwarders, Byoreko Holdings, Galaxy Pet Store, Acts of Love Empowerment Foundation, RAC Gadgets, StudyInChinaNow, High Flyer Trading.
- Project facts in `src/utils/constants.jsx`: duration, tech, and a `delivered` line (what the site does). Result percentages were removed on 2026-09-28 because they were unsourced and repeated (four projects claimed ~95% satisfaction). Only reinstate a result with its source and timeframe.
- Three client testimonials in `src/utils/constants.jsx` (two attributed to the same name; owner to confirm).
- Founder headshot `public/Martin2.jpeg`; 3D cartoon illustrations of the founder in `public/cartoons/`.
- Mood photography supplied by the owner in `public/photos/` (from `public/Image1-4.jpg`; Image1 and Image2 are AI-generated and had a Gemini watermark, cropped out). Illustrative only: not photos of Maverick's own team or office.
- One Google review exists (text and rating not provided).
- Absent, must not be fabricated: client logos (several clients have none), photos of the founder at work, team photos, review counts or ratings, awards, registration details.

## Product Principles

1. Trust before the first conversation: every claim is real and checkable, and real work is shown, not described.
2. One clear next step everywhere: book a free consultation; call and WhatsApp are always one tap away.
3. Speak to the business owner's outcome (credibility, being found, getting enquiries), not to design process.
4. Open pricing to qualify leads, with a free consultation to lower the barrier.
5. Nothing invented: placeholders are marked and removed only when real assets arrive.
