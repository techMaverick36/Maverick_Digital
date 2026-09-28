export const services = [
	{
		eyebrow: "Web Delivery",
		title: "Web Design & Development",
		description:
			"Company websites and web apps with a content editor, WhatsApp and call buttons, and pages Google can read.",
		features: [
			"Corporate websites",
			"Responsive design",
			"CMS and content updates",
			"Performance optimisation",
		],
	},
	{
		eyebrow: "Technical Support",
		title: "Business IT & Tech Solutions",
		description:
			"We review how your team works, set up the systems and software that fit, and support them day to day.",
		features: [
			"Process review",
			"System setup",
			"Operations support",
			"Technical advisory",
		],
	},
	{
		eyebrow: "Marketing Operations",
		title: "Social Media Management",
		description:
			"Content planning, posting and campaign management across your social accounts, with regular reports on what is working.",
		features: [
			"Editorial planning",
			"Account management",
			"Campaign coordination",
			"Performance reporting",
		],
	},
	{
		eyebrow: "Brand Foundation",
		title: "Branding & Identity Design",
		description:
			"Logo, colours and brand guidelines, so your business looks the same on your website, documents, signage and social media.",
		features: [
			"Identity direction",
			"Visual standards",
			"Collateral design",
			"Brand consistency",
		],
	},
	{
		eyebrow: "Product Experience",
		title: "UI/UX Design",
		description:
			"User experience and interface design for apps and customer portals: we map how people use them, then design screens that are simple to use.",
		features: [
			"Journey mapping",
			"Wireframes",
			"Interface systems",
			"Usability refinement",
		],
	},
	{
		eyebrow: "Decision Support",
		title: "Data Analysis Services",
		description:
			"We turn raw data into clear insight, so you can make smarter decisions with more confidence and less guesswork.",
		features: [
			"Data cleaning",
			"Dashboards and reports",
			"Trend analysis",
			"Presentation-ready outputs",
		],
	},
];

export const testimonials = [
	{
		name: "Aine Joram Jones",
		role: "CEO, JOPE Forwarders Limited",
		content:
			"Maverick Digital Hub helped us present the business much better online. The process felt smooth, professional, and easy to trust.",
		avatar: "AJ",
	},
	{
		name: "Aine Joram Jones",
		role: "MD, Kainiu Investments Limited",
		content:
			"They understood what the business needed, communicated well, and delivered something that felt right for where we wanted to go.",
		avatar: "DC",
	},
	{
		name: "Byoreko",
		role: "Byoreko Holdings Limited",
		content:
			"The final result felt polished and reliable, and the support throughout the project made the whole experience much easier.",
		avatar: "B",
	},
	/* DRAFTS written for these clients to approve. They stay hidden on the site while
	   `approved` is false. Send each person their draft, apply any edits they make,
	   then set `approved: true` once they confirm it can go live with their name. */
	{
		name: "Namugga Kyle",
		role: "Copywriter, Acts of Love Empowerment Foundation",
		content:
			"Maverick Digital Hub turned our story into a website we are proud to share. Donors and partners can now see our programmes and get involved in a few clicks, and the team was patient with every round of edits.",
		avatar: "NK",
		approved: false,
	},
	{
		name: "Christopher",
		role: "Owner, Galaxy Pet Store",
		content:
			"Customers can now browse our products and book grooming or boarding without calling first. Martin understood how the shop runs, built a site that fits it, and responds quickly whenever we need a change.",
		avatar: "C",
		approved: false,
	},
	{
		name: "Mark Nuwagirwa",
		role: "Owner, StudyInChinaNow",
		content:
			"Students can now find our scholarships, check the requirements and see exactly how to apply, all in one place. The process was clear from the first call, and the site looks as professional as the service we offer.",
		avatar: "MN",
		approved: false,
	},
];

export const techStack = [
	"React",
	"TypeScript",
	"Node.js",
	"MongoDB",
	"Tailwind",
	"Express.js",
	"Vite",
	"Next.js",
	"JavaScript",
	"Git",
	"WordPress",
	"Flutter",
	"JWT",
	"Figma",
	"UI/UX",
	"AWS",
	"Docker",
	"GraphQL",
];

