import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, jpeg, png, gif) are allowed."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
}).single("profilePicture");

const handleMulterErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File too large. Max 5MB allowed." });
      }

      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Custom errors
      return res.status(400).json({ message: err.message });
    }

    next();
  });
};

export default handleMulterErrors;
