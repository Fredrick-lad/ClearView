import React from "react";
import { X, Calendar, Info, Plus } from "lucide-react";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddIncomeModal({
  isOpen,
  onClose,
}: AddIncomeModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
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
      {/* Modal Container */}
      <div
        className="bg-white rounded shadow-lg w-100"
        style={{ maxWidth: "640px", overflow: "hidden" }}
      >
        {/* Header */}
        <div
          className="text-white px-4 py-3 d-flex justify-content-between align-items-center"
          style={{ backgroundColor: "#053225" }}
        >
          <h2 className="m-0 fs-5 fw-medium tracking-wide">Add Income</h2>
          <button
            onClick={onClose}
            className="btn p-0 text-white opacity-75 border-0 shadow-none"
            aria-label="Close modal"
            style={{ background: "none" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-4 p-md-5 overflow-auto"
          style={{ maxHeight: "85vh" }}
        >
          {/* Income Source Section Card */}
          <div className="border rounded p-4 mb-4">
            <h3
              className="text-uppercase text-muted fw-bold mb-3"
              style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
            >
              Income Source 1
            </h3>

            {/* Source Name */}
            <div className="mb-3">
              <label className="form-label fw-medium text-secondary small">
                Source Name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp Salary"
                className="form-control shadow-none"
                style={{ padding: "0.625rem 0.75rem" }}
              />
            </div>

            {/* Category & Date Grid */}
            <div className="row g-3 mb-3">
              {/* Category */}
              <div className="col-12 col-sm-6">
                <label className="form-label fw-medium text-secondary small">
                  Category
                </label>
                <select
                  defaultValue="Salary"
                  className="form-select shadow-none"
                  style={{ padding: "0.625rem 0.75rem" }}
                >
                  {" "}
                  <option value="ParentsSupport">Parents Support</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investments">Investments</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date */}
              <div className="col-12 col-sm-6">
                <label className="form-label fw-medium text-secondary small">
                  Date
                </label>
                <div className="position-relative">
                  <input
                    type="date"
                    className="form-control shadow-none pe-5"
                    style={{ padding: "0.625rem 0.75rem" }}
                  />
                  <Calendar
                    className="position-absolute text-muted top-50 end-0 translate-middle-y me-3 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-2">
              <label className="form-label fw-medium text-secondary small">
                Amount
              </label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary small">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="form-control shadow-none"
                  style={{ padding: "0.75rem 0.75rem 0.75rem 2.2rem" }}
                />
              </div>
            </div>
          </div>

          {/* Add Another Source Action */}
          <button
            type="button"
            className="btn w-100 py-3 text-secondary fw-medium d-flex align-items-center justify-content-center gap-2 mb-4 shadow-none"
            style={{
              border: "1px dashed #dee2e6",
              backgroundColor: "transparent",
            }}
          >
            <Plus size={16} />
            Add Another Source
          </button>

          {/* Info Banner */}
          <div
            className="alert border d-flex align-items-start gap-3 p-3 mb-4"
            style={{
              backgroundColor: "#f0f7f4",
              borderColor: "#d2eae0",
              color: "#053225",
            }}
          >
            <Info className="flex-shrink-0 mt-1" size={18} />
            <p className="m-0 small lh-base" style={{ opacity: 0.9 }}>
              This entry will automatically update your projected reports and
              envelope balances if linked.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="row g-3 pt-2">
            <div className="col-6">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-dark w-100 py-3 fw-medium shadow-none"
              >
                Cancel
              </button>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn text-white w-100 py-3 fw-medium shadow-none"
                style={{ backgroundColor: "#053225", borderColor: "#053225" }}
              >
                Save Income Sources
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
