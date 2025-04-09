import { useState } from "react";
import { Link } from "react-router";
import RecipesDefault from "./Recipe";
import { ProductType } from "../types";

interface RecipesSectionProps {
  recipes: ProductType[];
  recipesFav: ProductType[];
}

const RecipesSection = ({
  recipes = [],
  recipesFav = [],
}: RecipesSectionProps) => {
  const [activeTab, setActiveTab] = useState("myRecipes");

  return (
    <section className="flex flex-col flex-grow text-center w-full py-10 bg-neutral-200 dark:bg-slate-900  gap-6">
      <div className="flex flex-col md:flex-row justify-center gap-5 w-full px-10 md:px-25 lg:px-40">
        <button
          className={`flex-1 px-5 py-3 rounded-lg text-lg font-semibold transition-all  hover:scale-102 ${
            activeTab === "myRecipes"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-slate-600 text-gray-700 dark:text-white"
          }`}
          onClick={() => setActiveTab("myRecipes")}
        >
          My Recipes
        </button>
        <button
          className={`flex-1 px-5 py-3 rounded-lg text-lg font-semibold transition-all  hover:scale-102 ${
            activeTab === "favorites"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white dark:bg-slate-600 text-gray-700 dark:text-white"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
      </div>

      <h1 className="h1-title">
        {activeTab === "myRecipes" ? "My Recipes" : "My Favorites"}
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-stretch flex-wrap justify-center gap-6 min-h-[55vh] h-auto">
        {activeTab === "myRecipes" ? (
          recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipesDefault key={recipe._id} {...recipe} />
            ))
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-2xl  md:text-3xl max-w-2xl mx-auto flex flex-col items-center justify-center">
              You haven't added any recipes yet. Start creating your own
              delicious recipes today!
              <Link
                to="/recipes"
                className="text-lg sm:text-xl lg:text-2xl font-bold text-white bg-blue-500 hover:bg-blue-600 py-4 px-10 rounded-md inline-block mt-8  buttonHover"
              >
                Explore
              </Link>
            </p>
          )
        ) : recipesFav.length > 0 ? (
          recipesFav.map((recipe) => (
            <RecipesDefault key={recipe._id} {...recipe} />
          ))
        ) : (
          <p className="text-slate-600 dark:text-slate-400 text-2xl md:text-3xl  max-w-2xl mx-auto flex flex-col items-center justify-center">
            You haven't added any favorite recipes yet. Explore and add your
            favorite recipes to this list!
            <Link
              to="/recipes"
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white bg-blue-500 hover:bg-blue-600 py-4 px-10 rounded-md inline-block mt-8  buttonHover"
            >
              Explore
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default RecipesSection;
