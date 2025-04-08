import { BiSolidEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import useAuthAPI from "../../hooks/useAuthAPI";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";

function Settings() {
  const [confirmDel, setConfirmDel] = useState(false);

  const { user } = useContext(AuthContext);
  const {
    formData,
    handleInput,
    handleProfileUpdate,
    hanlderProfilePasswordUpdate,
    handleFileChange,
    previewImage,
    invalidImage,
    handleDelete,
  } = useAuthAPI();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto bg-gray-100 dark:bg-slate-900 py-10">
      <ConfirmDeleteDialog
        isOpen={confirmDel}
        onCancel={() => setConfirmDel(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete your account?"
      />
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
        Edit your Profile
      </h1>

      <form
        className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-lg shadow-md py-10 px-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleProfileUpdate();
        }}
      >
        {/* PROFILE PICTURE INPUT */}
        <div className="relative flex flex-col items-center justify-center gap-4 group">
          <label htmlFor="profilePicture" className="cursor-pointer relative">
            {previewImage && !invalidImage ? (
              <img
                src={previewImage}
                alt="User Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
            ) : user?.profilePicture ? (
              <img
                src={
                  typeof user?.profilePicture === "string"
                    ? user.profilePicture
                    : ""
                }
                alt="User Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <CgProfile className="text-slate-700 dark:text-slate-300 w-32 h-32 rounded-full" />
            )}
            <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <BiSolidEdit className="text-white text-3xl" />
            </div>
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {/* USERNAME INPUT */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-10">
          <label
            htmlFor="username"
            className="text-slate-700 dark:text-slate-300 text-lg font-semibold"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ""}
            onChange={handleInput}
            placeholder="Enter your username"
            className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-slate-300"
          />
        </div>
        {/* EMAIL INPUT */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-6">
          <label
            htmlFor="email"
            className="text-slate-700 dark:text-slate-300 text-lg font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInput}
            placeholder="Enter your email"
            className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-slate-300"
          />
        </div>
        <button
          type="submit"
          className="mt-8 w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-16 mb-6">
        Reset Your Password
      </h2>
      <form
        className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-lg shadow-md py-10 px-8"
        onSubmit={(e) => {
          e.preventDefault();
          hanlderProfilePasswordUpdate();
        }}
      >
        {/* NEW PASSWORD */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-4">
          <label
            htmlFor="password"
            className="text-slate-700 dark:text-slate-300 text-lg font-semibold"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ""}
            onChange={handleInput}
            placeholder="Enter new password"
            className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-slate-300"
          />
        </div>
        {/* REPEAT NEW PASSWORD */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-6">
          <label
            htmlFor="rePassword"
            className="text-slate-700 dark:text-slate-300 text-lg font-semibold"
          >
            Repeat New Password
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formData.rePassword || ""}
            onChange={handleInput}
            placeholder="Repeat new password"
            className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:text-slate-300"
          />
        </div>
        <button
          type="submit"
          className="mt-8 w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Reset Password
        </button>
      </form>
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-16 mb-6">
        Delete Your Account
      </h2>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg lg:text-xl font-bold rounded-md shadow-md transition-transform transform hover:scale-105"
        onClick={() => setConfirmDel(true)}
      >
        Delete Account
      </button>
    </div>
  );
}

export default Settings;
