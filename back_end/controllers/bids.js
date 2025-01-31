import { StatusCodes } from "http-status-codes";
import Bid from "../models/Bid.model.js";
import ApiError from "../utils/ApiError.js";
import Product from "../models/Product.model.js";

class BidsController {
  // POST /bids
  async createBid(req, res, next) {
    try {
      const newBid = await Bid.create(req.body);
      // let bidPriceMax = 0;
      // if (req.body.price > bidPriceMax){
      //   bidPriceMax = req.body.price;
      // }
      await Product.findByIdAndUpdate(req.body.product, {
        bids: [...req.body.bids, newBid._id],
        bidPriceMax:
          req.body.price > req.body.bidPriceMax
            ? req.body.price
            : req.body.bidPriceMax,
      });
      res.status(StatusCodes.CREATED).json({
        message: "Create Bid Successfull",
        data: newBid,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BidsController;
