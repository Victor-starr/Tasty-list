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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="py-16 text-center w-full flex flex-col md:flex-row items-center justify-center gap-10 rounded-lg shadow-lg p-6 dark:bg-gray-950">
        {!invalidImage && user?.profilePicture ? (
          <img
            src={user?.profilePicture as string}
            alt="userImage"
            className="size-[min(25vw,100px)] md:size-[180px] rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
            onClick={() => navigate("/auth/settings")}
            onError={() => setInvalidImage(true)}
          />
        ) : (
          <CgProfile
            className="text-slate-700 dark:text-slate-300 size-[min(25vw,100px)] md:size-[180px] rounded-full"
            onClick={() => navigate("/auth/settings")}
          />
        )}
        <article className="flex flex-col items-start justify-center gap-4 text-gray-700 dark:text-gray-200 max-h-[300px]">
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
            className="flex items-center gap-2 text-lg lg:text-xl font-bold text-white bg-sky-500  py-3 px-6 rounded-md mt-3 buttonHover"
          >
            <IoSettingsSharp className="text-2xl" />
            Settings
          </Link>
        </article>
      </div>
      <RecipesSection recipes={recipes} recipesFav={recipesFav} />
    </div>
  );
}
