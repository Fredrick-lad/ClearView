import React from "react";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddExpenseModal({
  isOpen,
  onClose,
}: AddExpenseModalProps) {
  if (!isOpen) return null;

  // Brand identity design choices matching screen_3.png
  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    deepGreen: "#0A4433",
    inputBorder: "rgba(0, 0, 0, 0.15)",
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(212, 222, 218, 0.5)", // Tinted blurred-backdrop fill
        backdropFilter: "blur(4px)",
        zIndex: 1050,
      }}
    >
      {/* Modal Card Box */}
      <div
        className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden w-100 mx-3"
        style={{ maxWidth: "560px" }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between px-4 pt-4 pb-3 border-bottom border-light-subtle">
          <h3 className="h5 mb-0 fw-bold text-dark" style={brandSerif}>
            Add New Expense
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4">
          <form onSubmit={handleFormSubmit}>
            {/* Transaction Name */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Transaction Name
              </label>
              <input
                type="text"
                className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark"
                placeholder="e.g. Starbucks, Rent, Amazon"
                style={{ borderColor: colors.inputBorder }}
                required
              />
            </div>

            {/* Split Row: Amount & Date */}
            <div className="row g-3 mb-4">
              {/* Amount */}
              <div className="col-6">
                <label className="form-label text-dark small fw-medium mb-2">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark"
                  placeholder="Ksh 0.00"
                  style={{ borderColor: colors.inputBorder }}
                  required
                />
              </div>

              {/* Date */}
              <div className="col-6">
                <label className="form-label text-dark small fw-medium mb-2">
                  Date
                </label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark w-100"
                  style={{ borderColor: colors.inputBorder }}
                  required
                />
              </div>
            </div>

            {/* Envelope Selection Dropdown */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Envelope selection
              </label>
              <select
                className="form-select py-2.5 px-3 border rounded-3 shadow-none text-dark fw-medium"
                style={{ borderColor: colors.inputBorder }}
                defaultValue="Groceries"
              >
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent & Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            {/* Notes Textarea */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Notes
              </label>
              <textarea
                className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark"
                rows={4}
                placeholder="Additional details..."
                style={{ borderColor: colors.inputBorder, resize: "none" }}
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex align-items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-white bg-white border px-4 py-2.5 rounded-3 text-dark fw-semibold small shadow-sm w-50"
                style={{ borderColor: colors.inputBorder }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white px-4 py-2.5 rounded-3 fw-semibold small shadow-sm w-50"
                style={{ backgroundColor: colors.deepGreen }}
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
