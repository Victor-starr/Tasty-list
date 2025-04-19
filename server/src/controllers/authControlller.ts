import { Router, Request, Response } from "express";
import { getErrorMessage } from "../utils/errorHandler";
import authServices from "../services/authServices";
import { isAuth, isGuest } from "../middlewares/authMiddleware";
import handleMulterErrors from "../middlewares/uploadMiddleware";
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
/**
 * @route POST /auth/login
 * @group Auth - Operations for authentication
 * @middleware {isGuest} - Ensures the user is not logged in
 * @param {UserFormState} req.body - The email of the user
 * @returns {object} 200 - User logged in successfully
 * @throws {Error} 400 - Invalid email or password
 * @security JWT
 */
authController.post("/login", isGuest, (req: Request, res: Response) => {
  const formData: UserFormState = req.body;
  authServices
    .login(formData)
    .then((token) => {
      res.cookie("auth", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 7 * 60 * 60 * 1000), // 7 hours
      });
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
authController.post("/logout", isAuth, (req: Request, res: Response) => {
  res.clearCookie("auth", { httpOnly: true, sameSite: "none", secure: true });
  res.status(200).json({ message: "User logged out successfully" });
});

/**
 * @route GET /auth/check
 * @group Auth - Operations for authentication
 * @middleware {isAuth} - Ensures the user is logged in
 * @param {string} req.params.id - The ID of the user
 * @returns {object} 200 - User data
 * @throws {Error} 400 - User not found
 * @security JWT
 */
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

/**
 * @route PUT /auth/profile-update
 * @group Auth - Operations for authentication
 * @middleware {isAuth} - Ensures the user is logged in
 * @middleware {handleMulterErrors} - Handles errors during file upload
 * @param {string} req.params.id - The ID of the user
 * @param {object} req.body - The updated user data
 * @param {Express.Multer.File} [req.file] - The uploaded profile picture file
 * @returns {object} 200 - Profile updated successfully
 * @throws {Error} 400 - Failed to update profile
 * @security JWT
 */
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

      res.cookie("auth", newToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 7 * 60 * 60 * 1000), // 7 hours
      });
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      res.status(400).json({ message: errorMessage });
    }
  }
);

/**
 * * @route PUT /auth/profile-newpassword
 * * @group Auth - Operations for authentication
 * * @middleware {isAuth} - Ensures the user is logged in
 * * @param {string} req.params.id - The ID of the user
 * * @param {object} req.body - The updated user data
 * * @returns {object} 200 - Profile updated successfully
 * * @throws {Error} 400 - Failed to update profile
 * * @security JWT
 */
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

authController.delete(
  "/profile-delete",
  isAuth,
  async (req: Request, res: Response) => {
    const userID = (req as any).user._id;
    try {
      await authServices.deleteProfile(userID);
      res.clearCookie("auth", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      res.status(400).json({ message: errorMessage });
    }
  }
);

export default authController;
