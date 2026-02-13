import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    select: false,
  },
});

UserSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  });
};

UserSchema.methods.ComparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.HashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
