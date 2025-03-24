import { Link, useNavigate } from "react-router";
import { UserDataFormType } from "../../types";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const formRegister = async (formData: FormData) => {
    const formDataEntries = Object.fromEntries(formData);
    const userData = formDataEntries as unknown as UserDataFormType;

    try {
      await register(userData);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Register
        </h2>
        <form className="space-y-4" action={formRegister}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Username:<i className="text-red-500">*</i>
            </label>
            <input
              type="text"
              name="username"
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          {errorMsg && <div className="text-red-500">{errorMsg}</div>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
