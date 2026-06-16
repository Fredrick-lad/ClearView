import React from "react";
import { GetData } from "../../hooks/context/generalContext";

interface TopBarProps {
  title: string; // e.g., "My Envelopes" or "Dashboard"
  showActionBtn?: boolean; // Displays the primary button (e.g., "New Envelope")
  actionBtnText?: string; // Button label
  onActionClick?: () => void;
  showExpenseBtn?: boolean; // Toggles the "Add Expense" action button
  onExpenseClick?: () => void; // Click handler for the expense option
  showIncomeBtn?: boolean; // NEW: Toggles the "Add Income" action button
  onIncomeClick?: () => void; // NEW: Click handler for the income option
  showHelpIcon?: boolean; // Displays the help circle icon
  avatarUrl?: string; // Renders image avatar if provided, else user outline icon
}

export default function TopBar({
  title,
  showActionBtn = false,
  actionBtnText = "New Envelope",
  onActionClick,
  showExpenseBtn = false,
  onExpenseClick,
  showIncomeBtn = false,
  onIncomeClick,
  showHelpIcon = false,
  avatarUrl,
}: TopBarProps) {
  const { setModal, setScreen } = GetData();

  return (
    <div className="d-flex justify-content-between align-items-center py-3 z-2 sticky-top bg-ui-bg">
      {/* --- LEFT SIDE: PAGE TITLE --- */}
      <h1 className="h4 fw-bold mb-0 text-dark" style={{ fontFamily: "serif" }}>
        {title}
      </h1>

      {/* --- RIGHT SIDE: UTILITIES & ACTIONS --- */}
      <div className="d-flex align-items-center gap-2">
        {/* NEW: Add Income Button (Elegant Outline Style to complement primary actions) */}
        {showIncomeBtn && (
          <button
            type="button"
            className="btn fw-bold btn-sm bg-transparent"
            style={{
              color: "#013328",
              border: "1px solid #013328",
              borderRadius: "4px",
              fontSize: "13px",
            }}
            onClick={onIncomeClick ? onIncomeClick : () => setModal("inc")}
          >
            <span className="me-1">↓</span> Add Income
          </button>
        )}

        {/* Add Expense Button */}
        {showExpenseBtn && (
          <button
            type="button"
            className="btn text-white px-3 py-2 fw-bold btn-sm border-0"
            style={{
              backgroundColor: "#013328",
              borderRadius: "4px",
              fontSize: "13px",
            }}
            onClick={onExpenseClick ? onExpenseClick : () => setModal("exp")}
          >
            <span className="me-1">+</span> Add Expense
          </button>
        )}

        {/* Primary Call to Action Button (e.g., New Envelope) */}
        {showActionBtn && (
          <button
            type="button"
            className="btn text-white px-3 py-2 fw-bold btn-sm border-0"
            style={{
              backgroundColor: "#013328",
              borderRadius: "4px",
              fontSize: "13px",
            }}
            onClick={onActionClick ? onActionClick : () => setModal("env")}
          >
            {actionBtnText}
          </button>
        )}

        {/* Divider Spacer elements shown only if buttons are paired with utility icons */}
        {(showActionBtn || showExpenseBtn || showIncomeBtn) && (
          <div
            className="vr mx-2 text-secondary opacity-25"
            style={{ height: "auto" }}
          ></div>
        )}

        {/* Notification Bell */}
        <button
          className="btn p-1 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100"
          onClick={() => setScreen("Notifications")}
        >
          <TopBarIconSwitcher
            type="bell"
            style={{ width: "20px", height: "20px" }}
          />
        </button>

        {/* Support/Help Link */}
        {showHelpIcon && (
          <button className="btn p-1 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100">
            <TopBarIconSwitcher
              type="help-circle"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        )}

        {/* Profile Avatar Slot */}
        <div className="ms-1 d-flex align-items-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User Account Thumbnail"
              className="rounded-1 border border-secondary border-opacity-20 shadow-sm"
              style={{ width: "32px", height: "32px", objectFit: "cover" }}
            />
          ) : (
            <button
              className="btn p-1 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100"
              onClick={() => setScreen("Profile")}
            >
              <TopBarIconSwitcher
                type="user-outline"
                style={{ width: "22px", height: "22px" }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- TOP BAR ATOMIC SVG ROUTER ---
function TopBarIconSwitcher({
  type,
  style,
}: {
  type: string;
  style?: React.CSSProperties;
}) {
  const getPath = () => {
    switch (type) {
      case "bell":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        );
      case "help-circle":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case "user-outline":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {getPath()}
    </svg>
  );
}
