import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import CaseStudy from "./Pages/CaseStudy";
import Guides from "./Pages/Guides";
import Guide from "./Pages/Guide";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

/* Loaded only when /admin is opened, so visitors never download the dashboard or Supabase. */
const Admin = lazy(() => import("./Pages/Admin"));

const App = () => {
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/portfolio" element={<Portfolio />} />
				<Route path="/work/:slug" element={<CaseStudy />} />
				<Route path="/guides" element={<Guides />} />
				<Route path="/guides/:slug" element={<Guide />} />
				<Route
					path="/admin"
					element={
						<Suspense fallback={null}>
							<Admin />
						</Suspense>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
