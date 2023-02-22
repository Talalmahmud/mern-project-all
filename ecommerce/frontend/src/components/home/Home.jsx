import React, { useEffect } from "react";
import { BsMouse } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../slice/productSlicer";
import "./home.css";
import Product from "./Product";

// const products = [
//   {
//     name: "pproduct 1",
//     descripton: "This is product1",
//     image: [{ url: "images/p1.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12345",
//   },
//   {
//     name: "pproduct 2",
//     descripton: "This is product2",
//     image: [{ url: "images/p2.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12346",
//   },
//   {
//     name: "pproduct 1",
//     descripton: "This is product1",
//     image: [{ url: "images/p1.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12345",
//   },
//   {
//     name: "pproduct 2",
//     descripton: "This is product2",
//     image: [{ url: "images/p2.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12346",
//   },
//   {
//     name: "pproduct 1",
//     descripton: "This is product1",
//     image: [{ url: "images/p1.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12345",
//   },
//   {
//     name: "pproduct 2",
//     descripton: "This is product2",
//     image: [{ url: "images/p2.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12346",
//   },
//   {
//     name: "pproduct 1",
//     descripton: "This is product1",
//     image: [{ url: "images/p1.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12345",
//   },
//   {
//     name: "pproduct 2",
//     descripton: "This is product2",
//     image: [{ url: "images/p2.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12346",
//   },
//   {
//     name: "pproduct 1",
//     descripton: "This is product1",
//     image: [{ url: "images/p1.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12345",
//   },
//   {
//     name: "pproduct 2",
//     descripton: "This is product2",
//     image: [{ url: "images/p2.jpg" }],
//     rating: 2.5,
//     price: 100,
//     _id: "12346",
//   },
// ];

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <div className="banner">
        <h1>ECommErce</h1>
        <h2>Welcome to our ecommerce site</h2>
        <p>Find your product and buy </p>
        <a className="scroll-btn" href="#container">
          Scroll
          <BsMouse className="scroll-icon" />
        </a>
      </div>
      <h2 className="home-heading">Product Features</h2>
      <div className="container" id="container">
        <Product products={products} />
      </div>
    </>
  );
};

export default Home;
