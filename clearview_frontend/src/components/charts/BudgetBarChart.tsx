import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import type { Envelope } from "../../types";
import { C } from "../../styles/colors";
import { formatCurrency } from "../../utils/format";

interface Props {
  envelopes: Envelope[];
}

export default function BudgetBarChart({ envelopes }: Props) {
  const data = envelopes.map((e) => ({
    name: e.name.split(" ")[0],
    Budget: e.limit,
    Spent: e.spent,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barSize={16} barGap={4}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={C.border}
          vertical={false}
        />

        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: C.muted }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 10, fill: C.muted }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            background: C.surface2,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            color: C.text,
            fontSize: 12,
          }}
          formatter={(v: any) =>
            v == null || v === "" ? "" : formatCurrency(v)
          }
        />

        <Legend
          wrapperStyle={{
            fontSize: 11,
            color: C.muted,
          }}
        />

        <Bar dataKey="Budget" fill={C.border} radius={[4, 4, 0, 0]} />

        <Bar dataKey="Spent" fill={C.indigo} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
