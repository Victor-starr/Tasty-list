import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "UserName is required"],
    minlength: [5, "Username must be at least 5 characters long"],
    maxLength: [20, "Username must be at most 20 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [20, "Password must be at most 20 characters"],
  },
  profilePicture: {
    type: String,
    default: null,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const User = model("User", UserSchema);
export default User;
