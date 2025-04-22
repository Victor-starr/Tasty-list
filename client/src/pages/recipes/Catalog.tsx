import { useContext, useEffect } from "react";
import { Link } from "react-router";
import useRecipeAPI from "../../hooks/useRecipeAPI";
import { AuthContext } from "../../context/AuthContext";
import RecipesDefault, { RecipeLoading } from "../../components/Recipe";

export default function Catalog() {
  const { user } = useContext(AuthContext);
  const { loading, recipes, fetchAllRecipes } = useRecipeAPI();

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-auto min-h-[calc(100vh-140px)]">
      <div className="py-16 w-full text-center">
        <h1 className="h1-title">Explore Our Recipe Collection</h1>
        <p className="mx-auto max-w-2xl text-slate-700 dark:text-slate-400 text-lg sm:text-xl">
          Dive into a world of culinary delights with our extensive collection
          of recipes. Whether you're a beginner or a seasoned chef, you'll find
          something to inspire your next meal.
        </p>
        <Link
          to="/recipes/create"
          className="inline-block bg-sky-500 hover:bg-sky-600 mt-8 px-6 py-3 rounded-md font-bold text-white text-lg sm:text-xl lg:text-2xl"
        >
          Create Your Own
        </Link>
      </div>

      <section className="flex flex-col flex-grow items-center bg-neutral-300 dark:bg-slate-950 py-16 w-full text-center">
        <h1 className="h1-title">Featured Recipes</h1>
        <div className="flex flex-wrap justify-center gap-6 px-4 w-full">
          {loading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <RecipeLoading key={index} />
            ))
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => {
              const isRecom = recipe.recommendList.includes(user?._id || "");
              return (
                <RecipesDefault
                  key={recipe._id}
                  isRecom={isRecom}
                  {...recipe}
                />
              );
            })
          ) : (
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-lg sm:text-xl">
              No recipes found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
