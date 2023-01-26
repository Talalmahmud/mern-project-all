const express = require("express");
require("express-async-errors");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user.route");

const notFoundError = require("./errorhandler/notFound");
const errorHandlerMiddleware = require("./errorhandler/errorHandler");

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.use(notFoundError);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = () => {
  try {
    app.listen(port, () =>
      console.log(`Server is running: http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
