import { Router } from "express";
import { Types } from "mongoose";
import productServices from "../services/productServices";
import { getErrorMessage } from "../utils/errorHandler";

const catalogController = Router();

catalogController.get("/", async (req, res) => {
  const products = await productServices.getAll();
  if (products.length === 0) {
    res.send(null);
  } else {
    res.status(200).send(products);
  }
});

catalogController.get("/last-three", async (req, res) => {
  const products = await productServices.getLastThree();
  res.status(200).send(products);
});

catalogController.post("/:id/recommend", async (req, res) => {
  const productId = req.params.id as unknown as Types.ObjectId;
  const userId = req.body.userId as unknown as Types.ObjectId;
  try {
    const product = await productServices.recommend(
      productId as any,
      userId as any
    );
    res.status(200).send(product);
  } catch (error) {
    const errorMSG = getErrorMessage(error);
    res.status(400).send({ message: errorMSG });
  }
});

export default catalogController;
