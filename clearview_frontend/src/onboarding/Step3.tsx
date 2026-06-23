import { useEffect, useState } from "react";
import { HelpCircle, ArrowLeft, Check, Plus, Loader } from "lucide-react";

import { iconMap } from "../components/ui/iconMap";

import { useNavigate } from "react-router-dom";
import { GetData } from "../hooks/context/generalContext";
import CreateEnvelopeModal from "../modals/EnvelopeModal";
import { useAuth } from "../hooks/context/userContext";

export default function OnboardingStep3() {
  const { getEnvelopes, envelopeData, fetchDashboardData } = useAuth();
  const { modal, setModal } = GetData();

  const navigate = useNavigate();
  const [finishing, setFinishing] = useState(false);

  const handleFinish = async () => {
    setFinishing(true);
    try {
      await fetchDashboardData();
    } catch {
      // proceed regardless
    }
    navigate("/dashboard");
  };

  const envelopes: any[] = Array.isArray(envelopeData) ? envelopeData : [];
  const totalBudget = envelopes.reduce(
    (sum: number, e: any) => sum + Number(e.monthly_limit || 0),
    0,
  );

  const handleModalClose = async () => {
    setModal(null);
    await getEnvelopes();
  };

  return (
    <>
      <div className="min-vh-100 d-flex flex-column bg-white">
        {/* Top Header Navigation */}
        <header className="d-flex justify-content-between align-items-center px-4 py-3 w-100">
          <div
            className="fw-bold fs-4"
            style={{
              color: "#053225",
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            ClearView
          </div>

          <button className="btn d-flex align-items-center gap-1 text-secondary border-0 p-0 shadow-none small fw-medium">
            <HelpCircle size={18} />
          </button>
        </header>

        {/* Main Content Area */}
        <main
          className="flex-grow-1 container py-4"
          style={{ maxWidth: "960px" }}
        >
          {/* Progress Timeline Header (Unified Style matching Step 2) */}
          <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
            <div className="d-flex align-items-center gap-2">
              {/* Step 1: Completed */}
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#cbece1",
                  color: "#053225",
                }}
              >
                <Check size={16} strokeWidth={3} />
              </div>

              <div
                style={{
                  width: "24px",
                  height: "1px",
                  backgroundColor: "#053225",
                }}
              ></div>

              {/* Step 2: Completed */}
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#cbece1",
                  color: "#053225",
                }}
              >
                <Check size={16} strokeWidth={3} />
              </div>

              <div
                style={{
                  width: "24px",
                  height: "1px",
                  backgroundColor: "#053225",
                }}
              ></div>

              {/* Step 3: Active Final Step */}
              <div
                className="d-flex align-items-center justify-content-center rounded-circle fw-medium"
                style={{
                  width: "32px",
                  height: "32px",
                  border: "2px solid #053225",
                  color: "#053225",
                  fontSize: "0.9rem",
                }}
              >
                3
              </div>
            </div>

            <div
              className="text-muted fw-bold tracking-wider"
              style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
            >
              STEP 3 OF 3
            </div>
          </div>

          {/* Dynamic Header Titles */}
          <div
            className="text-center mb-5 mx-auto"
            style={{ maxWidth: "680px" }}
          >
            <h1
              className="fw-bold mb-2"
              style={{
                color: "#053225",
                fontFamily: "Georgia, serif",
                fontSize: "2rem",
              }}
            >
              Your student budget is ready.
            </h1>
            <p
              className="text-secondary mb-0 px-2"
              style={{ fontSize: "0.95rem" }}
            >
              We've created envelopes based on your income. Each one helps you
              track a specific part of your student spending.
            </p>
          </div>
          {/* Summary stats */}
          {envelopes.length > 0 && (
            <div className="d-flex gap-3 mb-4 flex-wrap justify-content-center">
              <div className="bg-light rounded-3 px-3 py-2 text-center">
                <div className="fw-bold text-dark">{envelopes.length}</div>
                <div className="text-muted" style={{ fontSize: "0.7rem" }}>Envelopes</div>
              </div>
              <div className="bg-light rounded-3 px-3 py-2 text-center">
                <div className="fw-bold text-dark">KES {totalBudget.toLocaleString()}</div>
                <div className="text-muted" style={{ fontSize: "0.7rem" }}>Total Budget</div>
              </div>
            </div>
          )}

          {/* 1. Wrap the loop in a Bootstrap row with responsive column rules */}
          <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
            {envelopes.map((envelope: any) => {
              const Icon = iconMap[envelope.icon_name] ?? iconMap["Tag"];
              const remainingBudget =
                envelope.monthly_limit - envelope.current_spend;
              const spendPercent = Math.min(
                Math.round(
                  (envelope.current_spend / envelope.monthly_limit) * 100,
                ),
                100,
              );

              // Color logic based on spend %
              const statusColor =
                spendPercent >= 90
                  ? { bar: "#e74c3c", badge: "#fdf0ef", text: "#c0392b" } // red
                  : spendPercent >= 70
                    ? { bar: "#f39c12", badge: "#fef9ec", text: "#b7770d" } // amber
                    : { bar: "#1a7a5e", badge: "#e2f3ee", text: "#053225" }; // green

              return (
                <div className="col" key={envelope.name}>
                  <div
                    className="rounded-4 p-3 bg-white h-100 d-flex flex-column justify-content-between"
                    style={{
                      border: "1px solid #eaedf0",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Top: Icon + Status dot */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: statusColor.badge,
                          color: statusColor.text,
                          width: "40px",
                          height: "40px",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        className="rounded-pill px-2 py-1 fw-semibold"
                        style={{
                          backgroundColor: statusColor.badge,
                          color: statusColor.text,
                          fontSize: "0.7rem",
                        }}
                      >
                        {spendPercent}%
                      </span>
                    </div>

                    {/* Middle: Name + Limit */}
                    <div className="mb-3">
                      <h3
                        className="fw-bold mb-0"
                        style={{ color: "#053225", fontSize: "0.95rem" }}
                      >
                        {envelope.name}
                      </h3>
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.78rem" }}
                      >
                        KES {envelope.monthly_limit.toLocaleString()} limit
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div
                        className="rounded-pill overflow-hidden"
                        style={{ height: "6px", backgroundColor: "#eaedf0" }}
                      >
                        <div
                          className="rounded-pill"
                          style={{
                            width: `${spendPercent}%`,
                            height: "100%",
                            backgroundColor: statusColor.bar,
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>

                    {/* Bottom: Remaining */}
                    <div
                      className="d-flex align-items-center justify-content-between rounded-3 px-3 py-2"
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #eaedf0",
                      }}
                    >
                      <span
                        className="text-secondary text-uppercase fw-semibold"
                        style={{ fontSize: "0.68rem", letterSpacing: "0.05em" }}
                      >
                        Remaining
                      </span>
                      <span
                        className="fw-bold"
                        style={{ color: statusColor.text, fontSize: "0.95rem" }}
                      >
                        KES {remainingBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {envelopes.length === 0 && (
            <div className="text-center py-5 text-muted">
              <p className="mb-3">No envelopes yet. Create one to start budgeting for the semester.</p>
            </div>
          )}

          {/* Action Button: Create Custom Envelope */}
          <div className="row mt-4 mb-5">
            <div className="col-12 col-md-4">
              <button
                type="button"
                className="btn w-100 py-4 text-dark d-flex flex-column align-items-center justify-content-center gap-2 bg-transparent shadow-none"
                style={{
                  border: "1px dashed #a3b1ab",
                  borderRadius: "4px",
                  minHeight: "160px",
                }}
                onClick={() => setModal("env")}
              >
                <Plus size={24} className="text-dark" />
                <span
                  className="small fw-semibold"
                  style={{ letterSpacing: "0.02em" }}
                >
                  Add a custom envelope
                </span>
                <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                  e.g. Books, Hostel, Data, Savings
                </span>
              </button>
            </div>
          </div>
          {modal === "env" ? (
            <CreateEnvelopeModal
              isOpen={modal === "env"}
              onClose={handleModalClose}
            />
          ) : null}

          {/* Motivational Peace of Mind Banner (at the base of screen_4.png) */}
          <div
            className="p-4 p-md-5 text-white rounded text-center my-4 position-relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #a4c3b2 0%, #708d81 100%)",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.05)",
            }}
          >
            <div className="position-relative" style={{ zIndex: 1 }}>
              <h4
                className="fw-bold mb-2"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem" }}
              >
                Financial Peace of Mind
              </h4>
              <p
                className="m-0 mx-auto opacity-90 small"
                style={{ maxWidth: "520px", lineHeight: "1.5" }}
              >
                Visualizing your budget helps you stay on track and reach your
                goals faster.
              </p>
            </div>
          </div>
        </main>

        {/* Sticky Bottom Actions Bar */}
        <footer className="border-top py-3 px-4 bg-white mt-auto">
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Back Navigation Button */}
            <button
              type="button"
              className="btn btn-outline-dark d-inline-flex align-items-center gap-2 px-4 py-2.5 fw-medium"
              style={{ borderRadius: "4px" }}
              onClick={() => navigate("/onboardingStep2")}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {/* Next Action Progression */}
            <button
              onClick={handleFinish}
              disabled={finishing}
              className="btn text-white d-inline-flex align-items-center gap-2 px-5 py-2.5 fw-medium border-0 shadow-none"
              style={{ backgroundColor: "#0F6E56", borderRadius: "4px", opacity: finishing ? 0.7 : 1 }}
            >
              {finishing ? (
                <><Loader size={16} className="spinner-border spinner-border-sm" /> Loading…</>
              ) : (
                "Finish Setup"
              )}
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
