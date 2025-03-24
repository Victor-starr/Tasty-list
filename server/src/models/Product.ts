import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  ingredients: {
    type: String,
    required: [true, "Ingredients are required"],
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  recommendList: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required"],
  },
});

const Product = model("Product", ProductSchema);

export default Product;
