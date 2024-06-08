import mongoose from "mongoose";
function validateEmail(textEmail) {
  return /^\S+@\S+\.\S+$/.test(textEmail);
}
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email đã tồn tại"],
      validate: {
        validator: validateEmail,
        message: "Email không hợp lệ",
      },
    },
    password: {
      type: String,
      required: [true, "Không được để trống password"],
      minLength: [6, "Cần nhập tối thiểu 6 ký tự"],
    },
    role: {
      type: String,
      default: "member",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("users", userSchema);
