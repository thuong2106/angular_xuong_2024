import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BidSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    price: {
      type: Number,
      required: true,
    },
    isWidBid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bid = mongoose.model("bids", BidSchema);

export default Bid;
