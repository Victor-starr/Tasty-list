import User from "../models/User";
import { UserFormState } from "../types";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * @method register
 * @description Registers a new user with the provided email and password.
 * @param {UserFormState} userData - The user data containing email, password, and rePassword.
 * @throws {Error} If email or password is empty.
 * @throws {Error} If user already exists.
 * @returns {Promise<void>} A promise that resolves to the created user.
 */
const register = async (userData: UserFormState): Promise<void> => {
  if (
    userData.username === "" ||
    userData.email === "" ||
    userData.password === ""
  ) {
    throw new Error("All fields are required");
  }
  const isExisting = await User.findOne({ email: userData.email }).select({
    _id: true,
  });
  if (isExisting) {
    throw new Error("Email already exists");
  }
  const { username, email, password } = userData;
  await User.create({ username, email, password });
};

/**
 * @method login
 * @description Authenticates a user with the provided email and password.
 * @param {UserFormState} userData - The user data containing email, password, and rePassword.
 * @throws {Error} If email or password is empty.
 * @throws {Error} If passwords do not match.
 * @throws {Error} If user does not exist.
 * @throws {Error} If the password is invalid.
 * @returns {Promise<string | Error>} A promise that resolves to a JWT token if authentication is successful.
 */
const login = async (userData: UserFormState): Promise<string | Error> => {
  if (
    userData.email === "" ||
    userData.password === "" ||
    userData.rePassword === ""
  ) {
    throw new Error("All fields are required");
  }
  if (userData.password !== userData.rePassword) {
    throw new Error("Passwords do not match");
  }
  const user = await User.findOne({ email: userData.email }).select({
    _id: true,
    password: true,
    username: true,
    email: true,
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  const isValid = await bcrypt.compare(userData.password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  const token = generateToken({
    _id: user._id.toString(),
    email: user.email,
    username: user.username,
  });

  return token;
};

/**
 * @method generateToken
 * @description Generates a JWT token for the user.
 * @param {object} user - The user object containing _id, email, and name.
 * @returns {string} The JWT token.
 */
function generateToken(user: {
  _id: string;
  email: string;
  username: string;
}): string {
  const payload: JwtPayload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });
  return token;
}

/**
 * @method verifyToken
 * @description Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {JwtPayload | null} The decoded JWT payload if the token is valid, otherwise null.
 */
function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}

const authServices = { register, login, verifyToken };
export default authServices;
