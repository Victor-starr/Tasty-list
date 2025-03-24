import { Router } from "express";
import authController from "./controllers/authControlller";
import catalogController from "./controllers/catalogController";
const router = Router();

router.get("/", (_, res) => {
  res.send({ message: "Hello from the server!" });
});

router.use("/auth", authController);
router.use("/catalog", catalogController);

router.all("*", (_, res) => {
  res.status(404).send("404 Not Found");
});

export default router;
