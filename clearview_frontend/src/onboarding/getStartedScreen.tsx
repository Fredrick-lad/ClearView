import { ArrowLeft, ArrowRight } from "lucide-react";
import { Register } from "../onboarding/onboading";

interface proceeding {
  onContinue: () => void;
  onBack: () => void;
}

export default function GetStartedScreen({ onContinue, onBack }: proceeding) {
  return (
    <>
      <div
        className="card d-flex flex-column justify-content-between p-4 p-md-5 border-ui-border"
        style={{
          maxWidth: "450px",
          height: "600px",
          backgroundColor: "var(--bs-ui-bg)",
          borderRadius: "1.25rem",
        }}
      >
        {/* Top Section */}
        <div
          className="text-uppercase tracking-wider small fw-bold text-brand"
          style={{ letterSpacing: "0.05em" }}
        >
          Get Started
        </div>

        {/* Middle Section */}
        <div className="my-auto">
          <h2
            className="display-6 fw-bold mb-4 tracking-tight text-ui-text"
            style={{ lineHeight: "1.25" }}
          >
            Let's secure <br />
            <span className="text-brand">your financial path.</span>
          </h2>

          <p
            className="lead mb-3 fw-medium text-ui-text"
            style={{ fontSize: "1.1rem", opacity: "0.9" }}
          >
            No one taught us how to budget in school, so we built this to do the
            heavy lifting for you.
          </p>

          <p
            className="mb-0 text-ui-text-dim"
            style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
          >
            Whether you're managing an allowance, tracking your first
            side-hustle, or simply trying to stop asking
            <span className="fw-semibold text-ui-text">
              {" "}
              "where did my money go?"
            </span>{" "}
            you're in the right place.
          </p>
          <span className="fw-medium text-ui-text-dim">
            Let’s set up your profile
          </span>
        </div>
        <div className="d-flex gap-2 w-100 mb-3">
          <button
            className="border-brand-active border rounded p-2  text-primary d-flex gap-2 align-items-center"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            className="border border-brand-active rounded bg-brand text-white p-2 flex-grow-1 d-flex gap-2 align-items-center justify-content-center"
            onClick={onContinue}
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="d-flex gap-1 align-items-center justify-content-center">
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "24px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
        </div>
      </div>
    </>
  );
}
