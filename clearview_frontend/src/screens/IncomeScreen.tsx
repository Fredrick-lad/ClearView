import type { Envelope, IncomeRecord, ModalKind } from "../types";

interface Props {
  income: IncomeRecord[];
  envelopes: Envelope[];
  totalInc: number;
  totalAlloc: number;
  unalloc: number;
  setModal: (m: ModalKind) => void;
}

export default function IncomeScreen({ income }: Props) {
  return (
    <div style={{ padding: 18 }}>
      <h3>Income ({income.length})</h3>
      <ul>
        {income.map((i) => (
          <li key={i.id}>
            {i.source} — KES {i.amount.toLocaleString()} ({i.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
