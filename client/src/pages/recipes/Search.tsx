import useRecipeAPI from "../../hooks/useRecipeAPI";
import Recipes from "../../components/Recipe";

export default function Search() {
  const { recipes, searchTerm, handleSearchInput, searchForRecipe } =
    useRecipeAPI();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto px-4"
      data-page-context="search-page"
    >
      <div className="py-16 text-center w-full max-w-4xl">
        <h1 className="h1-title">Search for your Recipe</h1>
        <p className="text-slate-700 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Type the name of a recipe or ingredients to find your next culinary
          inspiration. Explore a variety of dishes tailored to your taste.
        </p>

        <div className="mt-8 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchForRecipe();
            }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full"
          >
            <input
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleSearchInput}
              placeholder="Search for a recipe..."
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white w-full sm:flex-grow sm:max-w-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 w-full sm:w-auto"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <section className="text-center w-full py-16 bg-neutral-200 dark:bg-slate-950 flex flex-col items-center flex-grow">
        <h1 className="h1-title">Featured Recipes</h1>
        <div className="flex flex-wrap justify-center gap-6 w-full px-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => <Recipes key={recipe._id} {...recipe} />)
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
