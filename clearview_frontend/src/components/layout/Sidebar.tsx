import type { ScreenKey, ModalKind } from "../../types";
import { useState, type ReactNode } from "react";
import { Icon } from "../ui/iconMap";
import { User } from "lucide-react";

interface SidebarProps {
  screen: ScreenKey;
  setScreen: (s: ScreenKey) => void;
  setModal: (m: ModalKind) => void;
}

export default function Sidebar({ screen, setScreen, setModal }: SidebarProps) {
  // const [user, setUser]= useState(username = "" , email="")
  const details = {
    username: "fred",
    email: "fred@gmail.com",
  };

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

  return (
    <aside
      style={{
        width: 220,
        paddingTop: 10,
        borderRight: "1px solid #e5e7eb",
        // height: "100vh",
        // position: "relative",
      }}
      className="d-flex justify-content-between flex-column"
    >
      <nav>
        {items.map((it) => (
          <div key={it.id} style={{ marginBottom: 8 }}>
            <button
              onClick={() => setScreen(it.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "8px 10px",
                border: "none",
                background: screen === it.id ? "#eef2ff" : "transparent",
                cursor: "pointer",
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
      <button style={{ border: "none", backgroundColor: "#eef2ff" }}>
        <div className="d-flex gap-2 align-items-center flex-row p-2 mt-1 ">
          <div className="border rounded-circle border-primary p-2">
            <User />
          </div>
          <div className="d-flex align-items-center ">
            <p style={{ marginBottom: 0 }} className="text-start">
              {details.username} <br />{" "}
              <span className="text-muted">{details.email}</span>
            </p>
          </div>
        </div>
      </button>
    </aside>
  );
}
