import { Router } from "express";
import productServices from "../services/productServices";
import { getErrorMessage } from "../utils/errorHandler";
import { isAuth } from "../middlewares/authMiddleware";

const catalogController = Router();

catalogController.get("/", async (req, res) => {
  try {
    const products = await productServices.getAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch products" });
  }
});

catalogController.get("/last-three", async (req, res) => {
  try {
    const products = await productServices.getLastThree();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch last three products" });
  }
});
catalogController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productServices.getOneProduct(id);
    if (!product) {
      throw new Error("No product found with the given ID");
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch product" });
  }
});

catalogController.post("/:id/recommend", isAuth, async (req, res) => {
  const productId = req.params.id;
  const { userId }: { userId: string } = req.body;
  try {
    await productServices.recommend(productId, userId);
    res.status(200).send({ message: "Product recommended successfully" });
  } catch (error) {
    const errorMSG = getErrorMessage(error);
    res.status(400).send({ message: errorMSG });
  }
});

export default catalogController;
