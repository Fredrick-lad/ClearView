import React, { useState, useCallback } from "react";
import { createContext, useContext } from "react";
import { type ModalKind, type ScreenKey } from "../../types";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: "expense" | "income" | "envelope" | "alert" | "edit";
  timestamp: number;
}

interface envelopeContextType {
  screen: ScreenKey;
  setScreen: any;
  modal: ModalKind;
  setModal: any;
  selectedOption: any;
  setSelectedOption: any;
  selectedEnvelope: any;
  setSelectedEnvelope: any;
  selectedExpense: any;
  setSelectedExpense: any;
  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, "id" | "timestamp">) => void;
  clearNotifications: () => void;
}

export const generalContext = createContext<envelopeContextType | null>(null);

function DataContext({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<ScreenKey>("Dashboard");
  const [modal, setModal] = useState<ModalKind>(null);
  const [selectedOption, setSelectedOption] = useState<
    "preset" | "scratch" | null
  >(null);
  const [selectedEnvelope, setSelectedEnvelope] = useState<any>(null);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem("cv_notifications");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addNotification = useCallback((n: Omit<NotificationItem, "id" | "timestamp">) => {
    const item: NotificationItem = {
      ...n,
      id: `${n.type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    };
    setNotifications((prev) => {
      const next = [item, ...prev].slice(0, 100);
      localStorage.setItem("cv_notifications", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    localStorage.removeItem("cv_notifications");
  }, []);

  return (
    <generalContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        screen,
        setScreen,
        setModal,
        modal,
        selectedEnvelope,
        setSelectedEnvelope,
        selectedExpense,
        setSelectedExpense,
        notifications,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </generalContext.Provider>
  );
}
export default DataContext;

export const GetData = () => {
  const context = useContext(generalContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
