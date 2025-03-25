import { Link } from "react-router";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";
import { ProductType } from "../types";
import Recipes from "../components/Recipe";

export default function Home() {
  const [recipes, setRecipes] = useState<ProductType[]>([]);

  const fetchData = async () => {
    const res = await axiosInstance.get("/catalog/last-three");
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="py-16 text-center w-full">
        <h1 className="h1-title">Welcome to Home Cooking Recipes</h1>
        <p className="text-slate-700 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Your go-to for delicious and easy-to-follow home cooking recipes.
          Discover new dishes and improve your culinary skills with our
          step-by-step guides.
        </p>
        <Link
          to="/recipes"
          className="text-lg sm:text-xl lg:text-2xl font-bold text-white bg-sky-500 hover:bg-sky-600 py-3 px-6 rounded-md inline-block mt-8"
        >
          Explore Recipes
        </Link>
      </div>

      <section className="text-center w-full py-16 bg-white dark:bg-slate-950 flex-grow">
        <h1 className="h1-title">Featured Recipes</h1>
        <div className="flex flex-col md:flex-row items-center md:items-stretch flex-wrap justify-center gap-8">
          {recipes.length > 0 ? (
            recipes.map((recipe: ProductType) => (
              <Recipes key={recipe._id} {...recipe} />
            ))
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
              No recipes found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
