import { Link, useNavigate } from "react-router";
import { FaReadme } from "react-icons/fa6";
import { ProductType } from "../types";
import { useState } from "react";

const RecipesDefault = (props: ProductType) => {
  const [isValidImage, setIsValidImage] = useState(true);

  const navigate = useNavigate();

  return (
    <div className="flex-grow max-w-[400px] w-full sm:w-[48%] lg:w-[30%] h-[32.5rem] bg-slate-100 rounded-md recipyShadow p-5 dark:bg-gray-800 flex flex-col items-center relative">
      {isValidImage ? (
        <img
          className="w-full h-60 object-cover rounded-md mb-4 dark:bg-gray-700 bg-gray-50 hover:scale-105 transition-transform duration-300 ease-in-out"
          src={props.image}
          alt={props.title}
          onError={() => setIsValidImage(false)}
          onClick={() => navigate(`/recipes/${props._id}`)}
        />
      ) : (
        <div className="w-full h-60 object-cover rounded-md mb-4 dark:bg-gray-700 bg-gray-50 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">No Image</span>
        </div>
      )}
      <article className="max-w-sm mx-auto mb-5">
        <h2 className="bg-sky-900 text-white font-bold text-xl p-2 rounded-md mb-2">
          {props.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          {props.description}
        </p>
      </article>
      <div className="flex gap-5 items-center justify-center absolute bottom-5">
        <Link
          to={`/recipes/${props._id}`}
          className="text-xl font-bold text-white bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded-md flex flex-row items-center justify-center buttonHover"
        >
          Read More
          <FaReadme className="ml-3 text-2xl text-center" />
        </Link>
      </div>
    </div>
  );
};

export default RecipesDefault;
