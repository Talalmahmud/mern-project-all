const Orders = require("../models/order.model");
const Products = require("../models/product.model");
const ErrorHandler = require("../utils/errorHandler");

const newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  const order = await Orders.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    order,
  });
};

const getAllOrders = async (req, res, next) => {
  const orders = await Orders.find();

  if (!orders) {
    throw new ErrorHandler("Order not found");
  }

  res.status(200).json({
    success: true,
    orders,
  });
};

const getSingleOrder = async (req, res, next) => {
  const order = await Orders.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    throw new ErrorHandler("Order not found");
  }

  res.status(200).json({
    success: true,
    order,
  });
};

const getLoggedUserOrder = async (req, res, next) => {
  const order = await Orders.find({ user: req.user.id });

  if (!order) {
    throw new ErrorHandler("Order not found");
  }

  res.status(200).json({
    success: true,
    order,
  });
};

module.exports = { newOrder, getSingleOrder, getLoggedUserOrder, getAllOrders };
