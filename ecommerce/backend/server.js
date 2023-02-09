require("dotenv").config();

const app = require("./app");
const dbConnect = require("./config/dbConnect");

const port = process.env.PORT;
const start = () => {
  try {
    dbConnect(process.env.DB_URL);
    console.log("Database is connected...");
    app.listen(port, () => {
      console.log(`Server is running on : http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
