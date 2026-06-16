import type { JSX } from "react";
import TopBar from "../components/layout/Topbar";

export default function ReportsScreen() {
  const summaryMetrics = [
    {
      title: "Net Worth",
      value: "$142,500.00",
      subtext: "+2.4% this month",
      subtextColor: "text-success",
      isTrendUp: true,
      bgClass: "bg-white",
    },
    {
      title: "Total Income",
      value: "$8,420.00",
      subtext: "Past 30 days",
      subtextColor: "text-muted",
      bgClass: "bg-white",
    },
    {
      title: "Total Spending",
      value: "$4,115.30",
      subtext: "12% below budget",
      subtextColor: "text-success",
      isTrendDown: true,
      bgClass: "bg-success-subtle", // Highlighted card matching design
    },
  ];

  const spendingCategories = [
    { name: "Housing", amount: "$1,850", color: "#013328" },
    { name: "Food & Dining", amount: "$1,028", color: "#34d399" },
    { name: "Transport", amount: "$617", color: "#a7f3d0" },
  ];

  const envelopeAllocations = [
    {
      name: "Monthly Rent & Utilities",
      current: "$1,850",
      max: "$2,000",
      percent: "92%",
      color: "#013328",
      icon: "home",
    },
    {
      name: "Groceries",
      current: "$450",
      max: "$600",
      percent: "75%",
      color: "#34d399",
      icon: "utensils",
    },
    {
      name: "Summer Vacation 2024",
      current: "$3,400",
      max: "$5,000",
      percent: "68%",
      color: "#a7f3d0",
      icon: "plane",
    },
  ];

  const unusualActivity = [
    {
      date: "May 14",
      merchant: "Apple Store",
      category: "Electronics",
      amount: "$1,299.00",
    },
    {
      date: "May 12",
      merchant: "Lush Floral",
      category: "Gifts",
      amount: "$85.00",
    },
    {
      date: "May 09",
      merchant: "Aura Spa & Wellness",
      category: "Self-Care",
      amount: "$210.00",
    },
  ];

  // Color palette definitions
  const colors = {
    primaryDark: "#0a3d34",
    accentGreen: "#34d399",
    darkBg: "#013328",
    lightGray: "#f8fafc",
  };
  return (
    <>
      <div
        className="px-4 p-md-3 mx-auto bg-ui-bg"
        style={{ maxWidth: "1200px" }}
      >
        <TopBar title="Financial Reports" />
        {/* --- PAGE SUB-HEADER NAVIGATION --- */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
          <div
            className="d-flex align-items-center gap-3 bg-white p-1 rounded-3 shadow-sm border"
            style={{ fontSize: "13px" }}
          >
            <button
              className="btn btn-sm fw-bold px-3 py-1.5"
              style={{
                backgroundColor: colors.lightGray,
                color: colors.primaryDark,
              }}
            >
              Monthly View
            </button>
            <button className="btn btn-sm fw-medium text-muted px-3 py-1.5 border-0 bg-transparent">
              Annual Summary
            </button>
          </div>
        </div>

        {/* --- TOP MATRIX: SUMMARY CARDS --- */}
        <div className="row g-4 mb-4">
          {summaryMetrics.map((card, i) => (
            <div className="col-12 col-md-6 col-lg-3" key={i}>
              <div
                className={`card h-100 p-4 border-0 shadow-sm ${card.bgClass}`}
                style={{ borderRadius: "12px" }}
              >
                <span
                  className="text-uppercase text-muted fw-bold small tracking-wider"
                  style={{ fontSize: "11px" }}
                >
                  {card.title}
                </span>
                <p className="h3 fw-bold my-2 text-dark">{card.value}</p>
                <span
                  className={`small fw-bold ${card.subtextColor} d-flex align-items-center gap-1`}
                >
                  {card.isTrendUp && "↗"} {card.isTrendDown && "↘"}{" "}
                  {card.subtext}
                </span>
              </div>
            </div>
          ))}

          {/* Savings Rate Card with Inline Indicator */}
          <div className="col-12 col-md-6 col-lg-3">
            <div
              className="card h-100 p-4 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <span
                className="text-uppercase text-muted fw-bold small tracking-wider"
                style={{ fontSize: "11px" }}
              >
                Savings Rate
              </span>
              <p className="h3 fw-bold my-2 text-dark">51.2%</p>
              <div className="progress mt-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar"
                  style={{
                    backgroundColor: colors.primaryDark,
                    width: "51.2%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CASH FLOW TREND LINE CHART VISUALIZATION --- */}
        <div
          className="card border-0 shadow-sm p-4 mb-4"
          style={{ borderRadius: "12px" }}
        >
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h3 className="h6 fw-bold mb-1">Cash Flow Trend</h3>
              <p className="small text-muted mb-0">
                Comparative analysis of monthly earnings vs expenditure
              </p>
            </div>
            <div className="d-flex gap-3 small fw-bold">
              <span
                className="d-flex align-items-center gap-1.5"
                style={{ color: colors.darkBg }}
              >
                <span
                  className="d-inline-block rounded-circle"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: colors.darkBg,
                  }}
                ></span>{" "}
                Income
              </span>
              <span
                className="d-flex align-items-center gap-1.5"
                style={{ color: colors.accentGreen }}
              >
                <span
                  className="d-inline-block rounded-circle"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: colors.accentGreen,
                  }}
                ></span>{" "}
                Spending
              </span>
            </div>
          </div>

          {/* Scalable SVG Line Graphics Layout */}
          <div
            className="position-relative w-100 pt-2"
            style={{ height: "220px" }}
          >
            <svg
              className="w-100 h-100"
              viewBox="0 0 600 160"
              preserveAspectRatio="none"
            >
              {/* Grid horizontal markers */}
              <line
                x1="0"
                y1="30"
                x2="600"
                y2="30"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="70"
                x2="600"
                y2="70"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="110"
                x2="600"
                y2="110"
                stroke="#f1f5f9"
                strokeWidth="1"
              />

              {/* Income Wavy Path Line */}
              <path
                d="M 10,60 Q 130,10 230,65 T 450,40 T 590,30"
                fill="none"
                stroke={colors.darkBg}
                strokeWidth="2.5"
              />
              <circle cx="230" cy="65" r="3.5" fill={colors.darkBg} />

              {/* Spending Wavy Path Line */}
              <path
                d="M 10,110 Q 125,120 230,95 T 450,110 T 590,110"
                fill="none"
                stroke={colors.accentGreen}
                strokeWidth="2.5"
              />
              <circle cx="230" cy="95" r="3.5" fill={colors.accentGreen} />
            </svg>

            {/* Timeline Horizontal Label Grid Axis */}
            <div
              className="d-flex justify-content-between text-muted mt-2 px-1 fw-semibold"
              style={{ fontSize: "11px" }}
            >
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* --- MIDDLE ROW: CATEGORIES & ALLOCATIONS SPLIT --- */}
        <div className="row g-4 mb-4">
          {/* Left Card: Spending by Category Donut Representation */}
          <div className="col-12 col-lg-5">
            <div
              className="card h-100 p-4 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <h3 className="h6 fw-bold mb-4">Spending by Category</h3>

              {/* Built-in SVG Donut Graphics Box */}
              <div className="d-flex justify-content-center position-relative my-4">
                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 42 42"
                  className="transform-rotate-90"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91"
                    fill="transparent"
                    stroke="#a7f3d0"
                    strokeWidth="4.5"
                    strokeDasharray="100 0"
                    strokeDashoffset="0"
                  ></circle>
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91"
                    fill="transparent"
                    stroke="#34d399"
                    strokeWidth="4.5"
                    strokeDasharray="65 35"
                    strokeDashoffset="100"
                  ></circle>
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91"
                    fill="transparent"
                    stroke="#013328"
                    strokeWidth="4.5"
                    strokeDasharray="40 60"
                    strokeDashoffset="35"
                  ></circle>
                </svg>
                <div className="position-absolute top-50 start-50 translate-middle text-center">
                  <span
                    className="text-uppercase text-muted fw-bold d-block"
                    style={{ fontSize: "10px" }}
                  >
                    Total
                  </span>
                  <span className="fw-bold text-dark h5 mb-0">$4,115</span>
                </div>
              </div>

              {/* Custom Data Key Legending Rows */}
              <div className="d-flex flex-column gap-2 mt-3 pt-2">
                {spendingCategories.map((item, idx) => (
                  <div
                    className="d-flex justify-content-between align-items-center small fw-semibold"
                    key={idx}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="d-inline-block rounded-circle"
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: item.color,
                        }}
                      ></span>
                      <span className="text-secondary">{item.name}</span>
                    </div>
                    <span className="text-dark fw-bold">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Budget Envelopes Progress Lists */}
          <div className="col-12 col-lg-7">
            <div
              className="card h-100 p-4 bg-white border-0 shadow-sm d-flex flex-column justify-content-between"
              style={{ borderRadius: "12px" }}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="h6 fw-bold mb-0">Envelope Allocation</h3>
                  <button
                    className="btn btn-outline-dark btn-sm fw-bold px-3 py-1"
                    style={{ fontSize: "12px", borderRadius: "6px" }}
                  >
                    Adjust Limits
                  </button>
                </div>

                <div className="d-flex flex-column gap-4 mb-4">
                  {envelopeAllocations.map((env, idx) => (
                    <div className="d-flex align-items-start gap-3" key={idx}>
                      <div className="p-2 bg-light text-secondary rounded-3 d-flex align-items-center justify-content-center">
                        <IconSwitcher
                          type={env.icon}
                          style={{ width: "18px", height: "18px" }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between text-dark small fw-bold mb-1">
                          <span>{env.name}</span>
                          <span>
                            {env.current}{" "}
                            <span className="text-muted fw-medium">
                              / {env.max}
                            </span>
                          </span>
                        </div>
                        <div className="progress" style={{ height: "6px" }}>
                          <div
                            className="progress-bar"
                            style={{
                              backgroundColor: env.color,
                              width: env.percent,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banner Inside Allocation Subsystem */}
              <div
                className="p-3 text-white d-flex align-items-center justify-content-between gap-3 mt-2"
                style={{ backgroundColor: colors.darkBg, borderRadius: "10px" }}
              >
                <div style={{ maxWidth: "70%" }}>
                  <h4 className="fw-bold mb-1" style={{ fontSize: "14px" }}>
                    Financial Clarity Found
                  </h4>
                  <p
                    className="mb-0 opacity-75"
                    style={{ fontSize: "11px", lineHeight: "1.4" }}
                  >
                    Your spending on non-essential items decreased by 14%
                    compared to last quarter. You're on track to reach goals
                    early.
                  </p>
                </div>
                <button
                  className="btn btn-light fw-bold text-dark btn-sm px-3 py-2 text-nowrap"
                  style={{ fontSize: "12px", borderRadius: "6px" }}
                >
                  Review Strategy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM MATRIX: UNUSUAL ACTIVITY & MILESTONE BANNER --- */}
        <div className="row g-4">
          {/* Table Column Grid Block */}
          <div className="col-12 col-lg-8">
            <div
              className="card h-100 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="p-4 border-bottom">
                <h3 className="h6 fw-bold mb-0">Unusual Activity</h3>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead
                    className="table-light text-uppercase text-muted fw-bold"
                    style={{ fontSize: "11px" }}
                  >
                    <tr>
                      <th className="ps-4 py-3">Date</th>
                      <th className="py-3">Merchant</th>
                      <th className="py-3">Category</th>
                      <th className="pe-4 py-3 text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody
                    className="fw-medium text-secondary"
                    style={{ fontSize: "13px" }}
                  >
                    {unusualActivity.map((act, idx) => (
                      <tr key={idx}>
                        <td className="ps-4 py-3 text-muted">{act.date}</td>
                        <td className="fw-bold text-dark">{act.merchant}</td>
                        <td>{act.category}</td>
                        <td className="pe-4 text-end fw-bold text-dark">
                          {act.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Milestone Display Dynamic Column Card Block */}
          <div className="col-12 col-lg-4">
            <div
              className="card h-100 p-4 text-white text-center d-flex flex-column justify-content-between position-relative overflow-hidden shadow-sm"
              style={{
                borderRadius: "12px",
                minHeight: "220px",
                background: `linear-gradient(rgba(10,61,52,0.85), rgba(1,35,27,0.95)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80') center/cover`,
              }}
            >
              <div className="pt-2 z-1">
                <span
                  className="text-uppercase tracking-widest opacity-75 d-block mb-1 fw-bold"
                  style={{ fontSize: "10px", letterSpacing: "0.1rem" }}
                >
                  Next Milestone
                </span>
                <h3
                  className="h4 fw-bold px-2 leading-tight"
                  style={{ fontFamily: "serif" }}
                >
                  Retirement Portfolio Goal
                </h3>
              </div>

              <div className="pb-2 z-1">
                <button
                  className="btn btn-light w-100 fw-bold py-2 text-dark border-0"
                  style={{ fontSize: "13px", borderRadius: "8px" }}
                >
                  View Roadmap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function IconSwitcher({
  type,
  style,
  className,
}: {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const paths: Record<string, JSX.Element> = {
    home: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
    utensils: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2m-9-2v-6a3 3 0 00-3-3H4m6 9l-9 2m9-2v-6a3 3 0 013-3h7M7 5V3m4 2V3M3 5V3"
      />
    ),
    plane: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2m-9-2v-6a3 3 0 00-3-3H4m6 9l-9 2m9-2v-6a3 3 0 013-3h7M7 5V3m4 2V3M3 5V3"
      />
    ), // Simplified for view structure representation
  };

  return (
    <svg
      className={className}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {paths[type] || null}
    </svg>
  );
}
