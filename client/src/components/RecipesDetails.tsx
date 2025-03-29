import { Link, useNavigate } from "react-router";
import { FullProductType } from "../types";

import { FaEdit } from "react-icons/fa";
import { MdDelete, MdFavorite } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { IoMdReturnRight } from "react-icons/io";
import React, { useState } from "react";
import useRecipeAPI from "../hooks/useRecipeAPI";

interface RecipesDetailsProps {
  props: FullProductType;
  isOwner: boolean;
  isUser: boolean;
  isRecommended: boolean;
  addToRecommend: () => Promise<void>;
}

const RecipesDetails: React.FC<RecipesDetailsProps> = ({
  props,
  isOwner,
  isUser,
  isRecommended,
  addToRecommend,
}) => {
  const { deleteRecipe } = useRecipeAPI();
  const [confirmDel, setConfirmDel] = useState(false);
  const navigate = useNavigate();
  const isValidImage = /^https?:\/\//.test(props.image);

  const handleDelete = async () => {
    setConfirmDel(false);
    await deleteRecipe(props._id);
  };

  return (
    <div className="w-[70vw] max-w-[90vw] min-h-[32.5rem] bg-white rounded-md recipyShadow p-5 dark:bg-gray-800 flex flex-col md:flex-row relative gap-4 overflow-hidden">
      {confirmDel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center seeThoughts">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Are you sure you want to delete this recipe?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="text-lg font-bold text-white bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-md"
                onClick={() => setConfirmDel(false)}
              >
                Cancel
              </button>
              <button
                className="text-lg font-bold text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-xl font-bold text-white bg-sky-500 py-2 px-4 rounded-md flex flex-row items-center justify-center absolute top-6 left-6 shadow-md border border-white">
        <MdFavorite className="text-2xl text-center" />
        {props.recommendList.length}
      </div>

      {isValidImage ? (
        <img
          className="w-full md:w-[50%] max-h-[500px] object-cover rounded-md mb-4 md:mb-0 dark:bg-gray-700 bg-gray-50"
          src={props.image}
          alt={props.title}
        />
      ) : (
        <div className="w-full md:w-[50%] max-h-[500px] object-cover rounded-md mb-4 md:mb-0 dark:bg-gray-700 bg-gray-50 flex justify-center items-center">
          <span className="text-gray-500 dark:text-gray-400">No Image</span>
        </div>
      )}

      <article className="flex-1 p-6 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-auto max-h-[500px]">
        <h2 className="bg-sky-900 text-white font-bold text-3xl p-3 rounded-md mb-4 text-center">
          {props.title}
        </h2>
        <p className="text-gray-800 dark:text-gray-200 text-lg mb-4 leading-relaxed">
          <strong className="text-sky-700 dark:text-sky-400">
            Description:
          </strong>{" "}
          {props.description}
        </p>
        <p className="text-gray-800 dark:text-gray-200 text-lg mb-4 leading-relaxed">
          <strong className="text-sky-700 dark:text-sky-400">
            Instructions:
          </strong>{" "}
          {props.instructions}
        </p>
        <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
          <strong className="text-sky-700 dark:text-sky-400">
            Ingredients:
          </strong>{" "}
          {props.ingredients}
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
                  <FaEdit className="text-1xl group-hover:mb-2" />
                  Edit
                </Link>
                <button
                  className="text-xl font-bold text-white bg-sky-500 hover:bg-red-600 py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group"
                  onClick={() => setConfirmDel(true)}
                >
                  <MdDelete className="text-1xl group-hover:mb-2" />
                  Delete
                </button>
              </>
            ) : (
              <button
                className={`text-xl font-bold text-white ${
                  isRecommended
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-yellow-500"
                } py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group`}
                onClick={addToRecommend}
                disabled={isRecommended}
              >
                <FaRegThumbsUp className="text-1xl text-center group-hover:mb-1" />
                {isRecommended ? "Recommended" : "Recommend"}
              </button>
            )}
          </>
        )}
        <button
          className="text-xl font-bold text-white bg-violet-500 hover:bg-violet-600 py-2 px-4 rounded-md flex items-center justify-center shadow-md gap-2 group"
          onClick={() => navigate("/recipes")}
        >
          <IoMdReturnRight className="text-2xl  text-center group-hover:mb-1" />
          Catalog
        </button>
      </div>
    </div>
  );
};

export default RecipesDetails;
