import React, { useState } from "react";
import { HelpCircle, ArrowRight, Target, PiggyBank, Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const goals = [
  {
    id: "track-spending",
    label: "Track my semester spending",
    desc: "See where my allowance and income go each term",
    icon: Target,
  },
  {
    id: "save-more",
    label: "Save for tuition or books",
    desc: "Set money aside for academic expenses",
    icon: PiggyBank,
  },
  {
    id: "budget-better",
    label: "Budget my allowance better",
    desc: "Make my pocket money or stipend last the semester",
    icon: Calendar,
  },
  {
    id: "reduce-debt",
    label: "Manage student debt",
    desc: "Track loans and plan repayments wisely",
    icon: CreditCard,
  },
];

export default function OnboardingWelcome() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleGetStarted = () => {
    if (selectedGoal) {
      localStorage.setItem("onboardingGoal", selectedGoal);
    }
    navigate("/onboardingStep2");
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#f8faf9" }}
    >
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-transparent w-100">
        <div
          className="fw-bold fs-4"
          style={{
            color: "#053225",
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
            cursor: "pointer",
          }}
          onClick={() => navigate("/landingpage")}
        >
          ClearView
        </div>
        <button className="btn d-flex align-items-center gap-1 text-secondary border-0 p-0 shadow-none" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
          <HelpCircle size={18} className="text-secondary" />
          Help
        </button>
      </header>

      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3 py-5">
        <div className="w-100 mb-4" style={{ maxWidth: "420px" }}>
          <div className="d-flex justify-content-between mb-2" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            <span style={{ color: "#053225", letterSpacing: "0.03em" }}>
              Step 1 of 3: Your Goal
            </span>
            <span className="text-muted" style={{ letterSpacing: "0.03em" }}>
              33% Complete
            </span>
          </div>
          <div className="progress" style={{ height: "5px", backgroundColor: "#cbece1", borderRadius: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "33%", backgroundColor: "#053225", borderRadius: "10px" }}
              aria-valuenow={33}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="text-center mx-auto px-2 mb-4" style={{ maxWidth: "640px" }}>
          <h1
            className="mb-3 fw-bold"
            style={{
              color: "#053225",
              fontFamily: "Georgia, serif",
              fontSize: "calc(1.6rem + 1vw)",
              letterSpacing: "-0.01em",
            }}
          >
            What brings you to ClearView?
          </h1>
          <p className="text-secondary mx-auto mb-0" style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "520px", fontWeight: 400 }}>
            Pick your main focus as a student so we can tailor your experience.
          </p>
        </div>

        <div className="row g-3 mb-4" style={{ maxWidth: "600px", width: "100%" }}>
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;
            return (
              <div className="col-12 col-sm-6" key={goal.id}>
                <button
                  type="button"
                  className="btn w-100 h-100 p-3 d-flex flex-column align-items-start text-start border shadow-sm"
                  style={{
                    borderRadius: "8px",
                    backgroundColor: isSelected ? "#cbece1" : "white",
                    borderColor: isSelected ? "#053225" : "#dee2e6",
                    borderWidth: isSelected ? "2px" : "1px",
                  }}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Icon size={20} style={{ color: "#053225" }} />
                    <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>
                      {goal.label}
                    </span>
                  </div>
                  <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {goal.desc}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleGetStarted}
          disabled={!selectedGoal}
          className="btn text-white px-5 py-3 fw-medium d-inline-flex align-items-center gap-2 border-0 shadow-none"
          style={{
            backgroundColor: "#0F6E56",
            borderRadius: "4px",
            fontSize: "0.95rem",
            letterSpacing: "0.02em",
            opacity: selectedGoal ? 1 : 0.5,
          }}
        >
          {selectedGoal ? "Continue" : "Select a goal to continue"}
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </main>
    </div>
  );
}
