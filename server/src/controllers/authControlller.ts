import { Router, Request, Response } from "express";
import { getErrorMessage } from "../utils/errorHandler";
import { getCookieConfig, getClearCookieConfig } from "../utils/cookieConfig";
import authServices from "../services/authServices";
import { isAuth, isGuest } from "../middlewares/authMiddleware";
import handleMulterErrors from "../middlewares/uploadMiddleware";
import { UserFormState } from "../types";
const authController = Router();

// Register
authController.post(
  "/register",
  isGuest,
  async (req: Request, res: Response) => {
    const formData: UserFormState = req.body;
    try {
      await authServices.register(formData);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      res.status(400).json({ message: errorMessage });
    }
  }
);

// Login
authController.post("/login", isGuest, async (req: Request, res: Response) => {
  const formData: UserFormState = req.body;
  try {
    const token = await authServices.login(formData);
    res.cookie("auth", token, getCookieConfig());
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    res.status(400).json({ message: errorMessage });
  }
});

// Logout
authController.post("/logout", isAuth, (req: Request, res: Response) => {
  res.clearCookie("auth", getClearCookieConfig());
  res.status(200).json({ message: "User logged out successfully" });
});

// Check logged-in user
authController.get("/check", isAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  try {
    const user = await authServices.getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    res.status(400).json({ message: errorMessage });
  }
});

// Profile update
authController.put(
  "/profile-update",
  isAuth,
  handleMulterErrors,
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const userData = req.body;
    const file = (req as any).file;

    try {
      if (file) {
        userData.profilePicture = `data:${
          file.mimetype
        };base64,${file.buffer.toString("base64")}`;
      }

      const newToken = await authServices.updateProfile(userId, userData);
      res.cookie("auth", newToken, getCookieConfig());
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      res.status(400).json({ message: errorMessage });
    }
  }
);

// Change password
authController.put(
  "/profile-newpassword",
  isAuth,
  async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const userData = req.body;

    try {
      await authServices.updatePassword(userId, userData);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      res.status(400).json({ message: errorMessage });
    }
  }
);

// Delete profile
authController.delete(
  "/profile-delete",
  isAuth,
  async (req: Request, res: Response) => {
    const userID = (req as any).user._id;
    try {
      await authServices.deleteProfile(userID);
      res.clearCookie("auth", getClearCookieConfig());
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      res.status(400).json({ message: errorMessage });
    }
  }
);

export default authController;
