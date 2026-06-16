import React, { useState } from "react";
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  PlusCircle,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnboardingStep2() {
  const navigate = useNavigate();
  const [sourceName, setSourceName] = useState("");
  const [amount, setAmount] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding to step 3...");
    navigate("/onboardingStep3");
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
          Support
        </button>
      </header>

      {/* Main Form Content Container */}
      <main
        className="flex-grow-1 container py-4"
        style={{ maxWidth: "820px" }}
      >
        {/* Progress Timeline Header */}
        <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
          {/* Visual Step Nodes */}
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
                backgroundColor: "#6c757d",
              }}
            ></div>

            {/* Step 2: Active */}
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
              2
            </div>

            <div
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "#dee2e6",
              }}
            ></div>

            {/* Step 3: Upcoming */}
            <div
              className="d-flex align-items-center justify-content-center rounded-circle text-muted"
              style={{
                width: "32px",
                height: "32px",
                border: "1px solid #dee2e6",
                backgroundColor: "#f8faf9",
                fontSize: "0.9rem",
              }}
            >
              3
            </div>
          </div>

          {/* Text Step Counter */}
          <div
            className="text-muted fw-bold tracking-wider"
            style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            STEP 2 OF 3
          </div>
        </div>

        {/* Dynamic Header Section (from screen_3.png) */}
        <div className="mb-4">
          <h1
            className="fw-bold mb-2"
            style={{
              color: "#053225",
              fontFamily: "Georgia, serif",
              fontSize: "2rem",
            }}
          >
            Tell us about your income.
          </h1>
          <p className="text-secondary mb-0">
            Add your regular salary, side hustles, or other income sources to
            build your monthly budget.
          </p>
        </div>

        {/* Income Entry Card Group */}
        <div className="border rounded p-4 mb-3 bg-white shadow-sm">
          <div className="row g-4">
            {/* Input: Source Name */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark small mb-2">
                Source Name
              </label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g. Primary Job Salary"
                className="form-control shadow-none py-2.5 px-3"
                style={{ borderColor: "#ced4da", borderRadius: "4px" }}
              />
            </div>

            {/* Select: Category */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark small mb-2">
                Category
              </label>
              <select
                className="form-select shadow-none py-2.5 px-3"
                defaultValue="Full-time Salary"
                style={{ borderColor: "#ced4da", borderRadius: "4px" }}
              >
                <option value="Full-time Salary">Full-time Salary</option>
                <option value="Part-time Job">Part-time Job</option>
                <option value="Freelance/Contract">Freelance/Contract</option>
                <option value="Side Hustle">Side Hustle</option>
              </select>
            </div>

            {/* Select: Frequency */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark small mb-2">
                Frequency
              </label>
              <select
                className="form-select shadow-none py-2.5 px-3"
                defaultValue="Every Month (Monthly)"
                style={{ borderColor: "#ced4da", borderRadius: "4px" }}
              >
                <option value="Every Month (Monthly)">
                  Every Month (Monthly)
                </option>
                <option value="Every Two Weeks">Every Two Weeks</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>

            {/* Input: Take-home Amount */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark small mb-2">
                Take-home Amount
              </label>
              <div className="position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="form-control shadow-none py-2.5"
                  style={{
                    paddingLeft: "2.2rem",
                    borderColor: "#ced4da",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action: Add Another Source Container */}
        <button
          type="button"
          className="btn w-100 py-3 text-dark d-flex align-items-center justify-content-center gap-2 mb-4 bg-transparent shadow-none"
          style={{
            border: "1px dashed #a3b1ab",
            borderRadius: "4px",
            fontWeight: 500,
          }}
        >
          <PlusCircle size={18} className="text-dark" />
          Add Another Source
        </button>

        {/* Summary Metric Banner Block */}
        <div
          className="d-flex align-items-center justify-content-between p-3 mb-5"
          style={{ backgroundColor: "#cbece1", borderRadius: "6px" }}
        >
          <div className="d-flex align-items-center gap-3">
            {/* Card/Wallet White Square Badge */}
            <div
              className="bg-white rounded d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: "40px", height: "40px", color: "#053225" }}
            >
              <Wallet size={20} />
            </div>
            <div>
              <div
                className="text-uppercase tracking-wider text-muted fw-bold"
                style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
              >
                TOTAL ESTIMATED MONTHLY INCOME
              </div>
              <div className="fs-5 fw-bold text-dark">
                ${amount ? parseFloat(amount).toFixed(2) : "0.00"}
              </div>
            </div>
          </div>
          <div className="text-secondary small fst-italic pe-2">
            Building your budget...
          </div>
        </div>
      </main>

      {/* Sticky Bottom Actions Bar Container */}
      <footer className="border-top py-3 px-4 bg-white mt-auto">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left: Back Navigation Option */}
          <button
            type="button"
            className="btn btn-outline-dark d-inline-flex align-items-center gap-2 px-4 py-2.5 fw-medium"
            style={{ borderRadius: "4px" }}
            onClick={() => navigate("/onboardingStep1")}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Right: Progress Encouragement + Forward Progression Callout */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="text-muted small d-none d-sm-inline">
              You're doing great! One step left.
            </span>

            <button
              onClick={handleNext}
              className="btn text-white d-inline-flex align-items-center gap-2 fw-medium border-0 shadow-none text-nowrap px-3 px-sm-4 py-2"
              style={{
                backgroundColor: "#0F6E56",
                borderRadius: "4px",
                maxWidth: "100%",
              }}
            >
              <span className="d-none d-md-inline">Next: Set Up Envelopes</span>

              <span className="d-inline d-md-none">Next</span>

              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
