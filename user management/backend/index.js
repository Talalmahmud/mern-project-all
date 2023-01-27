const express = require("express");
require("express-async-errors");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user.route");

const notFoundError = require("./errorhandler/notFound");
const errorHandlerMiddleware = require("./errorhandler/errorHandler");
const dbConnct = require("./config/db");

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// user routes
app.use("/api/user", userRoutes);

// error middleware
app.use(notFoundError);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = () => {
  try {
    dbConnct(process.env.DB_URL);
    app.listen(port, () =>
      console.log(
        `Server is running: http://localhost:${port} \b database is connected`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
