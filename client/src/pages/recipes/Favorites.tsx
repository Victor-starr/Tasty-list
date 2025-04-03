import useRecipeAPI from "../../hooks/useRecipeAPI";
import { useEffect } from "react";
import { Link } from "react-router";
import RecipesDefault from "../../components/Recipe";
import { ProductType } from "../../types";

function Favorites() {
  const { recipes, fetchUserFavorites } = useRecipeAPI();

  useEffect(() => {
    fetchUserFavorites();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="py-16 text-center w-full">
        <h1 className="h1-title">Your Favorite Recipes</h1>
        <p className="text-slate-700 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Here are all your favorite recipes in one place. Explore and enjoy
          your saved dishes anytime.
        </p>
        <Link
          to="/recipes"
          className="text-lg sm:text-xl lg:text-2xl font-bold text-white bg-sky-500 hover:bg-sky-600 py-3 px-6 rounded-md inline-block mt-8"
        >
          Explore More Recipes
        </Link>
      </div>

      <section className="flex flex-col flex-grow text-center w-full py-16 bg-white dark:bg-slate-950 gap-10">
        <h1 className="h1-title">Your Favorites</h1>
        <div className="flex flex-col md:flex-row items-center md:items-stretch flex-wrap justify-center gap-8">
          {recipes.length > 0 ? (
            recipes.map((recipe: ProductType) => (
              <RecipesDefault key={recipe._id} {...recipe} />
            ))
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-2xl sm:text-3xl max-w-2xl mx-auto">
              No favorite recipes found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Favorites;
