import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import { iconMap } from "../components/ui/iconMap";

interface EditEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditEnvelopeModal({
  isOpen,
  onClose,
}: EditEnvelopeModalProps) {
  const { getEnvelopes } = useAuth();
  const { selectedEnvelope, addNotification } = GetData();

  const [formdata, setFormdata] = useState({
    name: "",
    limit: "",
  });
  const [icon, setIcon] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill when modal opens with a selected envelope
  useEffect(() => {
    if (selectedEnvelope) {
      setFormdata({
        name: selectedEnvelope.name ?? "",
        limit: String(selectedEnvelope.monthly_limit ?? ""),
      });
      setIcon(selectedEnvelope.icon_name ?? "");
    }
  }, [selectedEnvelope]);

  if (!isOpen) return null;

  const colors = {
    deepGreen: "var(--cv-deep-green)",
    inputBg: "var(--cv-older-card-bg)",
    inputBorder: "rgba(0, 0, 0, 0.12)",
    mintActiveBg: "var(--cv-light-green-accent)",
    mintActiveBorder: "var(--cv-deep-green)",
    footerBg: "var(--cv-older-card-bg)",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnvelope?.id) {
      setError("No envelope selected.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:4000/editenvelope/${selectedEnvelope.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formdata.name,
            limit: formdata.limit,
            icon: icon,
          }),
        },
      );
      if (response.ok) {
        await getEnvelopes();
        addNotification({
          title: "Envelope Updated",
          description: `"${formdata.name}" has been updated.`,
          type: "edit",
        });
        onClose();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message ?? "Failed to update envelope.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
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
      <div
        className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden w-100 mx-3"
        style={{ maxWidth: "540px" }}
      >
        <form onSubmit={handleFormSubmit}>
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between px-4 pt-4 pb-3 border-bottom border-light-subtle">
            <h3
              className="h5 mb-0 fw-bold text-dark"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Edit Envelope
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-link p-1 text-muted text-decoration-none shadow-none"
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

          {/* Body */}
          <div className="p-4">
            {error && (
              <div className="alert alert-danger py-2 small mb-3">{error}</div>
            )}

            {/* Envelope Name */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Envelope Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control py-2 px-3 border rounded-3 shadow-none text-dark fw-medium"
                value={formdata.name}
                onChange={handleChange}
                style={{
                  borderColor: colors.inputBorder,
                  backgroundColor: colors.inputBg,
                }}
                required
              />
            </div>

            {/* Monthly Limit */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Monthly Limit (KES)
              </label>
              <input
                type="number"
                name="limit"
                className="form-control py-2 px-3 border rounded-3 shadow-none text-dark fw-medium"
                value={formdata.limit}
                onChange={handleChange}
                placeholder="0.00"
                style={{
                  borderColor: colors.inputBorder,
                  backgroundColor: colors.inputBg,
                }}
                required
              />
            </div>

            {/* Icon picker */}
            <div className="mb-4">
              <label className="form-label text-dark small fw-medium mb-2">
                Icon
              </label>
              <div
                className="border rounded-3 p-3"
                style={{
                  borderColor: colors.inputBorder,
                  maxHeight: "180px",
                  overflowY: "auto",
                }}
              >
                <div className="row g-2">
                  {Object.entries(iconMap).map(([name, Icon]) => {
                    const isActive = icon === name;
                    return (
                      <div
                        key={name}
                        className="col-1 d-flex align-items-center justify-content-center"
                        style={{
                          cursor: "pointer",
                          borderRadius: "8px",
                          backgroundColor: isActive
                            ? colors.mintActiveBg
                            : "#f8f9fa",
                          aspectRatio: "1",
                          border: isActive
                            ? `2px solid ${colors.mintActiveBorder}`
                            : "2px solid transparent",
                        }}
                        onClick={() => setIcon(name)}
                      >
                        <Icon size={20} color={colors.deepGreen} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="p-3 d-flex align-items-center gap-3"
            style={{ backgroundColor: colors.footerBg }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn bg-white border px-4 py-2 rounded-3 text-dark fw-semibold small shadow-sm w-50"
              style={{ borderColor: colors.inputBorder }}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white px-4 py-2 rounded-3 fw-semibold small shadow-sm w-50 border-0"
              style={{ backgroundColor: colors.deepGreen }}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
