import React, { useState } from "react";

// --- Type Definitions ---
interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive?: boolean;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

// --- Sub-Components ---
const GuideCard: React.FC<GuideCardProps> = ({
  icon,
  title,
  description,
  isActive = false,
}) => {
  return (
    <div className="col-12 col-md-4 mb-3 mb-md-0">
      <div
        className={`card h-100 p-4 border rounded-3 transition-all`}
        style={{
          backgroundColor: isActive ? "#f0f9f6" : "#ffffff",
          borderColor: isActive ? "#d1e7dd" : "#e0e0e0",
          cursor: "pointer",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-3 mb-3"
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: isActive ? "#0a4230" : "#e1f5fe", // Defaulting rocket background to a soft teal tint
            color: isActive ? "#ffffff" : "#0a4230",
          }}
        >
          {icon}
        </div>
        <h5
          className="fw-bold mb-2 text-dark"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h5>
        <p className="text-muted small mb-0 lh-base">{description}</p>
      </div>
    </div>
  );
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-bottom py-3">
      <button
        className="btn btn-link w-100 d-flex justify-content-between align-items-center text-decoration-none p-0 text-dark fw-bold"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ fontSize: "1rem" }}
      >
        <span className="text-start">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={`bi bi-chevron-down transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-2 text-muted small">{answer}</div>}
    </div>
  );
};

// --- Main HelpModal Component ---
export default function HelpModal() {
  return (
    <div
      className="container my-5 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#71767a",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="card w-100 border-0 shadow-lg overflow-hidden rounded-4"
        style={{ maxWidth: "840px", backgroundColor: "#ffffff" }}
      >
        {/* Header Section */}
        <div
          className="position-relative text-center p-5 border-bottom"
          style={{
            backgroundColor: "#f8f9fa",
            backgroundImage: "radial-gradient(#e0e0e0 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-4"
            aria-label="Close"
          ></button>

          <h2
            className="fw-normal mb-4"
            style={{
              color: "#052c24",
              fontFamily: "Georgia, serif",
              fontSize: "2.25rem",
            }}
          >
            How can we help you?
          </h2>

          <div className="mx-auto" style={{ maxWidth: "520px" }}>
            <div className="input-group bg-white border rounded-3 px-3 py-2 align-items-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="#6c757d"
                className="bi bi-search me-2"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="text"
                className="form-control border-0 p-0 shadow-none bg-transparent"
                placeholder="Search for guides..."
                style={{ fontSize: "1rem" }}
              />
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-4 p-md-5">
          {/* Onboarding Guides */}
          <div className="mb-5">
            <div className="d-flex align-items-center mb-4">
              <div
                style={{
                  width: "4px",
                  height: "24px",
                  backgroundColor: "#000000",
                  marginRight: "12px",
                }}
              ></div>
              <h4
                className="fw-bold m-0"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem" }}
              >
                Onboarding Guides
              </h4>
            </div>

            <div className="row g-3">
              <GuideCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#2ec4b6"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0c-.176 0-.335.116-.392.28L5.084 7.348l-4.148.485a.417.417 0 0 0-.237.704l3.07 2.89-.837 4.093a.417.417 0 0 0 .615.447L7.5 14.11l3.954 2.158a.417.417 0 0 0 .615-.447l-.837-4.093 3.07-2.89a.417.417 0 0 0-.237-.704l-4.148-.485L8.392.28A.417.417 0 0 0 8 0z" />
                  </svg>
                }
                title="Getting Started"
                description="Learn the basics of ClearView's envelope budgeting."
              />
              <GuideCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#2ec4b6"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                  </svg>
                }
                title="Income"
                description="Connect your bank accounts securely."
              />
              <GuideCard
                isActive={true}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31A2 2 0 0 1 2.182 3h3.982L8 4.172l1.828-1.172zM2 4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                  </svg>
                }
                title="Envelopes"
                description="Master the art of allocation."
              />
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <h4
              className="fw-bold mb-4"
              style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem" }}
            >
              Frequently Asked Questions
            </h4>
            <div className="d-flex flex-column gap-1">
              <FAQItem
                question="Is my data secure?"
                answer="Yes, your data is completely encrypted and stored securely following peak standard industry practices."
              />
              <FAQItem
                question="Multiple devices?"
                answer="Absolutely. You can log in and synchronize your budget seamlessly across all your mobile and desktop systems."
              />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div
          className="p-4 p-md-5 text-white"
          style={{ backgroundColor: "#023326" }}
        >
          <h4 className="fw-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Still have questions?
          </h4>
          <p className="text-white-50 small mb-4">
            Our specialists are available 24/7.
          </p>
          <div className="d-flex gap-2">
            <button
              className="btn fw-bold px-4 py-2 text-dark bg-white border-0"
              style={{ fontSize: "0.9rem", borderRadius: "4px" }}
            >
              Live Chat
            </button>
            <button
              className="btn fw-bold px-4 py-2 text-white border bg-transparent"
              style={{
                fontSize: "0.9rem",
                borderColor: "#ffffff",
                borderRadius: "4px",
              }}
            >
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
