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
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    throw new ErrorHandler("Order not found");
  }

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
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

const updateOrder = async (req, res, next) => {
  const order = await Orders.find(req.user.id);

  if (order.orderStatus === "Delivered") {
    throw new ErrorHandler("You have already delivered this order", 400);
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliverAt = Date.now();
  }

  res.status(200).json({
    success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Products.findById(id);
  product.stock = product.stock - quantity;
  await product.save();
}

const deleteOrder = async (req, res, next) => {
  const order = await Orders.findByIdAndDelete(req.params.id);

  if (!order) {
    throw new ErrorHandler("Order not found");
  }

  res.status(200).json({
    success: true,
    msg: "Order remove sucessfully",
  });
};
module.exports = {
  newOrder,
  getSingleOrder,
  getLoggedUserOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
