import { useState, ReactNode } from "react";
import { NotificationContext } from "./NotificationContext";
import { ServerErrorMessage, ServerResponde } from "../types";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const showNotification = (response: ServerErrorMessage | ServerResponde) => {
    setMessage(null);
    setStatus(null);

    if ("response" in response) {
      setMessage(response.response.data.message);
      setStatus(response.response.status);
    } else {
      setMessage(response.data.message);
      setStatus(response.status);
    }

    setTimeout(() => {
      setMessage(null);
      setStatus(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ message, status, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
