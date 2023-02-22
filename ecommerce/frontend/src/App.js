import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./components/home/Home";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import "./App.css";
import ProductDetails from "./components/product/ProductDetails";
import Product from "./components/home/Product";
const App = () => {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanks"],
      },
    });
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" elemetn={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
