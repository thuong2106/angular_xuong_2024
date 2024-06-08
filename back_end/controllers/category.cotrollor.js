import Category from '../models/Category.model.js'

export function getCate(req, res) {
    Category.find()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json({ message: "Có lỗi khi lấy dữ liệu" });
      });
  }
  
  // [GET]:id
  export function getCateById(req, res) {
    let id = req.params.id;
    if (id) {
      Category.findById(id)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(500).json({ message: "Không tìm thấy danh mục" });
        });
    } else {
      res.status(400).json({ message: "Không nhận được id" });
    }
  }
  
  // [POST]
  export function insertCate(req, res) {
    const category = req.body;
    if (category != {}) {
      Category.create(category)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(500).json({ message: "Có lỗi khi thêm danh mục" });
        });
    } else {
      res.status(400).json({ message: "Không nhận được dữ liệu" });
    }
  }