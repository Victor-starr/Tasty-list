import { Types } from "mongoose";
import Product from "../models/Product";
import { ProductType } from "../types";

const getAll = async () => Product.find({});

const getUserRecipes = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID format.");
  }
  return Product.find({ owner: new Types.ObjectId(userId) });
};

const getMostPopular = async () =>
  Product.find({}).sort({ recommendList: -1 }).limit(4).sort({ createdAt: -1 });

const getOneProduct = async (id: string) => Product.findById(id);

const getUserRecommendationsCount = async (userId: string) => {
  const products = await Product.find({ owner: userId });
  const recommendations = products.reduce((acc, product) => {
    return acc + product.recommendList.length;
  }, 0);
  return recommendations;
};

const createProduct = async (productData: ProductType) => {
  const { owner, ...rest } = productData;
  if (
    !rest.title ||
    !rest.ingredients ||
    !rest.instructions ||
    !rest.description ||
    !rest.image
  ) {
    throw new Error("All fields are required");
  }
  if (!Types.ObjectId.isValid(owner)) {
    throw new Error("Invalid ObjectId format");
  }
  return Product.create({ ...rest, owner: new Types.ObjectId(owner) });
};

const update = async (
  productId: string,
  userId: string,
  productData: ProductType
) => {
  const product = await getOneProduct(productId);
  if (
    !productData.title ||
    !productData.ingredients ||
    !productData.instructions ||
    !productData.description ||
    !productData.image
  ) {
    throw new Error("All fields are required");
  }
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
    throw new Error("Invalid product or user ID format.");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("The product you are trying to recommend does not exist.");
  }

  if (product.owner?.toString() === userId) {
    throw new Error("You cannot recommend your own product.");
  }

  if (product.recommendList.some((id) => id.toString() === userId)) {
    throw new Error("You have already recommended this product.");
  }

  product.recommendList.push(new Types.ObjectId(userId));
  return product.save();
};

const unrecommend = async (productId: string, userId: string) => {
  if (!Types.ObjectId.isValid(productId) || !Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid product or user ID format.");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error(
      "The product you are trying to unrecommend does not exist."
    );
  }
  if (product.owner?.toString() === userId) {
    throw new Error("You cannot unrecommend your own product.");
  }
  if (!product.recommendList.some((id) => id.toString() === userId)) {
    throw new Error("You have not recommended this product yet.");
  }
  product.recommendList = product.recommendList.filter(
    (id) => id.toString() !== userId
  );
  return product.save();
};
const search = async (query: string) => {
  if (!query || query.trim() === "") {
    throw new Error("Search query cannot be empty.");
  }

  const products = await Product.find({
    $text: { $search: query },
  }).sort({ score: { $meta: "textScore" } });

  if (products.length === 0) {
    return [];
  }

  return products;
};
const getFavorites = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID format.");
  }

  const products = await Product.find({
    recommendList: { $in: [new Types.ObjectId(userId)] },
  });

  return products;
};

const productServices = {
  getAll,
  getUserRecipes,
  getMostPopular,
  getOneProduct,
  getFavorites,
  getUserRecommendationsCount,
  createProduct,
  recommend,
  unrecommend,
  update,
  remove,
  search,
};
export default productServices;
