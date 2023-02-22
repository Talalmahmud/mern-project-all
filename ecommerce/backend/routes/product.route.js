const expres = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
} = require("../controllers/product.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = expres.Router();
//isAuthenticatedUser, authorizeRoles("admin"),
router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/products/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/review")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReviews);

module.exports = router;
