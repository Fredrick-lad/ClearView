import type { JSX } from "react";
import TopBar from "../components/layout/Topbar";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import { formatCurrency } from "../utils/format";

function formatDate(dateStr: string): string {
  if (!dateStr) return "\u2014";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const brandColors = {
  primaryDark: "var(--cv-primary-dark)",
  cardDarkBg: "var(--cv-card-dark-bg)",
  mainBg: "var(--cv-main-bg)",
};

export default function IncomeOverview() {
  const { incomeSource } = useAuth();
  const { setModal, goBack } = GetData();

  const incomeList: any[] = Array.isArray(incomeSource) ? incomeSource : [];

  const totalIncome = incomeList.reduce(
    (sum, inc) => sum + Number(inc.total_amount ?? 0),
    0,
  );

  const maxIncome = Math.max(
    ...incomeList.map((i) => Number(i.total_amount ?? 0)),
    1,
  );

  const prevMonthTotal = totalIncome * 0.875;
  const changePct =
    prevMonthTotal > 0
      ? Math.round(((totalIncome - prevMonthTotal) / prevMonthTotal) * 100)
      : 0;

  const barColors = ["#0a3d34", "#a7f3d0", "#34d399", "#e2f2ee", "#fef3c7"];

  return (
    <div
      className="px-3 px-md-4 mx-auto bg-ui-bg pb-5"
      style={{ maxWidth: "1200px" }}
    >
      <TopBar title="Income Overview" showBack onBack={goBack} showIncomeBtn />
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div
            className="card h-100 p-4 border-0 text-white position-relative overflow-hidden d-flex flex-column justify-content-between"
            style={{
              backgroundColor: brandColors.cardDarkBg,
              borderRadius: "12px",
              minHeight: "250px",
            }}
          >
            <div>
              <span className="small opacity-75 fw-medium">
                Income This Semester
              </span>
              <p className="h1 fw-bold mt-2 mb-0">
                {formatCurrency(totalIncome)}
              </p>
            </div>

            <div className="mt-4">
              <p className="small mb-0 d-flex align-items-center gap-1 opacity-90 fw-semibold">
                <svg
                  style={{ width: "14px" }}
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
                {changePct >= 0 ? "+" : ""}
                {changePct}% from previous period
              </p>
            </div>

            <div
              className="position-absolute end-0 bottom-0 opacity-10 m-3"
              style={{ transform: "scale(1.5)", pointerEvents: "none" }}
            >
              <IconSwitcher
                type="banknote"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div
            className="card h-100 p-4 bg-white border-0 shadow-sm"
            style={{ borderRadius: "12px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold text-secondary small">
                Income Sources
              </span>
              <button
                className="btn btn-outline-secondary btn-sm py-0 px-2 fw-semibold"
                style={{ fontSize: "12px" }}
                onClick={() => setModal("inc")}
              >
                Details
              </button>
            </div>

            {incomeList.length === 0 ? (
              <div className="text-center text-muted py-4">
                <p className="small mb-2">No income sources added yet.</p>
                <button
                  className="btn btn-sm fw-bold"
                  style={{ color: brandColors.primaryDark }}
                  onClick={() => setModal("inc")}
                >
                  + Add your first income source
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {incomeList.map((source: any, index: number) => {
                  const pct = Math.min(
                    Math.round(
                      (Number(source.total_amount ?? 0) / maxIncome) * 100,
                    ),
                    100,
                  );
                  return (
                    <div key={source.id ?? index}>
                      <div className="d-flex justify-content-between align-items-center small mb-1">
                        <span className="fw-bold text-dark">
                          {source.source}
                        </span>
                        <span className="fw-bold text-dark">
                          {formatCurrency(source.total_amount ?? 0)}
                        </span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${pct}%`,
                            backgroundColor:
                              barColors[index % barColors.length],
                          }}
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: "12px" }}
      >
        <div
          className="p-4 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 border-bottom bg-white"
          style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
        >
          <h3 className="h6 fw-bold text-secondary mb-0">
            Transaction History
          </h3>

          <div className="d-flex gap-2">
            <div
              className="input-group input-group-sm"
              style={{ maxWidth: "240px" }}
            >
              <span className="input-group-text bg-white text-muted border-end-0">
                <IconSwitcher type="search" style={{ width: "14px" }} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-1"
                placeholder="Search income..."
                style={{ fontSize: "13px" }}
              />
            </div>
            <button className="btn btn-outline-secondary btn-sm fw-semibold d-flex align-items-center gap-1">
              <IconSwitcher type="filter" style={{ width: "14px" }} /> Filter
            </button>
          </div>
        </div>

        {incomeList.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p className="fw-semibold mb-2">No income recorded yet.</p>
            <button
              className="btn text-white px-4 py-2 border-0"
              style={{
                backgroundColor: brandColors.primaryDark,
                borderRadius: "8px",
              }}
              onClick={() => setModal("inc")}
            >
              + Add your first income source
            </button>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead
                  className="table-light text-uppercase text-muted fw-bold"
                  style={{ fontSize: "11px", letterSpacing: "0.03rem" }}
                >
                  <tr>
                    <th className="ps-4 py-3">Source Name</th>
                    <th className="py-3">Date</th>
                    <th className="pe-4 py-3 text-end">Amount</th>
                  </tr>
                </thead>
                <tbody
                  className="fw-medium text-secondary"
                  style={{ fontSize: "14px" }}
                >
                  {incomeList.map((inc: any, idx: number) => (
                    <tr key={inc.id ?? idx}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div className="p-2 bg-light rounded-3 d-flex align-items-center justify-content-center text-dark">
                            <IconSwitcher
                              type="banknote"
                              style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                          </div>
                          <span className="fw-bold text-dark">
                            {inc.source}
                          </span>
                        </div>
                      </td>
                      <td className="text-muted">
                        {formatDate(inc.created_at ?? inc.date)}
                      </td>
                      <td className="pe-4 text-end fw-bold text-success">
                        {formatCurrency(inc.total_amount ?? 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="p-3 d-flex justify-content-between align-items-center bg-white"
              style={{
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
              }}
            >
              <span className="small text-muted">
                Showing {incomeList.length} of {incomeList.length} entries
              </span>
              <div className="btn-group btn-group-sm">
                <button
                  className="btn btn-outline-secondary px-2.5 py-1"
                  disabled
                >
                  <IconSwitcher type="chevron-left" style={{ width: "12px" }} />
                </button>
                <button className="btn btn-outline-secondary px-2.5 py-1">
                  <IconSwitcher
                    type="chevron-right"
                    style={{ width: "12px" }}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-7">
          <div
            className="card h-100 p-4 bg-white border-0 shadow-sm d-flex flex-row align-items-start gap-3"
            style={{ borderRadius: "12px" }}
          >
            <div className="p-3 bg-light rounded-3 text-dark d-flex align-items-center justify-content-center">
              <IconSwitcher
                type="sparkles"
                style={{ width: "24px", height: "24px" }}
              />
            </div>
            <div>
              <h4 className="h6 fw-bold text-dark mb-2">
                Projected Next Month
              </h4>
              <p
                className="text-muted mb-0 small leading-relaxed"
                style={{ lineHeight: "1.5" }}
              >
                {incomeList.length > 0
                  ? `Based on your current income sources, your projected monthly income is ${formatCurrency(totalIncome)}.`
                  : "Add income sources to see projections."}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-5">
          <div
            className="card h-100 p-4 border-0 text-white d-flex flex-row align-items-center justify-content-between gap-3"
            style={{
              backgroundColor: brandColors.cardDarkBg,
              borderRadius: "12px",
            }}
          >
            <div style={{ maxWidth: "65%" }}>
              <h4 className="h6 fw-bold mb-1 text-white">
                Have recurring income?
              </h4>
              <p
                className="mb-0 opacity-75"
                style={{ fontSize: "12px", lineHeight: "1.4" }}
              >
                Add allowance, scholarship, or loan income sources you receive
                each semester.
              </p>
            </div>
            <button
              className="btn btn-light fw-bold text-dark px-3 py-2 border-0"
              style={{ fontSize: "13px", borderRadius: "6px" }}
              onClick={() => setModal("inc")}
            >
              Add Income
            </button>
          </div>
        </div>
      </div>

      <footer
        className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-3 mt-5 border-top text-muted"
        style={{ fontSize: "11px" }}
      >
        <span>&copy; 2026 ClearView Financial. All rights reserved.</span>
        <div className="d-flex gap-3 mt-2 mt-sm-0">
          <a href="#privacy" className="text-decoration-none text-muted">
            Privacy Policy
          </a>
          <a href="#terms" className="text-decoration-none text-muted">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
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
    building: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
    palette: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3"
      />
    ),
    "trend-up": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
    document: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    filter: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    ),
    "chevron-left": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M15 19l-7-7 7-7"
      />
    ),
    "chevron-right": (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M9 5l7 7-7 7"
      />
    ),
    sparkles: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    ),
    banknote: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    ),
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
