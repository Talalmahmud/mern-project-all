const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  getLoggedUserOrder,
  getAllOrders,
} = require("../controllers/order.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/create").post(isAuthenticatedUser, newOrder);
router
  .route("/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);
router.route("/user/me").get(isAuthenticatedUser, getLoggedUserOrder);

module.exports = router;
