import { BsCpu, BsGraphUp, BsPalette, BsRocket } from "react-icons/bs";
import {
	FiCode,
	FiLayout,
	FiTarget,
	FiTrendingUp,
	FiUsers,
	FiZap,
} from "react-icons/fi";

export const services = [
	{
		icon: <FiCode className="w-7 h-7" />,
		title: "Web Design & Development",
		description:
			"Custom, high-performance websites built with modern frameworks like React, Vue, and Next.js.",
		features: [
			"Full-Stack Development",
			"Responsive Design",
			"API Integration",
			"Performance Optimization",
		],
		color: "blue",
	},
	{
		icon: <BsCpu className="w-7 h-7" />,
		title: "Business IT & Tech Solutions",
		description:
			"Enterprise-grade IT infrastructure, cloud solutions, and digital transformation consulting.",
		features: [
			"Cloud Migration",
			"System Architecture",
			"DevOps & CI/CD",
			"Tech Consulting",
		],
		color: "purple",
	},
	{
		icon: <FiTrendingUp className="w-7 h-7" />,
		title: "Social Media Management",
		description:
			"Data-driven social strategies that build brand authority and drive measurable engagement.",
		features: [
			"Content Strategy",
			"Analytics & Insights",
			"Paid Campaigns",
			"Community Growth",
		],
		color: "pink",
	},
	{
		icon: <BsPalette className="w-7 h-7" />,
		title: "Branding & Identity Design",
		description:
			"Strategic brand development that creates lasting impressions and competitive differentiation.",
		features: [
			"Brand Strategy",
			"Logo & Identity",
			"Brand Guidelines",
			"Marketing Collateral",
		],
		color: "indigo",
	},
	{
		icon: <FiLayout className="w-7 h-7" />,
		title: "UI/UX Design",
		description:
			"User-centered design that combines aesthetics with functionality for optimal experiences.",
		features: [
			"User Research",
			"Wireframing & Prototyping",
			"Usability Testing",
			"Design Systems",
		],
		color: "cyan",
	},
	{
		icon: <BsGraphUp className="w-7 h-7" />,
		title: "Data Analysis Services",
		description:
			"Professional data insights through statistical analysis, reporting, and decision-support analytics.",
		features: [
			"Frequency Analysis",
			"Rank Analysis",
			"Pivot Tables",
			"Regression Analysis",
			"Descriptive Statistics",
		],
		color: "emerald",
	},
];

export const stats = [
	{ number: "5+", label: "Projects Delivered", icon: <FiTarget /> },
	{ number: "98%", label: "Client Satisfaction", icon: <FiUsers /> },
	{ number: "24/7", label: "Support Available", icon: <FiZap /> },
	{ number: "3+", label: "Years Experience", icon: <BsRocket /> },
];

export const testimonials = [
	{
		name: "Aine Joram Jones",
		role: "CEO, Jope Forwarders",
		content:
			"Maverick Digital Hub transformed our digital presence completely. Their technical expertise and design sensibility are unmatched.",
		avatar: "AJ",
	},
	{
		name: "Aine Joram Jones",
		role: "MD, Kainiu Investments Limited",
		content:
			"The team's ability to understand complex business requirements and translate them into elegant solutions is impressive.",
		avatar: "DC",
	},
	{
		name: "Byoreko",
		role: "Byoreko Holding Limited",
		content:
			"Working with Maverick was a game-changer. They delivered beyond expectations and continue to support our growth.",
		avatar: "B",
	},
	{
		name: "Akandwanaho Ceaser",
		role: "CEO, Azalea cleaning and Property Management",
		content:
			"Working with Maverick was a game-changer. They delivered beyond expectations and continue to support our growth.",
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
