import React from "react";

function TransactionsCard() {
  return (
    <div className="d-flex align-items-center w-100 gap-2">
      <div>icon</div>
      <div className="d-flex justify-content-between w-100">
        <div>
          <div>expense name</div>
          <div>envelope and time</div>
        </div>
        <div>
          <div>amount</div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsCard;
