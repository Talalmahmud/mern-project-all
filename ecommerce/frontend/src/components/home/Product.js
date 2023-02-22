import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./product.css";

const options = {
  count: 5,
  value: 2.5,
  isHalf: true,
  size: 20,
  edit: false,
  activeColor: "#ffd700",
};

const Product = ({ products }) => {
  return (
    <>
      <div className="product-card">
        {products &&
          products.map((product, index) => {
            return (
              <Link key={index} className="card" to={`product/${product._id}`}>
                <img src={product.images[0].url} alt="" />
                <p>{product.name}</p>
                <div>
                  <ReactStars {...options} />
                  <span>(23 reviews)</span>
                </div>
                <span>${product.price}</span>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Product;
