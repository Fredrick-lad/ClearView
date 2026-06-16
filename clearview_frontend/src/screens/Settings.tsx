import React, { useState } from "react";

export default function SettingsContent() {
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [budgetRollover, setBudgetRollover] = useState(true);
  const [appearance, setAppearance] = useState("light");

  // Custom brand styles matching the ClearView design system
  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    deepGreen: "#0A4433",
    lightGreenAccent: "#CCECE0",
    mintBg: "#EBF5F1",
    dangerLight: "#FDE8E8",
    dangerText: "#C81E1E",
    darkThemeBg: "#26292B",
  };

  return (
    <div className="container-fluid py-4 px-md-4  min-vh-screen text-dark">
      {/* Page Title */}
      <h1 className="h3 fw-bold mb-4" style={brandSerif}>
        Settings
      </h1>

      <div className="row g-4">
        {/* Left Column: General & Appearance */}
        <div className="col-12 col-lg-7 d-flex flex-column gap-4">
          {/* Card 1: General Settings */}
          <div className="card border border-secondary border-opacity-25 rounded-4 p-4 shadow-sm bg-white">
            <div className="d-flex align-items-center mb-4">
              <div
                className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: colors.mintBg,
                  color: colors.deepGreen,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>
                General Settings
              </h2>
            </div>

            {/* Default Currency Selection */}
            <div className="mb-4">
              <label
                className="text-uppercase text-muted fw-bold tracking-widest d-block mb-2"
                style={{ fontSize: "0.7rem" }}
              >
                Default Currency
              </label>
              <select className="form-select py-2.5 px-3 border border-secondary border-opacity-25 rounded-3 shadow-none text-dark fw-medium">
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
              </select>
            </div>

            {/* Date Format Toggle Selection */}
            <div className="mb-4">
              <label
                className="text-uppercase text-muted fw-bold tracking-widest d-block mb-2"
                style={{ fontSize: "0.7rem" }}
              >
                Date Format
              </label>
              <div className="row g-2">
                <div className="col-6">
                  <button
                    onClick={() => setDateFormat("MM/DD/YYYY")}
                    className="btn w-100 py-3 rounded-3 border fw-medium transition-all"
                    style={{
                      backgroundColor:
                        dateFormat === "MM/DD/YYYY" ? colors.mintBg : "#fff",
                      borderColor:
                        dateFormat === "MM/DD/YYYY"
                          ? colors.deepGreen
                          : "rgba(0,0,0,0.15)",
                      color: colors.deepGreen,
                    }}
                  >
                    MM/DD/YYYY
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={() => setDateFormat("DD/MM/YYYY")}
                    className="btn w-100 py-3 rounded-3 border fw-medium transition-all"
                    style={{
                      backgroundColor:
                        dateFormat === "DD/MM/YYYY" ? colors.mintBg : "#fff",
                      borderColor:
                        dateFormat === "DD/MM/YYYY"
                          ? colors.deepGreen
                          : "rgba(0,0,0,0.15)",
                      color: colors.deepGreen,
                    }}
                  >
                    DD/MM/YYYY
                  </button>
                </div>
              </div>
            </div>

            <hr className="text-muted opacity-25 my-3" />

            {/* Budget Rollover Toggle Switch Item */}
            <div className="d-flex align-items-center justify-content-between pt-2">
              <div>
                <h4 className="h6 mb-1 fw-bold text-dark">
                  Automatic Budget Rollover
                </h4>
                <p className="text-muted small mb-0">
                  Unused funds in envelopes move to next month.
                </p>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input
                  className="form-check-input cursor-pointer ms-0"
                  type="checkbox"
                  role="switch"
                  checked={budgetRollover}
                  onChange={() => setBudgetRollover(!budgetRollover)}
                  style={{
                    width: "2.5rem",
                    height: "1.4rem",
                    backgroundColor: budgetRollover ? colors.deepGreen : "",
                    borderColor: budgetRollover ? colors.deepGreen : "",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Appearance Container */}
          <div
            className="card border-0 rounded-4 p-4 shadow-sm"
            style={{ backgroundColor: colors.mintBg }}
          >
            <div className="d-flex align-items-center mb-4">
              <div
                className="p-2 rounded-3 bg-white me-3 d-flex align-items-center justify-content-center shadow-sm"
                style={{ color: colors.deepGreen }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M4.098 19.902a3.75 3.75 0 0 1 5.304 0l6.401-6.402M4.098 19.902l1.314-1.313m11.386-11.386 1.314-1.314a3 3 0 1 1 4.243 4.243l-1.314 1.314m-4.243-4.243-1.165 1.165m0 0 2.221 2.221m-2.221-2.221L12 9.176m4.243 4.243-1.165 1.165m0 0 2.221 2.221m-2.221-2.221-1.314 1.314m3.535-3.535-1.314 1.314m-5.657-5.657-1.314 1.314m0 0-2.221-2.221m2.221 2.221L7.176 12"
                  />
                </svg>
              </div>
              <h2
                className="h5 mb-0 fw-medium"
                style={{ ...brandSerif, color: colors.deepGreen }}
              >
                Appearance
              </h2>
            </div>

            {/* Theme Display Selectors Split Blocks */}
            <div className="row g-3">
              {/* Light Mode */}
              <div className="col-4">
                <div
                  onClick={() => setAppearance("light")}
                  className="card p-3 text-center border cursor-pointer rounded-3 bg-white h-100 align-items-center justify-content-center transition-all shadow-sm"
                  style={{
                    borderColor:
                      appearance === "light" ? colors.deepGreen : "transparent",
                    borderWidth: "2px",
                  }}
                >
                  <div
                    className="border border-light-subtle rounded-3 p-3 bg-light d-flex align-items-center justify-content-center mb-2 w-100"
                    style={{ height: "60px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="text-secondary"
                      style={{ width: "22px", height: "22px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m11.37 11.37l1.59 1.59M3 12h2.25m13.5 0H21M5.81 18.19l1.59-1.59M16.81 7.19l1.59-1.59M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
                      />
                    </svg>
                  </div>
                  <span
                    className="small fw-bold text-dark"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Light Mode
                  </span>
                </div>
              </div>

              {/* Dark Mode */}
              <div className="col-4">
                <div
                  onClick={() => setAppearance("dark")}
                  className="card p-3 text-center border cursor-pointer rounded-3 h-100 align-items-center justify-content-center transition-all"
                  style={{
                    borderColor:
                      appearance === "dark" ? colors.deepGreen : "transparent",
                    borderWidth: "2px",
                    backgroundColor: colors.darkThemeBg,
                  }}
                >
                  <div
                    className="rounded-3 p-3 d-flex align-items-center justify-content-center mb-2 w-100"
                    style={{ height: "60px", backgroundColor: "#1A1C1E" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="text-white-50"
                      style={{ width: "22px", height: "22px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    </svg>
                  </div>
                  <span
                    className="small fw-bold text-white-50"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Dark Mode
                  </span>
                </div>
              </div>

              {/* System Configuration */}
              <div className="col-4">
                <div
                  onClick={() => setAppearance("system")}
                  className="card p-3 text-center border cursor-pointer rounded-3 h-100 align-items-center justify-content-center transition-all bg-light-subtle"
                  style={{
                    borderColor:
                      appearance === "system"
                        ? colors.deepGreen
                        : "transparent",
                    borderWidth: "2px",
                  }}
                >
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center mb-2 w-100 overflow-hidden"
                    style={{
                      height: "60px",
                      background:
                        "linear-gradient(90deg, #ffffff 50%, #26292B 50%)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="text-secondary"
                      style={{
                        width: "22px",
                        height: "22px",
                        mixBlendMode: "difference",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25"
                      />
                    </svg>
                  </div>
                  <span
                    className="small fw-bold text-secondary"
                    style={{ fontSize: "0.75rem" }}
                  >
                    System
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Management & Data Export */}
        <div className="col-12 col-lg-5 d-flex flex-column gap-4">
          {/* Card 3: Account Management Section */}
          <div className="card border border-secondary border-opacity-25 rounded-4 p-4 shadow-sm bg-white">
            <div className="d-flex align-items-center mb-4">
              <div
                className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: colors.mintBg,
                  color: colors.deepGreen,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>
                Account Management
              </h2>
            </div>

            {/* Profile Avatar & Identity Block Card snippet */}
            <div className="p-3 rounded-3 border bg-light d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                {/* SVG Avatar Placeholder */}
                <div
                  className="rounded-circle overflow-hidden bg-secondary bg-opacity-50 d-flex align-items-center justify-content-center border me-3"
                  style={{ width: "46px", height: "46px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="text-white w-70 h-70 mt-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">
                    Marcus Richardson
                  </h4>
                  <p
                    className="text-muted small mb-0 font-monospace"
                    style={{ fontSize: "0.75rem" }}
                  >
                    m.richardson@clearview.com
                  </p>
                </div>
              </div>
              <button
                className="btn btn-white border border-secondary border-opacity-25 p-2 rounded-2 shadow-sm d-flex align-items-center"
                aria-label="Edit Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="text-secondary"
                  style={{ width: "16px", height: "16px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>

            {/* Action Links List */}
            <div className="d-flex flex-column gap-3">
              {/* Change Password */}
              <div className="d-flex align-items-center justify-content-between py-2 border-bottom cursor-pointer text-dark-hover">
                <div className="d-flex align-items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="text-muted"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <span className="small fw-semibold">Change Password</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="text-muted"
                  style={{ width: "14px", height: "14px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>

              {/* Two-Factor Auth Info Status row */}
              <div className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="text-muted"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-13.332 9-18.03 9-23.634 0-1.3-.21-2.553-.598-3.736A11.959 11.959 0 0 1 12 5.714Z"
                    />
                  </svg>
                  <span className="small fw-semibold">Two-Factor Auth</span>
                </div>
                <span
                  className="badge text-uppercase text-success px-2 py-1 border border-success border-opacity-20"
                  style={{
                    backgroundColor: "#E8F8F2",
                    fontSize: "0.65rem",
                    fontWeight: "bold",
                  }}
                >
                  Enabled
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Data Export Tools Segment */}
          <div className="card border border-secondary border-opacity-25 rounded-4 p-4 shadow-sm bg-white">
            <div className="d-flex align-items-center mb-3">
              <div
                className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: colors.mintBg,
                  color: colors.deepGreen,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 .621-.504 1.125-1.125 1.125h-14.25c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v1.5ZM6 12a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75Z"
                  />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>
                Data Export
              </h2>
            </div>

            <p className="text-muted small mb-4">
              Download your financial history for backup or external analysis.
            </p>

            {/* Split Export Option Elements Buttons */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <button className="btn btn-white w-100 border p-3 rounded-3 d-flex flex-column align-items-center justify-content-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="text-secondary mb-2"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  <span
                    className="small fw-bold text-dark"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Export CSV
                  </span>
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-white w-100 border p-3 rounded-3 d-flex flex-column align-items-center justify-content-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="text-secondary mb-2"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5-3h7.5M6.75 21a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 .53.22l5.25 5.25a.75.75 0 0 1 .22.53v11.25a.75.75 0 0 1-.75.75H6.75Z"
                    />
                  </svg>
                  <span
                    className="small fw-bold text-dark"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Report PDF
                  </span>
                </button>
              </div>
            </div>

            {/* Dangerous Area Block Action */}
            <button
              className="btn w-100 border-0 py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              style={{
                backgroundColor: colors.dangerLight,
                color: colors.dangerText,
                fontSize: "0.85rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: "16px", height: "16px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Delete Account & Data
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Action Submission Control Footer Buttons */}
      <div className="d-flex justify-content-end align-items-center gap-3 mt-4 pt-3">
        <button className="btn btn-white bg-white border border-secondary border-opacity-25 px-4 py-2.5 rounded-3 text-dark fw-semibold small shadow-sm">
          Discard Changes
        </button>
        <button
          className="btn text-white px-4 py-2.5 rounded-3 fw-semibold small shadow-sm"
          style={{ backgroundColor: colors.deepGreen }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
