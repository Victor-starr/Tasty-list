import { Link } from "react-router";
import { ProductType } from "../types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
const RecipesDetails = ({
  props,
  isOwner,
  isUser,
  isRecommended,
}: {
  props: ProductType;
  isOwner: boolean;
  isUser: boolean;
  isRecommended: boolean;
}) => {
  return (
    <div className="w-[70vw] max-w-[90vw] min-h-[32.5rem] bg-white rounded-md shadow-md p-5 dark:bg-gray-800 flex flex-col md:flex-row relative gap-4 overflow-hidden md:overflow-visible relative">
      <div className="text-xl font-bold text-white bg-sky-500 py-2 px-4 rounded-md flex flex-row items-center justify-center absolute top-6 left-6 shadow-md border-1 border-white">
        <MdFavorite className="text-2xl text-center" />
        {props.recommendList.length}
      </div>
      <img
        className="w-full md:w-[50%] max-h-[500px] object-cover rounded-md mb-4 md:mb-0"
        src={props.image}
        alt={props.title}
      />
      <article className="flex-1 p-5 border border-gray-300 rounded-md shadow-md bg-gray-50 dark:bg-gray-700 overflow-auto max-h-[500px]">
        <h2 className="bg-sky-900 text-white font-bold text-3xl p-3 rounded-md mb-4 text-center">
          {props.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-3">
          <strong>Description:</strong> {props.description}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-3">
          <strong>Instructions:</strong> {props.instructions}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          <strong>Ingredients:</strong> {props.ingredients}
        </p>
      </article>
      <div className="flex flex-wrap md:flex-nowrap gap-5 items-center justify-center md:absolute bottom-8 right-10">
        {isUser && (
          <>
            {isOwner ? (
              <>
                <Link
                  className="text-xl font-bold text-white bg-sky-500 hover:bg-green-600 py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group"
                  to={`/recipes/${props._id}/edit`}
                >
                  <FaEdit className="text-1xl  group-hover:mb-2" />
                  Edit
                </Link>
                <Link
                  className="text-xl font-bold text-white bg-sky-500 hover:bg-red-600 py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group"
                  to={`/recipes/${props._id}/delete`}
                >
                  <MdDelete className="text-1xl  group-hover:mb-2" />
                  Delete
                </Link>
              </>
            ) : (
              !isRecommended && (
                <Link
                  to={`/recipes/${props._id}`}
                  className="text-xl font-bold text-white bg-sky-500 hover:bg-yellow-500 py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group"
                >
                  <FaRegThumbsUp className="text-1xl text-center  group-hover:mb-1" />
                  Recommend
                </Link>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipesDetails;
