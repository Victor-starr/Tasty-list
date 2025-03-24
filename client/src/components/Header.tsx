import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useThemeToggle from "../hooks/useThemeToggle";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export default function Header() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 fixed w-full z-10 shadow-md transition-colors duration-300">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="flex items-center text-green-600 dark:text-green-400"
          >
            Tasty<p className="text-yellow-500 dark:text-yellow-400">List</p>
          </Link>
        </div>
        <ul className="flex row gap-4 font-bold text-lg items-center">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/recipes/create">Create</Link>
              </li>
              <li>
                <Link to="/auth/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full focus:outline-none"
        >
          {theme === "light" ? (
            <IoMdMoon className="text-2xl" />
          ) : (
            <MdSunny className="text-2xl" />
          )}
        </button>
      </nav>
    </header>
  );
}
