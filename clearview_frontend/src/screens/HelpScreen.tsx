import { useState } from "react";
import TopBar from "../components/layout/Topbar";
import { ChevronDown, ChevronRight, BookOpen, Mail, FileText, Search, MessageSquare } from "lucide-react";
import { GetData } from "../hooks/context/generalContext";

const brandColors = {
  primaryDark: "var(--cv-primary-dark)",
  cardDarkBg: "var(--cv-card-dark-bg)",
  mainBg: "var(--cv-main-bg)",
};

const faqs = [
  {
    q: "How do I set up my semester budget?",
    a: "Go through the quick onboarding when you first sign up. Tell us your goal, add your income sources, and we'll auto-create envelopes for you. You can always adjust them later from the Envelopes screen.",
  },
  {
    q: "What's an envelope and how does it work?",
    a: "An envelope is a spending category with a limit (e.g. Food: KES 5,000). When you log an expense, it deducts from that envelope. Once the envelope hits zero, you know it's time to pause spending in that category for the month.",
  },
  {
    q: "How do I add income from my allowance or part-time job?",
    a: "Go to the Income screen and tap 'Add Income'. Enter the source (e.g. Parent Allowance, Scholarship) and the amount. The system will show you how much is allocated to envelopes vs unallocated.",
  },
  {
    q: "Can I add custom envelopes for things like 'Data & Airtime'?",
    a: "Yes! Go to the Envelopes screen and tap 'New Envelope'. Give it a name, set a monthly limit, and choose an icon. It will appear alongside your default envelopes.",
  },
  {
    q: "What happens if I overspend an envelope?",
    a: "The progress bar turns red when you're near or over the limit. You can transfer money from another envelope or adjust the limit. The goal is awareness, not punishment — adjust as needed.",
  },
  {
    q: "How does the 30% unallocated income work?",
    a: "When you set up your budget, only 70% of your total income is divided into envelopes. The remaining 30% stays unallocated as a safety buffer for unexpected expenses or savings.",
  },
  {
    q: "Can I use ClearView without a bank account?",
    a: "Absolutely. ClearView is designed for students who use M-Pesa, cash, or mobile money. Just log your transactions manually — no bank sync required.",
  },
  {
    q: "Is my financial data private and secure?",
    a: "Yes. Your password is hashed with bcrypt, your session is protected with JWT tokens, and all data is stored securely. We never share or sell your financial information.",
  },
  {
    q: "How do I roll over to a new semester?",
    a: "Go to Settings and you'll find the option to roll over to the next semester. This resets your envelopes while keeping your income history for comparison.",
  },
  {
    q: "Can I export my financial data?",
    a: "Yes. Go to your Profile page and tap 'Export My Data' to download a CSV file of your financial records.",
  },
];

const guides = [
  {
    icon: BookOpen,
    title: "Getting Started Guide",
    desc: "New to ClearView? Walk through the basics of setting up your first semester budget in 5 minutes.",
  },
  {
    icon: FileText,
    title: "Envelope Budgeting Explained",
    desc: "Learn how the envelope method helps students stop overspending and build better money habits.",
  },
  {
    icon: Search,
    title: "Understanding Your Reports",
    desc: "How to read your spending insights, compare periods, and track your financial discipline over time.",
  },
];

export default function HelpScreen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { setScreen } = GetData();

  return (
    <div
      className="px-4 p-md-3 mx-auto bg-ui-bg pb-5"
      style={{ maxWidth: "1200px" }}
    >
      <TopBar title="Help Center" showBack onBack={() => setScreen("Dashboard")} />

      {/* Quick Guides */}
      <div className="row g-4 mb-4">
        {guides.map((g, i) => {
          const Icon = g.icon;
          return (
            <div className="col-12 col-md-4" key={i}>
              <div
                className="card h-100 p-4 bg-white border-0 shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{
                    width: "44px", height: "44px",
                    backgroundColor: "var(--cv-brand-light)",
                  }}
                >
                  <Icon size={22} style={{ color: brandColors.primaryDark }} />
                </div>
                <h3 className="h6 fw-bold mb-1">{g.title}</h3>
                <p className="small text-muted mb-0">{g.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <h3 className="h5 fw-bold mb-3" style={{ fontFamily: "Georgia, serif" }}>
        Frequently Asked Questions
      </h3>
      <div
        className="card bg-white border-0 shadow-sm mb-4"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              borderBottom: i < faqs.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <button
              className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent px-4 py-3 text-start"
              style={{ cursor: "pointer" }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span className="fw-semibold small text-dark pe-3">{faq.q}</span>
              {openFaq === i ? (
                <ChevronDown size={16} className="flex-shrink-0 text-muted" />
              ) : (
                <ChevronRight size={16} className="flex-shrink-0 text-muted" />
              )}
            </button>
            {openFaq === i && (
              <div className="px-4 pb-3">
                <p className="small text-secondary mb-0" style={{ lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div
        className="card bg-white border-0 shadow-sm p-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-5"
        style={{ borderRadius: "12px" }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
            style={{
              width: "44px", height: "44px",
              backgroundColor: "var(--cv-brand-light)",
            }}
          >
            <Mail size={20} style={{ color: brandColors.primaryDark }} />
          </div>
          <div>
            <h4 className="h6 fw-bold mb-0">Still need help?</h4>
            <p className="small text-muted mb-0">
              Reach out to your system administrator or project supervisor.
            </p>
          </div>
        </div>
        <button
          className="btn text-white d-inline-flex align-items-center gap-2 px-4 py-2 fw-semibold border-0 flex-shrink-0 shadow-none"
          style={{ backgroundColor: brandColors.primaryDark, borderRadius: "8px", fontSize: "13px" }}
          onClick={() => setScreen("contactSupport")}
        >
          <MessageSquare size={16} />
          Contact Support
        </button>
      </div>
    </div>
  );
}
