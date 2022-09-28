require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const cors = require("cors");

const app = express();
// host
app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(express.json());
app.use(cors());
// extra packages

app.get("/", (req, res) => {
  res.send("<h1>Inventory Management System</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);

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
