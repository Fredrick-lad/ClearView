import React, { useState, useCallback, useEffect, useRef } from "react";
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
  goBack: () => void;
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
  const getInitialScreen = (): ScreenKey => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("screen");
    if (s && ["Dashboard","Envelopes","Expenses","Income","Reports","settings","helpCenter","contactSupport","logout","Profile","Notifications"].includes(s)) {
      return s as ScreenKey;
    }
    const saved = localStorage.getItem("cv_lastScreen");
    if (saved && ["Dashboard","Envelopes","Expenses","Income","Reports","settings","helpCenter","contactSupport","logout","Profile","Notifications"].includes(saved)) {
      return saved as ScreenKey;
    }
    return "Dashboard";
  };

  const [screen, setScreenState] = useState<ScreenKey>(getInitialScreen);
  const [, setScreenHistory] = useState<ScreenKey[]>(() => {
    try {
      const saved = localStorage.getItem("cv_screenHistory");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const screenRef = useRef(screen);
  screenRef.current = screen;

  const setScreen = useCallback((newScreen: ScreenKey) => {
    if (newScreen === screenRef.current) return;
    const prev = screenRef.current;
    setScreenHistory(prevHistory => {
      const next = [...prevHistory, prev];
      localStorage.setItem("cv_screenHistory", JSON.stringify(next));
      return next;
    });
    setScreenState(newScreen);
  }, []);

  const goBack = useCallback(() => {
    setScreenHistory(prevHistory => {
      if (prevHistory.length === 0) return prevHistory;
      const next = prevHistory.slice(0, -1);
      const prev = prevHistory[prevHistory.length - 1];
      setScreenState(prev);
      localStorage.setItem("cv_screenHistory", JSON.stringify(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (screen === "Dashboard") {
      url.searchParams.delete("screen");
    } else {
      url.searchParams.set("screen", screen);
    }
    window.history.replaceState({}, "", url.toString());
    localStorage.setItem("cv_lastScreen", screen);
  }, [screen]);
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
        goBack,
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
