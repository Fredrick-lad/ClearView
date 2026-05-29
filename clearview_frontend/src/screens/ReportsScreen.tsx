import BudgetBarChart from "../components/charts/BudgetBarChart";
import SpendingPieChart from "../components/charts/SpendingPiechart";
import WeeklyTrendChart from "../components/charts/WeeklyTrendChart";

import type { Envelope } from "../types";
import { weeklyData } from "../data/seedData";
import { C } from "../styles/colors";

interface Props {
  envelopes: Envelope[];
  totalSpent: number;
  totalAlloc: number;
}

export default function ReportsScreen({
  envelopes,
  totalSpent,
  totalAlloc,
}: Props) {
  return (
    <div>
      {/* cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: 22,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.textDim,
              marginBottom: 16,
            }}
          >
            Budget vs Spent by Category
          </div>

          <BudgetBarChart envelopes={envelopes} />
        </div>

        {/* Pie Chart */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: 22,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.textDim,
              marginBottom: 16,
            }}
          >
            Spending Distribution
          </div>

          <SpendingPieChart envelopes={envelopes} />
        </div>
      </div>

      {/* Trend Chart */}
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: 22,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: C.textDim,
            marginBottom: 16,
          }}
        >
          Weekly Spending Trend
        </div>
      </div>
    </div>
  );
}
