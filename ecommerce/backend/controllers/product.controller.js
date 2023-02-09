const Products = require("../models/product.model");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create products
const createProduct = async (req, res, next) => {
  console.log(req.user);
  try {
    req.body.user = req.user.id;

    const product = await Products.create(req.body);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    throw new ErrorHandler("Product not created", 400);
  }
};

// get all products
const getAllProducts = async (req, res, next) => {
  const resultperpage = 10;
  const productCount = await Products.countDocuments();

  const apifeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  //console.log(apifeature.queryString);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    // productCount,
  });
};

// get specific id product

const getProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// update specific id product

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Products.findById(id);
  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  product = await Products.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    success: true,
    product,
  });
};

// delete specific product

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Products.findById(id);
  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  product = await Products.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    msg: "Product is deleted",
    product,
  });
};

const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: rating,
    comment: comment,
  };
  const product = await Products.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );
  console.log(isReviewed);
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }
  let avg = 0;
  const avgRating = product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
    msg: "Review add successfully",
  });
};

const getProductReviews = async (req, res, next) => {
  const product = await Products.findById(req.query.id);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

const deleteProductReviews = async (req, res, next) => {
  const product = await Products.findById(req.query.producId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }

  const reviews = product.reviews.filter((rev) => {
    rev._id.toString() !== req.query.id.toString();
  });
  let avg = 0;
  const avgRating = product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.findByIdAndUpdate(req.query.producId, {
    reviews,
    ratings,
    numofReviews,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
};
