import { Cross, DollarSign, MailOpen, X } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../hooks/context/userContext";

interface modalvisibility {
  onClose: () => void;
}
const EnvelopeModal = ({ onClose }: modalvisibility) => {
  const colorChoices = [
    { id: 1, hex: "#8B5CF6" }, // Purple
    { id: 2, hex: "#3B82F6" }, // Blue
    { id: 3, hex: "#10B981" }, // Green
    { id: 4, hex: "#F59E0B" }, // Yellow
    { id: 5, hex: "#EF4444" }, // Red
    { id: 6, hex: "#9CA3AF" }, // Gray
  ];
  const [envelopeName, setEnvelopeName] = useState("");
  const [amount, setAmount] = useState<string>();
  const [envelopeColor, setEnvelopeColor] = useState<any>("");
  const [description, setDescription] = useState("");

  const { registerEnvelope, newEnvelope, setNewEnvelope, userData, isLoading } =
    useAuth();

  const getPayload = () => {
    return {
      name: envelopeName,
      limit: Number(amount),
      color: envelopeColor,
      description: description,
    };
  };
  const handleregister = async () => {
    if (!envelopeName) {
      alert("Enter an envelope name");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert("Make sure you have an amount entered");
      return;
    }
    if (!envelopeColor) {
      alert("Please select a color");
      return;
    }

    const payload = getPayload();
    const succes = await registerEnvelope(payload);
    if (succes) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="vw-100 vh-100 bg-brand d-flex align-items-center justify-content-center position-fixed top-0 start-0 z-3 bg-opacity-25"
        style={{ backdropFilter: "blur(3px)" }}
        onClick={onClose}
      >
        <div
          className="card p-3 d-flex-column p-3 justify-content-center flex-shrink-1 m-1"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row gap-2 align-items-center">
              <div className="bg-brand-light rounded-circle p-2 d-flex align-items-center justify-content-center ">
                <MailOpen className="text-brand " />
              </div>

              <div>
                <span className="fs-4">Create envelope</span>
                <p
                  className="small text-ui-text-dim"
                  style={{
                    margin: 0,
                  }}
                >
                  Create an envelope to track a category of expenses
                </p>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="d-flex align-items-top justify-content-end"
                style={{ border: "none", background: "none" }}
              >
                <X className="text-ui-text-dim" />
              </button>
            </div>
          </div>
          {/* Input fields */}
          <div className="flex flex-column mt-2">
            <label htmlFor="envelopename" className="form-label">
              Envelope Name
            </label>
            <p className="text-ui-text-dim small" style={{ margin: 0 }}>
              Give your envelope a name
            </p>
            <input
              type="text"
              name="envelopename"
              id="name"
              className="form-control"
              style={{ outline: "none", boxShadow: "none" }}
              value={envelopeName}
              onChange={(e) => setEnvelopeName(e.target.value)}
            />
          </div>
          {/* Limit and Color */}
          <div className="d-flex flex-row gap-4 flex-wrap">
            <div className="d-flex flex-column">
              <span className="fs-6">Budget Amount</span>
              <p style={{ margin: 0 }} className="text-ui-text-dim small">
                How much do you want to allocate?
              </p>
              <div className="input-group d-flex  align-items-center mt-2">
                <span className="input-group-text bg-brand-light border border-end-0 ">
                  <DollarSign className="text-brand " />
                </span>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="0.00"
                  className="form-control border-start-0 "
                  style={{ outline: "none", boxShadow: "none" }}
                  value={amount}
                  onChange={(e: any) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex flex-column">
              <span className="fs-6">Color</span>
              <p className="text-ui-text-dim" style={{ margin: 0 }}>
                Choose a color to identify your envelope
              </p>
              <div className="d-flex gap-3 mt-2">
                {colorChoices.map((color) => (
                  <button
                    type="button"
                    key={color.id}
                    style={{
                      width: "1.8rem",
                      height: "1.8rem",
                      backgroundColor: `${color.hex}`,
                      border: "none",
                      outline:
                        envelopeColor === color.id
                          ? `2px solid ${color.hex}`
                          : "none",
                      outlineOffset: "4px",
                    }}
                    value={envelopeColor}
                    className={`rounded-circle ${envelopeColor === color.id ? color.hex : ""}`}
                    onClick={() => setEnvelopeColor(color.id)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          {/* Envelope Description */}
          <div className="mt-3">
            <span className="fs-6">
              Description <span className="text-ui-text"> Optional</span>
            </span>
            <p className="text-ui-text-dim small" style={{ margin: 0 }}>
              Add a note about this envelope
            </p>
            <div className="form-floating">
              <textarea
                name="envelopenotes"
                id="envelopenotes"
                className="form-control"
                style={{ outline: "none", boxShadow: "none" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label htmlFor="envelopenotes">Envelope Description</label>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              type="button"
              className="text-dark border-brand-light bg-muted-slate p-2 rounded"
              // style={{ border: "none" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-white border-brand-active bg-brand-active p-2 rounded"
              // style={{
              //   border: "none",
              // }}
              onClick={handleregister}
            >
              Create Envelope
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvelopeModal;
