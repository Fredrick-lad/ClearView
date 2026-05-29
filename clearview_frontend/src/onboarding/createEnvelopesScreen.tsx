import React from "react";

function CreateEnvelopesScreen() {
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
        <p>createenvelope</p>
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

export default CreateEnvelopesScreen;
