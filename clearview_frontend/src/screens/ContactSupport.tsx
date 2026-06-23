import { useState } from "react";
import TopBar from "../components/layout/Topbar";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";

const brandColors = {
  primaryDark: "var(--cv-primary-dark)",
};

export default function ContactSupport() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="px-4 p-md-3 mx-auto bg-ui-bg pb-5"
      style={{ maxWidth: "800px" }}
    >
      <TopBar title="Contact Support" />

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-5">
          <div
            className="card bg-white border-0 shadow-sm p-4"
            style={{ borderRadius: "12px" }}
          >
            <h3
              className="h6 fw-bold mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Get in touch
            </h3>

            <div className="d-flex align-items-start gap-3 mb-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "var(--cv-brand-light)",
                }}
              >
                <Mail size={18} style={{ color: brandColors.primaryDark }} />
              </div>
              <div>
                <p className="fw-semibold small mb-0">Email</p>
                <p className="text-muted small mb-0">
                  support@clearview.app
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "var(--cv-brand-light)",
                }}
              >
                <MessageSquare size={18} style={{ color: brandColors.primaryDark }} />
              </div>
              <div>
                <p className="fw-semibold small mb-0">Project Supervisor</p>
                <p className="text-muted small mb-0">
                  Mr. Martin · Dept. of CS &amp; IT
                </p>
              </div>
            </div>

            <hr className="my-3" />

            <p className="small text-muted mb-0" style={{ lineHeight: 1.5 }}>
              This is an academic project. For technical issues or feature
              requests, please reach out to the development team.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div
            className="card bg-white border-0 shadow-sm p-4"
            style={{ borderRadius: "12px" }}
          >
            {sent ? (
              <div className="text-center py-5">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "var(--cv-brand-light)",
                  }}
                >
                  <CheckCircle
                    size={32}
                    style={{ color: brandColors.primaryDark }}
                  />
                </div>
                <h4
                  className="h5 fw-bold mb-1"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Message sent
                </h4>
                <p className="small text-muted mb-0">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="h6 fw-bold mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="small fw-semibold text-secondary mb-1 d-block"
                      style={{ fontSize: "12px" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      placeholder="e.g. Bug report, feature request"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      required
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="small fw-semibold text-secondary mb-1 d-block"
                      style={{ fontSize: "12px" }}
                    >
                      Message
                    </label>
                    <textarea
                      className="form-control shadow-none"
                      rows={5}
                      placeholder="Describe your issue or question in detail..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        resize: "vertical",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn text-white d-inline-flex align-items-center gap-2 px-4 py-2 border-0 shadow-none"
                    style={{
                      backgroundColor: brandColors.primaryDark,
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
