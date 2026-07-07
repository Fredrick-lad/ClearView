import TopBar from "../components/layout/Topbar";
import { GetData } from "../hooks/context/generalContext";
import { useAuth } from "../hooks/context/userContext";
import { iconMap } from "../components/ui/iconMap";
import ProgBar from "../hooks/ProgBar";
import { formatCurrency } from "../utils/format";

export default function MyEnvelopes() {
  const { setModal, setSelectedEnvelope, goBack } = GetData();
  const { envelopeData } = useAuth();

  const envelopes: any[] = Array.isArray(envelopeData) ? envelopeData : [];

  // --- Derived summary totals ---
  const totalBudgeted = envelopes.reduce(
    (sum, e) => sum + Number(e.monthly_limit ?? 0),
    0,
  );
  const totalSpent = envelopes.reduce(
    (sum, e) => sum + Number(e.current_spend ?? 0),
    0,
  );
  const remaining = totalBudgeted - totalSpent;

  const summaryCards = [
    {
      title: "Total Budgeted",
      value: formatCurrency(totalBudgeted),
      valueColor: "text-dark",
    },
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent),
      valueColor: totalSpent > totalBudgeted ? "text-danger" : "text-dark",
    },
    {
      title: "Remaining",
      value: formatCurrency(remaining),
      valueColor: remaining < 0 ? "text-danger" : "text-success",
    },
    {
      title: "Envelopes",
      value: String(envelopes.length),
      valueColor: "text-dark",
      sub: `${envelopes.filter((e) => Number(e.current_spend ?? 0) / Number(e.monthly_limit ?? 1) >= 0.9).length} near limit`,
    },
  ];

  const designTokens = {
    cardBg: "var(--cv-envelope-card-bg)",
    primaryDark: "var(--cv-primary-dark)",
  };

  const openEdit = (envelope: any) => {
    setSelectedEnvelope(envelope);
    setModal("edit");
  };

  const openDelete = (envelope: any) => {
    setSelectedEnvelope(envelope);
    setModal("del");
  };
  return (
    <div
      className="px-3 px-md-4 mx-auto bg-ui-bg pb-5"
      style={{ maxWidth: "1300px" }}
    >
      <TopBar title="My Envelopes" showBack onBack={goBack} showActionBtn />

      {/* --- SUMMARY CARDS --- */}
      <div className="row g-4 mb-5">
        {summaryCards.map((card, idx) => (
          <div className="col-12 col-md-6 col-lg-3" key={idx}>
            <div
              className="card h-100 p-4 border-0 shadow-sm bg-white"
              style={{ borderRadius: "12px" }}
            >
              <span
                className="text-uppercase text-muted fw-bold small d-block mb-2"
                style={{ fontSize: "11px", letterSpacing: "0.04em" }}
              >
                {card.title}
              </span>
              <p className={`h2 fw-bold mb-0 ${card.valueColor}`}>
                {card.value}
              </p>
              {card.sub && (
                <p className="text-muted small mb-0 mt-1">{card.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- ENVELOPES GRID --- */}
      {envelopes.length === 0 ? (
        <div
          className="text-center py-5 text-muted border rounded-4 bg-white"
          style={{ borderStyle: "dashed" }}
        >
          <p className="mb-2 fw-semibold">No envelopes yet.</p>
          <p className="small mb-3">
            Create your first semester envelope to start budgeting.
          </p>
          <button
            className="btn text-white px-4 py-2 border-0"
            style={{
              backgroundColor: designTokens.primaryDark,
              borderRadius: "8px",
            }}
            onClick={() => setModal("env")}
          >
            + New Envelope
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {envelopes.map((envelope: any, idx: number) => {
            const limit = Number(envelope.monthly_limit ?? 0);
            const spent = Number(envelope.current_spend ?? 0);
            const pct =
              limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;

            const Icon = iconMap[envelope.icon_name] ?? iconMap["Tag"];

            const statusColor =
              pct >= 90
                ? { text: "text-danger fw-bold", bar: "#e74c3c" }
                : pct >= 70
                  ? { text: "text-warning fw-semibold", bar: "#f39c12" }
                  : { text: "text-muted", bar: designTokens.primaryDark };

            const statusText =
              pct >= 100
                ? "Monthly budget limit reached"
                : pct >= 90
                  ? `${pct}% — Approaching limit`
                  : pct === 0
                    ? "No spending recorded yet"
                    : `${pct}% of monthly budget used`;

            return (
              <div className="col-12 col-md-6 col-lg-4" key={idx}>
                <div
                  className="card p-4 border-0 h-100 d-flex flex-column justify-content-between"
                  style={{
                    backgroundColor: designTokens.cardBg,
                    borderRadius: "12px",
                  }}
                >
                  {/* Header row: icon + name + actions */}
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="p-2 text-white rounded-3 d-flex align-items-center justify-content-center"
                          style={{ backgroundColor: designTokens.primaryDark }}
                        >
                          <Icon size={18} />
                        </div>
                        <h3
                          className="h5 fw-bold text-dark mb-0"
                          style={{ fontFamily: "serif" }}
                        >
                          {envelope.name}
                        </h3>
                      </div>

                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-light bg-white border border-secondary border-opacity-20 p-1 d-flex align-items-center justify-content-center rounded-1"
                          style={{ width: "28px", height: "28px" }}
                          onClick={() => openEdit(envelope)}
                          title="Edit envelope"
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            style={{ width: "14px", height: "14px" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          className="btn btn-sm btn-light bg-white border border-secondary border-opacity-20 p-1 d-flex align-items-center justify-content-center rounded-1"
                          style={{ width: "28px", height: "28px" }}
                          onClick={() => openDelete(envelope)}
                          title="Delete envelope"
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            style={{ width: "14px", height: "14px" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Spend vs limit */}
                    <div className="d-flex justify-content-between align-items-end mb-2">
                      <div>
                        <span
                          className="text-uppercase text-muted fw-bold d-block"
                          style={{ fontSize: "10px", letterSpacing: "0.03rem" }}
                        >
                          Spent
                        </span>
                        <span className="fw-bold text-dark h6 mb-0">
                          {formatCurrency(spent)}
                        </span>
                      </div>
                      <div className="text-end">
                        <span
                          className="text-uppercase text-muted fw-bold"
                          style={{ fontSize: "10px", letterSpacing: "0.03rem" }}
                        >
                          Limit
                        </span>
                        <span className="fw-bold text-secondary small d-block">
                          {formatCurrency(limit)}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <ProgBar pct={pct} color={statusColor.bar} />
                  </div>

                  {/* Footer status */}
                  <div className="mt-3">
                    <span
                      className={`small ${statusColor.text}`}
                      style={{ fontSize: "12px" }}
                    >
                      {statusText}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add new envelope card */}
          <div className="col-12 col-md-6 col-lg-4">
            <button
              className="card w-100 h-100 border-0 d-flex flex-column align-items-center justify-content-center gap-2 bg-transparent text-muted py-5"
              style={{
                borderRadius: "12px",
                border: "2px dashed #a3b1ab",
                minHeight: "160px",
                cursor: "pointer",
              }}
              onClick={() => setModal("env")}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                style={{ width: "32px", height: "32px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="small fw-semibold">New Envelope</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
