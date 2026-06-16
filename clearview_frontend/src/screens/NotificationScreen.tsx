import React from "react";

export default function NotificationsView() {
  // ClearView design language constants derived from screen_8.png
  const styles = {
    serifText: { fontFamily: "Georgia, serif" },
    sectionHeader: { fontSize: "12px", letterSpacing: "0.05em" },
    cardBorder: "1px solid rgba(0, 0, 0, 0.12)",
    mintUnreadBg: "#EDF9F4",
    unreadDotColor: "#013328",
    olderCardBg: "#F8F9FA",
  };

  return (
    <div
      className="container-fluid py-4  text-dark"
      style={{ maxWidth: "1000px" }}
    >
      {/* --- TOP HEADER CONTROL ROW --- */}
      <div className="d-flex justify-content-between align-items-center mb-4 pt-2">
        <p className="mb-0 text-secondary" style={{ fontSize: "15px" }}>
          You have <strong className="text-dark fw-bold">3 unread</strong>{" "}
          notifications
        </p>
        <button
          className="btn btn-white bg-white border px-3 py-2 d-flex align-items-center gap-2 fw-medium text-dark shadow-sm"
          style={{
            borderRadius: "6px",
            fontSize: "14px",
            borderColor: "rgba(0, 0, 0, 0.15)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            style={{ width: "16px", height: "16px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          Mark all as read
        </button>
      </div>

      {/* --- TODAY TIMELINE SECTION --- */}
      <div className="mb-5">
        <h6
          className="text-secondary fw-bold mb-3 uppercase"
          style={styles.sectionHeader}
        >
          TODAY
        </h6>

        {/* Item 1: Budget Alert */}
        <div
          className="card bg-white p-3 mb-3 shadow-none rounded-3"
          style={{ border: styles.cardBorder }}
        >
          <div className="d-flex gap-3">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#FEF2F2",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#DC2626"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-baseline">
                <h5 className="h6 mb-1 fw-bold" style={styles.serifText}>
                  Budget Alert: Groceries
                </h5>
                <span className="text-muted small">2m ago</span>
              </div>
              <p className="text-secondary small mb-3">
                You've reached 95% of your monthly grocery budget of Ksh 4000.0.
              </p>
              <div className="d-flex gap-3 align-items-center">
                <button className="btn btn-link p-0 text-dark font-sans small fw-semibold text-decoration-underline shadow-none">
                  Adjust Budget
                </button>
                <button className="btn btn-link p-0 text-secondary font-sans small text-decoration-none shadow-none">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Item 2: Income Received (Unread Variant) */}
        <div
          className="card p-3 shadow-none rounded-3 border-0"
          style={{ backgroundColor: styles.mintUnreadBg }}
        >
          <div className="d-flex gap-3">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#2ED994",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#0A4433"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a6.02 6.02 0 0 1 11.696 0M2.25 5.625c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-9.75Z"
                />
              </svg>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-baseline">
                <h5 className="h6 mb-1 fw-bold" style={styles.serifText}>
                  Income Received
                </h5>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">4h ago</span>
                  <div
                    className="rounded-circle ms-1"
                    style={{
                      width: "7px",
                      height: "7px",
                      backgroundColor: styles.unreadDotColor,
                    }}
                  />
                </div>
              </div>
              <p className="text-secondary small mb-0">
                Direct deposit of Ksh 3,250.00 from 'Design Studio Corp' has
                been processed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- YESTERDAY TIMELINE SECTION --- */}
      <div className="mb-5">
        <h6
          className="text-secondary fw-bold mb-3"
          style={styles.sectionHeader}
        >
          YESTERDAY
        </h6>

        {/* Item 3: Security Alert */}
        <div
          className="card bg-white p-3 mb-3 shadow-none rounded-3"
          style={{ border: styles.cardBorder }}
        >
          <div className="d-flex gap-3">
            <div
              className="rounded-3 bg-light d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: "40px", height: "40px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#4B5563"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-baseline">
                <h5 className="h6 mb-1 fw-bold" style={styles.serifText}>
                  Security Alert
                </h5>
                <span className="text-muted small">Yesterday, 4:15 PM</span>
              </div>
              <p className="text-secondary small mb-0">
                A new login was detected from a Chrome browser on Windows in New
                York, USA.
              </p>
            </div>
          </div>
        </div>

        {/* Item 4: New Report Available */}
        <div
          className="card bg-white p-3 shadow-none rounded-3"
          style={{ border: styles.cardBorder }}
        >
          <div className="d-flex gap-3">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#E0F2FE",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#0369A1"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.187L15 15l-5.187.904zM18 7l-.5 2.5L15 10l2.5.5.5 2.5.5-2.5 2.5-.5-2.5-.5L18 7z"
                />
              </svg>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-baseline">
                <h5 className="h6 mb-1 fw-bold" style={styles.serifText}>
                  New Report Available
                </h5>
                <span className="text-muted small">Yesterday, 9:00 AM</span>
              </div>
              <p className="text-secondary small mb-0">
                Your monthly spending analysis for October is ready for review.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- OLDER TIMELINE GRID SECTION --- */}
      <div className="mb-5">
        <h6
          className="text-secondary fw-bold mb-3"
          style={styles.sectionHeader}
        >
          OLDER
        </h6>

        <div className="row g-3">
          {/* Card left: Monthly Newsletter */}
          <div className="col-12 col-md-6">
            <div
              className="card p-3 border-0 rounded-3"
              style={{ backgroundColor: styles.olderCardBg }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle bg-white border d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                  style={{ width: "36px", height: "36px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#6B7280"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h6
                    className="mb-0 fw-semibold text-dark"
                    style={{ fontSize: "14px" }}
                  >
                    Monthly Newsletter
                  </h6>
                  <p
                    className="mb-0 text-secondary"
                    style={{ fontSize: "13px" }}
                  >
                    5 Tips to save on your taxes this year.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card right: Bank Sync Success */}
          <div className="col-12 col-md-6">
            <div
              className="card p-3 border-0 rounded-3"
              style={{ backgroundColor: styles.olderCardBg }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle bg-white border d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                  style={{ width: "36px", height: "36px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#6B7280"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                <div>
                  <h6
                    className="mb-0 fw-semibold text-dark"
                    style={{ fontSize: "14px" }}
                  >
                    Message Sync Success
                  </h6>
                  <p
                    className="mb-0 text-secondary"
                    style={{ fontSize: "13px" }}
                  >
                    Connected 2 accounts from Mpesa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER UTILITIES TIMELINE ACTIONS --- */}
      <div className="border-top pt-4 mt-5 text-center">
        <p className="text-muted small mb-2 opacity-75">
          Showing notifications from the last 30 days
        </p>
        <button className="btn btn-link p-0 text-secondary small fw-medium text-decoration-none shadow-none">
          Load more history
        </button>
      </div>
    </div>
  );
}
