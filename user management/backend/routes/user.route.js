const express = require("express");
const { userRegistration } = require("../controllers/user.contoller");
const router = express.Router();

router.get("/register", userRegistration);

module.exports = router;
