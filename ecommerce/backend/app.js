const express = require("express");
require("express-async-errors");

const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const orederRoute = require("./routes/order.route");

const errorHandlerMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orederRoute);

app.use(errorHandlerMiddleware);
module.exports = app;
