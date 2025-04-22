import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import useRecipeAPI from "../../hooks/useRecipeAPI";
import RecipesSection from "../../components/RecipesSection";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";

export default function Profile() {
  const [invalidImage, setInvalidImage] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    loading,
    recipes,
    recipesFav,
    recomCount,
    fetchUserFavorites,
    fetchUserRecipes,
    userRecommendationsCount,
  } = useRecipeAPI();

  useEffect(() => {
    fetchUserFavorites();
    fetchUserRecipes();
    userRecommendationsCount();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-auto min-h-[calc(100vh-140px)]">
      <div className="flex md:flex-row flex-col justify-center items-center gap-10 dark:bg-gray-950 shadow-lg p-6 py-16 rounded-lg w-full text-center">
        {!invalidImage && user?.profilePicture ? (
          <img
            src={user?.profilePicture as string}
            alt="userImage"
            className="border-4 border-gray-300 dark:border-gray-700 rounded-full size-[min(25vw,100px)] md:size-[180px] object-cover"
            onClick={() => navigate("/auth/settings")}
            onError={() => setInvalidImage(true)}
          />
        ) : (
          <CgProfile
            className="rounded-full size-[min(25vw,100px)] md:size-[180px] text-slate-700 dark:text-slate-300"
            onClick={() => navigate("/auth/settings")}
          />
        )}
        <article className="flex flex-col justify-center items-start gap-4 max-h-[300px] text-gray-700 dark:text-gray-200">
          <h1 className="article-heading">
            UserName: <span className="article-sub">{user?.username}</span>
          </h1>
          <p className="article-heading">
            Email: <span className="article-sub">{user?.email}</span>
          </p>
          <p className="article-heading">
            Total Recipes:{" "}
            <span className="article-sub">{recipes?.length}</span>
          </p>
          <p className="article-heading">
            Total Recommendation:{" "}
            <span className="article-sub">{recomCount}</span>
          </p>
          <p className="article-heading">
            Total Favorites:{" "}
            <span className="article-sub">{recipesFav.length}</span>
          </p>
          <Link
            to="/auth/settings"
            className="flex items-center gap-2 bg-sky-500 mt-3 px-6 py-3 rounded-md font-bold text-white text-lg lg:text-xl buttonHover"
          >
            <IoSettingsSharp className="text-2xl" />
            Settings
          </Link>
        </article>
      </div>
      <RecipesSection
        recipes={recipes}
        recipesFav={recipesFav}
        isLoading={loading}
      />
    </div>
  );
}
