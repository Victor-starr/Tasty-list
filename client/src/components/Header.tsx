import { Link, useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useThemeToggle from "../hooks/useThemeToggle";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useThemeToggle();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 w-full shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="flex items-center text-green-600 dark:text-green-400"
          >
            Tasty<p className="text-yellow-500 dark:text-yellow-400">List</p>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleMenuToggle}
            className="lg:hidden cursor-pointer text-2xl"
          >
            {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>

          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } flex-col lg:flex lg:flex-row gap-4 font-bold text-lg items-center absolute lg:static top-16 left-0 w-full lg:w-auto bg-white dark:bg-gray-800 shadow-md lg:shadow-none p-6 lg:p-0 z-50`}
          >
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/recipes/favorites">Favorites</Link>
                </li>
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
        </div>
      </nav>
    </header>
  );
}
