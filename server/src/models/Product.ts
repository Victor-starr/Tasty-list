import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [70, "Title must be at most 70 characters long"],
  },
  ingredients: {
    type: String,
    required: [true, "Ingredients are required"],
    minlength: [10, "Ingredients must be at least 10 characters long"],
    maxlength: [100, "Ingredients must be at most 100 characters long"],
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
    minlength: [10, "Instructions must be at least 10 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/^https?:\/\//, "Image must be a valid URL"],
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

ProductSchema.index({
  title: "text",
  description: "text",
  ingredients: "text",
});

const Product = model("Product", ProductSchema);

export default Product;
