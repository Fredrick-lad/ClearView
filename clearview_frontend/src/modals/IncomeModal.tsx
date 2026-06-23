import React, { useState } from "react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import { formatCurrency } from "../utils/format";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddIncomeModal({
  isOpen,
  onClose,
}: AddIncomeModalProps) {
  const { addIncome, addIncomePeriod, periodData } = useAuth();
  const { addNotification } = GetData();

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      let period_id = periodData?.id;

      if (!period_id) {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const newPeriod = await addIncomePeriod({
          label: `${start.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
          start_date: start.toISOString().split("T")[0],
          end_date: end.toISOString().split("T")[0],
        });
        period_id = newPeriod?.id;
      }

      await addIncome({
        period_id,
        source,
        total_amount: parseFloat(amount),
      });

      addNotification({
        title: "Income Received",
        description: `${formatCurrency(parseFloat(amount))} from "${source}" has been recorded.`,
        type: "income",
      });

      setSource("");
      setAmount("");
      setDate("");
      onClose();
    } catch {
      setError("Failed to add income. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const colors = {
    deepGreen: "#053225",
    inputBorder: "rgba(0, 0, 0, 0.15)",
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 1050,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="bg-white rounded shadow-lg w-100"
        style={{ maxWidth: "640px", overflow: "hidden" }}
      >
        <div
          className="text-white px-4 py-3 d-flex justify-content-between align-items-center"
          style={{ backgroundColor: colors.deepGreen }}
        >
          <h2 className="m-0 fs-5 fw-medium tracking-wide">Add Income</h2>
          <button
            onClick={onClose}
            className="btn p-0 text-white opacity-75 border-0 shadow-none"
            aria-label="Close modal"
            style={{ background: "none" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 p-md-5 overflow-auto"
          style={{ maxHeight: "85vh" }}
        >
          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <div className="border rounded p-4 mb-4">
            <h3
              className="text-uppercase text-muted fw-bold mb-3"
              style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
            >
              Income Source
            </h3>

            <div className="mb-3">
              <label className="form-label fw-medium text-secondary small">
                Source Name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp Salary"
                className="form-control shadow-none"
                style={{ padding: "0.625rem 0.75rem" }}
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <label className="form-label fw-medium text-secondary small">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control shadow-none"
                  style={{ padding: "0.625rem 0.75rem" }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label fw-medium text-secondary small">
                  Amount (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="form-control shadow-none"
                  style={{ padding: "0.75rem 0.75rem" }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row g-3 pt-2">
            <div className="col-6">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-dark w-100 py-3 fw-medium shadow-none"
                disabled={saving}
              >
                Cancel
              </button>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn text-white w-100 py-3 fw-medium shadow-none"
                style={{ backgroundColor: colors.deepGreen, borderColor: colors.deepGreen }}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save Income Source"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
