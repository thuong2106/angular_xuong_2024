import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
// set up port number
const port = 4000;

app.use(express.json());
app.use(cors());

async function connectMongoose() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/asm_angular");
    console.log("Connected to Mongoose!");
  } catch (error) {
    console.log("Can't connect to Mongoose");
  }
}

// set up home route
app.get("/", (req, res) => {});

// set up routes
import routerProduct from './routers/product.router.js'
import routerCategory from './routers/category.router.js'
import routerUser from './routers/user.router.js'
import bidsRouter from "./routers/bid.router.js";
app.use('/product', routerProduct)
app.use('/category', routerCategory)
app.use('/auth', routerUser);
app.use("/bids", bidsRouter);

app.listen(port, (req, res) => {
  connectMongoose();
  console.log(`Our server is live on ${port}. Yay!`);
});
