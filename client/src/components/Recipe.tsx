import { Link } from "react-router";
import { ProductType } from "../types";
import { FaReadme } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";

const Recipes = (prop: ProductType) => {
  return (
    <div className="max-w-[400px] h-[32.5rem] bg-white rounded-md shadow-md p-5 dark:bg-gray-800 flex flex-col items-center relative">
      <img
        className="w-full h-60 object-cover rounded-md mb-4"
        src={prop.image}
        alt={prop.title}
      />
      <article className="max-w-sm mx-auto mb-5">
        <h2 className="bg-sky-900 text-white font-bold text-xl p-2 rounded-md mb-2">
          {prop.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          {prop.description}
        </p>
      </article>
      <div className="flex flex-row gap-5 items-center justify-center absolute bottom-5">
        <Link
          to={`/recipes/${prop._id}`}
          className=" text-xl font-bold text-white bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded-md flex flex-row items-center justify-center"
        >
          Read More
          <FaReadme className="ml-3 text-2xl text-center" />
        </Link>
        {/* TODO: Add functionality to allow users to recommend the recipe if they are logged in and not the owner, then alow the user to click the button */}
        <button
          disabled
          className="font-bold text-white text-2xl bg-purple-600 py-2 px-4 rounded-md flex flex-row gap-2 items-center disabled:bg-gray-400"
        >
          <FaThumbsUp /> {prop.recommendList.length}
        </button>
      </div>
    </div>
  );
};

export default Recipes;
