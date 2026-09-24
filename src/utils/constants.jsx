export const services = [
	{
		eyebrow: "Web Delivery",
		title: "Web Design & Development",
		description:
			"We build websites and web applications that help your business look professional, feel easy to trust, and perform well day to day.",
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
			"We help you put the right systems in place so your team can work more smoothly and depend on tools that actually support the business.",
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
			"We help your brand stay active, consistent, and well presented so your audience keeps seeing the right message in the right way.",
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
			"We create brand systems that make your business easier to recognise, easier to remember, and more confident in every interaction.",
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
			"We design interfaces that feel clear, smooth, and easy to use, so people enjoy the experience and trust the product faster.",
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
		role: "CEO, Jope Forwarders",
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
		role: "Byoreko Holding Limited",
		content:
			"The final result felt polished and reliable, and the support throughout the project made the whole experience much easier.",
		avatar: "B",
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
			impact: "+250% Sales",
		},
		link: "https://www.kainiuinvestmentsltd.com/",
	},
	{
		id: 2,
		title: "JOPE Forwarders Limited",
		category: "web",
		tags: ["Web Design", "Development", "UI/UX"],
		description:
			"A company website built to present services clearly and help potential clients trust the business faster.",
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
		category: "web",
		tags: ["Web Design", "UI/UX"],
		description:
			"A business website created to showcase products and services in a way that feels clear, confident, and trustworthy.",
		image: "/byoreko.jpg",
		thumb: "/thumbs/byoreko.jpg",
		color: "from-[#274f8d] to-[#1a2431]",
		stats: {
			duration: "4 weeks",
			tech: "Figma, React, Tailwindcss",
			impact: "95% User Satisfaction",
		},
		link: "https://www.byorekoholdingsltd.com/",
	},
	{
		id: 9,
		title: "Galaxy Pet Store",
		category: "web",
		tags: ["Web Design", "Development", "E-Commerce"],
		description:
			"A website and online shop for a Kampala pet store, with product listings and cart, grooming and boarding service booking, and click-to-call.",
		image: "/galaxypet.jpg",
		thumb: "/thumbs/galaxypet.jpg",
		/* second screen, shown as an inset on the portfolio page */
		detail: "/galaxypet-shop.jpg",
		/* TODO: add duration, tech and impact once confirmed */
		stats: {
			duration: "4 weeks",
			tech: "Figma, React, Tailwindcss",
			impact: "95% User Satisfaction",
		},
		link: "https://galaxypetstoreug.com/",
	},
	{
		id: 5,
		title: "Acts of Love Empowerment Foundation",
		category: "web",
		tags: ["Web Design", "Development", "NGO"],
		description:
			"A website built for a community-driven foundation focused on empowering people of all ages through outreach and support programs.",
		image: "/actsoflove.jpg",
		thumb: "/thumbs/actsoflove.jpg",
		color: "from-[#8b1c1c] to-[#1e1010]",
		stats: {
			duration: "2 weeks",
			tech: "React, Tailwind CSS",
			impact: "50+ Reachouts",
		},
		link: "https://actsofloveempowerment.org/",
	},
	{
		id: 7,
		title: "RAC Gadgets",
		category: "web",
		tags: ["Web Design", "Development", "UI/UX"],
		description:
			"A website for a gadget and repair business, with unboxing and repair videos, services, customer reviews, and one-tap WhatsApp chat.",
		image: "/racgadgets.jpg",
		thumb: "/thumbs/racgadgets.jpg",
		/* TODO: add duration, tech and impact once confirmed */
		stats: {},
		link: "https://racgadgets.com/",
	},
	{
		id: 8,
		title: "StudyInChinaNow",
		category: "web",
		tags: ["Web Design", "Development", "Education"],
		description:
			"A scholarship platform that helps African students apply to accredited Chinese universities, with scholarship listings, requirements, and a guided application path.",
		image: "/studyinchina.jpg",
		thumb: "/thumbs/studyinchina.jpg",
		/* TODO: add duration, tech and impact once confirmed */
		stats: {
			duration: "4 weeks",
			tech: "Figma, React, Tailwindcss",
			impact: "95% User Satisfaction",
		},
		link: "https://studyinchinanow.com/",
	},
	{
		id: 6,
		title: "High Flyer Trading Limited",
		category: "web",
		tags: ["Web Design", "Development", "CMS"],
		description:
			"An e-commerce website for a home appliance retailer, built with a fully integrated CMS to make product and content management seamless.",
		image: "/highflyer.jpg",
		thumb: "/thumbs/highflyer.jpg",
		color: "from-[#0d7377] to-[#0a2233]",
		stats: {
			duration: "4 weeks",
			tech: "React, Tailwind CSS, CMS",
			impact: "95% Satisfaction",
		},
		link: "https://highflyertadingltd.com/",
	},
];
