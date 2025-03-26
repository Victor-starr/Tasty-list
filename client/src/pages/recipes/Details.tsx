import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../../axiosInstance";
import { FullProductType } from "../../types";
import RecipesDetails from "../../components/RecipesDetails";
import { IoMdWarning } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";

export default function Details() {
  const [recipe, setRecipes] = useState<FullProductType>();
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  // TODO - implement user and owner logic here
  const isUser = user ? true : false;
  const isOwner = recipe?.owner.toString() === user?._id;
  const isRecommed = recipe?.recommendList.some(
    (id) => id.toString() === user?._id
  )
    ? true
    : false;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axiosInstance.get(`/catalog/${id}`);
        setRecipes(res.data);
      } catch (err) {
        setRecipes(undefined);
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
