import React, { useState } from "react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import type { ModalKind } from "../types";
import { iconMap } from "../components/ui/iconMap";

interface CreateEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEnvelopeModal({
  isOpen,
  onClose,
}: CreateEnvelopeModalProps) {
  const { registerEnvelope } = useAuth();
  const { addNotification } = GetData();
  const [icon, setIcon] = useState<any>("");

  const [formdata, setFormdata] = useState({
    name: "",
    limit: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

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
  const spend = 0.0;
  const final = {
    ...formdata,
    spend,
    icon,
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerEnvelope(final);
    addNotification({
      title: "Envelope Created",
      description: `New envelope "${formdata.name}" created with a monthly limit of Ksh ${parseFloat(formdata.limit || "0").toLocaleString()}.`,
      type: "envelope",
    });
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
                name="name"
                value={formdata.name}
                onChange={handleChange}
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
                  name="limit"
                  value={formdata.limit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Icon Grid Choice */}
            <div
              className="mb-4"
              style={{
                maxHeight: "220px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <div className="row g-2">
                <p>Select an icon to present your envelope </p>
                {Object.entries(iconMap).map(([name, Icon]) => {
                  const isActive = icon === name;
                  return (
                    <>
                      <div
                        key={name}
                        className="col-1 d-flex align-items-center justify-content-center"
                        style={{
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          borderRadius: "8px",
                          backgroundColor:
                            icon === name ? colors.mintActiveBg : "#f8f9fa",
                          aspectRatio: "1",
                        }}
                        onClick={() => setIcon(name)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = colors.deepGreen;
                          e.currentTarget.style.backgroundColor =
                            colors.mintActiveBg;
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          // 3. Only reset the styles if this button is NOT the active one
                          if (!isActive) {
                            e.currentTarget.style.borderColor =
                              colors.inputBorder;
                            e.currentTarget.style.backgroundColor = "#f8f9fa";
                          }
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <Icon size={24} color={colors.deepGreen} />
                      </div>
                    </>
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
