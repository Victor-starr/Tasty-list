import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useRecipeAPI from "../../hooks/useRecipeAPI";
import RecipesDetails from "../../components/RecipesDetails";
import { AuthContext } from "../../context/AuthContext";

export default function Details() {
  const { recipe, fetchRecipe, addToRecommend } = useRecipeAPI();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to track updates

  console.log(recipe);
  const isUser = !!user;
  const isOwner = !!(recipe && recipe?.owner.toString() === user?._id);
  const isRecommended = !!(
    recipe &&
    recipe?.recommendList.some(
      (recommendId) => recommendId.toString() === user?._id
    )
  );

  useEffect(() => {
    if (id) fetchRecipe(id);
  }, [id, updateTrigger]); // Add updateTrigger to dependencies

  // TODO FIND BETTER WAY 😴
  const handleAddToRecommend = async () => {
    if (recipe) {
      await addToRecommend(recipe._id);
    }
    setUpdateTrigger((prev) => !prev); // Toggle updateTrigger to refetch data
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto relative">
      <div className="flex justify-center py-5 text-center w-full">
        {recipe ? (
          <RecipesDetails
            props={recipe}
            isOwner={isOwner}
            isUser={isUser}
            isRecommended={!!isRecommended}
            addToRecommend={handleAddToRecommend}
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
