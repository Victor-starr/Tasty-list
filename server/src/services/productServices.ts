import { ObjectId } from "mongoose";
import Product from "../models/Product";
import { ProductType } from "../types";

const getAll = async () => Product.find({});

const getLastThree = async () => Product.find({}).sort({ _id: -1 }).limit(3);

const getOneProduct = async (id: ObjectId) => Product.findById(id);

const createProduct = async (productData: ProductType, userID: ObjectId) =>
  Product.create({ ...productData, owner: userID });

const update = async (
  productId: ObjectId,
  userId: ObjectId,
  productData: ProductType
) => {
  const product = await getOneProduct(productId);

  if (product?.owner.toString() !== userId.toString()) {
    throw new Error("Cannot update this recipe, you do not own!");
  }
  return Product.findByIdAndUpdate(productId, productData, {
    runValidators: true,
  });
};

const remove = async (productId: ObjectId, userId: ObjectId) => {
  const product = (await getOneProduct(productId)) as ProductType | null;

  if (product?.owner.toString() !== userId.toString()) {
    throw new Error("Cannot delete this recipe, you do not own!");
  }
  return Product.findByIdAndDelete(productId);
};

const productServices = {
  getAll,
  getLastThree,
  getOneProduct,
  createProduct,
  update,
  remove,
};
export default productServices;
