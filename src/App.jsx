import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./index.css";
import Portfolio from "./Pages/Portfolio";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";
// import AboutUsPage from "./Pages/About";
// import ServicesPage from "./Pages/Services";
// import ProductsPage from "./Pages/Product.jsx";
// import ContactsPage from "./Pages/Contact.jsx";
// import GalleryPage from "./Pages/Gallery";
// import AboutPage from "./Pages/About";
// import ContactPage from "./Pages/Contact";

const App = () => {
	return (
		<ThemeProvider>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/portfolio" element={<Portfolio />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
