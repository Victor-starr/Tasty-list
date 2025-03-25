import { Link } from "react-router";
import { ProductType } from "../types";
import { FaReadme } from "react-icons/fa6";

const Recipes = (prop: ProductType) => {
  return (
    <div className="max-w-[350px] bg-white rounded-md shadow-md p-5 dark:bg-gray-800">
      <img
        className="w-full h-60 object-cover rounded-md mb-4"
        src={prop.image}
        alt={prop.title}
      />
      <article className="max-w-sm mx-auto mb-4">
        <h2 className="bg-sky-900 text-white font-bold text-xl p-2 rounded-md mb-2">
          {prop.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          {prop.description}
        </p>
      </article>
      <Link
        to={`/recipes/${prop._id}`}
        className="text-xl font-bold text-white bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded-md flex flex-row items-center justify-center"
      >
        Read More
        <FaReadme className="ml-3 text-1xl text-center" />
      </Link>
    </div>
  );
};

export default Recipes;
