import { BUSINESS, formatUGX } from "../utils/business.js";

/*
 * Guides for business owners (/guides). Each answers a question Ugandan business
 * owners search for before they hire a web designer, then offers a free consultation.
 *
 * Writing rules: short sentences, everyday words, and explain any technical term the
 * first time it appears. Many readers use English as a second language and are not
 * technical. No invented statistics; confirm third-party fees with the provider.
 *
 * Plain data, so the pages, the sitemap and the link previews all read the same text.
 * Sections: { heading, paragraphs?: [], list?: [], ordered?: true, after?: [] }.
 * `image` sits behind the page header, on the guide card and in the link preview (public/og/guide-<slug>.jpg).
 * `topic` preselects the booking form's topic (must be one of SERVICES in utils/booking.js).
 */

const START = formatUGX(BUSINESS.startingPrice);

export const guides = [
	{
		slug: "website-cost-in-uganda",
		image: "/photos/hero-laptop.webp",
		imagePosition: "70% 50%",
		title: "How much does a website cost in Uganda?",
		description: `What a business website costs in Uganda, what changes the price, the costs you pay every year, and what to ask before you pay a deposit. Our websites start from ${START}.`,
		date: "2026-10-08",
		intro:
			"This is the first question most business owners ask us. The honest answer is: it depends on what the website needs to do. This guide explains what you are paying for, so you can compare quotes and avoid surprise costs later.",
		topic: "Website",
		cta: "Get a written quote",
		sections: [
			{
				heading: "The short answer",
				paragraphs: [`Our business websites start from ${START}. For that price, you get a website of a few pages that:`],
				list: ["looks good and works well on phones,", "is set up so Google can find it, and", "lets visitors call, WhatsApp or email you with one tap."],
				after: [
					"Bigger websites, online shops and custom systems cost more. We always confirm the price in writing before any work starts.",
					"You will see quotes much lower and much higher than ours. The difference is usually not only the design. It is what is included, who owns the website at the end, and what you pay every year after it goes live.",
				],
			},
			{
				heading: "What changes the price",
				list: [
					"How many pages you need, and how much text and how many photos each page has.",
					"Extra features, such as an online shop, bookings, Mobile Money payments or customer logins.",
					"Whether the design is made just for you, or adapted from a ready-made template.",
					"Who writes the text and takes the photos: you, or the designer.",
					"Whether your team wants to update the website themselves. This needs a simple editing tool, often called a CMS (content management system).",
					"Links to other tools you use, such as WhatsApp, your Google Business Profile, email or a payment provider.",
				],
			},
			{
				heading: "Costs you pay once, and costs you pay every year",
				paragraphs: [
					"You pay for designing and building the website once. But every website also has costs that come back every year. Many people forget to plan for these:",
				],
				list: [
					"Domain name: your website address, such as yourcompany.com or yourcompany.co.ug. You renew it every year.",
					"Hosting: the rented space on a server (a computer that is always online) where your website is kept.",
					"Business email, such as info@yourcompany.com, if you want it.",
					"Maintenance: someone keeping the website safe, backed up and up to date, if you want this service.",
				],
				after: ["Always ask how much these will cost from the second year, not only in the first year. Some offers are cheap at first and expensive later."],
			},
			{
				heading: "Warning signs in a cheap quote",
				list: [
					"The domain name will be registered in the designer's name, not your company's. If you stop working together, you could lose your website address.",
					"There is no written list of the pages and features you are paying for.",
					"Nobody tells you what you will pay every year.",
					"You must pay the designer every time you want a small change.",
					"The designer cannot show you live websites they have built.",
				],
			},
			{
				heading: "Questions to ask before you pay a deposit",
				list: [
					"What exactly is included, page by page?",
					"Who will own the domain name, the hosting account and the content?",
					"How much will I pay every year after the website goes live?",
					"How long will it take, and what do you need from me?",
					"Can I see live websites you have built?",
				],
			},
			{
				heading: "How we price our work",
				paragraphs: [
					"We start with a free 30-minute consultation, where we learn about your business and what you need the website to do. Then we send you a written quote. It lists the pages, the features, the timeline and the yearly costs, so there are no surprises.",
					"Every website on our work page is live. Open them and judge our work before you decide.",
				],
			},
		],
	},
	{
		slug: "signs-your-website-is-outdated",
		image: "/photos/office-wireframes.webp",
		imagePosition: "center 35%",
		title: "7 signs your company website is outdated",
		description:
			"Seven signs your company website is losing you customers, from slow loading on mobile data to no WhatsApp button, and what to do about each one.",
		date: "2026-10-08",
		intro:
			"When people hear about your business, many of them check your website first. If it looks old or forgotten, they may think your business is the same. Here are seven signs it is time to update your website.",
		topic: "Website review",
		cta: "Book a free website review",
		sections: [
			{
				heading: "1. It is hard to use on a phone",
				paragraphs: [
					"Most people will visit your website on their phone. If the text is too small, the buttons are hard to tap, or the page moves sideways, they will leave.",
					"Try this: open your website on your phone and see how quickly you can call your business from it.",
				],
			},
			{
				heading: "2. It loads slowly on mobile data",
				paragraphs: [
					"Mobile data costs money, and people do not like to wait. Large photos, and videos that play by themselves, make a website slow and use up data. If your pages take more than a few seconds to open on a normal 4G connection, many visitors will leave before they see what you offer.",
				],
			},
			{
				heading: "3. The browser says “Not secure”",
				paragraphs: [
					"Look at the address bar when you open your website. If it says “Not secure” instead of showing a small padlock, your website has no security certificate (called SSL or HTTPS). Browsers warn visitors about these websites, and it makes a business look careless. It is usually quick and cheap to fix.",
				],
			},
			{
				heading: "4. The information is out of date",
				paragraphs: [
					"Old phone numbers, services you no longer offer, staff who have left, or an old year at the bottom of the page all send the same message: nobody is looking after this website. Some visitors will even wonder if your business is still open.",
				],
			},
			{
				heading: "5. It is hard to contact you",
				paragraphs: [
					"Customers should be able to call you or send you a WhatsApp message with one tap, from any page. If your phone number is hidden at the bottom of one page, or your contact form sends messages to an inbox nobody checks, you are losing customers without knowing it.",
				],
			},
			{
				heading: "6. You cannot update it yourself",
				paragraphs: [
					"If you need a developer for every small change, the website stops being updated. A simple editing tool lets your team change prices, add photos and post news in a few minutes.",
				],
			},
			{
				heading: "7. Customers cannot find it on Google",
				paragraphs: [
					"Search on Google for your business name. Then search for your main service and your town, for example “clearing and forwarding Kampala”. If your competitors appear and you do not, your website and your Google Business Profile need work.",
				],
			},
			{
				heading: "What to do next",
				paragraphs: [
					"You do not always need a new website. Sometimes a few fixes are enough. Book a free website review, and we will tell you honestly which one you need and what it would cost.",
				],
			},
		],
	},
	{
		slug: "before-you-hire-a-web-designer",
		image: "/photos/wireframe-sketch.webp",
		imagePosition: "center 60%",
		title: "What to prepare before you hire a web designer",
		description:
			"A simple checklist for business owners in Uganda: what to decide and gather before you hire a web designer, so your website is ready sooner and costs less.",
		date: "2026-10-08",
		intro:
			"Most website projects are not slowed down by the design. They are slowed down by waiting: for text, for photos, for passwords and for decisions. If you prepare a few things first, you can save weeks and keep the cost down.",
		topic: "Website",
		cta: "Book a free consultation",
		sections: [
			{
				heading: "Decide the main job of your website",
				paragraphs: [
					"What should the website do for your business? For example: bring more calls and WhatsApp messages, sell products online, take bookings, or make you look trustworthy to partners and in tenders.",
					"Choose the most important one and write it in one sentence. Every decision about the website should support it.",
				],
			},
			{
				heading: "Gather your content",
				list: [
					"A short description of your business and who your customers are.",
					"Your services or products, with prices if you want to show them.",
					"Photos of your work, your team or your premises. Real photos build more trust than stock photos from the internet.",
					"Names of clients, or their reviews, that you have permission to use.",
					"Your phone number, email, location and working hours.",
				],
				after: ["It does not need to be perfect. A good web designer will help you improve it."],
			},
			{
				heading: "Find your logo files",
				paragraphs: [
					"Send your logo in the best quality you have. The best is the original file from whoever designed it: ask them for an SVG, AI or PDF file. Also share your brand colours and fonts if you have them.",
					"If you do not have a logo yet, create one before the website or at the same time, so the two match.",
				],
			},
			{
				heading: "Check who controls your website address",
				paragraphs: [
					"If you already have a website address (a domain name), find out who registered it and where it is managed. Make sure it is in your company's name and that you have the login details. Do the same for your hosting, your business email and your Google Business Profile.",
					"Lost passwords are one of the most common reasons websites are delayed.",
				],
			},
			{
				heading: "Find examples you like",
				paragraphs: [
					"Write down two or three websites you like, from any industry, and what you like about them. Websites you do not like are useful too. This helps a designer understand what you want very quickly.",
				],
			},
			{
				heading: "Know your budget and who decides",
				paragraphs: [
					"Tell the designer your budget range. This helps them suggest what you can get for it, instead of guessing.",
					"Also agree who in your business will approve the design and the text. When one person makes the final decision, the project keeps moving.",
				],
			},
			{
				heading: "Agree on dates",
				paragraphs: [
					"If you need the website by a certain date, for example for a launch, an event or a tender, say so at the start. Then plan how quickly your team can give feedback on drafts. Quick feedback is the biggest single thing that helps a project finish on time.",
				],
			},
			{
				heading: "Not ready yet?",
				paragraphs: ["That is fine. Bring what you have to a free consultation. We will tell you what is missing and help you prepare the rest."],
			},
		],
	},
	{
		slug: "mobile-money-payments-on-your-website",
		image: "/galaxypet-shop.webp",
		imagePosition: "center top",
		title: "Accepting Mobile Money on your website",
		description:
			"How businesses in Uganda can let customers pay with MTN Mobile Money and Airtel Money on their website: how it works, what you need, and what to ask a payment provider.",
		date: "2026-10-08",
		intro:
			"Many customers in Uganda prefer to pay with Mobile Money. If your website sells products, takes bookings or collects donations, letting people pay with MTN Mobile Money or Airtel Money makes it easier for them to pay you.",
		topic: "Online shop or system",
		cta: "Talk to us about payments",
		sections: [
			{
				heading: "How it works",
				paragraphs: [
					"Your website usually does not connect to MTN or Airtel directly. It connects to a payment provider: a company that handles online payments for businesses. This is what happens when a customer pays:",
				],
				ordered: true,
				list: [
					"The customer chooses Mobile Money on your website.",
					"They enter their phone number.",
					"A message appears on their phone, and they approve the payment with their PIN.",
					"The payment provider tells your website that the payment went through.",
					"The provider sends the money to your business account, minus a small fee.",
				],
			},
			{
				heading: "Choosing a payment provider",
				paragraphs: [
					"Several payment providers in Uganda accept both MTN Mobile Money and Airtel Money, and many also accept bank cards. Pesapal and Flutterwave are two well-known examples. When you compare providers, ask them:",
				],
				list: [
					"Which payment methods do you accept: MTN, Airtel, Visa, Mastercard?",
					"What is the fee for each payment? Are there monthly or setup fees?",
					"How, and how often, do you send the money to us?",
					"What documents do you need from our business?",
					"Does your service work with our website?",
					"Who do we call when a payment goes wrong?",
				],
				after: ["Fees and rules change, so always check the latest details with the provider."],
			},
			{
				heading: "What you will usually need",
				list: [
					"Your business registration documents. Providers need to know who they are paying.",
					"A business bank account or Mobile Money account to receive the money.",
					"Clear prices, terms and a refund policy on your website.",
					"A secure website, with the padlock in the address bar.",
				],
			},
			{
				heading: "Help customers feel safe when they pay",
				list: [
					"Show the total amount clearly before they pay.",
					"Tell them to expect a message on their phone to approve the payment.",
					"Send a confirmation by email or SMS after they pay.",
					"Show your phone number and WhatsApp, in case something goes wrong.",
				],
			},
			{
				heading: "Do you need online payments yet?",
				paragraphs: [
					"If you sell a few large services, an invoice and your Mobile Money merchant number may be enough for now. Online payments are most useful when you have many smaller payments, such as shop orders, bookings, event tickets or donations.",
					"We build websites that take payments, including online shops and booking systems. Book a free consultation and tell us how your customers like to pay.",
				],
			},
		],
	},
];

const words = (g) =>
	[g.intro, ...g.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.list ?? []), ...(s.after ?? [])])].join(" ").split(/\s+/).length;

export const readMinutes = (g) => Math.max(2, Math.round(words(g) / 220));

export const formatGuideDate = (iso) =>
	new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
