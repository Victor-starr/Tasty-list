import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="h2-title">404 - Page Not Found</h2>
        <Link
          to="/"
          className="bg-blue-500 dark:bg-violet-700 text-white  px-4 py-2 rounded-lg text-lg font-semibold my-4 relative inline-block"
        >
          GO BACK TO HOME PAGE
        </Link>
      </div>
    </div>
  );
}
