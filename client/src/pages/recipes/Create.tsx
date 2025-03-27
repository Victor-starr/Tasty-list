import { useState, useContext } from "react";
import { ProductType, ServerErrorMessage } from "../../types";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router";
import { NotificationContext } from "../../context/NotificationContext";

export default function Create() {
  const [tempData, setTempData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  const formCreate = async (formData: FormData) => {
    const fromEntries = Object.fromEntries(formData);
    const productData = fromEntries as unknown as ProductType;
    try {
      const res = await axiosInstance.post("/catalog/create", productData);
      showNotification(res);
      navigate("/recipes");
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md text-black dark:text-white">
        <h2 className="text-2xl font-bold text-center">
          Create your own Recipe
        </h2>
        <form className="space-y-4" action={formCreate}>
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
              value={tempData.title}
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
              value={tempData.ingredients}
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
              value={tempData.instructions}
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
              value={tempData.image}
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
              value={tempData.description}
              onChange={handleInput}
              className="w-full max-h-[150px] px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
