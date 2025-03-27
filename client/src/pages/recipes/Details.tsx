import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axiosInstance from "../../axiosInstance";
import { FullProductType, ServerErrorMessage } from "../../types";
import RecipesDetails from "../../components/RecipesDetails";
import { AuthContext } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";

export default function Details() {
  const [recipe, setRecipe] = useState<FullProductType | null>(null);
  const { showNotification } = useContext(NotificationContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const isUser = !!user;
  const isOwner = recipe?.owner.toString() === user?._id;
  const isRecommended = recipe?.recommendList.some(
    (id) => id.toString() === user?._id
  );

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axiosInstance.get(`/catalog/${id}`);
        setRecipe(res.data);
      } catch (err) {
        showNotification(err as ServerErrorMessage);
        setRecipe(null);
      }
    };

    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto relative">
      <div className="flex justify-center py-5 text-center w-full">
        {recipe ? (
          <RecipesDetails
            props={recipe}
            isOwner={isOwner}
            isUser={isUser}
            isRecommended={!!isRecommended}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              No recipes found
            </p>
            <Link
              to="/"
              className="bg-blue-500 dark:bg-violet-700 text-white  px-4 py-2 rounded-lg text-lg font-semibold my-4 relative inline-block"
            >
              GO BACK TO HOME PAGE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
