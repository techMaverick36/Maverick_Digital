import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Proof from "../components/Proof";
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
import { FAQ } from "../utils/faq";

export default function Home() {
	return (
		<>
			<Seo
				title="Web Design Company in Kampala"
				description="Maverick Digital Hub designs professional websites and brands for Ugandan businesses. Websites from UGX 1,000,000. Book a free 30-minute consultation."
				path="/"
				faq={FAQ}
			/>
			<Navbar />
			<main id="main">
				<Hero />
				<Proof />
				<Services />
				<About />
				<SelectedWork />
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
