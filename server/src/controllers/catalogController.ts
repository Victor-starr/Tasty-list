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
    res.status(500).send({ message: getErrorMessage(error) });
  }
});

catalogController.get("/most-popular", async (req, res) => {
  try {
    const products = await productServices.getMostPopular();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch last three products" });
  }
});

catalogController.get("/favorites", isAuth, async (req, res) => {
  const userid = (req as any).user._id;
  try {
    const products = await productServices.getFavorites(userid);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: getErrorMessage(error) });
  }
});
catalogController.get("/user-recipes", isAuth, async (req, res) => {
  const userId = (req as any).user._id;

  try {
    const products = await productServices.getUserRecipes(userId);
    if (products.length === 0) {
      res.status(404).send({ message: "No products found" });
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: getErrorMessage(error) });
  }
});

catalogController.get("/user-recom-count", isAuth, async (req, res) => {
  const userId = (req as any).user._id;
  try {
    const count = await productServices.getUserRecommendationsCount(userId);
    res.status(200).send({ count });
  } catch (error) {
    res.status(500).send({ message: getErrorMessage(error) });
  }
});

catalogController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productServices.getOneProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send({ message: "Product not found" });
  }
});

catalogController.delete("/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = (req as any).user._id;
  try {
    await productServices.remove(productId, userId);
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: getErrorMessage(error) });
  }
});

catalogController.put("/:id", isAuth, async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  const userId = (req as any).user._id;
  try {
    await productServices.update(productId, userId, productData);
    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).send({ message: getErrorMessage(error) });
  }
});

catalogController.post("/create", isAuth, async (req, res) => {
  const productData = req.body;
  const userId = (req as any).user._id;
  try {
    await productServices.createProduct({ ...productData, owner: userId });
    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    res.status(400).send({ message: getErrorMessage(error) });
  }
});

catalogController.put("/:id/recommend", isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = (req as any).user._id;

  try {
    await productServices.recommend(productId, userId);
    res.status(200).send({ message: "Product recommended successfully" });
  } catch (error) {
    res.status(400).send({ message: getErrorMessage(error) });
  }
});

catalogController.put("/:id/unrecommend", isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = (req as any).user._id;

  try {
    await productServices.unrecommend(productId, userId);
    res.status(200).send({ message: "Product unrecommended successfully" });
  } catch (error) {
    res.status(400).send({ message: getErrorMessage(error) });
  }
});

catalogController.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  try {
    const products = await productServices.search(query);
    if (products.length === 0) {
      res.status(404).send({ message: "No products found" });
    } else {
      res.status(200).send({ message: "Here is The reults", products });
    }
  } catch (error) {
    res.status(500).send({ message: getErrorMessage(error) });
  }
});

export default catalogController;
