import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ProductType, ServerErrorMessage } from "../../types";
import { NotificationContext } from "../../context/NotificationContext";
import axiosInstance from "../../axiosInstance";

function Edit() {
  const { id } = useParams();
  const [tempData, setTempData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axiosInstance.get(`/catalog/${id}`);
        setTempData(res.data);
      } catch (err) {
        showNotification(err as ServerErrorMessage);
        setTempData({
          title: "",
          ingredients: "",
          instructions: "",
          description: "",
          image: "",
        });
      }
    };

    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formCreate = async (formData: FormData) => {
    const fromEntries = Object.fromEntries(formData);
    const productData = fromEntries as unknown as ProductType;
    try {
      const res = await axiosInstance.put(`/catalog/${id}`, productData);
      showNotification(res);
      navigate(`/recipes/${id}`);
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
        <h2 className="text-2xl font-bold text-center">Edit your Recipe</h2>
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
          <div className="flex flex-col md:flex-row justify-arround md:justify-center items-center gap-4 w-full mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              Update
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

export default Edit;
