import { Router } from "express";
import { getErrorMessage } from "../utils/errorHandler";
import authServices from "../services/authServices";
import { isAuth, isGuest } from "../middlewares/authMiddleware";
import { Request, Response } from "express";
import { UserFormState } from "../types";
const authController = Router();

/**
 * @route POST /auth/register
 * @group Auth - Operations for authentication
 * @middleware {isGuest} - Ensures the user is not logged in
 * @param {UserFormState} req.body - The email of the user
 * @returns {object} 201 - User registered successfully
 * @throws {Error} 400 - Invalid email or password
 * @security JWT
 */

authController.post("/register", isGuest, async (req, res) => {
  const formData: UserFormState = req.body;
  try {
    await authServices.register(formData);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(400).json({ message: errorMessage });
  }
});
/**
 * @route POST /auth/login
 * @group Auth - Operations for authentication
 * @middleware {isGuest} - Ensures the user is not logged in
 * @param {UserFormState} req.body - The email of the user
 * @returns {object} 200 - User logged in successfully
 * @throws {Error} 400 - Invalid email or password
 * @security JWT
 */
authController.post("/login", isGuest, (req, res) => {
  const formData: UserFormState = req.body;
  authServices
    .login(formData)
    .then((token) => {
      res.cookie("auth", token, { httpOnly: true });
      res.status(200).json({ message: "User logged in successfully" });
    })
    .catch((error) => {
      const errorMessage = getErrorMessage(error);
      res.status(400).json({ message: errorMessage });
    });
});

/**
 * @route POST /auth/logout
 * @group Auth - Operations for authentication
 * @middleware {isAuth} - Ensures the user is not logged in
 * @returns {object} 200 - User logged out successfully
 * @security JWT
 */
authController.post("/logout", isAuth, (req, res) => {
  res.clearCookie("auth");
  res.status(200).json({ message: "User logged out successfully" });
});

/**
 * @route GET /auth/check
 * @group Auth - Operations for authentication
 * @param {string} req.cookies.auth - The JWT token
 * @returns {object} 200 - The authenticated user data
 * @returns {Error} 401 - Unauthorized
 * @security JWT
 */
authController.get("/check", (req: Request, res: Response) => {
  const token = req.cookies.auth;
  const user = authServices.verifyToken(token);
  res.status(200).json({ user });
});
export default authController;
