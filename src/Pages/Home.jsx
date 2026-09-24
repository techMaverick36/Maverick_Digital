import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import Services from "../components/Services";
import Manifesto from "../components/Manifesto";
import About from "../components/About";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

export default function Home() {
	return (
		<>
			<Seo
				title="Web Design, Branding and Digital Solutions"
				description="Maverick Digital Hub helps businesses in Kampala and beyond build polished websites, stronger branding, and credible digital experiences."
				path="/"
			/>
			<Navbar />
			<main id="main">
				<Hero />
				<Manifesto />
				<SelectedWork />
				<Services />
				<About />
				<Process />
				<Testimonials />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
