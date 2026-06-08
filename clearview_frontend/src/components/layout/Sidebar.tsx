import type { ScreenKey, ModalKind } from "../../types";
import { useState, type ReactNode } from "react";
import { Icon } from "../ui/iconMap";
import {
  ArrowRight,
  ArrowRightCircle,
  ChevronRight,
  Headset,
  LogOut,
  Settings,
  User,
} from "lucide-react";

interface SidebarProps {
  title: string;

  screen: ScreenKey;
  setScreen: (s: ScreenKey) => void;
  setModal: (m: ModalKind) => void;
}

export default function Sidebar({
  title,
  screen,
  setScreen,
  setModal,
}: SidebarProps) {
  // const [user, setUser]= useState(username = "" , email="")
  const details = {
    username: "fred",
    email: "fred@gmail.com",
  };

  const [fullSidebar, setFullSidebar] = useState(true);

  const items: Array<{ icon: ReactNode; id: ScreenKey; label: string }> = [
    {
      icon: <Icon name="dashboard" className="text-primary" />,
      id: "Dashboard",
      label: "Dashboard",
    },
    {
      icon: <Icon name="envelope" className="text-primary" />,
      id: "Envelopes",
      label: "Envelopes",
    },
    {
      icon: <Icon name="expenses" className="text-danger" />,
      id: "Expenses",
      label: "Expenses",
    },
    {
      icon: <Icon name="income" className="text-primary" />,
      id: "Income",
      label: "Income",
    },
    {
      icon: <Icon name="reports" className="text-primary" />,
      id: "Reports",
      label: "Reports",
    },
  ];

  const support: Array<{ icon: ReactNode; id: ScreenKey; label: String }> = [
    {
      icon: <Settings className="text-brand" />,
      id: "settings",
      label: "Settings",
    },
    {
      icon: <Headset className="text-brand" />,
      id: "helpCenter",
      label: "Help Center",
    },
    {
      icon: <LogOut className="text-brand" />,
      id: "logout",
      label: "Logout",
    },
  ];

  return (
    <aside
      style={{
        width: 220,
        borderRight: "1px solid #e5e7eb",
        // height: "100vh",
        // position: "relative",
      }}
      className="d-flex justify-content-between flex-column h-100 p-2 z-2"
    >
      <nav>
        <div className="d-flex align-items-center ">
          <div style={{ padding: "16px" }}>
            <div
              className="text-primary"
              style={{ fontSize: 18, fontWeight: 800 }}
            >
              {title}
            </div>
          </div>
        </div>
        {items.map((it) => (
          <div key={it.id} style={{ marginBottom: 8 }}>
            <button
              onClick={() => setScreen(it.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "8px 10px",
                border: "none",
                background: screen === it.id ? "#E1F5EE" : "transparent",
                cursor: "pointer",
                borderLeft: screen === it.id ? "3px solid #1D9E75" : "none",
                paddingLeft: screen === it.id ? "8px" : "none",
              }}
            >
              <div className="d-flex gap-2">
                {it.icon}
                {it.label}
              </div>
            </button>
          </div>
        ))}
      </nav>
      {/* <hr style={{ margin: 0 }} /> */}
      <div>
        {support.map((supp) => (
          <div key={supp.id} style={{ marginBottom: 8 }}>
            <button
              onClick={() => setScreen(supp.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "8px 10px",
                border: "none",
                background: screen === supp.id ? "#E1F5EE" : "transparent",
                cursor: "pointer",

                borderLeft: screen === supp.id ? "3px solid #1D9E75" : "none",
                paddingLeft: screen === supp.id ? "8px" : "none",
              }}
            >
              <div className="d-flex gap-2">
                {supp.icon}
                {supp.label}
              </div>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
