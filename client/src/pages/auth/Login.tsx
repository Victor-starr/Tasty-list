import { Link } from "react-router";
import useAuthAPI from "../../hooks/useAuthAPI";
export default function Login() {
  const { formData, handleInput, handleLogin } = useAuthAPI();

  return (
    <div className="flex flex-col justify-center items-center h-auto min-h-[calc(100vh-140px)]">
      <div className="space-y-6 bg-white dark:bg-gray-800 shadow-md p-8 rounded w-full max-w-md text-black dark:text-white">
        <h2 className="font-bold text-2xl text-center">Login</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-900 dark:text-gray-300 text-sm"
            >
              Email: <i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInput}
              className="dark:bg-gray-700 mt-1 px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-full dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-900 dark:text-gray-300 text-sm"
            >
              Password:<i className="text-red-500">*</i>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInput}
              className="dark:bg-gray-700 mt-1 px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-full dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full font-bold text-white"
          >
            Log In
          </button>
          <Link
            to="/auth/register"
            className="block mt-4 text-indigo-600 dark:text-indigo-400 text-sm text-center hover:underline"
          >
            If you don't already have an account
          </Link>
        </form>
      </div>
    </div>
  );
}
