import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

import Bid from "../models/Bid.model.js";
// [GET] /product/category/:id
export function getProductByCateId(req, res) {
  const cateId = req.params.id;
  if (cateId) {
    Product.find({ category: cateId })
      .populate("category")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({ message: "Không tìm thấy sản phẩm" });
      });
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}
export async function getById(req, res) {
  const id = req.params.id;
  try {
    const data = await Product.findById(id).populate([
      { path: "category" },
      {
        path: "bids",
        populate: {
          path: "user",
          model: User,
          select: "email name",
        },
      },
    ]);

    if (!data) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getAll(req, res) {
  try {
    const data = await Product.find().populate("category");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function createProduct(req, res) {
  try {
    const endAtTime = new Date(req.body.startAt).getTime() + req.body.bidTime * 60 * 1000;
    console.log(endAtTime);

    const newProduct = await Product.create({
      ...req.body,
      endAt: new Date(endAtTime),
    });

    res.status(201).json({
      message: "Create Product Successful",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}


export async function updateProduct(req, res) {
  const id = req.params.id;
  const body = req.body;
  try {
    const endAtTime = new Date(body.startAt).getTime() + body.bidTime * 60 * 1000;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...body, endAt: new Date(endAtTime) },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({
      message: "Update Product Successful",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}


export async function deleteProduct(req, res) {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json({ message: "Xóa sản phẩm thành công", _id: id });
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra khi xóa sản phẩm" });
  }
}
