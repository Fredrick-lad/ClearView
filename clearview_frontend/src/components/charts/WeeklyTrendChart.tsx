import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { C } from "../../styles/colors";

interface WeeklyData {
  week: string;
  spent: number;
}

interface Props {
  data: WeeklyData[];
}

export default function WeeklyTrendChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C.teal} stopOpacity={0.25} />

            <stop offset="95%" stopColor={C.teal} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke={C.border}
          vertical={false}
        />

        <XAxis
          dataKey="week"
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
          formatter={(v: any) => `KES ${v.toLocaleString()}`}
        />

        <Area
          type="monotone"
          dataKey="spent"
          stroke={C.teal}
          strokeWidth={2.5}
          fill="url(#grad)"
          dot={{
            r: 4,
            fill: C.teal,
            strokeWidth: 0,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
