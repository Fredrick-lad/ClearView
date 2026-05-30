import { ArrowLeft, Banknote, CircleAlert, X } from "lucide-react";
import { Wallet2, Plus, ArrowRight } from "lucide-react";
import { useState } from "react";

interface proceeding {
  onContinue: () => void;
  onBack: () => void;
  incomedata: (data: string[]) => void;
}

export default function IncomeSourcesScreen({
  onBack,
  onContinue,
  incomedata,
}: proceeding) {
  const [source, setSource] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [incomeDetails, setIncomeDetails] = useState<string[]>([]);

  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  const suggestions = [
    { id: 1, source: "Parents" },
    { id: 2, source: "Side Hustles" },
    { id: 3, source: "Salary" },
    { id: 5, source: "Helb" },
  ];
  const addDetails = () => {
    if (!source || !amount) {
      setError(true);
      return;
    }
    const combined = `${source} : ${amount}`;
    setIncomeDetails([...incomeDetails, combined]);
    setSource("");
    setAmount(0);
    setError(false);
  };

  const chooseSource = (e: any) => {
    const text: string = e.target.innerText;
    setSource(text);

    console.log(text);
  };

  const handleAmountChange = (e: any) => {
    const val = e.target.value;
    setAmount(val === "" ? undefined : Number(val));
  };
  const handleSourceChange = (e: any) => {
    setSource(e.target.value);
  };
  const handleDetailChange = (e: any) => {
    const value = e.target.value;

    const newdata = value.split("\n").filter((line: any) => line.trim() !== "");

    setIncomeDetails(newdata);
  };
  const clearSources = () => {
    setIncomeDetails([]);
  };
  const onNext = () => {
    if (incomeDetails.length === 0) {
      setError(true);
      return;
    }
    incomedata(incomeDetails);
    onContinue();
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
          </div>
        </div>
        <div className="text-muted small fw-bold text-uppercase mb-1">
          Step 3 of 5
        </div>
        <p style={{ margin: 0 }} className="text-ui-text-dim small">
          Where does your monthly income come from and how much is it?
        </p>

        <div className="d-flex flex-row gap-1">
          <div className="d-flex input-group align-items-center flex-grow-1">
            <span className="input-group-text bg-brand-light border-end-0">
              <Wallet2 className="text-brand" />
            </span>
            <input
              type="text"
              name="sources"
              id="sources"
              value={source}
              className="form-control border-start-0 "
              placeholder="Source "
              style={{ outline: "none", boxShadow: "none" }}
              onChange={handleSourceChange}
            />
          </div>
          <div className="input-group">
            <p
              className="input-group-text bg-brand-light"
              style={{ margin: 0 }}
            >
              Ksh
            </p>
            <input
              className="form-control"
              type="number"
              name="amount"
              value={amount}
              id="Amount"
              placeholder="amount"
              onChange={handleAmountChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={addDetails}
            className="bg-brand-light text-brand border botder-brand-active p-1 rounded "
          >
            Add source
          </button>
        </div>
        <div>
          {incomeDetails.map((detail) => (
            <div className="bg-brand-light text-ui-text d-flex align-items-center border border-brand-active rounded w-50 p-1 mb-1">
              {detail}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={() => setModal(true)}
            className="bg-brand-light text-brand border botder-brand-active p-1 rounded "
          >
            Edit sources
          </button>
        </div>
        <div>
          {modal ? (
            <div className="form-floating d-flex flex-column">
              <button
                onClick={() => setModal(false)}
                className="text-brand border botder-brand-active p-1 rounded d-flex justify-content-end"
              >
                <X />
              </button>
              <textarea
                name="details"
                id="details"
                value={incomeDetails}
                rows={10}
                className="form-control"
                onChange={handleDetailChange}
              ></textarea>
              <button
                onClick={clearSources}
                className="bg-brand-light text-brand border botder-brand-active p-1 rounded "
              >
                Clear Sources
              </button>
            </div>
          ) : null}
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {suggestions.map((onesugg) => (
            <div key={onesugg.id} className="">
              <button
                onClick={chooseSource}
                className="bg-brand-light text-brand d-flex align-items-center border border-brand-active rounded"
              >
                <Plus size={14} className="text-brand" />
                {onesugg.source}
              </button>
            </div>
          ))}
        </div>
        <div>
          {error ? (
            <div className="mt-2 d-flex align-items-center gap-2">
              <CircleAlert className="text-danger" />
              <p className="text-danger mb-0">
                Please enter atleast one income source to continue
              </p>
            </div>
          ) : null}
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
            onClick={onNext}
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
