import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import {
  MdCheckCircle,
  MdAddCircle,
  MdError,
  MdLock,
  MdWarning,
} from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";

const Notification = () => {
  const { message, status } = useContext(NotificationContext);
  if (!message || !status) return null;

  const getStyle = () => {
    switch (status) {
      case 200:
        return "notification-container bg-green-600 text-white";
      case 201:
        return "notification-container bg-blue-600 text-white";
      case 400:
        return "notification-container bg-red-600 text-white";
      case 401:
        return "notification-container bg-yellow-600 text-black";
      case 404:
        return "notification-container bg-amber-400 text-black";
      case 500:
        return "notification-container bg-gray-600 text-white";
      default:
        return "notification-container bg-gray-400 text-black";
    }
  };

  const getIcon = () => {
    switch (status) {
      case 200:
        return <MdCheckCircle className="text-2xl" />;
      case 201:
        return <MdAddCircle className="text-2xl" />;
      case 400:
        return <MdError className="text-2xl" />;
      case 401:
        return <MdLock className="text-2xl" />;
      case 404:
        return <FaRegCircleQuestion className="text-2xl" />;
      case 500:
        return <MdWarning className="text-2xl" />;
      default:
        return <MdWarning className="text-2xl" />;
    }
  };

  return (
    <div className={getStyle()}>
      {getIcon()}
      <span className="text-1.5xl">{message}</span>
    </div>
  );
};

export default Notification;
