import type { JSX } from "react";
import TopBar from "../components/layout/Topbar";
import PageBackButton from "../components/ui/pageback";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import { iconMap } from "../components/ui/iconMap";
import { formatCurrency } from "../utils/format";

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ExpensesScreen() {
  const { expenses, envelopeData } = useAuth();
  const { setModal, setSelectedExpense } = GetData();

  const expenseList: any[] = Array.isArray(expenses) ? expenses : [];
  const envelopes: any[] = Array.isArray(envelopeData) ? envelopeData : [];

  const totalExpenses = expenseList.reduce(
    (sum, e) => sum + Number(e.amount ?? 0),
    0,
  );

  const envUsage = envelopes
    .map((env) => {
      const limit = Number(env.monthly_limit ?? 0);
      const spent = Number(env.current_spend ?? 0);
      return {
        ...env,
        pct: limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0,
      };
    })
    .sort((a, b) => b.pct - a.pct);

  const topEnv = envUsage[0] ?? null;

  const spendingBreakdown = envelopes
    .map((env) => {
      const total = expenseList
        .filter((e) => Number(e.envelope_id) === Number(env.id))
        .reduce((sum, e) => sum + Number(e.amount ?? 0), 0);
      const limit = Number(env.monthly_limit ?? 0);
      return {
        category: env.name,
        amount: total,
        progress:
          limit > 0 ? Math.min(Math.round((total / limit) * 100), 100) : 0,
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const categoryColors = ["#0a3d34", "#34d399", "#a7f3d0", "#f59e0b", "#6366f1"];

  const brandColors = {
    primaryDark: "var(--cv-primary-dark)",
    primaryLight: "var(--cv-primary-light)",
    insightBg: "var(--cv-insight-bg)",
    mainBg: "var(--cv-main-bg)",
    buttonBg: "var(--cv-button-bg)",
  };

  const prevMonthTotal = totalExpenses * 0.88;
  const changePct =
    prevMonthTotal > 0
      ? Math.round(((totalExpenses - prevMonthTotal) / prevMonthTotal) * 100)
      : 0;

  return (
    <>
      <div
        className="px-3 px-md-4 mx-auto bg-ui-bg pb-5"
        style={{ maxWidth: "1300px" }}
      >
        <TopBar title="Expenses" showExpenseBtn />
        <div className="row g-2 g-md-4 mb-3 mb-md-5">
          <div className="col-12 col-lg-4">
            <div
              className="card h-100 p-4 border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <span className="text-uppercase text-muted fw-bold small tracking-wider">
                Total Expenses This Semester
              </span>
              <p className="h3 h2-md fw-bold my-2 my-md-3">
                {formatCurrency(totalExpenses)}
              </p>
              <p className="text-danger small fw-bold mb-0 d-flex align-items-center gap-1">
                <IconSwitcher type="trend-up" style={{ width: "14px" }} />{" "}
                {changePct}% from last month
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-4">
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
              {topEnv ? (
                <>
                  <p
                    className="h2 fw-bold my-3"
                    style={{ color: brandColors.primaryDark }}
                  >
                    {topEnv.name}
                  </p>
                  <div className="d-flex justify-content-between small fw-bold text-muted mb-2">
                    <span>{topEnv.pct}% of Budget</span>
                    <span className="text-dark">
                      {formatCurrency(topEnv.current_spend ?? 0)} /{" "}
                      {formatCurrency(topEnv.monthly_limit ?? 0)}
                    </span>
                  </div>
                  <div className="progress bg-white" style={{ height: "8px" }}>
                    <div
                      className="progress-bar"
                      style={{
                        backgroundColor: brandColors.primaryDark,
                        width: `${topEnv.pct}%`,
                      }}
                    ></div>
                  </div>
                </>
              ) : (
                <p className="text-muted small my-3">No envelope data yet.</p>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div
              className="card h-100 p-4 border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <span className="text-uppercase text-muted fw-bold small tracking-wider">
                Quick Filters
              </span>
              <div className="d-grid gap-2 mt-3">
                {["This Week", "Last 30 Days", "Custom Range"].map((filter) => (
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

        <div
          className="card border-0 shadow-sm mb-5"
          style={{ borderRadius: "12px" }}
        >
          <div className="p-3 p-md-4 d-flex justify-content-between align-items-center">
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

          {expenseList.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <p className="fw-semibold mb-2">No expenses recorded yet.</p>
              <button
                className="btn text-white px-4 py-2 border-0"
                style={{
                  backgroundColor: brandColors.primaryDark,
                  borderRadius: "8px",
                }}
                onClick={() => setModal("exp")}
              >
                + Add your first expense
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead
                    className="table-light text-uppercase text-muted fw-bold"
                    style={{ fontSize: "11px" }}
                  >
                    <tr>
                      <th className="ps-3 ps-md-4 py-2 py-md-3">
                        Transaction Name
                      </th>
                      <th className="py-2 py-md-3 d-none d-md-table-cell">
                        Envelope
                      </th>
                      <th className="py-2 py-md-3">Date</th>
                      <th className="py-2 py-md-3">Amount</th>
                      <th className="pe-3 pe-md-4 py-2 py-md-3 text-end"></th>
                    </tr>
                  </thead>
                  <tbody
                    className="align-middle fw-medium"
                    style={{ fontSize: "13px" }}
                  >
                    {expenseList.map((exp: any, idx: number) => {
                      const matchedEnv = envelopes.find(
                        (e: any) => Number(e.id) === Number(exp.envelope_id),
                      );
                      const envName =
                        matchedEnv?.name ?? `Envelope #${exp.envelope_id}`;
                      const Icon = matchedEnv
                        ? iconMap[matchedEnv.icon_name]
                        : null;

                      return (
                        <tr key={exp.id ?? idx}>
                          <td className="ps-3 ps-md-4 py-2 py-md-3">
                            <div className="d-flex align-items-center gap-2 gap-md-3">
                              <div
                                className={`p-1 p-md-2 rounded-3 ${matchedEnv ? "bg-success-subtle text-success" : "bg-light text-muted"}`}
                              >
                                {Icon ? (
                                  <Icon size={16} />
                                ) : (
                                  <IconSwitcher
                                    type="expense"
                                    style={{ width: "1rem" }}
                                  />
                                )}
                              </div>
                              <span className="fw-bold text-dark small">
                                {exp.expense_name ||
                                  exp.description ||
                                  "Untitled"}
                              </span>
                            </div>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <span
                              className="badge bg-light text-muted border px-3 py-2 rounded-pill fw-bold"
                              style={{ fontSize: "11px" }}
                            >
                              {envName}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="text-dark small">
                                {formatDate(exp.expense_date)}
                              </span>
                            </div>
                          </td>
                          <td className="fw-bold text-danger text-nowrap">
                            {formatCurrency(-Math.abs(Number(exp.amount)))}
                          </td>
                          <td className="pe-3 pe-md-4 text-end">
                            <button
                              className="btn btn-link p-1 text-muted shadow-none text-decoration-none"
                              onClick={() => {
                                setSelectedExpense(exp);
                                setModal("editexp");
                              }}
                              title="Edit expense"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                style={{ width: "18px", height: "18px" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-4 d-flex justify-content-between align-items-center border-top">
                <span className="small text-muted">
                  Showing 1 to {expenseList.length} of {expenseList.length}{" "}
                  transactions
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
                      <span className="page-link">&gt;</span>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div
              className="card p-4 border-0 shadow-sm h-100"
              style={{ borderRadius: "12px" }}
            >
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <h4 className="h5 fw-bold mb-1">Spending Breakdown</h4>
                  <p className="small text-muted mb-0">
                    Top categories based on your expenses
                  </p>
                </div>
              </div>
              {spendingBreakdown.length === 0 ? (
                <p className="text-muted small text-center py-3">
                  No spending data yet.
                </p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {spendingBreakdown.map((item, idx) => (
                    <div key={item.category}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div className="d-flex align-items-center gap-2 small fw-semibold">
                          <span
                            className="rounded-circle flex-shrink-0"
                            style={{ width: "8px", height: "8px", backgroundColor: categoryColors[idx % categoryColors.length] }}
                          />
                          <span>{item.category}</span>
                        </div>
                        <span className="small fw-bold text-dark">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                      <div className="progress" style={{ height: "6px", backgroundColor: categoryColors[idx % categoryColors.length] + "20" }}>
                        <div
                          className="progress-bar rounded-1"
                          style={{
                            backgroundColor: categoryColors[idx % categoryColors.length],
                            width: `${item.progress}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div
              className="card p-4 border-0 shadow-sm h-100 d-flex flex-column"
              style={{ borderRadius: "12px" }}
            >
              <h4 className="h5 fw-bold mb-3">Quick Summary</h4>
              {totalExpenses > 0 ? (
                <div className="d-flex flex-column gap-3 flex-grow-1">
                  <div className="p-3 rounded-3 bg-light d-flex align-items-center gap-3">
                    <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", backgroundColor: "#e2f2ee", color: "#0a3d34" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "18px", height: "18px" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Total Transactions</p>
                      <p className="fw-bold text-dark mb-0">{expenseList.length}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-3 bg-light d-flex align-items-center gap-3">
                    <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", backgroundColor: "#fef3c7", color: "#b45309" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "18px", height: "18px" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Average per Transaction</p>
                      <p className="fw-bold text-dark mb-0">{expenseList.length > 0 ? formatCurrency(totalExpenses / expenseList.length) : formatCurrency(0)}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-3 bg-light d-flex align-items-center gap-3">
                    <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", backgroundColor: "#e0f2fe", color: "#0369a1" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "18px", height: "18px" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                      </svg>
                    </div>
                    <div>
                      <p className="small text-muted mb-0">Envelopes Used</p>
                      <p className="fw-bold text-dark mb-0">{envelopes.filter((e) => expenseList.some((ex) => Number(ex.envelope_id) === Number(e.id))).length} of {envelopes.length}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted">
                  <p className="small text-center mb-0">Start tracking your expenses to see a summary.</p>
                </div>
              )}
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
    "trend-up": <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
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
