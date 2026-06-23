import { useState } from "react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";

interface DeleteEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteEnvelopeModal({
  isOpen,
  onClose,
}: DeleteEnvelopeModalProps) {
  const { getEnvelopes } = useAuth();
  const { selectedEnvelope, setSelectedEnvelope, addNotification } = GetData();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const envelopeName = selectedEnvelope?.name ?? "this envelope";

  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    warningRed: "#B91C1C",
    warningBgTint: "#FEF2F2",
    calloutBg: "#FBFBFC",
    borderLight: "rgba(0, 0, 0, 0.12)",
  };

  const handleDelete = async () => {
    if (!selectedEnvelope?.id) {
      setError("No envelope selected.");
      return;
    }
    setDeleting(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:4000/deleteenvelope/${selectedEnvelope.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (response.ok) {
        await getEnvelopes();
        addNotification({
          title: "Envelope Deleted",
          description: `"${envelopeName}" has been deleted.`,
          type: "envelope",
        });
        setSelectedEnvelope(null);
        onClose();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message ?? "Failed to delete envelope.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };
  console.log(selectedEnvelope);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(212, 222, 218, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1060,
      }}
    >
      <div
        className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden w-100 mx-3"
        style={{ maxWidth: "490px" }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="d-flex align-items-start gap-3 mb-3">
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
            <div>
              <h3
                className="h4 mb-1 fw-bold text-dark lh-sm"
                style={brandSerif}
              >
                Delete Envelope
              </h3>
              <p
                className="text-secondary small mb-0 mt-2 lh-base"
                style={brandSerif}
              >
                Are you sure you want to delete{" "}
                <strong className="text-dark">'{envelopeName}'</strong>? This
                action cannot be undone.
              </p>
            </div>
          </div>

          {/* Warning callout */}
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
              Any remaining balance in this envelope will be freed from your
              allocations. Historical expenses linked to this envelope will keep
              its name for your records.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small mb-3">{error}</div>
          )}

          {/* Actions */}
          <div className="d-flex align-items-center gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-white border px-4 py-2 rounded-3 text-dark fw-semibold small shadow-sm w-50"
              style={{ borderColor: colors.borderLight }}
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn text-white px-4 py-2 rounded-3 fw-semibold small shadow-sm w-50 d-inline-flex align-items-center justify-content-center gap-2 border-0"
              style={{ backgroundColor: colors.warningRed }}
              disabled={deleting}
            >
              {deleting ? (
                "Deleting…"
              ) : (
                <>
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
                      d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.24-.35 10.51a2.25 2.25 0 0 1-2.24 2.18H7.44a2.25 2.25 0 0 1-2.24-2.18L4.65 6.26m10.92-.82-.5-.5a2.25 2.25 0 0 0-1.6-.64h-2.54a2.25 2.25 0 0 0-1.6.64l-.5.5m9.96 0H4.65"
                    />
                  </svg>
                  Delete Envelope
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
