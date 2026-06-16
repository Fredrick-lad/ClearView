import React from "react";
import TopBar from "../components/layout/Topbar";
import { GetData } from "../hooks/context/generalContext";
// --- EASY-TO-READ MOCK DATA ---

const totalMetrics = [
  {
    title: "Total Budgeted",
    value: "Ksh 4,250.00",
    valueColor: "text-dark",
  },
  {
    title: "Total Spent",
    value: "Ksh 2,145.50",
    valueColor: "text-dark",
  },
  {
    title: "Remaining",
    value: "Ksh 2,104.50",
    valueColor: "text-teal", // Custom brand teal color
  },
];

const envelopesList = [
  {
    title: "Food",
    icon: "utensils",
    spent: "Ksh 450.00",
    limit: "Ksh 800.00",
    percentage: "56%",
    statusText: "56% of monthly budget used",
    statusColor: "text-muted",
    progressColor: "#013328", // Dark Green
  },
  {
    title: "Transport",
    icon: "car",
    spent: "Ksh 120.00",
    limit: "Ksh 300.00",
    percentage: "40%",
    statusText: "40% of monthly budget used",
    statusColor: "text-muted",
    progressColor: "#013328", // Dark Green
  },
  {
    title: "Rent",
    icon: "home",
    spent: "Ksh 1,200.00",
    limit: "ksh 1,200.00",
    percentage: "100%",
    statusText: "Monthly budget limit reached",
    statusColor: "text-danger fw-bold",
    progressColor: "#dc3545", // Danger Red
  },
  {
    title: "Entertainment",
    icon: "film",
    spent: "Ksh 85.50",
    limit: "Ksh 200.00",
    percentage: "42%",
    statusText: "42% of monthly budget used",
    statusColor: "text-muted",
    progressColor: "#013328", // Dark Green
  },
  {
    title: "Shopping",
    icon: "shopping-bag",
    spent: "Ksh 340.00",
    limit: "Ksh 400.00",
    percentage: "85%",
    statusText: "85% - Approaching limit",
    statusColor: "text-muted",
    progressColor: "#20c997", // Approaching Teal/Green
  },
  {
    title: "Utilities",
    icon: "lightning",
    spent: "Ksh 0.00",
    limit: "Ksh 250.00",
    percentage: "0%",
    statusText: "No spending recorded yet",
    statusColor: "text-muted",
    progressColor: "#013328", // Dark Green
  },
];

const designTokens = {
  mainBg: "#f8fafc",
  cardBg: "#daf5ee", // Soft sage/mint tint matching screen_6.png
  textTeal: "#10b981",
  primaryDark: "#0a3d34",
};

