import React, { useState } from "react";

export default function UserProfileContent() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(false);

  // Custom styling configurations to perfectly replicate screen.png colors and fonts
  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    deepGreen: "#0A4433",
    emeraldBorder: "#1B5E46",
    emeraldTextLight: "#A3E635",
    sageGreen: "#D5EADF",
    sageBorder: "#B8DBCB",
    bannerGray: "#F4F5F6",
  };

  return (
    <div className="container-fluid py-4 px-md-4 bg-white min-vh-screen text-dark">
      {/* Page Title */}
      <h1 className="h3 fw-bold mb-4" style={brandSerif}>
        User Profile
      </h1>

      {/* Row 1: Profile Overview Cards Grid */}
      <div className="row g-4 mb-5">
        {/* Card 1: Avatar & Membership Profile */}
        <div className="col-12 col-lg-4">
          <div
            className="rounded-4 p-4 text-center d-flex flex-column align-items-center justify-content-between h-100 text-white"
            style={{ backgroundColor: colors.deepGreen, minHeight: "340px" }}
          >
            <div className="d-flex flex-column align-items-center mt-3">
              {/* User Avatar Vector Placeholder */}
              <div
                className="rounded-3 overflow-hidden border border-2 d-flex align-items-center justify-content-center mb-3 bg-secondary bg-opacity-25"
                style={{
                  width: "120px",
                  height: "120px",
                  borderColor: colors.emeraldBorder,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white-50 w-75 h-75 mt-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </div>
              <h2 className="h4 mb-1 tracking-wide" style={brandSerif}>
                Alexander Sterling
              </h2>
              <p
                className="text-uppercase text-white-50 small font-monospace tracking-wider mb-0"
                style={{ fontSize: "0.75rem" }}
              >
                Premium Member since 2021
              </p>
            </div>

            <button
              className="btn btn-light w-70 max-w-xs fw-semibold px-4 py-2 mt-4 text-success"
              style={{ color: colors.deepGreen }}
            >
              Change Photo
            </button>
          </div>
        </div>

        {/* Card 2: Personal Details */}
        <div className="col-12 col-lg-4">
          <div
            className="card h-100 rounded-4 p-4 border-secondary border-opacity-25 bg-white d-flex flex-column justify-content-between"
            style={{ minHeight: "340px" }}
          >
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h5 mb-0 fw-medium" style={brandSerif}>
                  Personal Details
                </h3>
                <button
                  className="btn btn-link p-0 text-muted shadow-none"
                  aria-label="Edit personal details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>

              <div className="d-flex flex-column gap-3">
                <div>
                  <label
                    className="text-uppercase text-muted fw-bold tracking-widest d-block mb-1"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Full Name
                  </label>
                  <p className="mb-0 fw-semibold text-dark opacity-75">
                    Alexander Sterling
                  </p>
                </div>
                <div>
                  <label
                    className="text-uppercase text-muted fw-bold tracking-widest d-block mb-1"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Email Address
                  </label>
                  <p className="mb-0 fw-semibold text-dark opacity-75">
                    a.sterling@clearview.com
                  </p>
                </div>
                <div>
                  <label
                    className="text-uppercase text-muted fw-bold tracking-widest d-block mb-1"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Phone Number
                  </label>
                  <p className="mb-0 fw-semibold text-dark opacity-75">
                    +1 (555) 234-8901
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Financial Identity */}
        <div className="col-12 col-lg-4">
          <div
            className="rounded-4 p-4 d-flex flex-column justify-content-between h-100"
            style={{ backgroundColor: colors.sageGreen, minHeight: "340px" }}
          >
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3
                  className="h5 mb-0 fw-medium"
                  style={{ ...brandSerif, color: colors.deepGreen }}
                >
                  Financial Identity
                </h3>
                <span
                  className="badge text-uppercase text-white px-2 py-1"
                  style={{
                    backgroundColor: colors.deepGreen,
                    fontSize: "0.6rem",
                  }}
                >
                  Verified
                </span>
              </div>

              <div className="d-flex flex-column gap-4">
                <div>
                  <label
                    className="text-uppercase text-muted fw-bold tracking-widest d-block mb-1"
                    style={{
                      fontSize: "0.65rem",
                      color: `${colors.deepGreen}99`,
                    }}
                  >
                    Account Type
                  </label>
                  <p
                    className="mb-0 h5 fw-bold"
                    style={{ color: colors.deepGreen }}
                  >
                    Ultra-Premium Wealth
                  </p>
                </div>
                <div>
                  <label
                    className="text-uppercase text-muted fw-bold tracking-widest d-block mb-1"
                    style={{
                      fontSize: "0.65rem",
                      color: `${colors.deepGreen}99`,
                    }}
                  >
                    Primary Currency
                  </label>
                  <p
                    className="mb-0 fw-semibold"
                    style={{ color: colors.deepGreen }}
                  >
                    USD - US Dollar
                  </p>
                </div>
              </div>
            </div>

            <div>
              <hr
                style={{ borderColor: colors.sageBorder, opacity: 1 }}
                className="my-3"
              />
              <a
                href="#subscription"
                className="d-flex justify-content-between align-items-center text-decoration-none small fw-bold"
                style={{ color: colors.deepGreen }}
              >
                View Subscription Plan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  style={{ width: "14px", height: "14px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Security & Preferences Split Grid */}
      <div className="row g-5 mb-5">
        {/* Left Column: Security & Privacy List */}
        <div className="col-12 col-lg-6">
          <h3 className="h5 mb-3 fw-medium" style={brandSerif}>
            Security & Privacy
          </h3>
          <div className="d-flex flex-column gap-3">
            {/* Password Reset Item */}
            <div className="d-flex align-items-center justify-content-between p-3 bg-white border border-light shadow-sm rounded-3 cursor-pointer">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">Password Reset</h4>
                  <p className="text-muted small mb-0">
                    Last changed 4 months ago
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="text-muted"
                style={{ width: "16px", height: "16px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            {/* Two-Factor Authentication Item */}
            <div className="d-flex align-items-center justify-content-between p-3 bg-white border border-light shadow-sm rounded-3 cursor-pointer">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-13.332 9-18.03 9-23.634 0-1.3-.21-2.553-.598-3.736A11.959 11.959 0 0 1 12 5.714Z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-muted small mb-0">
                    Enabled via Authenticator App
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="p-1 rounded-circle bg-success"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="text-muted"
                  style={{ width: "16px", height: "16px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>

            {/* Active Sessions Item */}
            <div className="d-flex align-items-center justify-content-between p-3 bg-white border border-light shadow-sm rounded-3 cursor-pointer">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">Active Sessions</h4>
                  <p className="text-muted small mb-0">
                    3 devices currently logged in
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="text-muted"
                style={{ width: "16px", height: "16px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Preferences Section Container */}
        <div className="col-12 col-lg-6">
          <h3 className="h5 mb-3 fw-medium" style={brandSerif}>
            Preferences
          </h3>
          <div className="card border-secondary border-opacity-25 rounded-4 p-4 d-flex flex-column gap-4 bg-white">
            {/* Display Language Setting Dropdown element */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 18c-4.97 0-9-4.03-9-9s4.03-9 9-9m0 0c4.97 0 9 4.03 9 9s-4.03 9-9 9"
                    />
                  </svg>
                </div>
                <h4 className="h6 mb-0 fw-bold text-dark">Display Language</h4>
              </div>
              <div className="btn btn-light border d-flex align-items-center px-3 py-1.5 rounded-2 cursor-pointer">
                <span className="small fw-medium text-dark me-2">
                  English (United States)
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="text-muted"
                  style={{ width: "12px", height: "12px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>

            {/* Push Notifications Toggle Switch */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">
                    Push Notifications
                  </h4>
                  <p className="text-muted small mb-0">
                    Alerts for unusual spending
                  </p>
                </div>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input
                  className="form-check-input cursor-pointer ms-0"
                  type="checkbox"
                  role="switch"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                  style={{ width: "2.5rem", height: "1.4rem" }}
                />
              </div>
            </div>

            {/* Email Reports Toggle Switch */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">Email Reports</h4>
                  <p className="text-muted small mb-0">
                    Weekly financial digest
                  </p>
                </div>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input
                  className="form-check-input cursor-pointer ms-0"
                  type="checkbox"
                  role="switch"
                  checked={emailReports}
                  onChange={() => setEmailReports(!emailReports)}
                  style={{ width: "2.5rem", height: "1.4rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Data Sovereignty Footer Panel */}
      <div
        className="w-full border border-light rounded-4 p-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4"
        style={{ backgroundColor: colors.bannerGray }}
      >
        <div style={{ maxWidth: "650px" }}>
          <h3 className="h5 mb-1 fw-medium" style={brandSerif}>
            Data Sovereignty
          </h3>
          <p className="text-muted small mb-0 lh-base">
            Download a comprehensive archive of your financial data, or request
            a complete account closure and data deletion. ClearView respects
            your right to be forgotten.
          </p>
        </div>
        <div className="d-flex align-items-center gap-4 flex-shrink-0">
          <button className="btn btn-white bg-white border border-secondary border-opacity-25 shadow-sm small fw-bold px-4 py-2 text-dark">
            Export My Data
          </button>
          <button className="btn btn-link text-danger text-decoration-none small fw-bold p-0">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
