import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

import type { Envelope } from "../../types";
import { C, PALETTE } from "../../styles/colors";
import { formatCurrency } from "../../utils/format";

interface Props {
  envelopes: Envelope[];
}

export default function SpendingPieChart({ envelopes }: Props) {
  const pieData = envelopes.map((e) => ({
    name: e.name,
    value: e.spent,
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={80}
            dataKey="value"
            paddingAngle={3}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} stroke="none" />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: C.surface2,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              color: C.text,
              fontSize: 12,
            }}
            formatter={(v: any) => formatCurrency(v ?? 0)}
          />
        </PieChart>
      </ResponsiveContainer>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 14px",
          marginTop: 4,
        }}
      >
        {envelopes.map((e, i) => (
          <div
            key={e.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: PALETTE[i % PALETTE.length],
                display: "inline-block",
              }}
            />

            <span
              style={{
                fontSize: 11,
                color: C.muted,
              }}
            >
              {e.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
