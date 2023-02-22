import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../slice/productSlicer";
import Carousel from "react-material-ui-carousel";

import "./productDetails.css";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const [count, setCount] = useState(0);
  const params = useParams();
  const { productDetails } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  const options = {
    count: 5,
    value: 4,
    isHalf: true,
    size: 20,
    edit: true,
    activeColor: "#ffd700",
  };

  return (
    <>
      <div className="product">
        <div className="product-image">
          <Carousel>
            {productDetails.images &&
              productDetails.images.map((item, i) => {
                return (
                  <img
                    height="500px"
                    width="400px"
                    src={item.url}
                    key={i}
                    alt=""
                  />
                );
              })}
          </Carousel>
        </div>
        <div className="product-details">
          <h2>{productDetails.name}</h2>
          <h4>Price: $ {productDetails.price}</h4>
          <ReactStars {...options} />
          <div className="product-add-cart">
            <button className="count-btn" onClick={() => setCount(count - 1)}>
              -
            </button>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            <button className="count-btn" onClick={() => setCount(count + 1)}>
              +
            </button>
          </div>
          <button className="cart-btn">Add to</button>
          <p>{productDetails.numofReviews} Reviews</p>
        </div>
      </div>
      <div className="product-reviews">
        <p className="reviews-title">Reviews </p>
        <div className="reviews-list">
          {productDetails.reviews && productDetails.reviews.length >= 1 ? (
            productDetails.reviews.map((r, i) => {
              return (
                <div className="reviews-detials" key={i}>
                  <h2>{r.name}</h2>
                  <ReactStars {...options} />
                  <p>{r.comment}</p>
                </div>
              );
            })
          ) : (
            <p> No reviews are listed</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
