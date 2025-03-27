import { useNavigate } from "react-router";
import useRecipeAPI from "../../hooks/useRecipeAPI";

export default function Create() {
  const { formData, handleInput, createRecipe } = useRecipeAPI();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md text-black dark:text-white">
        <h2 className="text-2xl font-bold text-center">
          Create your own Recipe
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createRecipe();
          }}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title: <i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Ingredients: <i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Instructions: <i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              id="instructions"
              name="instructions"
              value={formData.instructions || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              image: <i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description: <i className="text-red-500">*</i>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInput}
              className="w-full max-h-[150px] px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-arround md:justify-center items-center gap-4 w-full mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full md:w-auto px-6 py-3 font-semibold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
