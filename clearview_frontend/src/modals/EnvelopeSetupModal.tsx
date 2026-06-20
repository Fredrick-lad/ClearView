import React from "react";
import { GetData } from "../hooks/context/generalContext";

interface EnvelopeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (selection: "preset" | "scratch") => void;
}

export const EnvelopeSetupModal: React.FC<EnvelopeSetupModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const { selectedOption, setSelectedOption } = GetData();

  if (!isOpen) return null;

  // Custom theme colors based on your image
  const colors = {
    primaryText: "#0f2d24",
    mutedText: "#5a6e65",
    recommendedBg: "#10b981",
    presetIconBg: "#d1fae5",
    scratchIconBg: "#f3f4f6",
    buttonActive: "#10b981", // Sage green from the image
    buttonDisabled: "#cbd5e1",
  };

  const handleContinue = async () => {
    console.log("selected:", selectedOption);

    if (!selectedOption) return;

    try {
      await onContinue(selectedOption);
      console.log("Setup completed, closing modal");
    } catch (error) {
      console.error("Error during setup:", error);
    } finally {
      setSelectedOption(null);
      onClose();
    }
  };

  return (
    <div
      className="modal d-block show"
      tabIndex={-1}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "540px" }}
      >
        <div className="modal-content border-0 shadow rounded-4 p-4 p-md-5 text-center">
          {/* Modal Header */}
          <div className="modal-header border-0 d-block p-0 mb-3">
            <h2
              className="modal-title fw-serif fs-3 mb-2"
              style={{
                color: colors.primaryText,
                fontFamily: "Georgia, serif",
              }}
            >
              How would you like to start?
            </h2>
            <p
              className="small mb-0 mx-auto"
              style={{
                color: colors.mutedText,
                maxWidth: "400px",
                lineHeight: "1.5",
              }}
            >
              Configure your digital envelopes to begin organizing your
              finances.
            </p>
          </div>

          {/* Modal Body / Options */}
          <div className="modal-body p-0 my-4">
            {/* Option 1: Preset Envelopes */}
            <div
              onClick={() => setSelectedOption("preset")}
              className={`d-flex align-items-start p-3 mb-3 rounded-3 border text-start position-relative`}
              style={{
                cursor: "pointer",
                borderColor:
                  selectedOption === "preset" ? "#002376" : "#002981",
                borderWidth: selectedOption === "preset" ? "2px" : "1px",
                backgroundColor:
                  selectedOption === "preset" ? "#10b9819a" : "#ffffff",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-3 me-3 flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: colors.presetIconBg,
                }}
              >
                {/* Sparkles Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#059669"
                  className="bi bi-sparkles"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.603 14.087a.25.25 0 0 1-.433 0L3.05 11.956a2.5 2.5 0 0 0-1.906-1.906L1.087 9.387a.25.25 0 0 1 0-.433l2.057-1.118a2.5 2.5 0 0 0 1.906-1.906l1.118-2.057a.25.25 0 0 1 .433 0l1.118 2.057a2.5 2.5 0 0 0 1.906 1.906l2.057 1.118a.25.25 0 0 1 0 .433l-2.057 1.118a2.5 2.5 0 0 0-1.906 1.906l-1.118 2.057zM12.613 5.517a.148.148 0 0 1-.257 0l-.615-1.134a1.48 1.48 0 0 0-1.134-1.134l-1.134-.615a.148.148 0 0 1 0-.257l1.134-.615a1.48 1.48 0 0 0 1.134-1.134l.615-1.134a.148.148 0 0 1 .257 0l.615 1.134a1.48 1.48 0 0 0 1.134 1.134l1.134.615a.148.148 0 0 1 0 .257l-1.134.615a1.48 1.48 0 0 0-1.134 1.134l-.615 1.134z" />
                </svg>
              </div>
              <div className="flex-grow-1 pe-5">
                <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                  <span
                    className="fw-bold"
                    style={{ color: colors.primaryText }}
                  >
                    Use Preset Envelopes
                  </span>
                  <span
                    className="badge rounded-pill text-uppercase fw-semibold"
                    style={{
                      backgroundColor: colors.recommendedBg,
                      fontSize: "0.65rem",
                      padding: "0.35em 0.65em",
                    }}
                  >
                    Recommended
                  </span>
                </div>
                <p
                  className="small mb-0"
                  style={{ color: colors.mutedText, fontSize: "0.85rem" }}
                >
                  Best for beginners. Includes standard categories: Rent,
                  Groceries, Utilities, and Savings.
                </p>
              </div>
            </div>

            {/* Option 2: Create from Scratch */}
            <div
              onClick={() => setSelectedOption("scratch")}
              className={`d-flex align-items-start p-3 rounded-3 border text-start`}
              style={{
                cursor: "pointer",
                borderColor:
                  selectedOption === "scratch" ? colors.primaryText : "#e5e7eb",
                borderWidth: selectedOption === "scratch" ? "2px" : "1px",
                backgroundColor:
                  selectedOption === "scratch" ? "#10b9819a" : "#ffffff",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-3 me-3 flex-shrink-0"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: colors.scratchIconBg,
                }}
              >
                {/* Pencil Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#374151"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </div>
              <div>
                <h6
                  className="fw-bold mb-1"
                  style={{ color: colors.primaryText }}
                >
                  Create from Scratch
                </h6>
                <p
                  className="small mb-0"
                  style={{ color: colors.mutedText, fontSize: "0.85rem" }}
                >
                  For advanced users who want full control over envelope names,
                  icons, and monthly limits.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer / Actions */}
          <div className="modal-footer border-0 d-block p-0 mt-2">
            <button
              type="button"
              className="btn w-100 py-2.5 fw-medium text-white rounded-3 mb-3 border-0"
              disabled={!selectedOption}
              onClick={handleContinue}
              style={{
                backgroundColor: selectedOption
                  ? colors.buttonActive
                  : colors.buttonDisabled,
                transition: "background-color 0.2s ease",
                paddingTop: "12px",
                paddingBottom: "12px",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
