import React, { useState } from "react";
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  PlusCircle,
  Wallet,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/context/userContext";

export default function OnboardingStep2() {
  const { incomeSource, registerEnvelope, addIncomePeriod, addIncome } =
    useAuth();
  const navigate = useNavigate();
  const [sourceName, setSourceName] = useState("");
  const [amount, setAmount] = useState("");
  const [periodData, setPeriodData] = useState({
    label: "",
    start_date: "",
    end_date: "",
  });

  const handlesetup = async (incomeAmount: string) => {
    const total_limit = parseFloat(incomeAmount);
    const portion = total_limit * 0.5;
    const env_amount = (portion / 3).toFixed(2);

    const envelopes = [
      {
        name: "Food and Dining",
        limit: env_amount,
        spend: 0.0,
        icon: "UtensilsCrossed",
      },
      { name: "Transport", limit: env_amount, spend: 0.0, icon: "Bus" },
      {
        name: "Housing and utilities",
        limit: env_amount,
        spend: 0.0,
        icon: "Home",
      },
    ];

    // This forces your app to wait for the DB to populate before moving forward
    await Promise.all(envelopes.map((env) => registerEnvelope(env)));
  };

  const handlechange = (event: any) => {
    const { name, value } = event.target;

    setPeriodData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const incomePayload = {
    source: sourceName,
    total_amount: amount,
  };
  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const period: any = await addIncomePeriod(periodData);
    await addIncome({ ...incomePayload, period_id: period.id });
    console.log(incomePayload);
    console.log("Proceeding to step 3...");
    await handlesetup(amount);
    navigate("/onboardingStep3");
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-light"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      {/* Top Header Navigation */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 w-100 bg-white border-bottom shadow-sm">
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
        className="flex-grow-1 container py-5"
        style={{ maxWidth: "800px" }}
      >
        {/* Progress Bar Timeline (Updated from screen.png) */}
        <div className="mb-5">
          <div
            className="d-flex justify-content-between align-items-center mb-2 text-uppercase fw-bold text-muted"
            style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
          >
            <span>Step 2 of 3: Setup Income</span>
            <span>66%</span>
          </div>
          <div
            className="progress"
            style={{ height: "6px", backgroundColor: "#e9ecef" }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "66%", backgroundColor: "#053225" }}
              aria-valuenow={66}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="mb-4">
          <h1
            className="fw-bold mb-2"
            style={{
              color: "#053225",
              fontFamily: "Georgia, serif",
              fontSize: "2.25rem",
            }}
          >
            Tell us about your income.
          </h1>
          <p className="text-secondary fs-6 mb-0">
            Add your regular salary, side hustles, or other income sources to
            build your monthly budget.
          </p>
        </div>

        {/* Form Element Block */}
        <form onSubmit={handleNext}>
          {/* Section 1: Financial Period Card (Added from screen.png) */}
          <div className="card border-1 mb-4 bg-white p-4 rounded-3 shadow-sm">
            <span
              className="text-uppercase fw-bold text-muted mb-3 d-block"
              style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
            >
              Financial Period
            </span>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small">
                  Period
                </label>
                <select
                  className="form-select shadow-none py-2 text-muted"
                  style={{ borderRadius: "4px" }}
                  value={periodData.label}
                  name="label"
                  onChange={handlechange}
                >
                  <option value="">Select Period</option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small">
                  Start Date
                </label>

                <div className="input-group">
                  <input
                    type="date"
                    name="start_date"
                    className="form-control shadow-none py-2 text-muted"
                    style={{ borderRadius: "4px 0 0 4px" }}
                    value={periodData.start_date}
                    onChange={handlechange}
                  />
                  <span
                    className="input-group-text bg-white text-muted border-start-0"
                    style={{ borderRadius: "0 4px 4px 0" }}
                  >
                    <Calendar size={16} />
                  </span>
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small">
                  End Date
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    name="end_date"
                    className="form-control shadow-none py-2 text-muted"
                    style={{ borderRadius: "4px 0 0 4px" }}
                    value={periodData.end_date}
                    onChange={handlechange}
                  />
                  <span
                    className="input-group-text bg-white text-muted border-start-0"
                    style={{ borderRadius: "0 4px 4px 0" }}
                  >
                    <Calendar size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Income Entry Details Card */}
          <div className="card border-1 mb-4 bg-white p-4 rounded-3 shadow-sm">
            <div className="row g-4 mb-3">
              {/* Input: Source Name */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary small mb-2">
                  Source Name
                </label>
                <input
                  type="text"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="e.g. Primary Job Salary"
                  className="form-control shadow-none py-2"
                  style={{ borderColor: "#ced4da", borderRadius: "4px" }}
                />
              </div>

              {/* Select: Category */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary small mb-2">
                  Category
                </label>
                <select
                  className="form-select shadow-none py-2 text-muted"
                  defaultValue="Part-time Job"
                  style={{ borderColor: "#ced4da", borderRadius: "4px" }}
                >
                  <option value="SuPPORT">Support</option>
                  <option value="Part-time Job">Part-time Job</option>
                  <option value="Freelance/Contract">Freelance/Contract</option>
                  <option value="Side Hustle">Side Hustle</option>
                </select>
              </div>
            </div>

            <div className="row g-4">
              {/* Select: Frequency */}
              <div className="col-12 col-md-6">
                <label className="form-label fw-semibold text-secondary small mb-2">
                  Frequency
                </label>
                <select
                  className="form-select shadow-none py-2 text-muted"
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
                <label className="form-label fw-semibold text-secondary small mb-2">
                  Take-home Amount
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text bg-white text-secondary border-end-0"
                    style={{ borderRadius: "4px 0 0 4px" }}
                  >
                    Ksh
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="form-control shadow-none py-2 border-start-0"
                    style={{
                      borderColor: "#ced4da",
                      borderRadius: "0 4px 4px 0",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action: Add Another Source Container */}
          <button
            type="button"
            className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-4 bg-white text-secondary shadow-sm"
            style={{
              border: "2px dashed #dee2e6",
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            <PlusCircle size={18} style={{ color: "#053225" }} />
            Add Another Source
          </button>

          {/* Summary Metric Banner Block */}
          <div
            className="card border-0 d-flex flex-row align-items-center justify-content-between p-3 mb-5 shadow-sm"
            style={{ backgroundColor: "#cbece1", borderRadius: "8px" }}
          >
            <div className="d-flex align-items-center gap-3">
              {/* Card/Wallet White Square Badge */}
              <div
                className="bg-white rounded d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "45px", height: "45px", color: "#053225" }}
              >
                <Wallet size={22} />
              </div>
              <div>
                <div
                  className="text-uppercase tracking-wider text-muted fw-bold"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
                >
                  TOTAL ESTIMATED MONTHLY INCOME
                </div>
                <div className="fs-4 fw-bold" style={{ color: "#053225" }}>
                  Ksh{amount ? parseFloat(amount).toFixed(2) : "0.00"}
                </div>
              </div>
            </div>
            <div className="text-secondary small fst-italic pe-2 d-none d-sm-block">
              Building your budget...
            </div>
          </div>
        </form>
      </main>

      {/* Sticky Bottom Actions Bar Container */}
      <footer className="border-top py-4 px-4 bg-white mt-auto">
        <div
          className="container d-flex justify-content-between align-items-center w-100 p-0"
          style={{ maxWidth: "800px" }}
        >
          {/* Left: Back Navigation Option */}
          <button
            type="button"
            className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 px-4 py-2 fw-semibold"
            style={{ borderRadius: "4px" }}
            onClick={() => navigate("/onboardingStep1")}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Right: Progress Encouragement + Forward Progression Callout */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="text-muted small d-none d-md-inline">
              You're doing great! One step left.
            </span>

            <button
              onClick={handleNext}
              className="btn text-white d-inline-flex align-items-center gap-2 fw-semibold border-0 shadow-none text-nowrap px-4 py-2"
              style={{
                backgroundColor: "#053225",
                borderRadius: "4px",
              }}
            >
              <span>Next: Set Up Envelopes</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
