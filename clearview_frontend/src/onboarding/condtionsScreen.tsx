import { ArrowLeft, ArrowRight, Handshake } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onContinue: () => void;
  onBack: () => void;
}
function CondtionsScreen({ onContinue, onBack }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div
        className="card d-flex flex-column justify-content-between  p-4 p-md-5 border-ui-border"
        style={{
          maxWidth: "450px",
          height: "600px",
          backgroundColor: "var(--bs-ui-bg)",
          borderRadius: "1.25rem",
        }}
      >
        <div className="d-flex gap-2 align-items-center">
          <div className="bg-brand p-3 border border-brand rounded">
            <Handshake className="text-white" />
          </div>
          <div>
            <h2 style={{ margin: 0 }} className="text-brand ">
              Conditions and terms
            </h2>
          </div>
        </div>

        <div className="d-flex flex-column">
          <p className="text-ui-text-dim" style={{ margin: 0 }}>
            Accept terms and conditons to proceed to your dashboard
          </p>
          <div
            className="form-check d-flex justify-content-start mt-2 gap-1"
            style={{ paddingLeft: 0 }}
          >
            <input
              type="checkbox"
              name="conditions"
              id="conditons"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="conditions" className="form-check-label">
              <Link
                to="termsandconditions "
                className="text-decoration-none text-brand-muted"
              >
                Terms and conditions
              </Link>
            </label>
          </div>
        </div>
        <div className="d-flex gap-2 w-100">
          <button
            type="button"
            className="border-brand-active border rounded p-2  text-primary d-flex gap-2 align-items-center"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            type="button"
            disabled={!isChecked}
            className={`border  border-brand-active text-white rounded bg-brand flex-grow-1  p-2 flex-grow-1 d-flex gap-2 align-items-center justify-content-center ${!isChecked ? "opacity-50 cursor-not-allowed" : "bg-brand text-white"}`}
            onClick={onContinue}
          >
            Accepts
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="d-flex gap-1 align-items-center">
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "24px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
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

export default CondtionsScreen;
