import type { Envelope, Expense, ScreenKey } from "../types";
import TopBar from "../components/layout/Topbar";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";

type Props = {
  envelopes: Envelope[];
  expenses: Expense[];
  totalInc: number;
  totalAlloc: number;
  totalSpent: number;
  unalloc: number;
  setScreen: (s: ScreenKey) => void;
};

export default function DashboardScreen(_: Props) {
  const { setModal } = GetData();
  const { incomeSource } = useAuth();
  let total = 0;
  incomeSource.map((income: any) => {
    total += Number(income.total_amount);
    console.log(total);
  });

  const summaryCards = [
    {
      title: "Total Balance",
      value: "Ksh " + total,
      subtext: "2.4% vs last mo",
      isTrendUp: true,
      textColor: "text-dark",
    },
    {
      title: "Monthly Income",
      value: "Ksh 60,000",
      subtext: "Salary & Freelance",
      textColor: "text-dark",
    },
    {
      title: "Monthly Expenses",
      value: "Ksh 18,240",
      subtext: "32% of budget used",
      textColor: "text-danger",
    },
    {
      title: "Untouched Amount",
      value: "Ksh 41,760",
      hasProgressBar: true,
      textColor: "text-dark",
    },
  ];

  const activeEnvelopes = [
    {
      id: 1,
      title: "Groceries & Dining",
      spent: "Ksh 3,000",
      total: "15,000",
      percentage: "20% USED",
      progressWidth: "20%",
      topBorderColor: "#059669", // emerald-600
      icon: "utensils",
      showDelete: true,
    },
    {
      id: 2,
      title: "Fuel & Transport",
      spent: "Ksh 1,200",
      total: "5,000",
      percentage: "24% USED",
      progressWidth: "24%",
      topBorderColor: "#115e59", // teal-800
      icon: "car",
      showDelete: false,
    },
    {
      id: 3,
      title: "Movies & Outings",
      spent: "Ksh 500",
      total: "4,000",
      percentage: "12.5% USED",
      progressWidth: "12.5%",
      topBorderColor: "#34d399", // emerald-400
      icon: "film",
      showDelete: false,
    },
  ];

  const recentTransactions = [
    {
      date: "June 14, 2026",
      merchant: "Starbucks Coffee",
      category: "Dining Out",
      amount: "Ksh 450.00",
      badgeClass: "bg-success-subtle text-success",
    },
    {
      date: "June 13, 2026",
      merchant: "Shell Fuel Station",
      category: "Transport",
      amount: "Ksh3,200.00",
      badgeClass: "bg-info-subtle text-info",
    },
    {
      date: "June 12, 2026",
      merchant: "Naivas Supermarket",
      category: "Groceries",
      amount: "Ksh 1,840.00",
      badgeClass: "bg-success-subtle text-success",
    },
    {
      date: "June 10, 2026",
      merchant: "Netflix Subscription",
      category: "Entertainment",
      amount: "Ksh 1,100.00",
      badgeClass: "bg-success-subtle text-success",
    },
  ];

  // Custom Branding Palette configuration
  const brandColors = {
    primaryDark: "#0a3d34",
    primaryLight: "#e2f2ee",
    insightBg: "#013328",
    mainBg: "#f8fafc",
    buttonBg: "#004d40",
  };
  const { userData } = useAuth();

  return (
    <>
      {/* Dashboard Dynamic Matrix Elements */}
      <div
        className="px-4 p-md-3 mx-auto style-container"
        style={{ maxWidth: "1300px" }}
      >
        <TopBar title="Dashboard" showIncomeBtn showActionBtn showExpenseBtn />
        {/* User Welcome Block Area */}
        <div className="mb-4">
          <h3
            className="h1 fw-bold mb-1"
            style={{ fontFamily: "serif", color: brandColors.primaryDark }}
          >
            Hello {userData?.firstName}
          </h3>
          <p className="text-muted small fw-semibold mb-0">
            Here is your financial overview for June 2026
          </p>
        </div>

        {/* --- TOP MATRIX FOUR SUMMARY CARDS --- */}
        <div className="row g-4 mb-4">
          {summaryCards.map((card, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div
                className="card h-100 p-4 bg-white border-light shadow-sm d-flex flex-column justify-content-between"
                style={{ minHeight: "140px", borderRadius: "12px" }}
              >
                <div>
                  <span
                    className="text-uppercase text-muted fw-bold tracking-wide style-title"
                    style={{ fontSize: "11px", letterSpacing: "0.02rem" }}
                  >
                    {card.title}
                  </span>
                  <p className={`h3 fw-bold mt-2 mb-0 ${card.textColor}`}>
                    {card.value}
                  </p>
                </div>

                <div className="mt-3">
                  {card.subtext && (
                    <p className="text-muted small fw-medium mb-0 d-flex align-items-center gap-1">
                      {card.isTrendUp && (
                        <svg
                          className="text-success"
                          style={{ width: "14px", height: "14px" }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      )}
                      <span
                        className={card.isTrendUp ? "text-success fw-bold" : ""}
                      >
                        {card.subtext.split(" vs")[0]}
                      </span>
                      {card.subtext.includes("vs") &&
                        ` vs ${card.subtext.split("vs ")[1]}`}
                    </p>
                  )}
                  {card.hasProgressBar && (
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow={66}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- INTERMEDIATE: ENVELOPES & INSIGHTS PANELS --- */}
        <div className="row g-4 mb-4">
          {/* Active Envelopes Segment Grid */}
          <div className="col-12 col-lg-8">
            <div
              className="card h-100 p-4 bg-white border-light shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4
                  className="h6 fw-bold mb-0"
                  style={{ color: brandColors.primaryDark, fontSize: "18px" }}
                >
                  Active Envelopes
                </h4>
                <a
                  href="#view-all"
                  className="text-decoration-none text-muted small fw-bold"
                >
                  View all
                </a>
              </div>

              <div className="row g-3">
                {activeEnvelopes.map((envelope) => (
                  <div className="col-12 col-md-4" key={envelope.id}>
                    <div
                      className="card h-100 p-3 border-0 bg-ui-bg d-flex flex-column justify-content-between"
                      style={{
                        minHeight: "176px",
                        borderTop: `4px solid ${envelope.topBorderColor}`,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      {/* Upper Controls Icons Action Row */}
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="p-2 bg-white rounded-3 border shadow-sm text-dark d-flex align-items-center justify-content-center">
                          <IconSwitcher
                            type={envelope.icon}
                            style={{ width: "1.25rem", height: "1.25rem" }}
                          />
                        </div>
                        <div className="d-flex gap-1 text-secondary">
                          <button
                            className="btn btn-link p-1 text-secondary bg-white-hover rounded border-0"
                            onClick={() => setModal("edit")}
                          >
                            <IconSwitcher
                              type="edit"
                              style={{ width: "14px", height: "14px" }}
                            />
                          </button>
                          {envelope.showDelete && (
                            <button
                              className="btn btn-link p-1 text-danger bg-white-hover rounded border-0"
                              onClick={() => setModal("del")}
                            >
                              <IconSwitcher
                                type="delete"
                                style={{ width: "14px", height: "14px" }}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Middle Info Metrics Section Data */}
                      <div className="mt-3">
                        <h5 className="h6 fw-bold text-dark text-truncate mb-1">
                          {envelope.title}
                        </h5>
                        <p className="text-muted small fw-medium mb-0">
                          <span className="fw-bold text-secondary">
                            {envelope.spent}
                          </span>{" "}
                          / {envelope.total}
                        </p>
                      </div>

                      {/* Component Progression Bar indicator */}
                      <div className="mt-3">
                        <div
                          className="progress bg-white border"
                          style={{ height: "6px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: envelope.progressWidth,
                              backgroundColor: brandColors.primaryDark,
                            }}
                            aria-valuenow={parseFloat(envelope.progressWidth)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <div className="text-end mt-1">
                          <span
                            className="text-muted fw-bold tracking-wider"
                            style={{ fontSize: "9px" }}
                          >
                            {envelope.percentage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart Insights Analytics Display Widget Container */}
          <div className="col-12 col-lg-4">
            <div
              className="card h-100 p-4 border-0 text-white d-flex flex-column justify-content-between"
              style={{
                backgroundColor: brandColors.insightBg,
                borderRadius: "12px",
              }}
            >
              <div>
                <h4
                  className="h6 fw-bold mb-0 text-white tracking-wide"
                  style={{ fontSize: "18px" }}
                >
                  Smart Insights
                </h4>
                <p
                  className="opacity-75 small leading-relaxed mt-4 fw-medium"
                  style={{ fontSize: "14px", lineHeight: "1.6" }}
                >
                  You've saved 10% more this month compared to June 2025. You're
                  on track to reach your Vacation goal by December!
                </p>
              </div>

              <button
                className="btn btn-outline-light w-100 py-2 border-0 mt-4 fw-bold tracking-wide"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  fontSize: "13px",
                }}
              >
                View Detailed Report
              </button>
            </div>
          </div>
        </div>

        {/* --- TERMINAL BOTTOM TRANSITIONS DATA TABLE --- */}
        <div
          className="card bg-white border-light shadow-sm overflow-hidden"
          style={{ borderRadius: "12px" }}
        >
          <div className="p-4 d-flex align-items-center justify-content-between border-bottom">
            <h4
              className="h6 fw-bold mb-0"
              style={{ color: brandColors.primaryDark, fontSize: "18px" }}
            >
              Recent Transactions
            </h4>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-link p-0 text-decoration-none text-muted small fw-bold d-flex align-items-center gap-1">
                <IconSwitcher
                  type="filter"
                  style={{ width: "16px", height: "16px" }}
                />
                Filter
              </button>
              <a
                href="#view-transactions"
                className="text-decoration-none text-muted small fw-bold"
              >
                View all
              </a>
            </div>
          </div>

          {/* Structured Borderless Table Matrix Data */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-nowrap">
              <thead
                className="table-light text-uppercase text-muted fw-bold"
                style={{ fontSize: "11px", letterSpacing: "0.05rem" }}
              >
                <tr>
                  <th className="py-3 px-4 font-weight-bold">Date</th>
                  <th className="py-3 px-4 font-weight-bold">Merchant</th>
                  <th className="py-3 px-4 font-weight-bold">Category</th>
                  <th className="py-3 px-4 text-end font-weight-bold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody
                className="text-secondary fw-medium"
                style={{ fontSize: "14px" }}
              >
                {recentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 text-muted fw-normal">
                      {transaction.date}
                    </td>
                    <td className="py-3 px-4 fw-bold text-dark">
                      {transaction.merchant}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`badge px-2.5 py-1.5 fw-semibold ${transaction.badgeClass}`}
                        style={{ fontSize: "12px" }}
                      >
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end fw-bold text-dark">
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function IconSwitcher({
  type,
  style,
}: {
  type: string;
  style?: React.CSSProperties;
}) {
  switch (type) {
    case "dashboard":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      );
    case "envelope":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l9 6 9-6"
          />
        </svg>
      );
    case "expense":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
      );
    case "income":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13l-3 3m0 0l-3-3m3 3V8m0-3a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
      );
    case "report":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2h2a2 2 0 002-2z"
          />
        </svg>
      );
    case "settings":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    case "logout":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      );
    case "bell":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.003 6.003 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      );
    case "profile":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "utensils":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19l9 2m-9-2v-6a3 3 0 00-3-3H4m6 9l-9 2m9-2v-6a3 3 0 013-3h7M7 5V3m4 2V3M3 5V3"
          />
        </svg>
      );
    case "car":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 10h14l1 3v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-6l1-3zM21 7l-2-4H5L3 7m4 6a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
      );
    case "film":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
          />
        </svg>
      );
    case "edit":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      );
    case "delete":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-14v4M1 7h22M10 11v6"
          />
        </svg>
      );
    case "filter":
      return (
        <svg
          style={style}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      );
    default:
      return null;
  }
}
