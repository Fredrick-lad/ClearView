import type { Envelope, Expense, ScreenKey } from "../types";

interface Props {
  envelopes: Envelope[];
  expenses: Expense[];
  totalInc: number;
  totalAlloc: number;
  totalSpent: number;
  unalloc: number;
  setScreen: (s: ScreenKey) => void;
}

export default function DashboardScreen(_: Props) {
  return (
    <div style={{ padding: 18 }}>
      <h2>Dashboard</h2>
      <p>Overview and KPI cards render here.</p>
    </div>
  );
}
