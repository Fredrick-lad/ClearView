import { useState, type ReactNode } from "react";
import { Icon } from "../ui/iconMap";
import type { ScreenKey } from "../../types";
import { Settings, User } from "lucide-react";
import { GetData } from "../../hooks/context/generalContext";

function MobileNav() {
  const { screen, setScreen, modal } = GetData();
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
      icon: <Icon name="reports" className="text-primary" />,
      id: "Reports",
      label: "Reports",
    },
    {
      icon: <User className="text-primary" />,
      id: "Profile",
      label: "Profile",
    },
  ];

  return (
    <footer className="d-flex flex-row justify-content-between  z-2 w-100 ">
      {items.map((it) => (
        <div key={it.id} className=" bg-brand-light">
          <button
            onClick={() => setScreen(it.id)}
            style={{
              //   width: "100%",
              //   textAlign: "left",
              padding: "4px",
              border: "none",
              background: screen === it.id ? "#E1F5EE" : "transparent",
              cursor: "pointer",
              borderBottom: screen === it.id ? "3px solid #1D9E75" : "none",
              // paddingBottom: screens === screen.id ? "10px" : "none",
            }}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            {it.icon}
            <div className="small">{it.label}</div>
          </button>
        </div>
      ))}
    </footer>
  );
}

export default MobileNav;
