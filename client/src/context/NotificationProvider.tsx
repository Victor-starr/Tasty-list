import { useState, ReactNode } from "react";
import { NotificationContext } from "./NotificationContext";
import {
  ServerErrorMessage,
  ServerResponde,
  CustomNotification,
} from "../types";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const showNotification = (
    response: ServerErrorMessage | ServerResponde | CustomNotification
  ) => {
    setMessage(null);
    setStatus(null);

    if ("response" in response) {
      setMessage(response.response.data.message);
      setStatus(response.response.status);
    } else if ("data" in response) {
      setMessage(response.data.message);
      setStatus(response.status);
    } else {
      setMessage(response.message);
      setStatus(response.status);
    }

    setTimeout(() => {
      setMessage(null);
      setStatus(null);
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ message, status, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
