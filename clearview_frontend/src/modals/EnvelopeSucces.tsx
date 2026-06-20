interface EnvelopeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnvelopeSuccessModal({
  isOpen,
  onClose,
}: EnvelopeSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Custom Backdrop to closely match the dark, high-opacity blur overlay in the image */}
      <div
        className="modal-backdrop fade show"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal Container */}
      <div
        className="modal fade show d-block d-flex align-items-center justify-content-center"
        tabIndex={-1}
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "420px", width: "100%" }}
        >
          <div
            className="modal-content border-0 shadow-lg p-4 text-center"
            style={{ borderRadius: "4px" }}
          >
            <div className="modal-body p-4 d-flex flex-column align-items-center">
              {/* Green Success Check Icon Background */}
              <div
                className="d-flex align-items-center justify-content-center rounded-circle mb-4"
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#D1EAE0", // Soft green background
                }}
              >
                {/* SVG Checkmark icon matching the design */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#064E3B" // Deep forest green
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              {/* Title */}
              <h2
                className="mb-3"
                style={{
                  color: "#012A1C",
                  fontFamily: "Georgia, serif",
                  fontWeight: "600",
                  fontSize: "1.75rem",
                }}
              >
                Envelope Registered
                <br />
                Successfully
              </h2>

              {/* Subtitle / Description */}
              <p
                className="text-muted mb-4 px-3"
                style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
              >
                Your envelope has been registered successfully.
              </p>

              {/* Action Button */}
              <button
                type="button"
                className="btn w-100 text-white py-2"
                onClick={onClose}
                style={{
                  backgroundColor: "#014737", // Deep green theme color
                  borderColor: "#014737",
                  borderRadius: "4px",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                  letterSpacing: "0.3px",
                }}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
