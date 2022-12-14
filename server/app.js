require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const cors = require("cors");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();
app.use(express.json());
app.use(cors());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("<h1>Inventory Mangement System</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
