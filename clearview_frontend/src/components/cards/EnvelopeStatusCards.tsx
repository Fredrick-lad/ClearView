import React, { useState } from "react";

export const EnvelopeStatusCards = () => {
  const [envelopeName, setEnvelopeName] = useState("hello");
  const [progresbar, setProgressbar] = useState("hello");
  const [remainingAmount, setRemainingAMount] = useState(0);
  const [message, setMessage] = useState("hello");
  return (
    <div className="d-flex p-3 shadow-sm m-2 rounded flex-grow-1 bg-brand-light flex-column">
      {/* Envelope name, spend progress bar, amount and message */}
      <div>{envelopeName}</div>
      <div>{progresbar}</div>
      <div className="d-flex justify-content-between">
        <div>{remainingAmount}</div>
        <div>{message}</div>
      </div>
    </div>
  );
};
