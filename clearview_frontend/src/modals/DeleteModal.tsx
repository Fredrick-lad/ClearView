import React from "react";

interface DeleteEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteConfirm?: () => void;
  envelopeName?: string;
  transactionCount?: number;
}

export default function DeleteEnvelopeModal({
  isOpen,
  onClose,
  onDeleteConfirm,
  envelopeName = "Groceries",
  transactionCount = 42,
}: DeleteEnvelopeModalProps) {
  if (!isOpen) return null;

  // ClearView style system matching screen_6.png
  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    warningRed: "#B91C1C", // Solid delete action red
    warningBgTint: "#FEF2F2", // Soft red background alert fill
    calloutBg: "#FBFBFC", // Neutral soft grey panel
    borderLight: "rgba(0, 0, 0, 0.12)",
  };

  const handleDelete = () => {
    if (onDeleteConfirm) onDeleteConfirm();
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(212, 222, 218, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1060,
      }}
    >
      {/* Modal Container Box */}
      <div
        className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden w-100 mx-3"
        style={{ maxWidth: "490px" }}
      >
        <div className="p-4">
          {/* Header Warning Layout Section */}
          <div className="d-flex align-items-start gap-3 mb-3">
            {/* Warning Icon Container */}
            <div
              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: colors.warningBgTint,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={colors.warningRed}
                style={{ width: "22px", height: "22px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>

            {/* Title Block */}
            <div>
              <h3
                className="h4 mb-1 fw-bold text-dark lh-sm"
                style={brandSerif}
              >
                Delete
                <br />
                Envelope
              </h3>
              <p
                className="text-secondary small mb-0 mt-2 lh-base"
                style={brandSerif}
              >
                Are you sure you want to delete the{" "}
                <strong className="text-dark">'{envelopeName}'</strong>{" "}
                envelope? This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Left-Border Custom Callout Warning Block */}
          <div
            className="p-3 border-start border-4 mb-3 rounded-end-2"
            style={{
              backgroundColor: colors.calloutBg,
              borderColor: colors.warningRed,
            }}
          >
            <p
              className="mb-0 text-secondary lh-base"
              style={{ ...brandSerif, fontSize: "13px", fontStyle: "italic" }}
            >
              Associated transaction history will still carry the '
              {envelopeName}' envelope name for your records. Any remaining
              balance in this envelope will be moved back to your 'Unallocated'
              amount.
            </p>
          </div>

          {/* Metadata Statistics Bar Panel */}
          <div
            className="border rounded-3 p-3 d-flex justify-content-between align-items-center gap-3 mb-4 text-dark"
            style={{
              borderColor: colors.borderLight,
              backgroundColor: colors.calloutBg,
              fontSize: "13px",
            }}
          >
            {/* Left Stat Counter */}
            <div className="d-flex align-items-center gap-2 fw-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-muted"
                style={{ width: "18px", height: "18px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>{transactionCount} Transactions</span>
            </div>

            {/* Right Information Indicator */}
            <div className="d-flex align-items-center gap-2 fw-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-muted"
                style={{ width: "18px", height: "18px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
              <span>Keep Name for History</span>
            </div>
          </div>

          {/* Form Actions Footer Elements */}
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-white bg-white border px-4 py-2.5 rounded-3 text-dark fw-semibold small shadow-sm w-50"
              style={{ borderColor: colors.borderLight }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn text-white px-4 py-2.5 rounded-3 fw-semibold small shadow-sm w-50 d-inline-flex align-items-center justify-content-center gap-2 border-0"
              style={{ backgroundColor: colors.warningRed }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: "15px", height: "15px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.24l-.35 10.51a2.25 2.25 0 0 1-2.24 2.18H7.44a2.25 2.25 0 0 1-2.24-2.18L4.65 6.26m10.92-.82l-.5-.5a2.25 2.25 0 0 0-1.6-.64h-2.54a2.25 2.25 0 0 0-1.6.64l-.5.5m9.96 0H4.65"
                />
              </svg>
              Delete Envelope
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
