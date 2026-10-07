import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Clients, Statement } from "../components/Proof";
import Services from "../components/Services";
import About from "../components/About";
import SelectedWork from "../components/SelectedWork";
import Process from "../components/Process";
import Fees from "../components/Fees";
import Testimonials from "../components/Testimonials";
import Questions from "../components/Questions";
import Booking from "../components/Booking";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { homeMeta } from "../seo/pages";

export default function Home() {
	return (
		<>
			<Seo {...homeMeta} />
			<Navbar />
			<main id="main">
				<Hero />
				<Clients />
				<SelectedWork />
				<Statement />
				<Services />
				<About />
				<Process />
				<Fees />
				<Testimonials />
				<Questions />
				<Booking />
			</main>
			<Footer />
		</>
	);
}
