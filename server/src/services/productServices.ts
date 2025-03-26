import { Types } from "mongoose";
import Product from "../models/Product";
import { ProductType } from "../types";

const getAll = async () => Product.find({});

const getLastThree = async () => Product.find({}).sort({ _id: -1 }).limit(3);

const getOneProduct = async (id: string) => Product.findById(id);

const createProduct = async (productData: ProductType, userID: string) =>
  Product.create({ ...productData, owner: userID });

const update = async (
  productId: string,
  userId: string,
  productData: ProductType
) => {
  const product = await getOneProduct(productId);

  if (product?.owner.toString() !== userId) {
    throw new Error("Cannot update this recipe, you do not own it!");
  }
  return Product.findByIdAndUpdate(productId, productData, {
    runValidators: true,
  });
};

const remove = async (productId: string, userId: string) => {
  const product = (await getOneProduct(productId)) as ProductType | null;

  if (product?.owner.toString() !== userId) {
    throw new Error("Cannot delete this recipe, you do not own it!");
  }
  return Product.findByIdAndDelete(productId);
};

const recommend = async (productId: string, userId: string) => {
  if (!Types.ObjectId.isValid(productId) || !Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid ObjectId format");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.owner?.toString() === userId) {
    throw new Error("Cannot recommend your own product!");
  }

  if (product.recommendList.some((id) => id.toString() === userId)) {
    throw new Error("Already in recommended list!");
  }

  product.recommendList.push(new Types.ObjectId(userId));
  return product.save();
};

const productServices = {
  getAll,
  getLastThree,
  getOneProduct,
  createProduct,
  recommend,
  update,
  remove,
};
export default productServices;
