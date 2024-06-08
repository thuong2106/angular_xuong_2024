import express  from "express";
import { getCate, getCateById, insertCate } from "../controllers/category.cotrollor.js";
const router = express.Router();


// Lấy tất cả
router.get("/",getCate);
// Lấy theo id
router.get("/:id",getCateById);
// Thêm danh mục
router.post("/",insertCate);

export default router;