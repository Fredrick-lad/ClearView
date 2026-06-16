import React from "react";
import { HelpCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnboardingWelcome() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    // Navigate to next onboarding step
    console.log("Navigating to step 2...");
    navigate("/onboardingStep2");
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#f8faf9" }}
    >
      {/* Top Navigation Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-transparent w-100">
        {/* Brand Logo */}
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

        {/* Help Link */}
        <button
          className="btn d-flex align-items-center gap-1 text-secondary border-0 p-0 shadow-none"
          style={{ fontSize: "0.9rem", fontWeight: 500 }}
        >
          <HelpCircle size={18} className="text-secondary" />
          Help
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3 py-5">
        {/* Progress Tracker Bar */}
        <div className="w-100 mb-5" style={{ maxWidth: "420px" }}>
          <div
            className="d-flex justify-content-between mb-2"
            style={{ fontSize: "0.8rem", fontWeight: 600 }}
          >
            <span style={{ color: "#053225", letterSpacing: "0.03em" }}>
              Step 1 of 3: Welcome
            </span>
            <span className="text-muted" style={{ letterSpacing: "0.03em" }}>
              33% Complete
            </span>
          </div>
          <div
            className="progress"
            style={{
              height: "5px",
              backgroundColor: "#cbece1",
              borderRadius: "10px",
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "33%",
                backgroundColor: "#053225",
                borderRadius: "10px",
              }}
              aria-valuenow={33}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Hero Artwork Frame */}
        <div className="mb-4 d-flex justify-content-center">
          <div
            className="shadow-sm overflow-hidden"
            style={{
              maxWidth: "320px",
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: "4px",
            }}
          >
            {/* 
              This displays the hero graphic from screen_2.png. 
              Replace the placeholder string with your project's hosted image path.
            */}
            <img
              src="screen_2_hero.png"
              alt="Evergreen tree growing out of silver coins"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                // Fail-safe visual block if the image pathway is missing
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Onboarding Typography & Messaging */}
        <div className="text-center mx-auto px-2" style={{ maxWidth: "640px" }}>
          <h1
            className="mb-3 fw-bold"
            style={{
              color: "#053225",
              fontFamily: "Georgia, serif",
              fontSize: "calc(1.8rem + 1vw)",
              letterSpacing: "-0.01em",
            }}
          >
            Welcome to Financial Clarity.
          </h1>

          <p
            className="text-secondary mx-auto mb-5"
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.6",
              maxWidth: "540px",
              fontWeight: 400,
            }}
          >
            Let's set up your foundation for financial stability in three simple
            steps. We'll help you organize your accounts, set your goals, and
            master your cash flow.
          </p>

          {/* Action CTA Button */}
          <button
            onClick={handleGetStarted}
            className="btn text-white px-4 py-3 fw-medium d-inline-flex align-items-center gap-2 border-0 shadow-none transition-all"
            style={{
              backgroundColor: "#0F6E56",
              borderRadius: "4px",
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0F6E56")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1D9E75")
            }
          >
            Get Started
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </main>
    </div>
  );
}
