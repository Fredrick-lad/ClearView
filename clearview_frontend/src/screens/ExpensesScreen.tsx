import type { Envelope, Expense, ModalKind } from "../types";

interface Props {
  expenses: Expense[];
  envelopes: Envelope[];
  setModal: (m: ModalKind) => void;
}

export default function ExpensesScreen({ expenses }: Props) {
  return (
    <div style={{ padding: 18 }}>
      <h3>Expenses ({expenses.length})</h3>
      <ul>
        {expenses.map((ex) => (
          <li key={ex.id}>
            {ex.note || "Expense"} — {ex.envelope} — KES{" "}
            {ex.amount.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
