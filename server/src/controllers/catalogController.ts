import { Router } from "express";
import productServices from "../services/productServices";

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
  // const products: any[] = [];
  res.status(200).send(products);
});

export default catalogController;
