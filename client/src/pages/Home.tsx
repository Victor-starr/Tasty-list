import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../axiosInstance";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    axiosInstance.get("/").then((res) => {
      setMessage(res.data.message);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome, {user ? <span>{user.username}</span> : "Guest"}!
        </h1>
        <i className="dark:text-white text-gray-500 font-bold">{message}</i>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This is the home page of our application.
        </p>
      </div>
    </div>
  );
}
