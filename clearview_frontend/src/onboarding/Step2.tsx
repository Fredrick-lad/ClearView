import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  PlusCircle,
  Wallet,
  Calendar,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/context/userContext";
import OnboardingHelpModal from "../components/OnboardingHelpModal";
import { formatCurrency } from "../utils/format";

interface IncomeEntry {
  source: string;
  category: string;
  frequency: string;
  amount: string;
}

export default function OnboardingStep2() {
  const { registerEnvelope, addIncomePeriod, addIncome } = useAuth();
  const navigate = useNavigate();

  const now = new Date();
  const currentMonth = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const semesterLabel = now.getMonth() < 6 ? "Semester 1" : "Semester 2";
  const defaultLabel = `${semesterLabel} – ${currentMonth}`;
  const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const [periodData, setPeriodData] = useState({
    label: defaultLabel,
    start_date: defaultStart,
    end_date: defaultEnd,
  });

  const [incomes, setIncomes] = useState<IncomeEntry[]>([
    {
      source: "",
      category: "Parent/Guardian Allowance",
      frequency: "Monthly",
      amount: "",
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const totalIncome = useMemo(
    () => incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || "0"), 0),
    [incomes],
  );

  const handlePeriodChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPeriodData((prev) => ({ ...prev, [name]: value }));
  };

  const fillSemester = (semester: "Semester 1" | "Semester 2") => {
    const year = now.getFullYear();
    if (semester === "Semester 1") {
      setPeriodData({
        label: "Semester 1 – " + year,
        start_date: `${year}-01-01`,
        end_date: `${year}-06-30`,
      });
    } else {
      setPeriodData({
        label: "Semester 2 – " + year,
        start_date: `${year}-07-01`,
        end_date: `${year}-12-31`,
      });
    }
  };

  const handleIncomeChange = (
    idx: number,
    field: keyof IncomeEntry,
    value: string,
  ) => {
    setIncomes((prev) =>
      prev.map((inc, i) => (i === idx ? { ...inc, [field]: value } : inc)),
    );
  };

  const addIncomeSource = () => {
    setIncomes((prev) => [
      ...prev,
      {
        source: "",
        category: "Parent/Guardian Allowance",
        frequency: "Monthly",
        amount: "",
      },
    ]);
  };

  const removeIncomeSource = (idx: number) => {
    setIncomes((prev) => prev.filter((_, i) => i !== idx));
  };

  const setupDefaultEnvelopes = async (totalLimit: number) => {
    const allocated = totalLimit * 0.7;
    const food = (allocated * 0.3).toFixed(2);
    const transport = (allocated * 0.15).toFixed(2);
    const housing = (allocated * 0.25).toFixed(2);
    const academics = (allocated * 0.2).toFixed(2);
    const entertainment = (allocated * 0.1).toFixed(2);

    const envelopes = [
      {
        name: "Food and Dining",
        limit: food,
        spend: 0.0,
        icon: "UtensilsCrossed",
      },
      { name: "Transport", limit: transport, spend: 0.0, icon: "Bus" },
      {
        name: "Housing and Utilities",
        limit: housing,
        spend: 0.0,
        icon: "Home",
      },
      { name: "Academic Supplies", limit: academics, spend: 0.0, icon: "Book" },
      {
        name: "Entertainment",
        limit: entertainment,
        spend: 0.0,
        icon: "Gamepad2",
      },
    ];

    await Promise.all(envelopes.map((env) => registerEnvelope(env)));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    const validIncomes = incomes.filter(
      (inc) => inc.source.trim() && inc.amount,
    );
    if (validIncomes.length === 0) return;

    setSaving(true);
    try {
      const period: any = await addIncomePeriod(periodData);

      await Promise.all(
        validIncomes.map((inc) =>
          addIncome({
            source: inc.source,
            total_amount: parseFloat(inc.amount),
            period_id: period.id,
          }),
        ),
      );

      await setupDefaultEnvelopes(totalIncome);
      navigate("/onboardingStep3");
    } catch {
      console.error("Failed to save onboarding data");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
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
        <button className="btn d-flex align-items-center gap-1 text-secondary border-0 p-0 shadow-none small fw-medium" onClick={() => setShowHelp(true)}>
          <HelpCircle size={18} />
          Support
        </button>
      </header>

      <main
        className="flex-grow-1 container py-5"
        style={{ maxWidth: "800px" }}
      >
        <div className="mb-5">
          <div
            className="d-flex justify-content-between align-items-center mb-2 text-uppercase fw-bold text-muted"
            style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
          >
            <span>Step 2 of 3: Your Income as a Student</span>
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
            />
          </div>
        </div>

        <div className="mb-4">
          <h1
            className="fw-bold mb-2"
            style={{
              color: "#053225",
              fontFamily: "Georgia, serif",
              fontSize: "2.25rem",
            }}
          >
            What income do you receive?
          </h1>
          <p className="text-secondary fs-6 mb-0">
            Add your allowance, part-time job, scholarship, or any money you
            receive during the semester.
          </p>
        </div>

        <form onSubmit={handleNext}>
          <div className="card border-1 mb-4 bg-white p-4 rounded-3 shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span
                className="text-uppercase fw-bold text-muted"
                style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
              >
                Academic Period
              </span>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm py-1 px-3 shadow-none fw-semibold"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => fillSemester("Semester 1")}
                >
                  Semester 1
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm py-1 px-3 shadow-none fw-semibold"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => fillSemester("Semester 2")}
                >
                  Semester 2
                </button>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small">
                  Period Name
                </label>
                <input
                  type="text"
                  className="form-control shadow-none py-2"
                  name="label"
                  value={periodData.label}
                  onChange={handlePeriodChange}
                  placeholder="e.g. Semester 1 – 2026"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small">
                  Start Date
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    name="start_date"
                    className="form-control shadow-none py-2"
                    value={periodData.start_date}
                    onChange={handlePeriodChange}
                  />
                  <span className="input-group-text bg-white text-muted border-start-0">
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
                    className="form-control shadow-none py-2"
                    value={periodData.end_date}
                    onChange={handlePeriodChange}
                  />
                  <span className="input-group-text bg-white text-muted border-start-0">
                    <Calendar size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {incomes.map((inc, idx) => (
            <div
              key={idx}
              className="card border-1 mb-3 bg-white p-4 rounded-3 shadow-sm position-relative"
            >
              {incomes.length > 1 && (
                <button
                  type="button"
                  className="btn btn-link p-1 text-danger position-absolute top-0 end-0 mt-2 me-2 shadow-none text-decoration-none"
                  onClick={() => removeIncomeSource(idx)}
                  title="Remove this source"
                >
                  <X size={18} />
                </button>
              )}

              <span
                className="text-uppercase fw-bold text-muted mb-3 d-block"
                style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
              >
                Income Source {idx + 1}
              </span>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-secondary small">
                    Source Name
                  </label>
                  <input
                    type="text"
                    value={inc.source}
                    onChange={(e) =>
                      handleIncomeChange(idx, "source", e.target.value)
                    }
                    placeholder="e.g. Parents, Campus Job, HELB Loan"
                    className="form-control shadow-none py-2"
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-secondary small">
                    Category
                  </label>
                  <select
                    className="form-select shadow-none py-2"
                    value={inc.category}
                    onChange={(e) =>
                      handleIncomeChange(idx, "category", e.target.value)
                    }
                  >
                    <option value="Parent/Guardian Allowance">
                      Parent/Guardian Allowance
                    </option>
                    <option value="Part-time Job">Part-time Job</option>
                    <option value="Scholarship/Bursary">
                      Scholarship / Bursary
                    </option>
                    <option value="Student Loan">Student Loan</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Side Hustle">Side Hustle</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-secondary small">
                    Frequency
                  </label>
                  <select
                    className="form-select shadow-none py-2"
                    value={inc.frequency}
                    onChange={(e) =>
                      handleIncomeChange(idx, "frequency", e.target.value)
                    }
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Per Semester">Per Semester</option>
                    <option value="Weekly">Weekly</option>
                    <option value="One-Time">One-Time</option>
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-secondary small">
                    Amount (KES)
                  </label>
                  <input
                    type="number"
                    value={inc.amount}
                    onChange={(e) =>
                      handleIncomeChange(idx, "amount", e.target.value)
                    }
                    placeholder="0.00"
                    className="form-control shadow-none py-2"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-4 bg-white text-secondary shadow-sm"
            style={{
              border: "2px dashed #dee2e6",
              borderRadius: "6px",
              fontWeight: 500,
            }}
            onClick={addIncomeSource}
          >
            <PlusCircle size={18} style={{ color: "#053225" }} />
            Add Another Source
          </button>

          <div
            className="card border-0 d-flex flex-row align-items-center justify-content-between p-3 mb-5 shadow-sm"
            style={{ backgroundColor: "#cbece1", borderRadius: "8px" }}
          >
            <div className="d-flex align-items-center gap-3">
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
                  TOTAL ESTIMATED INCOME
                </div>
                <div className="fs-4 fw-bold" style={{ color: "#053225" }}>
                  {formatCurrency(totalIncome)}
                </div>
              </div>
            </div>
            <div className="text-secondary small fst-italic pe-2 d-none d-sm-block">
              {incomes.length} source{incomes.length !== 1 ? "s" : ""}
            </div>
          </div>
        </form>
      </main>

      <footer className="border-top py-4 px-4 bg-white mt-auto">
        <div
          className="container d-flex justify-content-between align-items-center w-100 p-0"
          style={{ maxWidth: "800px" }}
        >
          <button
            type="button"
            className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 px-4 py-2 fw-semibold"
            style={{ borderRadius: "4px" }}
            onClick={() => navigate("/onboardingStep1")}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="text-muted small d-none d-md-inline">
              Nearly there! One step left.
            </span>
            <button
              onClick={handleNext}
              disabled={saving || totalIncome <= 0}
              className="btn text-white d-inline-flex align-items-center gap-2 fw-semibold border-0 shadow-none text-nowrap px-4 py-2"
              style={{
                backgroundColor: "#053225",
                borderRadius: "4px",
                opacity: saving || totalIncome <= 0 ? 0.6 : 1,
              }}
            >
              <span>{saving ? "Saving…" : "Next: Set Up Envelopes"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </footer>
      {showHelp && <OnboardingHelpModal step={2} onClose={() => setShowHelp(false)} />}
    </div>
  );
}
