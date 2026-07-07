import React from "react";
import { ArrowLeft } from "lucide-react";
import { GetData } from "../../hooks/context/generalContext";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
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
  showBack = false,
  onBack,
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
      <h1 className="h5 h-sm-4 fw-bold mb-0 text-dark d-flex align-items-center gap-2" style={{ fontFamily: "serif" }}>
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="btn d-inline-flex align-items-center justify-content-center border-0"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "var(--cv-nav-active-bg, #e8f4f0)",
              color: "var(--cv-primary-dark, #0a3d34)",
              cursor: "pointer",
              transition: "background-color 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--cv-primary-dark, #38796d)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--cv-nav-active-bg, #e8f4f0)";
              e.currentTarget.style.color = "var(--cv-primary-dark, #0a3d34)";
            }}
            aria-label="Go back"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
        )}
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
                color: "var(--cv-insight-bg)",
                border: "1px solid var(--cv-insight-bg)",
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
                backgroundColor: "var(--cv-insight-bg)",
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
                backgroundColor: "var(--cv-insight-bg)",
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

        {/* Help (mobile & desktop) */}
        <button
          className="btn p-1 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100"
          onClick={() => setScreen("helpCenter")}
        >
          <TopBarIconSwitcher
            type="help-circle"
            style={{ width: "20px", height: "20px" }}
          />
        </button>

        {/* Settings gear */}
        <div className="ms-1 d-flex align-items-center">
          <button
            className="btn p-1 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100"
            onClick={() => setScreen("settings")}
          >
            <TopBarIconSwitcher
              type="settings"
              style={{ width: "22px", height: "22px" }}
            />
          </button>
        </div>

        {/* User profile */}
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
      case "settings":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
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
