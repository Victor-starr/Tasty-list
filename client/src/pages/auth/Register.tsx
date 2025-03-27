import { Link } from "react-router";

import useAuthAPI from "../../hooks/useAuthAPI";

export default function Register() {
  const { formData, handleInput, handleRegister } = useAuthAPI();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] h-auto">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Register
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Username:<i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email:<i className="text-red-500">*</i>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password:<i className="text-red-500">*</i>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            Register
          </button>
          <Link
            to="/auth/login"
            className="block mt-4 text-sm text-center text-blue-500 hover:underline"
          >
            If you already have an account
          </Link>
        </form>
      </div>
    </div>
  );
}
