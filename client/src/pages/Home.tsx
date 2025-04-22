import { Link } from "react-router";
import { useContext, useEffect } from "react";
import RecipesDefault, { RecipeLoading } from "../components/Recipe";
import useRecipeAPI from "../hooks/useRecipeAPI";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { loading, recipes, fetchMostPopularRecipes } = useRecipeAPI();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchMostPopularRecipes();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-auto min-h-[calc(100vh-140px)]">
      <div className="py-16 w-full text-center">
        <h1 className="h1-title">Welcome to Home Cooking Recipes</h1>
        <p className="mx-auto max-w-2xl text-slate-700 dark:text-slate-400 text-lg sm:text-xl">
          Your go-to for delicious and easy-to-follow home cooking recipes.
          Discover new dishes and improve your culinary skills with our
          step-by-step guides.
        </p>
        <Link
          to="/recipes"
          className="inline-block bg-sky-500 hover:bg-sky-600 mt-8 px-6 py-3 rounded-md font-bold text-white text-lg sm:text-xl lg:text-2xl buttonHover"
        >
          Explore Recipes
        </Link>
      </div>

      <section className="flex flex-col flex-grow gap-10 bg-white dark:bg-slate-950 py-16 w-full text-center">
        <h1 className="h1-title">Most Popular Recipes</h1>
        <div className="flex md:flex-row flex-col flex-wrap justify-center items-center md:items-stretch gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <RecipeLoading key={index} />
            ))
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => {
              const isRecommended = recipe.recommendList.includes(
                user?._id || ""
              );
              return (
                <RecipesDefault
                  key={recipe._id}
                  {...recipe}
                  isRecom={isRecommended}
                />
              );
            })
          ) : (
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-2xl sm:text-3xl">
              No recipes found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
