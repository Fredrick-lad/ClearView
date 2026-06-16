import React, { useState } from "react";
import {
  HelpCircle,
  ArrowLeft,
  Check,
  Plus,
  Home,
  Utensils,
  Car,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../hooks/context/generalContext";
import AddExpenseModal from "../modals/AddExpenseModal";
import AddIncomeModal from "../modals/IncomeModal";
import CreateEnvelopeModal from "../modals/EnvelopeModal";

export default function OnboardingStep3() {
  const { modal, setModal } = GetData();
  const navigate = useNavigate();
  const [housingLimit, setHousingLimit] = useState("1200");
  const [foodLimit, setFoodLimit] = useState("400");
  const [transportLimit, setTransportLimit] = useState("200");

  const handleFinish = () => {
    console.log("Onboarding completed successfully!", {
      housingLimit,
      foodLimit,
      transportLimit,
    });
    navigate("/dashboard");
  };

  return (
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
        <div className="text-center mb-5 mx-auto" style={{ maxWidth: "680px" }}>
          <h1
            className="fw-bold mb-2"
            style={{
              color: "#053225",
              fontFamily: "Georgia, serif",
              fontSize: "2rem",
            }}
          >
            Create your first envelopes.
          </h1>
          <p
            className="text-secondary mb-0 px-2"
            style={{ fontSize: "0.95rem" }}
          >
            Envelopes help you allocate your income into categories like
            Groceries, Rent, or Savings.
          </p>
        </div>

        {/* Envelopes Selection Grid */}
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
          {/* Card 1: Housing */}
          <div className="col">
            <div className="border rounded p-4 bg-white position-relative shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#e2f3ee", color: "#053225" }}
                  >
                    <Home size={20} />
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      backgroundColor: "#053225",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                </div>
                <h3 className="h5 fw-bold mb-1" style={{ color: "#053225" }}>
                  Housing
                </h3>
                <p className="text-muted small mb-4">
                  Rent, Mortgage, Utilities
                </p>
              </div>
              <div>
                <label className="form-label text-secondary fw-medium small mb-1">
                  Monthly Limit
                </label>
                <div className="position-relative">
                  <span className="position-absolute top-50  start-0 translate-middle-y ms-3 text-secondary">
                    Ksh
                  </span>
                  <input
                    type="number"
                    value={housingLimit}
                    onChange={(e) => setHousingLimit(e.target.value)}
                    className="form-control shadow-none py-2.5"
                    style={{
                      paddingLeft: "3rem",
                      borderColor: "#ced4da",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Food */}
          <div className="col">
            <div className="border rounded p-4 bg-white position-relative shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#e2f3ee", color: "#053225" }}
                  >
                    <Utensils size={20} />
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      backgroundColor: "#053225",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                </div>
                <h3 className="h5 fw-bold mb-1" style={{ color: "#053225" }}>
                  Food
                </h3>
                <p className="text-muted small mb-4">Groceries, Dining Out</p>
              </div>
              <div>
                <label className="form-label text-secondary fw-medium small mb-1">
                  Monthly Limit
                </label>
                <div className="position-relative">
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">
                    Ksh
                  </span>
                  <input
                    type="number"
                    value={foodLimit}
                    onChange={(e) => setFoodLimit(e.target.value)}
                    className="form-control shadow-none py-2.5"
                    style={{
                      paddingLeft: "3rem",
                      borderColor: "#ced4da",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Transport */}
          <div className="col">
            <div className="border rounded p-4 bg-white position-relative shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#e2f3ee", color: "#053225" }}
                  >
                    <Car size={20} />
                  </div>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                      backgroundColor: "#053225",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                </div>
                <h3 className="h5 fw-bold mb-1" style={{ color: "#053225" }}>
                  Transport
                </h3>
                <p className="text-muted small mb-4">
                  Fuel, Public Transit, Maintenance
                </p>
              </div>
              <div>
                <label className="form-label text-secondary fw-medium small mb-1">
                  Monthly Limit
                </label>
                <div className="position-relative">
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">
                    Ksh
                  </span>
                  <input
                    type="number"
                    value={transportLimit}
                    onChange={(e) => setTransportLimit(e.target.value)}
                    className="form-control shadow-none py-2.5"
                    style={{
                      paddingLeft: "3rem",
                      borderColor: "#ced4da",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Create Custom Envelope */}
        <div className="row mb-5">
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
                Create Custom Envelope
              </span>
            </button>
          </div>
        </div>
        {modal === "env" ? (
          <CreateEnvelopeModal
            isOpen={true}
            onClose={() => {
              setModal(null);
            }}
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
            className="btn text-white d-inline-flex align-items-center gap-2 px-5 py-2.5 fw-medium border-0 shadow-none"
            style={{ backgroundColor: "#0F6E56", borderRadius: "4px" }}
          >
            Finish Setup
          </button>
        </div>
      </footer>
    </div>
  );
}
