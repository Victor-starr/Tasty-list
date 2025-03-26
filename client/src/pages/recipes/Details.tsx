import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../axiosInstance";
import { ProductType } from "../../types";
import RecipesDetails from "../../components/RecipesDetails";
import { IoMdWarning } from "react-icons/io";

export default function Details() {
  const [recipe, setRecipes] = useState<ProductType>();
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  // TODO - implement user and owner logic here
  const isUser = true;
  const isOwner = true;
  const isRecommed = false;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axiosInstance.get(`/catalog/${id}`);
        setRecipes(res.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto relative">
      {error && (
        <div className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2">
          <IoMdWarning className="text-1xl" />
          <span>{error}</span>
        </div>
      )}
      <div className=" flex justify-center py-5 text-center w-full">
        {recipe ? (
          <RecipesDetails
            props={recipe}
            isOwner={isOwner}
            isUser={isUser}
            isRecommended={isRecommed}
          />
        ) : (
          <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
            No recipes found
          </p>
        )}
      </div>
    </div>
  );
}
