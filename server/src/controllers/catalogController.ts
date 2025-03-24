import { Router } from "express";
import productServices from "../services/productServices";

const catalogController = Router();

catalogController.get("/", async (req, res) => {
  const products = await productServices.getAll();
  res.send(products);
});

export default catalogController;
