require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

require("express-async-errors");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
// MIDDLEWARE
app.use(express.json());

app.use([
  express.static("./methods-public"),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
]);

const PORT = process.env.PORT || 3000;

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connect to db
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log("server is listening..."));
  } catch (error) {
    console.log(error);
  }
};

start();
