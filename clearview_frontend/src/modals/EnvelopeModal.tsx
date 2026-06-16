import React, { useState } from "react";

interface CreateEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEnvelopeModal({
  isOpen,
  onClose,
}: CreateEnvelopeModalProps) {
  const [selectedIcon, setSelectedIcon] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);

  if (!isOpen) return null;

  // ClearView brand guidelines
  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    deepGreen: "#0A4433",
    inputBorder: "rgba(0, 0, 0, 0.15)",
    mintActiveBg: "#CCECE0",
    mintActiveBorder: "#1B5E46",
    // Palette selections from screen_4.png
    pills: [
      "#0A4433", // Deep Green
      "#4D7A68", // Slate Sage
      "#005A36", // Vivid Emerald
      "#FFD7D5", // Pastel Pink
      "#2ED994", // Bright Mint
    ],
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Insert your layout envelope submission hook here
    onClose();
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
      {/* Modal Container */}
      <div
        className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden w-100 mx-3"
        style={{ maxWidth: "540px" }}
      >
        {/* Modal Header */}
        <div className="d-flex align-items-center justify-content-between px-4 pt-4 pb-3 border-bottom border-light-subtle">
          <h3 className="h5 mb-0 fw-bold text-dark" style={brandSerif}>
            Create New Envelope
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

        {/* Modal Form Content */}
        <div className="p-4">
          <form onSubmit={handleFormSubmit}>
            {/* Envelope Name */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Envelope Name
              </label>
              <input
                type="text"
                className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark"
                placeholder="e.g. Vacation Fund"
                style={{ borderColor: colors.inputBorder }}
                required
              />
            </div>

            {/* Monthly Limit */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Monthly Limit
              </label>
              <div className="input-group">
                <span
                  className="input-group-text bg-white border-end-0 py-2.5 ps-3 text-muted fw-medium"
                  style={{ borderColor: colors.inputBorder }}
                >
                  Ksh
                </span>
                <input
                  type="text"
                  className="form-control py-2.5 pe-3 ps-1 border border-start-0 rounded-end-3 shadow-none text-dark"
                  placeholder="0.00"
                  style={{ borderColor: colors.inputBorder }}
                  required
                />
              </div>
            </div>

            {/* Icon Grid Choice */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Icon
              </label>
              <div className="d-flex gap-2">
                {[
                  // Piggy Bank Vector
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-100 h-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0c0 1.214-.492 2.314-1.288 3.112A8.966 8.966 0 0 1 12 18.75m9-6.75a8.963 8.963 0 0 0-2.225-5.913M3 12c0 1.157.439 2.213 1.157 3A8.967 8.967 0 0 0 12 18.75M3 12a8.963 8.963 0 0 1 2.225-5.913M12 18.75A8.967 8.967 0 0 0 18.112 15M12 18.75A8.967 8.967 0 0 1 5.888 15m11.196-10.364A8.966 8.966 0 0 1 12 3c-1.804 0-3.468.531-4.862 1.442m10.12 1.254a8.955 8.955 0 0 1 1.63 2.054M7.138 4.442a8.955 8.955 0 0 0-1.63 2.054M16.5 10.5h-.008v.008H16.5V10.5Zm-6 0h-.008v.008h.008V10.5Z"
                    />
                  </svg>,
                  // Home Layout Vector
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-100 h-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>,
                  // Airplane Jet Vector
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-100 h-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5"
                    />
                  </svg>,
                  // Shopping Cart Vector
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-100 h-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-13.5-9h14.532c.155 0 .299.109.326.262l1.07 6.42a.375.375 0 0 1-.369.436H6.457L4.41 3.899"
                    />
                  </svg>,
                  // Dumbbell/Fitness Weight Vector
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-100 h-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15m0 0v-3.75m0 3.75v3.75m15-3.75v-3.75m0 3.75v3.75M3.375 7.5h1.5a1.125 1.125 0 0 1 1.125 1.125v6.75A1.125 1.125 0 0 1 4.875 16.5h-1.5a1.125 1.125 0 0 1-1.125-1.125v-6.75A1.125 1.125 0 0 1 3.375 7.5Zm15.75 0h1.5a1.125 1.125 0 0 1 1.125 1.125v6.75a1.125 1.125 0 0 1-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-6.75A1.125 1.125 0 0 1 19.125 7.5Z"
                    />
                  </svg>,
                ].map((iconSvg, idx) => {
                  const isActive = selectedIcon === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedIcon(idx)}
                      className="btn p-0 border rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "56px",
                        height: "46px",
                        backgroundColor: isActive
                          ? colors.mintActiveBg
                          : "#fff",
                        borderColor: isActive
                          ? colors.mintActiveBorder
                          : colors.inputBorder,
                        color: isActive ? colors.deepGreen : "#6C757D",
                        padding: "10px",
                      }}
                    >
                      <div style={{ width: "22px", height: "22px" }}>
                        {iconSvg}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Choice Array Row */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Color Choice
              </label>
              <div className="d-flex align-items-center gap-3">
                {colors.pills.map((colorHex, idx) => {
                  const isActive = selectedColor === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(idx)}
                      className="rounded-circle border-0 p-0 position-relative d-flex align-items-center justify-content-center"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: colorHex,
                        boxShadow: isActive
                          ? `0 0 0 2px #fff, 0 0 0 3.5px ${colors.deepGreen}`
                          : "none",
                        transition: "box-shadow 0.2s",
                      }}
                      aria-label={`Color option ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Form Actions Footer Panel */}
            <div className="d-flex align-items-center gap-3 pt-3">
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
                Create Envelope
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
