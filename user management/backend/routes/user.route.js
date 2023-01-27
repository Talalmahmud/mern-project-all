const express = require("express");
const {
  userRegistration,
  getAlluser,
  getUser,
  userDelete,
  userUpdate,
} = require("../controllers/user.contoller");
const router = express.Router();

router.post("/register", userRegistration);
router.get("/alluser", getAlluser);
router.route("/:id").get(getUser).delete(userDelete).put(userUpdate);

module.exports = router;
