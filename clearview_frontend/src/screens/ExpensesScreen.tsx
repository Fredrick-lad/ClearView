import type { JSX } from "react";
import type { Envelope, Expense, ModalKind } from "../types";
import TopBar from "../components/layout/Topbar";
import PageBackButton from "../components/ui/pageback";

interface Props {
  expenses: Expense[];
  envelopes: Envelope[];
  setModal: (m: ModalKind) => void;
}

export default function ExpensesScreen({ expenses }: Props) {
  const quickFilters = ["This Week", "Last 30 Days", "Custom Range"];

  const transactionHistory = [
    {
      name: "Whole Foods Market",
      envelope: "Groceries",
      date: "Oct 24, 2023",
      time: "04:12 PM",
      amount: "Ksh -142.30",
      icon: "cart",
      iconColor: "bg-success-subtle text-success",
    },
    {
      name: "City Power & Light",
      envelope: "Utilities",
      date: "Oct 22, 2023",
      time: "09:45 AM",
      amount: "Ksh -84.15",
      icon: "lightning",
      iconColor: "bg-info-subtle text-info",
    },
    {
      name: "The Sage Garden Bistro",
      envelope: "Dining Out",
      date: "Oct 21, 2023",
      time: "08:30 PM",
      amount: "Ksh -68.50",
      icon: "utensils",
      iconColor: "bg-success-subtle text-success",
    },
    {
      name: "Shell Gas Station",
      envelope: "Transport",
      date: "Oct 20, 2023",
      time: "11:15 AM",
      amount: "Ksh -52.00",
      icon: "car",
      iconColor: "bg-info-subtle text-info",
    },
    {
      name: "Modern Fitness Club",
      envelope: "Wellness",
      date: "Oct 18, 2023",
      time: "06:00 AM",
      amount: "Ksh -45.00",
      icon: "wellness",
      iconColor: "bg-success-subtle text-success",
    },
  ];

  const spendingBreakdown = [
    { category: "Groceries", amount: "Ksh 1,230.00", progress: "82%" },
    { category: "Rent & Housing", amount: "Ksh 1,500.00", progress: "100%" },
    { category: "Utilities", amount: "Ksh 320.00", progress: "35%" },
  ];

  // Custom Branding Palette
  const brandColors = {
    primaryDark: "#0a3d34",
    primaryLight: "#e2f2ee",
    insightBg: "#013328",
    mainBg: "#f8fafc",
    buttonBg: "#004d40",
  };
  return (
    <>
      <div
        className="px-4 p-md-3 mx-auto style-container"
        style={{ maxWidth: "1300px" }}
      >
        <TopBar title="Expenses" showExpenseBtn />
        {/* Top Summary Cards */}
        <div className="row g-4 mb-5">
          <PageBackButton />
          <div className="col-lg-4">
            <div
              className="card h-100 p-4 border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <span className="text-uppercase text-muted fw-bold small tracking-wider">
                Total Expenses / Month
              </span>
              <p className="h1 fw-bold my-3">Ksh 4,284.50</p>
              <p className="text-danger small fw-bold mb-0 d-flex align-items-center gap-1">
                <IconSwitcher type="trend-up" style={{ width: "14px" }} /> 12%
                from last month
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card h-100 p-4 border-0 shadow-sm"
              style={{
                backgroundColor: brandColors.primaryLight,
                borderRadius: "12px",
              }}
            >
              <span className="text-uppercase text-muted fw-bold small tracking-wider">
                Highest Envelope Usage
              </span>
              <p
                className="h2 fw-bold my-3"
                style={{ color: brandColors.primaryDark }}
              >
                Groceries & Dining
              </p>
              <div className="d-flex justify-content-between small fw-bold text-muted mb-2">
                <span>82% of Budget</span>
                <span className="text-dark">Ksh 1,230 / Ksh 1,500</span>
              </div>
              <div className="progress bg-white" style={{ height: "8px" }}>
                <div
                  className="progress-bar"
                  style={{
                    backgroundColor: brandColors.primaryDark,
                    width: "82%",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card h-100 p-4 border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <span className="text-uppercase text-muted fw-bold small tracking-wider">
                Quick Filters
              </span>
              <div className="d-grid gap-2 mt-3">
                {quickFilters.map((filter) => (
                  <button
                    key={filter}
                    className="btn btn-outline-secondary btn-sm fw-bold text-start px-3 py-2"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table Section */}
        <div
          className="card border-0 shadow-sm mb-5"
          style={{ borderRadius: "12px" }}
        >
          <div className="p-4 d-flex justify-content-between align-items-center">
            <div className="input-group" style={{ maxWidth: "400px" }}>
              <span className="input-group-text bg-white border-end-0 text-muted">
                <IconSwitcher type="search" style={{ width: "18px" }} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search transactions..."
              />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm fw-bold px-3 d-flex align-items-center gap-2">
                <IconSwitcher type="filter" style={{ width: "16px" }} /> Filter
              </button>
              <button className="btn btn-outline-secondary btn-sm fw-bold px-3 d-flex align-items-center gap-2">
                <IconSwitcher type="export" style={{ width: "16px" }} /> Export
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead
                className="table-light text-uppercase text-muted fw-bold"
                style={{ fontSize: "11px" }}
              >
                <tr>
                  <th className="ps-4 py-3">Transaction Name</th>
                  <th className="py-3">Envelope</th>
                  <th className="py-3">Date & Time</th>
                  <th className="py-3">Amount</th>
                  <th className="pe-4 py-3 text-end"></th>
                </tr>
              </thead>
              <tbody
                className="align-middle fw-medium"
                style={{ fontSize: "14px" }}
              >
                {transactionHistory.map((t, idx) => (
                  <tr key={idx}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className={`p-2 rounded-3 ${t.iconColor}`}>
                          <IconSwitcher
                            type={t.icon}
                            style={{ width: "1.25rem" }}
                          />
                        </div>
                        <span className="fw-bold text-dark">{t.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-muted border px-3 py-2 rounded-pill fw-bold">
                        {t.envelope}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">{t.date}</span>
                        <span
                          className="text-muted"
                          style={{ fontSize: "11px" }}
                        >
                          {t.time}
                        </span>
                      </div>
                    </td>
                    <td className="fw-bold text-danger">{t.amount}</td>
                    <td className="pe-4 text-end">
                      <IconSwitcher
                        type="more"
                        className="text-muted"
                        style={{ width: "18px", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 d-flex justify-content-between align-items-center border-top">
            <span className="small text-muted">
              Showing 1 to 5 of 42 transactions
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <span className="page-link">&lt;</span>
                </li>
                <li className="page-item active">
                  <span
                    className="page-link"
                    style={{
                      backgroundColor: brandColors.primaryDark,
                      borderColor: brandColors.primaryDark,
                    }}
                  >
                    1
                  </span>
                </li>
                <li className="page-item">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <span className="page-link">3</span>
                </li>
                <li className="page-item">
                  <span className="page-link">&gt;</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div
              className="card p-4 border-0 shadow-sm h-100"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <h4 className="h5 fw-bold mb-1">Spending Breakdown</h4>
                  <p className="small text-muted mb-0">
                    Top 5 categories for October
                  </p>
                </div>
                <a
                  href="#report"
                  className="text-dark fw-bold small text-decoration-none"
                >
                  View Report
                </a>
              </div>
              <div className="d-grid gap-4 mt-2">
                {spendingBreakdown.map((item) => (
                  <div key={item.category}>
                    <div className="d-flex justify-content-between mb-2 small fw-bold">
                      <span>{item.category}</span>
                      <span className="text-muted">{item.amount}</span>
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar"
                        style={{
                          backgroundColor: brandColors.primaryDark,
                          width: item.progress,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card p-4 border-0 shadow-sm h-100 text-white text-center d-flex flex-column justify-content-between"
              style={{
                backgroundColor: brandColors.insightBg,
                borderRadius: "12px",
              }}
            >
              <div className="text-start">
                <h4 className="h5 fw-bold mb-3">Premium Insights</h4>
                <p className="small opacity-75">
                  You've saved 15% more this month compared to your typical
                  spending patterns. Keep it up!
                </p>
              </div>
              <div
                className="my-3 bg-white bg-opacity-10 rounded p-3 d-flex align-items-center justify-content-center"
                style={{ minHeight: "100px" }}
              >
                {/* Placeholder for the chart image seen in screen.png */}
                <IconSwitcher
                  type="chart-placeholder"
                  style={{ width: "100%", opacity: 0.5 }}
                />
              </div>
              <button
                className="btn btn-light w-100 fw-bold py-2"
                style={{ borderRadius: "6px" }}
              >
                Unlock Deep Analysis
              </button>
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
  // SVG paths simplified for the TSX
  const paths: Record<string, JSX.Element> = {
    dashboard: (
      <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    ),
    envelope: (
      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l9 6 9-6" />
    ),
    expense: (
      <path d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
    ),
    income: (
      <path d="M15 13l-3 3m0 0l-3-3m3 3V8m0-3a9 9 0 110 18 9 9 0 010-18z" />
    ),
    report: (
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2h2a2 2 0 002-2z" />
    ),
    settings: (
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    ),
    logout: (
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    ),
    bell: (
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.003 6.003 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    ),
    profile: (
      <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    cart: (
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
    lightning: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
    utensils: (
      <path d="M12 19l9 2m-9-2v-6a3 3 0 00-3-3H4m6 9l-9 2m9-2v-6a3 3 0 013-3h7M7 5V3m4 2V3M3 5V3" />
    ),
    car: (
      <path d="M5 10h14l1 3v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-6l1-3zM21 7l-2-4H5L3 7" />
    ),
    wellness: (
      <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 0c.34 0 .674.017 1 .05M12 3c-3.517 0-6.799 1.009-9.571 2.753m0 0A10.015 10.015 0 0112 3m0 0a10.011 10.011 0 019.571 5.247" />
    ),
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    filter: (
      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    ),
    export: (
      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    ),
    trend_up: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    more: (
      <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    ),
    "chart-placeholder": (
      <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    ),
  };

  return (
    <svg
      className={className}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {paths[type] || null}
    </svg>
  );
}
