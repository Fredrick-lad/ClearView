import React, { useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { GetData } from "../../hooks/context/generalContext";
import { LogOut } from "lucide-react";

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
  const { setModal, screen, setScreen } = GetData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleAction = (callback?: () => void, modalType?: string) => {
    if (callback) {
      callback();
    } else if (modalType) {
      setModal(modalType);
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (screenName: string) => {
    setScreen(screenName);
    setIsMenuOpen(false);
  };

  return (
    <div className="z-2 sticky-top bg-ui-bg mb-4">
      <div className="d-flex justify-content-between align-items-center py-2 py-md-3 shadow-sm px-3">
        {/* PAGE TITLE + OPTIONAL BACK BUTTON */}
        <h1
          className="h5 fw-bold mb-0 text-dark d-flex align-items-center gap-2"
          style={{ fontFamily: "serif" }}
        >
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="btn d-inline-flex align-items-center justify-content-center border-0 p-0"
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
                e.currentTarget.style.backgroundColor =
                  "var(--cv-primary-dark, #38796d)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--cv-nav-active-bg, #e8f4f0)";
                e.currentTarget.style.color = "var(--cv-primary-dark, #0a3d34)";
              }}
              aria-label="Go back"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
            </button>
          )}
          {title}
        </h1>

        {/* HAMBURGER BUTTON */}
        <button
          type="button"
          className="btn p-2 text-dark border-0 d-flex align-items-center justify-content-center opacity-75 hover-opacity-100"
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* OFFCANVAS HAMBURGER MENU DRAWER */}
      {isMenuOpen && (
        <div
          className="offcanvas offcanvas-end show"
          tabIndex={-1}
          style={{ visibility: "visible" }}
        >
          <div className="offcanvas-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="offcanvas-title fw-bold mb-0">Menu</h5>
            <button
              type="button"
              className="btn p-1 border-0"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="offcanvas-body d-flex flex-column gap-3">
            {/* Quick Action Buttons */}
            {(showIncomeBtn || showExpenseBtn || showActionBtn) && (
              <div className="d-flex flex-column gap-2 pb-3 border-bottom">
                <span className="text-muted small fw-bold uppercase">
                  Quick Actions
                </span>

                {showIncomeBtn && (
                  <button
                    type="button"
                    className="btn fw-bold btn-sm text-start bg-transparent"
                    style={{
                      color: "var(--cv-insight-bg)",
                      border: "1px solid var(--cv-insight-bg)",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleAction(onIncomeClick, "inc")}
                  >
                    <span className="me-2">↓</span> Add Income
                  </button>
                )}

                {showExpenseBtn && (
                  <button
                    type="button"
                    className="btn text-white fw-bold btn-sm border-0 text-start"
                    style={{
                      backgroundColor: "var(--cv-insight-bg)",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleAction(onExpenseClick, "exp")}
                  >
                    <span className="me-2">+</span> Add Expense
                  </button>
                )}

                {showActionBtn && (
                  <button
                    type="button"
                    className="btn text-white fw-bold btn-sm border-0 text-start"
                    style={{
                      backgroundColor: "var(--cv-insight-bg)",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleAction(onActionClick, "env")}
                  >
                    {actionBtnText}
                  </button>
                )}
              </div>
            )}

            {/* Navigation Options */}
            <div className="d-flex flex-column gap-1">
              <button
                className="btn text-start p-2 d-flex align-items-center gap-3 hover-bg-light rounded"
                onClick={() => handleNavigation("Notifications")}
              >
                <TopBarIconSwitcher
                  type="bell"
                  style={{ width: "20px", height: "20px" }}
                />
                <span>Notifications</span>
              </button>

              {(showHelpIcon || true) && (
                <button
                  className="btn text-start p-2 d-flex align-items-center gap-3 hover-bg-light rounded"
                  onClick={() => handleNavigation("helpCenter")}
                >
                  <TopBarIconSwitcher
                    type="help-circle"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span>Help Center</span>
                </button>
              )}

              <button
                className="btn text-start p-2 d-flex align-items-center gap-3 hover-bg-light rounded"
                onClick={() => handleNavigation("settings")}
              >
                <TopBarIconSwitcher
                  type="settings"
                  style={{ width: "20px", height: "20px" }}
                />
                <span>Settings</span>
              </button>

              <button
                className="btn text-start p-2 d-flex align-items-center gap-3 hover-bg-light rounded"
                onClick={() => handleNavigation("Profile")}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User Profile"
                    className="rounded-circle"
                    style={{
                      width: "22px",
                      height: "22px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <TopBarIconSwitcher
                    type="user-outline"
                    style={{ width: "20px", height: "20px" }}
                  />
                )}
                <span>Profile</span>
              </button>
              <button
                onClick={() => setScreen("logout")}
                className="btn text-white d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2 border-0 shadow-none"
                style={{
                  backgroundColor:"#dc2626",
                  padding: "6px 12px",
                  cursor: "pointer",
                  color:
                    screen === "logout"
                      ? "var(--cv-nav-active-text)"
                      : "var(--cv-nav-inactive-text)",
                  borderBottom:
                    screen === "logout"
                      ? "3px solid var(--cv-nav-active-border)"
                      : "3px solid transparent",
                  transition: "color 0.15s, border-color 0.15s",
                }}
              >
                <LogOut
                  size={18}
                  color="#fff"
                  className={
                    screen === "logout" ? "text-success" : "text-secondary"
                  }
                />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: screen === "logout" ? 700 : 500,
                    lineHeight: 1.1,
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                    color:"#ffffff"
                  }}
                >
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BACKDROP FOR CLOSING MENU */}
      {isMenuOpen && (
        <div className="offcanvas-backdrop fade show" onClick={toggleMenu} />
      )}
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
