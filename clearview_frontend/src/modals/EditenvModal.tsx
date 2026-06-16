import React, { useState } from "react";

interface EditEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditEnvelopeModal({
  isOpen,
  onClose,
}: EditEnvelopeModalProps) {
  const [selectedIcon, setSelectedIcon] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);

  if (!isOpen) return null;

  // Design tokens derived from screen_7.png
  const colors = {
    deepGreen: "#013328",
    inputBg: "#F8F9FA",
    inputBorder: "rgba(0, 0, 0, 0.12)",
    mintActiveBg: "#CCECE0",
    mintActiveBorder: "#0A4433",
    footerBg: "#F3F4F6",
    // 7 color palette options from screen_7.png
    accentColors: [
      "#0A4433", // Deep Green
      "#4D7A68", // Slate Sage
      "#2ED994", // Bright Mint
      "#C51B1B", // Crimson Red
      "#2F80ED", // Corporate Blue
      "#F2994A", // Vibrant Orange
      "#9B51E0", // Electric Purple
    ],
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Insert state modification hooks or update mutations here
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(3px)",
        zIndex: 1050,
      }}
    >
      {/* Modal Box Container */}
      <div
        className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden w-100 mx-3"
        style={{ maxWidth: "540px" }}
      >
        <form onSubmit={handleFormSubmit}>
          {/* Main Content Body */}
          <div className="p-4 pt-5">
            {/* Envelope Name Input */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Envelope Name
              </label>
              <input
                type="text"
                className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark fw-medium"
                defaultValue="Groceries"
                style={{
                  borderColor: colors.inputBorder,
                  backgroundColor: colors.inputBg,
                }}
                required
              />
            </div>

            {/* Monthly Limit Input */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Monthly Limit
              </label>
              <input
                type="text"
                className="form-control py-2.5 px-3 border rounded-3 shadow-none text-dark fw-medium"
                defaultValue="$800.00"
                style={{
                  borderColor: colors.inputBorder,
                  backgroundColor: colors.inputBg,
                }}
                required
              />
            </div>

            {/* Icon 2x6 Grid Picker */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Icon
              </label>
              <div
                className="p-3 border rounded-3 bg-light-subtle"
                style={{ borderColor: colors.inputBorder }}
              >
                <div className="row g-2">
                  {[
                    // ROW 1
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
                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.5a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                      />
                    </svg>,
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
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                      />
                    </svg>,
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
                        d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 18.4V14.15m16.5 0c0-1.267-.783-2.355-1.921-2.791l-1.31-.5a3.748 3.748 0 0 0-2.83 0l-1.13.432a1.875 1.875 0 0 1-1.342 0l-1.13-.432a3.748 3.748 0 0 0-2.83 0l-1.31.5c-1.138.436-1.921 1.524-1.921 2.791m16.5 0c0 .356-.026.706-.076 1.048a18.24 18.24 0 0 1-16.348 0A18.177 18.177 0 0 1 3.75 14.15m12.115-4.52a2.25 2.25 0 0 0-3.23 0l-.883.883-.884-.884a2.25 2.25 0 0 0-3.23 0l-2.25 2.25h12.713l-2.25-2.25Z"
                      />
                    </svg>,
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
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.75M3.75 14.25h16.5M3.75 14.25V5.625c0-.621.504-1.125 1.125-1.125H12m0 0v-1.5m0 1.5h5.625c.621 0 1.125.504 1.125 1.125V9.75M12 2.625a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>,
                    // ROW 2
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 3h.008v.008H12V18Zm-3-3h.008v.008H9V15Zm0 3h.008v.008H9V18Zm6-3h.008v.008H15V15Zm0 3h.008v.008H15V18Zm-6-6h.008v.008H9v-.008Zm6 0h.008v.008H15v-.008Z"
                      />
                    </svg>,
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
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 14.157c2.723 0 5.34.422 7.804 1.205l-.49-6.347M12 14.157a60.757 60.757 0 0 1-7.74-4.01M12 14.157a60.74 60.74 0 0 0 7.74-4.01M6.18 10.23c-.413-1.636.56-3.327 2.197-3.74a60.55 60.55 0 0 1 7.246 0c1.637.413 2.61 2.104 2.197 3.74M12 4.125V3m0 11.125v4.375m0 0H8.25m3.75 0h3.75"
                      />
                    </svg>,
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
                        d="M8.284 16.284A3 3 0 0 1 12 15a3 3 0 0 1 3.716 1.284M6.165 14.165a6 6 0 0 1 8.67 0M4.045 12.045a9 9 0 0 1 12.91 0M12 18a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>,
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
                        d="M15.343 7.575a8.25 8.25 0 0 1 1.165 4.356c0 .408-.03.812-.088 1.208M1.125 19.307a.75.75 0 0 1-.122-.08l-.22-.22a.75.75 0 0 1 .012-1.074l3.111-2.903m1.442-1.443L17.25 3.75M4.343 14.657l1.443-1.443m0 0L14.657 4.343m-8.87 8.87a8.25 8.25 0 0 0 11.127 11.128M15.115 15.115l3.111 2.903a.75.75 0 0 1 .012 1.074l-.22.22a.75.75 0 0 1-1.074-.012l-2.903-3.111m-1.443-1.442a8.232 8.232 0 0 1-3.116-1.684m0 0a8.232 8.232 0 0 1-1.684-3.116"
                      />
                    </svg>,
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
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>,
                  ].map((iconSvg, idx) => {
                    const isActive = selectedIcon === idx;
                    return (
                      <div key={idx} className="col-2">
                        <button
                          type="button"
                          onClick={() => setSelectedIcon(idx)}
                          className="btn p-0 border w-100 d-flex align-items-center justify-content-center transition-all"
                          style={{
                            height: "48px",
                            backgroundColor: isActive
                              ? colors.mintActiveBg
                              : "transparent",
                            borderColor: isActive
                              ? colors.mintActiveBorder
                              : "transparent",
                            color: isActive
                              ? colors.mintActiveBorder
                              : "#4B5563",
                            padding: "12px",
                            borderRadius: "4px",
                          }}
                        >
                          {iconSvg}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Accent Color Selection Row */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Accent Color
              </label>
              <div className="d-flex align-items-center gap-2.5">
                {colors.accentColors.map((colorHex, idx) => {
                  const isActive = selectedColor === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(idx)}
                      className="rounded-circle border-0 p-0 position-relative d-flex align-items-center justify-content-center"
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: colorHex,
                        boxShadow: isActive
                          ? `0 0 0 2px #fff, 0 0 0 3.5px ${colors.accentColors[0]}`
                          : "none",
                        transition: "box-shadow 0.2s",
                      }}
                      aria-label={`Accent option ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Ghost Low-Contrast Info Block */}
            <div className="d-flex align-items-start gap-2.5 mt-4 px-1 opacity-40">
              <div
                className="mt-0.5 flex-shrink-0"
                style={{ width: "16px", height: "16px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-100 h-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
              <p
                className="mb-0 text-dark"
                style={{ fontSize: "12px", lineHeight: "1.4" }}
              >
                This entry will automatically update your projected reports and
                envelope balances if linked.
              </p>
            </div>
          </div>

          {/* Dedicated Grey Container Footer Block */}
          <div
            className="p-3 d-flex align-items-center gap-3"
            style={{ backgroundColor: colors.footerBg }}
          >
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
              className="btn text-white px-4 py-2.5 rounded-3 fw-semibold small shadow-sm w-50 border-0"
              style={{ backgroundColor: colors.deepGreen }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
