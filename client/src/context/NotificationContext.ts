import { createContext } from "react";
import {
  ServerErrorMessage,
  ServerResponde,
  CustomNotification,
} from "../types";

interface NotificationContextType {
  message: string | null;
  status: number | null;
  showNotification: (
    response: ServerErrorMessage | ServerResponde | CustomNotification
  ) => void;
}

const DefaultNotificationContext: NotificationContextType = {
  message: null,
  status: null,
  showNotification: () => {},
};

export const NotificationContext = createContext<NotificationContextType>(
  DefaultNotificationContext
);
