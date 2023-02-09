const expres = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserProfile,
  deleteUser,
} = require("../controllers/user.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = expres.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, userDetails);
router.route("/me/update").get(isAuthenticatedUser, updateUserProfile);

router.route("/logout").get(userLogout);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
