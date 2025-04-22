import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaReadme } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { ProductType } from "../types";

const RecipesDefault = ({
  isRecom,
  ...props
}: ProductType & { isRecom?: boolean }) => {
  const [isValidImage, setIsValidImage] = useState(true);

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col flex-grow items-center bg-slate-100 dark:bg-gray-800 p-5 rounded-md w-full sm:w-[48%] lg:w-[30%] max-w-[400px] h-[32.5rem] recipyShadow">
      {isRecom && (
        <div className="top-5 left-5 z-40 absolute flex flex-row justify-center items-center bg-sky-500 hover:bg-amber-400 shadow-md px-4 py-2 border border-white rounded-md font-bold text-white text-xl smallHover">
          <FaStar className="text-2xl text-center" />
        </div>
      )}
      {isValidImage ? (
        <img
          className="bg-gray-50 dark:bg-gray-700 mb-4 rounded-md w-full h-60 object-cover smallHover"
          src={props.image}
          alt={props.title}
          onError={() => setIsValidImage(false)}
          onClick={() => navigate(`/recipes/${props._id}`)}
        />
      ) : (
        <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-700 mb-4 rounded-md w-full h-60 object-cover">
          <span className="text-gray-500 dark:text-gray-400">No Image</span>
        </div>
      )}
      <article className="mx-auto mb-5 max-w-sm">
        <h2 className="bg-sky-900 mb-2 p-2 rounded-md font-bold text-white text-xl">
          {props.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          {props.description}
        </p>
      </article>
      <div className="bottom-5 absolute flex justify-center items-center gap-5">
        <Link
          to={`/recipes/${props._id}`}
          className="flex flex-row justify-center items-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md font-bold text-white text-xl buttonHover"
        >
          Read More
          <FaReadme className="ml-3 text-2xl text-center" />
        </Link>
      </div>
    </div>
  );
};

export default RecipesDefault;

export const RecipeLoading = () => {
  return (
    <div className="relative flex flex-col flex-grow items-center bg-slate-100 dark:bg-gray-800 p-5 rounded-md w-full sm:w-[48%] lg:w-[30%] max-w-[400px] h-[32.5rem] animate-pulse recipyShadow">
      <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-700 mb-4 rounded-md w-full h-60 object-cover animate-pulse"></div>

      <article className="mx-auto mb-5 w-full max-w-sm">
        <h2 className="bg-gray-50 dark:bg-gray-700 mb-2 p-2 rounded-md w-[80%] h-8 font-bold text-gray-50 dark:text-gray-700 text-xl animate-pulse"></h2>
        <p className="bg-gray-50 dark:bg-gray-700 rounded-md w-[50%] h-6 text-gray-50 dark:text-gray-700 text-lg animate-pulse"></p>
      </article>

      <div className="bottom-5 absolute flex justify-center items-center gap-5">
        <div className="flex flex-row justify-center items-center bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md font-bold text-white text-xl animate-pulse buttonHover">
          Read More
          <FaReadme className="ml-3 text-2xl text-center" />
        </div>
      </div>
    </div>
  );
};
