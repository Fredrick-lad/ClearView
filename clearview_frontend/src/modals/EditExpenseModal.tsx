import React, { useState } from "react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditExpenseModal({
  isOpen,
  onClose,
}: EditExpenseModalProps) {
  const { envelopeData, updateExpense } = useAuth();
  const { selectedExpense } = GetData();

  const [expenseName, setExpenseName] = useState(selectedExpense?.expense_name || "");
  const [amount, setAmount] = useState(selectedExpense?.amount?.toString() || "");
  const [date, setDate] = useState(() => {
    if (selectedExpense?.expense_date) {
      const d = new Date(selectedExpense.expense_date);
      return isNaN(d.getTime()) ? selectedExpense.expense_date : d.toISOString().split("T")[0];
    }
    return "";
  });
  const [envelopeId, setEnvelopeId] = useState(selectedExpense?.envelope_id?.toString() || "");
  const [notes, setNotes] = useState(selectedExpense?.description || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !selectedExpense) return null;

  const envelopes: any[] = Array.isArray(envelopeData) ? envelopeData : [];

  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    deepGreen: "#0A4433",
    inputBorder: "rgba(0, 0, 0, 0.15)",
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const ok = await updateExpense(selectedExpense.id, {
        expense_name: expenseName,
        amount: parseFloat(amount),
        expense_date: date,
        envelope_id: parseInt(envelopeId),
        description: notes,
      });

      if (ok) {
        onClose();
      } else {
        setError("Failed to update expense. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(212, 222, 218, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1050,
      }}
    >
      <div
        className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden w-100 mx-3"
        style={{ maxWidth: "560px" }}
      >
        <div className="d-flex align-items-center justify-content-between px-4 pt-4 pb-3 border-bottom border-light-subtle">
          <h3 className="h5 mb-0 fw-bold text-dark" style={brandSerif}>
            Edit Expense
          </h3>
          <button
            onClick={onClose}
            className="btn btn-link p-1 text-muted text-decoration-none shadow-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ width: "20px", height: "20px" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleFormSubmit}>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Transaction Name
              </label>
              <input
                type="text"
                className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark"
                placeholder="e.g. Starbucks, Rent, Amazon"
                style={{ borderColor: colors.inputBorder }}
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                required
              />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <label className="form-label text-dark small fw-medium mb-2">
                  Amount (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark"
                  placeholder="0.00"
                  style={{ borderColor: colors.inputBorder }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="col-6">
                <label className="form-label text-dark small fw-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark w-100"
                  style={{ borderColor: colors.inputBorder }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Envelope
              </label>
              <select
                className="form-select py-2.5 px-3 border rounded-3 shadow-none text-dark fw-medium"
                style={{ borderColor: colors.inputBorder }}
                value={envelopeId}
                onChange={(e) => setEnvelopeId(e.target.value)}
                required
              >
                <option value="">Select an envelope</option>
                {envelopes.map((envelope: any) => (
                  <option key={envelope.id} value={envelope.id}>
                    {envelope.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Notes
              </label>
              <textarea
                className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark"
                rows={4}
                placeholder="Additional details..."
                style={{ borderColor: colors.inputBorder, resize: "none" }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="d-flex align-items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-white bg-white border px-4 py-2.5 rounded-3 text-dark fw-semibold small shadow-sm w-50"
                style={{ borderColor: colors.inputBorder }}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white px-4 py-2.5 rounded-3 fw-semibold small shadow-sm w-50"
                style={{ backgroundColor: colors.deepGreen }}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
