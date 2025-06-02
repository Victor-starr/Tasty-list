import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
export default function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center gap-2 bg-gray-200 dark:bg-gray-800 mt-auto p-4 w-full font-bold text-gray-800 dark:text-amber-50 text-base text-center hover:underline">
      <Link
        to={"https://github.com/Victor-starr/Tasty-list"}
        target="_blank"
        rel="noopener noreferrer"
        className="contents"
      >
        <FaGithub /> Check out the code on GitHub
      </Link>
    </footer>
  );
}
