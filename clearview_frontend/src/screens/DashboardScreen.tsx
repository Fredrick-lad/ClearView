import type { Envelope, Expense, ScreenKey } from "../types";
import TopBar from "../components/layout/Topbar";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import { iconMap } from "../components/ui/iconMap";
import ProgBar from "../hooks/ProgBar";

type Props = {
  envelopes: Envelope[];
  expenses: Expense[];
  totalInc: number;
  totalAlloc: number;
  totalSpent: number;
  unalloc: number;
  setScreen: (s: ScreenKey) => void;
};

// Formats a date string like "2026-06-10T00:00:00.000Z" → "June 10, 2026"
function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardScreen(_: Props) {
  const { setModal } = GetData();
  const { incomeSource, envelopeData, expenses, userData } = useAuth();

  // --- Derived totals ---
  const totalIncome: number = Array.isArray(incomeSource)
    ? incomeSource.reduce(
        (sum: number, inc: any) => sum + Number(inc.total_amount ?? 0),
        0,
      )
    : 0;

  const totalSpent: number = Array.isArray(envelopeData)
    ? envelopeData.reduce(
        (sum: number, env: any) => sum + Number(env.current_spend ?? 0),
        0,
      )
    : 0;

  const totalBudgeted: number = Array.isArray(envelopeData)
    ? envelopeData.reduce(
        (sum: number, env: any) => sum + Number(env.monthly_limit ?? 0),
        0,
      )
    : 0;

  const unallocated = totalIncome - totalBudgeted;
  const savingsPct =
    totalIncome > 0
      ? Math.round(((totalIncome - totalSpent) / totalIncome) * 100)
      : 0;

  // --- Summary cards ---
  const summaryCards = [
    {
      title: "Total Income",
      value: `KES ${totalIncome.toLocaleString()}`,
      subtext: `${Array.isArray(incomeSource) ? incomeSource.length : 0} source${Array.isArray(incomeSource) && incomeSource.length !== 1 ? "s" : ""}`,
      textColor: "text-dark",
    },
    {
      title: "Total Budgeted",
      value: `KES ${totalBudgeted.toLocaleString()}`,
      subtext: `Across ${Array.isArray(envelopeData) ? envelopeData.length : 0} envelopes`,
      textColor: "text-dark",
    },
    {
      title: "Total Spent",
      value: `KES ${totalSpent.toLocaleString()}`,
      subtext:
        totalBudgeted > 0
          ? `${Math.round((totalSpent / totalBudgeted) * 100)}% of budget used`
          : "No budget set",
      textColor: totalSpent > totalBudgeted ? "text-danger" : "text-dark",
    },
    {
      title: "Unallocated",
      value: `KES ${unallocated.toLocaleString()}`,
      hasProgressBar: true,
      progressPct: savingsPct,
      subtext: `${savingsPct}% saved`,
      textColor: unallocated < 0 ? "text-danger" : "text-dark",
    },
  ];

  // --- Active envelopes (max 3 shown on dashboard) ---
  const activeEnvelopes = Array.isArray(envelopeData)
    ? envelopeData.slice(0, 3)
    : [];

  // --- Recent transactions (last 4 expenses) ---
  const recentExpenses = Array.isArray(expenses)
    ? expenses.slice(-4).reverse()
    : [];

  // Custom Branding Palette
  const brandColors = {
    primaryDark: "#0a3d34",
    primaryLight: "#e2f2ee",
    insightBg: "#013328",
  };

  return (
    <>
      <div
        className="px-4 p-md-3 mx-auto style-container"
        style={{ maxWidth: "1300px" }}
      >
        <TopBar title="Dashboard" showIncomeBtn showActionBtn showExpenseBtn />

        {/* User Welcome */}
        <div className="mb-4">
          <h3
            className="h1 fw-bold mb-1"
            style={{ fontFamily: "serif", color: brandColors.primaryDark }}
          >
            Hello, {userData?.firstName ?? userData?.username ?? "there"}
          </h3>
          <p className="text-muted small fw-semibold mb-0">
            Here is your financial overview
          </p>
        </div>

        {/* --- SUMMARY CARDS --- */}
        <div className="row g-4 mb-4">
          {summaryCards.map((card, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div
                className="card h-100 p-4 bg-white border-light shadow-sm d-flex flex-column justify-content-between"
                style={{ minHeight: "140px", borderRadius: "12px" }}
              >
                <div>
                  <span
                    className="text-uppercase text-muted fw-bold tracking-wide"
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
                    <p className="text-muted small fw-medium mb-0">
                      {card.subtext}
                    </p>
                  )}
                  {card.hasProgressBar && (
                    <div className="mt-2">
                      <ProgBar pct={card.progressPct ?? 0} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- ENVELOPES & INSIGHTS --- */}
        <div className="row g-4 mb-4">
          {/* Active Envelopes */}
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
                <button
                  className="btn btn-link p-0 text-muted small fw-bold text-decoration-none"
                  onClick={() => {}}
                >
                  View all
                </button>
              </div>

              {activeEnvelopes.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <p className="mb-1">No envelopes yet.</p>
                  <button
                    className="btn btn-sm"
                    style={{ color: brandColors.primaryDark }}
                    onClick={() => setModal("env")}
                  >
                    + Create one
                  </button>
                </div>
              ) : (
                <div className="row g-3">
                  {activeEnvelopes.map((envelope: any, idx: number) => {
                    const limit = Number(envelope.monthly_limit ?? 0);
                    const spent = Number(envelope.current_spend ?? 0);
                    const pct =
                      limit > 0
                        ? Math.min(Math.round((spent / limit) * 100), 100)
                        : 0;
                    const Icon = iconMap[envelope.icon_name] ?? iconMap["Tag"];
                    const topColor =
                      pct >= 90
                        ? "#e74c3c"
                        : pct >= 70
                          ? "#f39c12"
                          : brandColors.primaryDark;

                    return (
                      <div className="col-12 col-md-4" key={idx}>
                        <div
                          className="card h-100 p-3 border-0 d-flex flex-column justify-content-between"
                          style={{
                            minHeight: "176px",
                            borderTop: `4px solid ${topColor}`,
                            backgroundColor: "#f8fafc",
                          }}
                        >
                          {/* Icon + actions */}
                          <div className="d-flex justify-content-between align-items-start">
                            <div
                              className="p-2 bg-white rounded-3 border shadow-sm d-flex align-items-center justify-content-center"
                              style={{ color: brandColors.primaryDark }}
                            >
                              <Icon size={18} />
                            </div>
                            <div className="d-flex gap-1 text-secondary">
                              <button
                                className="btn btn-link p-1 text-secondary border-0"
                                onClick={() => setModal("edit")}
                                title="Edit"
                              >
                                <svg
                                  style={{ width: 14, height: 14 }}
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
                              </button>
                              <button
                                className="btn btn-link p-1 text-danger border-0"
                                onClick={() => setModal("del")}
                                title="Delete"
                              >
                                <svg
                                  style={{ width: 14, height: 14 }}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Name + spend */}
                          <div className="mt-3">
                            <h5 className="h6 fw-bold text-dark text-truncate mb-1">
                              {envelope.name}
                            </h5>
                            <p className="text-muted small fw-medium mb-0">
                              <span className="fw-bold text-secondary">
                                KES {spent.toLocaleString()}
                              </span>{" "}
                              / KES {limit.toLocaleString()}
                            </p>
                          </div>

                          {/* Progress bar */}
                          <div className="mt-3">
                            <ProgBar pct={pct} />
                            <div className="text-end mt-1">
                              <span
                                className="text-muted fw-bold"
                                style={{ fontSize: "9px" }}
                              >
                                {pct}% USED
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Smart Insights */}
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
                  className="h6 fw-bold mb-0 text-white"
                  style={{ fontSize: "18px" }}
                >
                  Smart Insights
                </h4>
                <ul
                  className="mt-4 ps-3 opacity-75 small"
                  style={{ lineHeight: "1.8" }}
                >
                  {totalSpent > totalBudgeted ? (
                    <li>
                      You've exceeded your total budget by KES{" "}
                      {(totalSpent - totalBudgeted).toLocaleString()}.
                    </li>
                  ) : (
                    <li>
                      You've used{" "}
                      {totalBudgeted > 0
                        ? Math.round((totalSpent / totalBudgeted) * 100)
                        : 0}
                      % of your total budget.
                    </li>
                  )}
                  {unallocated > 0 && (
                    <li>
                      KES {unallocated.toLocaleString()} of your income is still
                      unallocated.
                    </li>
                  )}
                  {Array.isArray(envelopeData) &&
                    envelopeData.filter(
                      (e: any) =>
                        e.monthly_limit > 0 &&
                        e.current_spend / e.monthly_limit >= 0.9,
                    ).length > 0 && (
                      <li>
                        {
                          envelopeData.filter(
                            (e: any) =>
                              e.monthly_limit > 0 &&
                              e.current_spend / e.monthly_limit >= 0.9,
                          ).length
                        }{" "}
                        envelope(s) are nearly at their limit.
                      </li>
                    )}
                </ul>
              </div>
              <button
                className="btn btn-outline-light w-100 py-2 border-0 mt-4 fw-bold"
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

        {/* --- RECENT TRANSACTIONS --- */}
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
          </div>

          {recentExpenses.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p className="mb-0">No expenses recorded yet.</p>
              <button
                className="btn btn-sm mt-2"
                style={{ color: brandColors.primaryDark }}
                onClick={() => setModal("exp")}
              >
                + Add your first expense
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-nowrap">
                <thead
                  className="table-light text-uppercase text-muted fw-bold"
                  style={{ fontSize: "11px", letterSpacing: "0.05rem" }}
                >
                  <tr>
                    <th className="py-3 px-4">Envelope</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-end">Amount</th>
                  </tr>
                </thead>
                <tbody
                  className="text-secondary fw-medium"
                  style={{ fontSize: "14px" }}
                >
                  {recentExpenses.map((exp: any, idx: number) => {
                    // Match envelope name by id if possible
                    const matchedEnv = Array.isArray(envelopeData)
                      ? envelopeData.find((e: any) => e.id === exp.envelope_id)
                      : null;
                    const envName =
                      matchedEnv?.name ?? `Envelope #${exp.envelope_id}`;

                    return (
                      <tr key={idx}>
                        <td className="py-3 px-4">
                          <span className="badge bg-light text-muted border px-3 py-2 rounded-pill fw-bold">
                            {envName}
                          </span>
                        </td>
                        <td className="py-3 px-4 fw-bold text-dark">
                          {exp.description || "—"}
                        </td>
                        <td className="py-3 px-4 text-muted fw-normal">
                          {formatDate(exp.expense_date)}
                        </td>
                        <td className="py-3 px-4 text-end fw-bold text-danger">
                          KES {Number(exp.amount).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
