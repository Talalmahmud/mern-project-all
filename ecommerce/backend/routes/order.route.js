const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  getLoggedUserOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//user
router.route("/create").post(isAuthenticatedUser, newOrder);
router.route("/user/me").get(isAuthenticatedUser, getLoggedUserOrder);

//adim
router
  .route("/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);
router
  .route("/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

module.exports = router;
