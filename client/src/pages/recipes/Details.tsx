import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useRecipeAPI from "../../hooks/useRecipeAPI";
import RecipesDetails, {
  RecipesDetailsLoading,
} from "../../components/RecipesDetails";
import { AuthContext } from "../../context/AuthContext";

export default function Details() {
  const { loading, recipe, fetchRecipe, addToRecommend, removeFromRecommend } =
    useRecipeAPI();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to track updates

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

  const handleRemoveFromRecommend = async () => {
    if (recipe) {
      await removeFromRecommend(recipe._id);
    }
    setUpdateTrigger((prev) => !prev); // Toggle updateTrigger to refetch data
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-auto min-h-[calc(100vh-140px)]">
      <div className="flex justify-center py-5 w-full text-center">
        {loading ? (
          <RecipesDetailsLoading />
        ) : recipe ? (
          <RecipesDetails
            props={recipe}
            isOwner={isOwner}
            isUser={isUser}
            isRecommended={!!isRecommended}
            addToRecommend={handleAddToRecommend}
            removeFromRecommend={handleRemoveFromRecommend}
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
              No recipes found
            </p>
            <Link
              to="/"
              className="inline-block relative bg-blue-500 dark:bg-violet-700 my-4 px-4 py-2 rounded-lg font-semibold text-white text-lg"
            >
              GO BACK TO HOME PAGE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
