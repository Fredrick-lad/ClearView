import { ArrowLeft, Banknote } from "lucide-react";
import { Wallet2, Plus, ArrowRight } from "lucide-react";
import { useState } from "react";

interface proceeding {
  onContinue: () => void;
  onBack: () => void;
}

export default function IncomeSourcesScreen({
  onBack,
  onContinue,
}: proceeding) {
  const [source, setsource] = useState({ source: "", amount: "" });
  const suggestions = [
    { id: 1, source: "Parents" },
    { id: 2, source: "Side Hustles" },
    { id: 3, source: "Salary" },
    { id: 5, source: "Helb" },
  ];
  const handlesource = () => {
    console.log("src");
  };

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
        <div className="d-flex align-items-center gap-2">
          <div className="bg-brand p-3 d-flex rounded">
            <Banknote className="text-white" />
          </div>
          <div>
            <h2 style={{ margin: 0 }} className="text-brand">
              Add your income sources
            </h2>
            <p style={{ margin: 0 }} className="text-ui-text-dim small">
              Where does your money come from each month?
            </p>
          </div>
        </div>
        <div className="text-muted small fw-bold text-uppercase mb-1">
          Step 3 of 5
        </div>

        <div>
          <div className="d-flex input-group align-items-center">
            <span className="input-group-text bg-brand-light border-end-0">
              <Wallet2 className="text-brand" />
            </span>
            <input
              type="text"
              name="sources"
              id="sources"
              className="form-control border-start-0 "
              placeholder="eg.. Salary"
              style={{ outline: "none", boxShadow: "none" }}
            />
          </div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {suggestions.map((onesugg) => (
            <div key={onesugg.id} className="">
              <button
                onClick={handlesource}
                className="bg-brand-light text-brand d-flex align-items-center border border-brand-active rounded"
              >
                <Plus size={14} className="text-brand" />
                {onesugg.source}
              </button>
            </div>
          ))}
        </div>

        <div className="d-flex gap-2 w-100">
          <button
            onClick={onBack}
            className="border-brand-active border rounded p-2  text-primary d-flex gap-2 align-items-center"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={onContinue}
            className="border border-brand-active rounded bg-brand text-white p-2 flex-grow-1 d-flex gap-2 align-items-center justify-content-center"
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
