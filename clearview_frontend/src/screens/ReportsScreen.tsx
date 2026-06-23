import type { JSX } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import TopBar from "../components/layout/Topbar";
import { useAuth } from "../hooks/context/userContext";
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

const brandColors = {
  primaryDark: "var(--cv-primary-dark)",
  accentGreen: "var(--cv-accent-green)",
  darkBg: "var(--cv-insight-bg)",
  lightGray: "var(--cv-light-gray)",
};

const CHART_COLORS = [
  "#0a3d34",
  "#34d399",
  "#a7f3d0",
  "#e2f2ee",
  "#fef3c7",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
];

function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  const map: Record<string, T[]> = {};
  for (const item of items) {
    const k = keyFn(item);
    if (!map[k]) map[k] = [];
    map[k].push(item);
  }
  return map;
}

export default function ReportsScreen() {
  const { incomeSource, envelopeData, expenses } = useAuth();

  const incomeList: any[] = Array.isArray(incomeSource) ? incomeSource : [];
  const envelopes: any[] = Array.isArray(envelopeData) ? envelopeData : [];
  const expenseList: any[] = Array.isArray(expenses) ? expenses : [];

  // ---- Derived totals ----
  const totalIncome = incomeList.reduce(
    (s, i) => s + Number(i.total_amount ?? 0),
    0,
  );
  const totalSpending = expenseList.reduce(
    (s, e) => s + Number(e.amount ?? 0),
    0,
  );
  const savingsRate =
    totalIncome > 0
      ? Math.round(((totalIncome - totalSpending) / totalIncome) * 100)
      : 0;
  const transactionCount = expenseList.length;

  // ---- Monthly Cash Flow ----
  const monthlyMap: Record<string, { income: number; spending: number }> = {};
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (const inc of incomeList) {
    const d = new Date(inc.date || inc.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!monthlyMap[key]) monthlyMap[key] = { income: 0, spending: 0 };
    monthlyMap[key].income += Number(inc.total_amount ?? 0);
  }
  for (const exp of expenseList) {
    const d = new Date(exp.expense_date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!monthlyMap[key]) monthlyMap[key] = { income: 0, spending: 0 };
    monthlyMap[key].spending += Number(exp.amount ?? 0);
  }
  const monthlyCashFlow = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      const [y, m] = key.split("-");
      return {
        month: monthNames[parseInt(m, 10) - 1] + " " + y,
        income: val.income,
        spending: val.spending,
      };
    });

  // ---- Income Breakdown ----
  const incomeBySource = groupBy(incomeList, (i) => i.source || "Other");
  const incomeBreakdown = Object.entries(incomeBySource)
    .map(([source, items]) => ({
      name: source,
      value: items.reduce((s, i) => s + Number(i.total_amount ?? 0), 0),
    }))
    .sort((a, b) => b.value - a.value);

  // ---- Daily Spending Trend (last 14 days) ----
  const now = new Date();
  const dailyMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    dailyMap[key] = 0;
  }
  for (const exp of expenseList) {
    const d = new Date(exp.expense_date);
    const diff = Math.round(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diff >= 0 && diff <= 13) {
      const key = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dailyMap[key] = (dailyMap[key] || 0) + Number(exp.amount ?? 0);
    }
  }
  const dailyTrend = Object.entries(dailyMap).map(([day, amount]) => ({
    day,
    amount,
  }));

  // ---- Spending by Envelope ----
  const spendingByEnv: { name: string; amount: number; color: string }[] =
    envelopes
      .map((env, idx) => {
        const total = expenseList
          .filter((e) => Number(e.envelope_id) === Number(env.id))
          .reduce((sum, e) => sum + Number(e.amount ?? 0), 0);
        return {
          name: env.name,
          amount: total,
          color: CHART_COLORS[idx % CHART_COLORS.length],
        };
      })
      .filter((s) => s.amount > 0)
      .sort((a, b) => b.amount - a.amount);

  const totalSpendingDisplay = spendingByEnv.reduce((s, e) => s + e.amount, 0);

  // ---- Envelope Allocation ----
  const envelopeAllocations = envelopes.map((env) => {
    const limit = Number(env.monthly_limit ?? 0);
    const spent = Number(env.current_spend ?? 0);
    const pct =
      limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
    const Icon = iconMap[env.icon_name] ?? null;
    return { ...env, pct, Icon };
  });

  // ---- Category Leaderboard ----
  const leaderboard = envelopes
    .map((env) => ({
      name: env.name,
      limit: Number(env.monthly_limit ?? 0),
      spent: Number(env.current_spend ?? 0),
      pct:
        Number(env.monthly_limit ?? 0) > 0
          ? Math.round(
              (Number(env.current_spend ?? 0) /
                Number(env.monthly_limit ?? 0)) *
                100,
            )
          : 0,
    }))
    .sort((a, b) => b.spent - a.spent);

  // ---- Extra Metrics ----
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysSinceMonthStart = Math.max(
    1,
    Math.ceil(
      (today.getTime() - firstDayOfMonth.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1,
  );
  const avgDailySpend =
    daysSinceMonthStart > 0 ? totalSpending / daysSinceMonthStart : 0;

  let highestExpense = { amount: 0, name: "", date: "" };
  const dayCount: Record<string, number> = {};
  for (const exp of expenseList) {
    const amt = Number(exp.amount ?? 0);
    if (amt > highestExpense.amount) {
      highestExpense = {
        amount: amt,
        name: exp.expense_name || exp.description || "—",
        date: exp.expense_date,
      };
    }
    const d = new Date(exp.expense_date);
    const key = d.toLocaleDateString("en-US", { weekday: "long" });
    dayCount[key] = (dayCount[key] || 0) + 1;
  }
  const busiestDay =
    Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  const highestSingleExpense = highestExpense;

  // ---- Recent Activity ----
  const unusualActivity = [...expenseList]
    .sort(
      (a, b) =>
        new Date(b.expense_date ?? 0).getTime() -
        new Date(a.expense_date ?? 0).getTime(),
    )
    .slice(0, 5);

  // ---- Summary Metrics ----
  const summaryMetrics = [
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      subtext: `${incomeList.length} source${incomeList.length !== 1 ? "s" : ""}`,
      subtextColor: "text-muted",
      bgClass: "bg-white",
    },
    {
      title: "Total Spending",
      value: formatCurrency(totalSpending),
      subtext:
        totalIncome > 0
          ? `${Math.round((totalSpending / totalIncome) * 100)}% of income`
          : "No income data",
      subtextColor:
        totalSpending > totalIncome ? "text-danger" : "text-success",
      bgClass:
        totalSpending > totalIncome ? "bg-danger-subtle" : "bg-success-subtle",
    },
    {
      title: "Transactions",
      value: String(transactionCount),
      subtext: `${expenseList.length > 0 ? "All time" : "No data"}`,
      subtextColor: "text-muted",
      bgClass: "bg-white",
    },
    {
      title: "Avg Daily Spend",
      value: formatCurrency(avgDailySpend),
      subtext: "This month",
      subtextColor: "text-muted",
      bgClass: "bg-white",
    },
  ];

  return (
    <>
      <div
        className="px-3 px-md-4 py-3 mx-auto bg-ui-bg min-vh-100"
        style={{ maxWidth: "1200px" }}
      >
        <TopBar title="Financial Reports" />

        {/* Period selector */}
        <div
          className="d-flex align-items-center gap-2 bg-white p-1 rounded-3 shadow-sm border mb-3 mb-md-4 overflow-auto"
          style={{ fontSize: "13px", width: "fit-content", maxWidth: "100%" }}
        >
          <button
            className="btn btn-sm fw-bold px-2 px-md-3 py-1.5 text-nowrap"
            style={{
              backgroundColor: "var(--cv-light-gray)",
              color: brandColors.primaryDark,
            }}
          >
            This Semester
          </button>
          <button className="btn btn-sm fw-medium text-muted px-2 px-md-3 py-1.5 border-0 bg-transparent text-nowrap">
            All Periods
          </button>
        </div>

        {/* Summary row */}
        <div className="row g-2 g-md-4 mb-3 mb-md-4">
          {summaryMetrics.map((card, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div
                className={`card h-100 p-3 p-md-4 border-0 shadow-sm ${card.bgClass}`}
                style={{ borderRadius: "12px" }}
              >
                <span
                  className="text-uppercase text-muted fw-bold"
                  style={{ fontSize: "10px" }}
                >
                  {card.title}
                </span>
                <p className="h5 h4-md fw-bold my-1 my-md-2 text-dark">
                  {card.value}
                </p>
                <span
                  className={`small fw-bold ${card.subtextColor} d-flex align-items-center gap-1`}
                >
                  {card.subtext}
                </span>
              </div>
            </div>
          ))}
          <div className="col-6 col-md-3">
            <div
              className="card h-100 p-3 p-md-4 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <span
                className="text-uppercase text-muted fw-bold"
                style={{ fontSize: "10px" }}
              >
                Savings Rate
              </span>
              <p className="h5 h4-md fw-bold my-1 my-md-2 text-dark">
                {savingsRate}%
              </p>
              <div className="progress mt-1 mt-md-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar"
                  style={{
                    backgroundColor: "var(--cv-primary-dark)",
                    width: `${Math.min(savingsRate, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Extra info chips */}
        <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 gap-md-3 mb-3 mb-md-4">
          <div
            className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-2 rounded-3 shadow-sm border flex-fill"
            style={{ fontSize: "11px" }}
          >
            <span className="text-muted fw-semibold text-nowrap">Highest:</span>
            <span className="fw-bold text-dark text-nowrap">
              {formatCurrency(highestSingleExpense.amount)}
            </span>
            <span className="text-muted text-truncate d-none d-sm-inline">
              — {highestSingleExpense.name}
            </span>
          </div>
          <div
            className="d-flex align-items-center gap-1 gap-md-2 bg-white px-2 px-md-3 py-2 rounded-3 shadow-sm border"
            style={{ fontSize: "11px" }}
          >
            <span className="text-muted fw-semibold text-nowrap">
              Busiest Day:
            </span>
            <span className="fw-bold text-dark text-nowrap">{busiestDay}</span>
          </div>
        </div>

        {/* Monthly Cash Flow */}
        <div
          className="card border-0 shadow-sm p-3 p-md-4 mb-3 mb-md-4"
          style={{ borderRadius: "12px" }}
        >
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h3 className="h6 fw-bold mb-1">Monthly Cash Flow</h3>
              <p className="small text-muted mb-0 d-none d-sm-block">
                Income vs spending per month
              </p>
            </div>
          </div>
          {monthlyCashFlow.length === 0 ? (
            <p className="text-muted small text-center py-4">
              No data yet. Add income and expenses to see your cash flow.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyCashFlow} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: any) => formatCurrency(v)} />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="var(--cv-insight-bg)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="spending"
                  name="Spending"
                  fill="var(--cv-accent-green)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="row g-3 g-md-4 mb-3 mb-md-4">
          {/* Income Breakdown */}
          <div className="col-12 col-md-6">
            <div
              className="card h-100 p-3 p-md-4 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <h3 className="h6 fw-bold mb-3 mb-md-4">Income Breakdown</h3>
              {incomeBreakdown.length === 0 ? (
                <p className="text-muted small text-center py-4">
                  No income sources yet.
                </p>
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={incomeBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        dataKey="value"
                        nameKey="name"
                      >
                        {incomeBreakdown.map((_, idx) => (
                          <Cell
                            key={idx}
                            fill={CHART_COLORS[idx % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => formatCurrency(v)} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="d-flex flex-wrap gap-2 gap-md-3 mt-3 justify-content-center">
                    {incomeBreakdown.map((item, idx) => (
                      <div
                        className="d-flex align-items-center gap-1 small fw-semibold"
                        key={idx}
                      >
                        <span
                          className="d-inline-block rounded-circle flex-shrink-0"
                          style={{
                            width: "8px",
                            height: "8px",
                            backgroundColor:
                              CHART_COLORS[idx % CHART_COLORS.length],
                          }}
                        />
                        <span className="text-secondary text-nowrap">
                          {item.name}
                        </span>
                        <span className="text-dark text-nowrap">
                          {formatCurrency(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Daily Spending Trend */}
          <div className="col-12 col-md-6">
            <div
              className="card h-100 p-3 p-md-4 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <h3 className="h6 fw-bold mb-3 mb-md-4">
                Daily Spending{" "}
                <span className="fw-normal text-muted">(14 days)</span>
              </h3>
              {dailyTrend.every((d) => d.amount === 0) ? (
                <p className="text-muted small text-center py-4">
                  No spending in the last 14 days.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 9 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip formatter={(v: any) => formatCurrency(v)} />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="var(--cv-insight-bg)"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="row g-3 g-md-4 mb-3 mb-md-4">
          {/* Spending by Category */}
          <div className="col-12 col-lg-5">
            <div
              className="card h-100 p-3 p-md-4 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <h3 className="h6 fw-bold mb-3 mb-md-4">Spending by Category</h3>
              {spendingByEnv.length === 0 ? (
                <p className="text-muted small text-center py-4">
                  No spending data yet.
                </p>
              ) : (
                <>
                  <div className="d-flex justify-content-center position-relative my-3">
                    <svg
                      width="130"
                      height="130"
                      viewBox="0 0 42 42"
                      className="transform-rotate-90"
                    >
                      {spendingByEnv.slice(0, 3).map((cat, idx) => {
                        const pct =
                          totalSpendingDisplay > 0
                            ? Math.round(
                                (cat.amount / totalSpendingDisplay) * 100,
                              )
                            : 0;
                        const offsets = [0, 100, 65, 40];
                        return (
                          <circle
                            key={cat.name}
                            cx="21"
                            cy="21"
                            r="15.91"
                            fill="transparent"
                            stroke={cat.color}
                            strokeWidth="4.5"
                            strokeDasharray={`${pct} ${100 - pct}`}
                            strokeDashoffset={offsets[idx] ?? 0}
                          />
                        );
                      })}
                    </svg>
                    <div className="position-absolute top-50 start-50 translate-middle text-center">
                      <span
                        className="text-uppercase text-muted fw-bold d-block"
                        style={{ fontSize: "9px" }}
                      >
                        Total
                      </span>
                      <span
                        className="fw-bold text-dark"
                        style={{ fontSize: "14px" }}
                      >
                        {formatCurrency(totalSpendingDisplay)}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-1 gap-md-2 mt-2 pt-2">
                    {spendingByEnv.slice(0, 5).map((item, idx) => (
                      <div
                        className="d-flex justify-content-between align-items-center small fw-semibold"
                        key={idx}
                      >
                        <div className="d-flex align-items-center gap-2 min-w-0">
                          <span
                            className="d-inline-block rounded-circle flex-shrink-0"
                            style={{
                              width: "10px",
                              height: "10px",
                              backgroundColor: item.color,
                            }}
                          />
                          <span className="text-secondary text-truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-dark fw-bold text-nowrap ms-2">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Category Leaderboard */}
          <div className="col-12 col-lg-7">
            <div
              className="card h-100 p-3 p-md-4 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <h3 className="h6 fw-bold mb-3 mb-md-4">Category Leaderboard</h3>
              {leaderboard.length === 0 ? (
                <p className="text-muted small text-center py-4">
                  No envelopes created yet.
                </p>
              ) : (
                <div className="d-flex flex-column gap-2 gap-md-3">
                  {leaderboard.map((env, idx) => (
                    <div key={idx}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div className="d-flex align-items-center gap-1 gap-md-2 min-w-0">
                          <span
                            className="fw-bold text-muted flex-shrink-0"
                            style={{ fontSize: "11px", width: "18px" }}
                          >
                            #{idx + 1}
                          </span>
                          <span className="small fw-semibold text-dark text-truncate">
                            {env.name}
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-1 gap-md-2 flex-shrink-0">
                          <span className="small fw-bold text-dark text-nowrap">
                            {formatCurrency(env.spent)}
                          </span>
                          <span className="small text-muted d-none d-sm-inline">
                            / {formatCurrency(env.limit)}
                          </span>
                          <span
                            className={`small fw-bold ${env.pct >= 90 ? "text-danger" : env.pct >= 70 ? "text-warning" : "text-success"}`}
                          >
                            {env.pct}%
                          </span>
                        </div>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${Math.min(env.pct, 100)}%`,
                            backgroundColor:
                              env.pct >= 90
                                ? "#e74c3c"
                                : env.pct >= 70
                                  ? "#f39c12"
                                  : "var(--cv-primary-dark)",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row g-3 g-md-4">
          {/* Envelope Allocation */}
          <div className="col-12 col-lg-7">
            <div
              className="card h-100 p-3 p-md-4 bg-white border-0 shadow-sm d-flex flex-column justify-content-between"
              style={{ borderRadius: "12px" }}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
                  <h3 className="h6 fw-bold mb-0">Envelope Allocation</h3>
                </div>
                {envelopeAllocations.length === 0 ? (
                  <p className="text-muted small text-center py-4">
                    No envelopes created yet.
                  </p>
                ) : (
                  <div className="d-flex flex-column gap-3 gap-md-4 mb-3 mb-md-4">
                    {envelopeAllocations.map((env: any, idx: number) => (
                      <div
                        className="d-flex align-items-start gap-2 gap-md-3"
                        key={idx}
                      >
                        <div className="p-1 p-md-2 bg-light text-secondary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                          {env.Icon ? (
                            <env.Icon size={16} />
                          ) : (
                            <IconSwitcher
                              type="envelope"
                              style={{ width: "16px", height: "16px" }}
                            />
                          )}
                        </div>
                        <div className="flex-grow-1 min-w-0">
                          <div className="d-flex justify-content-between text-dark small fw-bold mb-1">
                            <span className="text-truncate">{env.name}</span>
                            <span className="text-nowrap ms-2">
                              {formatCurrency(env.current_spend ?? 0)}{" "}
                              <span className="text-muted fw-medium">
                                / {formatCurrency(env.monthly_limit ?? 0)}
                              </span>
                            </span>
                          </div>
                          <div className="progress" style={{ height: "6px" }}>
                            <div
                              className="progress-bar"
                              style={{
                                backgroundColor:
                                  env.pct >= 90
                                    ? "#e74c3c"
                                    : env.pct >= 70
                                      ? "#f39c12"
                                      : "var(--cv-insight-bg)",
                                width: `${env.pct}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className="p-2 p-md-3 text-white d-flex align-items-center justify-content-between gap-2 gap-md-3"
                style={{
                  backgroundColor: "var(--cv-insight-bg)",
                  borderRadius: "10px",
                }}
              >
                <div className="min-w-0">
                  <h4 className="fw-bold mb-1" style={{ fontSize: "13px" }}>
                    Financial Clarity Found
                  </h4>
                  <p
                    className="mb-0 opacity-75"
                    style={{ fontSize: "10px", lineHeight: "1.3" }}
                  >
                    {totalIncome > 0
                      ? `You're saving ${savingsRate}% of your income. ${totalSpending <= totalIncome ? "You're on track!" : "Review your spending."}`
                      : "Add income and expenses to get insights."}
                  </p>
                </div>
                <button
                  className="btn btn-light fw-bold text-dark btn-sm px-2 px-md-3 py-1 py-md-2 text-nowrap flex-shrink-0"
                  style={{ fontSize: "11px", borderRadius: "6px" }}
                >
                  Review
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-12 col-lg-5">
            <div
              className="card h-100 bg-white border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="p-3 p-md-4 border-bottom">
                <h3 className="h6 fw-bold mb-0">Recent Activity</h3>
              </div>
              {unusualActivity.length === 0 ? (
                <div className="text-center py-4 py-md-5 text-muted">
                  <p className="mb-0 small">No expenses recorded yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead
                      className="table-light text-uppercase text-muted fw-bold"
                      style={{ fontSize: "10px" }}
                    >
                      <tr>
                        <th className="ps-3 ps-md-4 py-2 py-md-3">Date</th>
                        <th className="py-2 py-md-3">Description</th>
                        <th className="pe-3 pe-md-4 py-2 py-md-3 text-end">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="fw-medium text-secondary"
                      style={{ fontSize: "12px" }}
                    >
                      {unusualActivity.map((exp: any, idx: number) => (
                        <tr key={exp.id ?? idx}>
                          <td className="ps-3 ps-md-4 py-2 py-md-3 text-muted text-nowrap">
                            {formatDate(exp.expense_date)}
                          </td>
                          <td
                            className="fw-bold text-dark text-truncate"
                            style={{ maxWidth: "120px" }}
                          >
                            {exp.expense_name || exp.description || "—"}
                          </td>
                          <td className="pe-3 pe-md-4 text-end fw-bold text-dark text-nowrap">
                            {formatCurrency(exp.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
    envelope: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l9 6 9-6"
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