export const projects = [
	{
		id: 1,
		title: "Kainiu Investments Limited",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Product gallery and dealer website",
		category: "web",
		tags: ["Web Design", "Development", "UI/UX"],
		description:
			"A redesign and development project for a sales company that needed a clearer, stronger online presence.",
		image: "/kainiu.jpg",
		thumb: "/thumbs/kainiu.jpg",
		color: "from-[#1c4d87] to-[#162233]",
		stats: {
			duration: "3 months",
			tech: "React, Node.js",
		},
		link: "https://www.kainiuinvestmentsltd.com/",
	},
	{
		id: 2,
		title: "JOPE Forwarders Limited",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Clearing and forwarding services site",
		category: "web",
		tags: ["Web Design", "Development", "UI/UX"],
		description:
			"A company website built to present services clearly and help potential clients understand the business quickly.",
		image: "/jope.jpg",
		thumb: "/thumbs/jope.jpg",
		color: "from-[#234f8f] to-[#182535]",
		stats: {
			duration: "2 weeks",
			tech: "Figma, React, Tailwindcss",
		},
		link: "https://www.jopeforwardersug.com/",
	},
	{
		id: 4,
		title: "Byoreko Holdings Limited",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Products and services showcase",
		category: "web",
		tags: ["Web Design", "UI/UX"],
		description:
			"A business website created to showcase products and services in a way that feels clear and confident.",
		image: "/byoreko.jpg",
		thumb: "/thumbs/byoreko.jpg",
		color: "from-[#274f8d] to-[#1a2431]",
		stats: {
			duration: "4 weeks",
			tech: "Figma, React, Tailwindcss",
		},
		link: "https://www.byorekoholdingsltd.com/",
	},
	{
		id: 9,
		title: "Galaxy Pet Store",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Online shop with service booking",
		category: "web",
		tags: ["Web Design", "Development", "E-Commerce"],
		description:
			"A website and online shop for a Kampala pet store, with product listings and cart, grooming and boarding service booking, and click-to-call.",
		image: "/galaxypet.jpg",
		thumb: "/thumbs/galaxypet.jpg",
		/* second screen, shown as an inset on the portfolio page */
		detail: "/galaxypet-shop.jpg",
		/* TODO: add duration and tech once confirmed */
		stats: {
			duration: "4 weeks",
			tech: "Figma, React, Tailwindcss",
		},
		link: "https://galaxypetstoreug.com/",
	},
	{
		id: 5,
		title: "Acts of Love Empowerment Foundation",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Donations and partner sign-ups",
		category: "web",
		tags: ["Web Design", "Development", "NGO"],
		description:
			"A website built for a community-driven foundation focused on empowering people of all ages through outreach and support programmes.",
		image: "/actsoflove.jpg",
		thumb: "/thumbs/actsoflove.jpg",
		color: "from-[#8b1c1c] to-[#1e1010]",
		stats: {
			duration: "2 weeks",
			tech: "React, Tailwind CSS",
		},
		link: "https://actsofloveempowerment.org/",
	},
	{
		id: 7,
		title: "RAC Gadgets",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Video showcase with WhatsApp enquiries",
		category: "web",
		tags: ["Web Design", "Development", "UI/UX"],
		description:
			"A website for a gadget and repair business, with unboxing and repair videos, services, customer reviews and one-tap WhatsApp chat.",
		image: "/racgadgets.jpg",
		thumb: "/thumbs/racgadgets.jpg",
		/* TODO: add duration and tech once confirmed */
		stats: {},
		link: "https://racgadgets.com/",
	},
	{
		id: 8,
		title: "StudyInChinaNow",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Scholarship listings and application guide",
		category: "web",
		tags: ["Web Design", "Development", "Education"],
		description:
			"A scholarship platform that helps African students apply to accredited Chinese universities, with scholarship listings, requirements and a guided application path.",
		image: "/studyinchina.jpg",
		thumb: "/thumbs/studyinchina.jpg",
		/* TODO: add duration and tech once confirmed */
		stats: {
			duration: "4 weeks",
			tech: "Figma, React, Tailwindcss",
		},
		link: "https://studyinchinanow.com/",
	},
	{
		id: 6,
		title: "High Flyer Trading Limited",
		/* What the site does for the client (shown instead of unsourced result figures) */
		delivered: "Product catalogue with a built-in CMS",
		category: "web",
		tags: ["Web Design", "Development", "CMS"],
		description:
			"An e-commerce website for a home appliance retailer, built with a fully integrated CMS so the team can update products and content themselves.",
		image: "/highflyer.jpg",
		thumb: "/thumbs/highflyer.jpg",
		color: "from-[#0d7377] to-[#0a2233]",
		stats: {
			duration: "4 weeks",
			tech: "React, Tailwind CSS, CMS",
		},
		link: "https://highflyertadingltd.com/",
	},
];
