import React from "react";
import { GetData } from "../../hooks/context/generalContext";

interface TopBarProps {
  title: string;
  showActionBtn?: boolean;
  actionBtnText?: string;
  onActionClick?: () => void;
  showExpenseBtn?: boolean;
  onExpenseClick?: () => void;
  showIncomeBtn?: boolean;
  onIncomeClick?: () => void;
  showHelpIcon?: boolean;
  avatarUrl?: string;
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
    <div className="d-flex justify-content-between align-items-center py-2 py-md-3 z-2 sticky-top bg-ui-bg">
      {/* PAGE TITLE */}
      <h1 className="h5 h-sm-4 fw-bold mb-0 text-dark" style={{ fontFamily: "serif" }}>
        {title}
      </h1>

      {/* UTILITIES & ACTIONS - action buttons hidden on mobile/tablet (handled by FAB), bell + profile always visible */}
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <div className="d-none d-lg-flex align-items-center gap-2">
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

          {(showActionBtn || showExpenseBtn || showIncomeBtn) && (
            <div
              className="vr mx-1 text-secondary opacity-25"
              style={{ height: "auto" }}
            ></div>
          )}
        </div>

        <button
          className="btn p-1 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100"
          onClick={() => setScreen("Notifications")}
        >
          <TopBarIconSwitcher
            type="bell"
            style={{ width: "20px", height: "20px" }}
          />
        </button>

        {showHelpIcon && (
          <button className="btn p-1 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100">
            <TopBarIconSwitcher
              type="help-circle"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        )}

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
