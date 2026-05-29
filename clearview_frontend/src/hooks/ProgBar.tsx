import { C } from "../styles/colors";

interface Props {
  pct: number;
  color?: string;
}

export default function ProgBar({ pct, color }: Props) {
  const bg = color || (pct >= 90 ? C.alert : pct >= 70 ? C.warning : C.brand);

  return (
    <div
      style={{
        background: C.border,
        borderRadius: 99,
        height: 6,
        width: "100%",
      }}
    >
      <div
        style={{
          width: `${Math.min(pct, 100)}%`,
          background: bg,
          height: "100%",
          borderRadius: 99,
        }}
      />
    </div>
  );
}
