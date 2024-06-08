import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import "dotenv/config";


export function getUser(req, res) {
  User.find()
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json({ message: "Có lỗi khi lấy dữ liệu" });
    });
}
// [POST] user/register
export async function register(req, res) {
  try {

    const data = req.body;
    const userExist = await User.findOne({ email: data.email });
    if (userExist) return res.status(400).json({ message: "Email đã tồn tại" });
    if (data.password && data.password != "") {
      if (data.password.length < 6) {
        return res
          .status(400)
          .json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
      }
      const hashPassword = await bcryptjs.hash(data.password, 10);

      data.password = hashPassword;
    }

    const userSuccess = await User.create(data);

    if (userSuccess) {

      userSuccess.password = undefined;
      res.status(201).json({
        message: "Thêm tài khoản thành công",
        data: userSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


export async function login(req, res) {
  const data = req.body;

  // Tìm người dùng bằng email
  const userExist = await User.findOne({ email: data.email });
  if (!userExist) return res.status(400).json({ message: "Sai tài khoản" });

  // Kiểm tra password
  const isCheck = await bcryptjs.compare(data.password, userExist.password);
  if (!isCheck) return res.status(400).json({ message: "Sai mật khẩu" });

  const token = jwt.sign(
    { id: userExist._id },
    process.env.KEY_SECRET,
    { expiresIn: "2h" }
  );

  if (token) {
    userExist.password = undefined;
    res.status(200).json({
      message: "Đăng nhập thành công",
      token: token,
      user: { ...userExist.toObject()},
    });
  }
}

export function removeUser(req, res) {
  const id = req.params.id;
  if (id) {
    User.findByIdAndDelete(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json({ message: "Có lỗi khi xóa" });
      });
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}