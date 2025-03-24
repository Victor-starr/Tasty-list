import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "UserName is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = model("User", UserSchema);
export default User;