export default function MyEnvelopes() {
  const { setModal } = GetData();
  return (
    <>
      <div
        className="px-4 p-md-3 mx-auto bg-ui-bg"
        style={{ maxWidth: "1300px" }}
      >
        {/* --- PAGE HEADER --- */}
        <TopBar title="My Envelopes" showActionBtn />

        {/* --- TOP ROW: SUMMARY METRIC MATRIX --- */}
        <div className="row g-4 mb-5">
          {totalMetrics.map((metric, idx) => (
            <div className="col-12 col-md-4" key={idx}>
              <div
                className="card h-100 p-4 border-0 shadow-sm bg-white"
                style={{ borderRadius: "12px" }}
              >
                <span
                  className="text-uppercase text-muted fw-bold small tracking-wider"
                  style={{ fontSize: "11px" }}
                >
                  {metric.title}
                </span>
                <p
                  className={`h2 fw-bold mt-2 mb-0 ${metric.valueColor === "text-teal" ? "" : metric.valueColor}`}
                  style={{
                    fontFamily: "sans-serif",
                    color:
                      metric.valueColor === "text-teal"
                        ? designTokens.textTeal
                        : undefined,
                  }}
                >
                  {metric.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- ENVELOPES GRID DISPLAY --- */}
        <div className="row g-4">
          {envelopesList.map((envelope, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={idx}>
              <div
                className="card p-4 border-0 h-100 d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: designTokens.cardBg,
                  borderRadius: "12px",
                }}
              >
                {/* Card Header Content */}
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="p-2 text-white rounded-3 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "#013328" }}
                      >
                        <IconSwitcher
                          type={envelope.icon}
                          style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                      </div>
                      <h3
                        className="h5 fw-bold text-dark mb-0"
                        style={{ fontFamily: "serif" }}
                      >
                        {envelope.title}
                      </h3>
                    </div>

                    {/* Action Management Buttons */}
                    <div className="d-flex gap-1.5">
                      <button
                        className="btn btn-sm btn-light bg-white border border-secondary border-opacity-20 p-1.5 d-flex align-items-center justify-content-center rounded-1"
                        style={{ width: "28px", height: "28px" }}
                        onClick={() => setModal("edit")}
                      >
                        <IconSwitcher
                          type="pencil"
                          style={{ width: "14px", height: "14px" }}
                          className="text-dark"
                        />
                      </button>
                      <button
                        className="btn btn-sm btn-light bg-white border border-secondary border-opacity-20 p-1.5 d-flex align-items-center justify-content-center rounded-1"
                        style={{ width: "28px", height: "28px" }}
                        onClick={() => setModal("del")}
                      >
                        <IconSwitcher
                          type="trash"
                          style={{ width: "14px", height: "14px" }}
                          className="text-dark"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Pricing / Budget Layout Fields */}
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <div>
                      <span
                        className="text-uppercase text-muted fw-bold d-block"
                        style={{ fontSize: "10px", letterSpacing: "0.03rem" }}
                      >
                        Spent
                      </span>
                      <span className="fw-bold text-dark h6 mb-0">
                        {envelope.spent}
                      </span>
                    </div>
                    <div className="text-end">
                      <span
                        className="text-uppercase text-muted fw-bold small"
                        style={{ fontSize: "10px", letterSpacing: "0.03rem" }}
                      >
                        Limit{" "}
                      </span>
                      <span className="fw-bold text-secondary small">
                        {envelope.limit}
                      </span>
                    </div>
                  </div>

                  {/* Progress Tracking Slider Subsystem */}
                  <div
                    className="progress bg-white bg-opacity-50 mb-3"
                    style={{ height: "7px", borderRadius: "4px" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: envelope.percentage,
                        backgroundColor: envelope.progressColor,
                        borderRadius: "4px",
                      }}
                      aria-valuenow={parseFloat(envelope.percentage)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>

                {/* Status Context Footer Block */}
                <div className="mt-1">
                  <span
                    className={`small ${envelope.statusColor}`}
                    style={{ fontSize: "12px" }}
                  >
                    {envelope.statusText}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// --- ICON UTILITY SWITCHER COMPONENT ---
interface IconSwitcherProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}
function IconSwitcher({ type, style, className }: IconSwitcherProps) {
  // Clean conditional router using cases instead of dictionary instantiation
  const renderIconPath = () => {
    switch (type) {
      case "utensils":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2m-9-2v-6a3 3 0 00-3-3H4m6 9l-9 2m9-2v-6a3 3 0 013-3h7M7 5V3m4 2V3M3 5V3"
          />
        );

      case "car":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10h14l1 3v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-6l1-3zM21 7l-2-4H5L3 7"
          />
        );

      case "home":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        );

      case "film":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h18M3 16h18M3 12h18M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
          />
        );

      case "shopping-bag":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        );

      case "lightning":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        );

      case "pencil":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        );

      case "trash":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        );

      case "trend-up":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        );

      case "filter":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        );

      case "search":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        );

      default:
        // Graceful safety fallback if a mismatched string type gets passed through props
        return null;
    }
  };

  return (
    <svg
      className={className}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {renderIconPath()}
    </svg>
  );
}
