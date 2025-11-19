import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./index.css"
// import AboutUsPage from "./Pages/About";
// import ServicesPage from "./Pages/Services";
// import ProductsPage from "./Pages/Product.jsx";
// import ContactsPage from "./Pages/Contact.jsx";
// import GalleryPage from "./Pages/Gallery";
// import AboutPage from "./Pages/About";
// import ContactPage from "./Pages/Contact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
