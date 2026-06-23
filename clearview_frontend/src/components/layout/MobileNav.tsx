import { type ReactNode } from "react";
import { Icon } from "../ui/iconMap";
import type { ScreenKey } from "../../types";
import { User, HelpCircle } from "lucide-react";
import { GetData } from "../../hooks/context/generalContext";

function MobileNav() {
  const { screen, setScreen } = GetData();

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
    <nav
      className="d-flex flex-row justify-content-around align-items-center w-100 bg-white border-top shadow-sm"
      style={{
        padding: "6px 0 constant(safe-area-inset-bottom)",
        minHeight: "60px",
      }}
    >
      {items.map((it) => {
        const isActive = screen === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setScreen(it.id)}
            className="d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent"
            style={{
              padding: "4px 8px",
              cursor: "pointer",
              color: isActive
                ? "var(--cv-nav-active-text)"
                : "var(--cv-nav-inactive-text)",
              borderBottom: isActive
                ? "3px solid var(--cv-nav-active-border)"
                : "3px solid transparent",
              transition: "color 0.15s, border-color 0.15s",
              minWidth: "56px",
            }}
          >
            {it.icon}
            <span
              style={{
                fontSize: "10px",
                fontWeight: isActive ? 700 : 500,
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {it.label}
            </span>
          </button>
        );
      })}

      {/* Profile */}
      <button
        onClick={() => setScreen("Profile")}
        className="d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent"
        style={{
          padding: "4px 8px",
          cursor: "pointer",
          color:
            screen === "Profile"
              ? "var(--cv-nav-active-text)"
              : "var(--cv-nav-inactive-text)",
          borderBottom:
            screen === "Profile"
              ? "3px solid var(--cv-nav-active-border)"
              : "3px solid transparent",
          transition: "color 0.15s, border-color 0.15s",
          minWidth: "56px",
        }}
      >
        <User
          size={18}
          className={screen === "Profile" ? "text-success" : "text-secondary"}
        />
        <span
          style={{
            fontSize: "10px",
            fontWeight: screen === "Profile" ? 700 : 500,
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          Profile
        </span>
      </button>

      {/* Help */}
      <button
        onClick={() => setScreen("helpCenter")}
        className="d-flex flex-column align-items-center justify-content-center gap-1 border-0 bg-transparent"
        style={{
          padding: "4px 8px",
          cursor: "pointer",
          color:
            screen === "helpCenter"
              ? "var(--cv-nav-active-text)"
              : "var(--cv-nav-inactive-text)",
          borderBottom:
            screen === "helpCenter"
              ? "3px solid var(--cv-nav-active-border)"
              : "3px solid transparent",
          transition: "color 0.15s, border-color 0.15s",
          minWidth: "56px",
        }}
      >
        <HelpCircle
          size={18}
          className={
            screen === "helpCenter" ? "text-success" : "text-secondary"
          }
        />
        <span
          style={{
            fontSize: "10px",
            fontWeight: screen === "helpCenter" ? 700 : 500,
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          Help
        </span>
      </button>
    </nav>
  );
}

export default MobileNav;
