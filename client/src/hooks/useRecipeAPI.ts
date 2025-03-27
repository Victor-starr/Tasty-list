import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../axiosInstance";
import { NotificationContext } from "../context/NotificationContext";
import { ProductType, ServerErrorMessage } from "../types";

const useRecipeAPI = () => {
  type ProductTypeFull = ProductType & {
    owner: string;
    recommendList: string[];
  };
  const [formData, setFormData] = useState<Partial<ProductType>>({});
  const [recipes, setRecipes] = useState<ProductType[]>([]);
  const [recipe, setRecipe] = useState<ProductTypeFull | null>(null);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createRecipe = async () => {
    try {
      const res = await axiosInstance.post("/catalog/create", formData);
      showNotification(res);
      navigate("/recipes");
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const updateRecipe = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/catalog/${id}`, formData);
      showNotification(res);
      setFormData(res.data);
      navigate(`/recipes/${id}`);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/catalog/${id}`);
      showNotification(res);
      navigate("/recipes");
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };
  const fetchAllRecipes = async () => {
    try {
      const res = await axiosInstance.get("/catalog");
      setRecipes(res.data);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const fetchRecipe = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/catalog/${id}`);
      setRecipe(res.data);
      setFormData(res.data);
    } catch (error) {
      showNotification(error as ServerErrorMessage);
    }
  };

  const addToRecommend = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/catalog/${id}/recommend`);
      showNotification(res);
    } catch (err) {
      showNotification(err as ServerErrorMessage);
    }
  };

  return {
    formData,
    recipes,
    recipe,
    handleInput,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    fetchAllRecipes,
    fetchRecipe,
    addToRecommend,
  };
};

export default useRecipeAPI;
