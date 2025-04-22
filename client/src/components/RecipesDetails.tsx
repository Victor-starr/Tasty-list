import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import { FaEdit, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { MdDelete, MdFavorite } from "react-icons/md";
import { IoMdReturnRight } from "react-icons/io";

import useRecipeAPI from "../hooks/useRecipeAPI";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { FullProductType } from "../types";

interface RecipesDetailsProps {
  props: FullProductType;
  isOwner: boolean;
  isUser: boolean;
  isRecommended: boolean;
  addToRecommend: () => Promise<void>;
  removeFromRecommend: () => Promise<void>;
}

const RecipesDetails: React.FC<RecipesDetailsProps> = ({
  props,
  isOwner,
  isUser,
  isRecommended,
  addToRecommend,
  removeFromRecommend,
}) => {
  const { deleteRecipe } = useRecipeAPI();
  const [confirmDel, setConfirmDel] = useState(false);
  const [isValidImage, setIsValidImage] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setConfirmDel(false);
    await deleteRecipe(props._id);
  };

  return (
    <div className="relative flex md:flex-row flex-col gap-4 bg-white dark:bg-gray-800 p-5 rounded-md w-[90vw] md:w-[70vw] max-w-[90vw] min-h-[32.5rem] overflow-hidden recipyShadow">
      <ConfirmDeleteDialog
        isOpen={confirmDel}
        onCancel={() => setConfirmDel(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this recipe?"
      />

      <div className="top-6 left-6 absolute flex flex-row justify-center items-center bg-sky-500 shadow-md px-4 py-2 border border-white rounded-md font-bold text-white text-xl">
        <MdFavorite className="text-2xl text-center" />
        {props.recommendList.length}
      </div>

      {isValidImage ? (
        <img
          className="bg-gray-50 dark:bg-gray-700 mb-4 md:mb-0 rounded-md w-full md:w-[50%] max-h-[500px] object-cover"
          src={props.image}
          alt={props.title}
          onError={() => setIsValidImage(false)}
        />
      ) : (
        <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-700 mb-4 md:mb-0 rounded-md w-full md:w-[50%] max-h-[500px] object-cover">
          <span className="text-gray-500 dark:text-gray-400">No Image</span>
        </div>
      )}

      <article className="flex-1 bg-gradient-to-b from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-700 shadow-lg p-6 border border-gray-300 rounded-lg max-h-[500px] overflow-auto">
        <h2 className="bg-sky-900 mb-4 p-3 rounded-md font-bold text-white text-3xl text-center">
          {props.title}
        </h2>
        <p className="mb-4 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
          <strong className="text-sky-700 dark:text-sky-400">
            Description:
          </strong>{" "}
          {props.description}
        </p>
        <p className="mb-4 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
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

      <div className="right-10 bottom-8 md:absolute flex flex-wrap md:flex-nowrap justify-center items-center gap-5">
        {isUser && (
          <>
            {isOwner ? (
              <>
                <Link
                  className="group flex flex-row justify-center items-center gap-2 bg-sky-500 hover:bg-green-600 px-4 py-2 rounded-md font-bold text-white text-xl"
                  to={`/recipes/${props._id}/edit`}
                >
                  <FaEdit className="group-hover:mb-2 text-1xl" />
                  Edit
                </Link>
                <button
                  className="group flex flex-row justify-center items-center gap-2 bg-sky-500 hover:bg-red-600 px-4 py-2 rounded-md font-bold text-white text-xl"
                  onClick={() => setConfirmDel(true)}
                >
                  <MdDelete className="group-hover:mb-2 text-1xl" />
                  Delete
                </button>
              </>
            ) : (
              <button
                className={`text-xl font-bold text-white ${
                  isRecommended
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-sky-500 hover:bg-yellow-500"
                } py-2 px-4 rounded-md flex flex-row items-center justify-center gap-2 group`}
                onClick={isRecommended ? removeFromRecommend : addToRecommend}
              >
                {isRecommended ? (
                  <FaRegThumbsDown className="group-hover:mb-1 text-1xl text-center" />
                ) : (
                  <FaRegThumbsUp className="group-hover:mb-1 text-1xl text-center" />
                )}
                {isRecommended ? "Unrecommend" : "Recommend"}
              </button>
            )}
          </>
        )}
        <button
          className="group flex justify-center items-center gap-2 bg-violet-500 hover:bg-violet-600 shadow-md px-4 py-2 rounded-md font-bold text-white text-xl"
          onClick={() => {
            if (window.location.pathname !== "/recipes/create") {
              navigate(-1);
            } else {
              navigate("/recipes");
            }
          }}
        >
          <IoMdReturnRight className="group-hover:mb-1 text-2xl text-center" />
          Back
        </button>
      </div>
    </div>
  );
};

export const RecipesDetailsLoading = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex md:flex-row flex-col gap-4 bg-white dark:bg-gray-800 p-5 rounded-md w-[90vw] md:w-[70vw] max-w-[90vw] min-h-[32.5rem] overflow-hidden recipyShadow">
      <div className="top-6 left-6 absolute flex flex-row justify-center items-center bg-sky-500 shadow-md px-4 py-2 border border-white rounded-md w-[56px] min-h-[35px]">
        <MdFavorite className="text-white text-2xl text-center" />
      </div>
      <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 mb-4 md:mb-0 rounded-md w-full md:w-[50%] max-h-[500px] object-cover animate-pulse"></div>
      <article className="flex flex-col flex-1 items-center bg-gradient-to-b from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-700 shadow-lg p-6 border border-gray-300 rounded-lg max-h-[500px] overflow-auto">
        <h2 className="bg-gray-200 dark:bg-gray-600 mb-4 p-3 rounded-md w-full h-[56px] animate-pulse"></h2>
        <p className="bg-gray-200 dark:bg-gray-600 mb-4 rounded-md w-[80%] h-[60px] animate-pulse"></p>
        <p className="bg-gray-200 dark:bg-gray-600 mb-4 rounded-md w-[80%] h-[70px] animate-pulse"></p>
        <p className="bg-gray-200 dark:bg-gray-600 mb-4 rounded-md w-[80%] h-[100px] animate-pulse"></p>
      </article>
      <div className="right-10 bottom-8 md:absolute flex flex-wrap md:flex-nowrap justify-center items-center gap-5">
        <button
          className="group flex justify-center items-center gap-2 bg-violet-500 hover:bg-violet-600 shadow-md px-4 py-2 rounded-md font-bold text-white text-xl"
          onClick={() => {
            if (window.location.pathname !== "/recipes/create") {
              navigate(-1);
            } else {
              navigate("/recipes");
            }
          }}
        >
          <IoMdReturnRight className="group-hover:mb-1 text-2xl text-center" />
          Back
        </button>
      </div>
    </div>
  );
};

export default RecipesDetails;
