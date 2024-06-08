import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    bidTime: {
      type: Number,
    },
    bidPriceMax: {
      type: Number,
      default: 0
    },
    bids: {
      type: [Schema.Types.ObjectId],
      ref: "bids",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("products", productSchema);
