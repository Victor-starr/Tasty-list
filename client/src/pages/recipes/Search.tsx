import useRecipeAPI from "../../hooks/useRecipeAPI";
import RecipesDefault, { RecipeLoading } from "../../components/Recipe";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Search() {
  const { user } = useContext(AuthContext);
  const { loading, recipes, searchTerm, handleSearchInput, searchForRecipe } =
    useRecipeAPI();

  return (
    <div
      className="flex flex-col justify-center items-center h-auto min-h-[calc(100vh-140px)]"
      data-page-context="search-page"
    >
      <div className="py-16 w-full max-w-4xl text-center">
        <h1 className="h1-title">Search for your Recipe</h1>
        <p className="mx-auto max-w-2xl text-slate-700 dark:text-slate-400 text-lg sm:text-xl">
          Type the name of a recipe or ingredients to find your next culinary
          inspiration. Explore a variety of dishes tailored to your taste.
        </p>

        <div className="mt-8 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchForRecipe();
            }}
            className="flex sm:flex-row flex-col justify-center items-center gap-4 w-full"
          >
            <input
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleSearchInput}
              placeholder="Search for a recipe..."
              className="sm:flex-grow dark:bg-slate-800 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-md dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-white"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <section className="flex flex-col flex-grow items-center bg-neutral-200 dark:bg-slate-950 py-16 w-full text-center">
        <h1 className="h1-title">Featured Recipes</h1>
        <div className="flex flex-wrap justify-center gap-6 px-4 w-full">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
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
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-lg sm:text-xl">
              No recipes found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
