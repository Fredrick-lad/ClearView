import { X, Lightbulb, Info, ArrowRight } from "lucide-react";

interface Props {
  step: 1 | 2 | 3;
  onClose: () => void;
}

const content: Record<number, { title: string; tips: string[]; why: string }> =
  {
    1: {
      title: "Choosing Your Goal",
      tips: [
        "Your goal helps us personalize your default envelopes and suggestions.",
        "Pick the option that best describes why you want to budget as a student.",
        "You can change your focus later in Settings if your priorities shift.",
        "If you're unsure, 'Track my semester spending' is a great starting point.",
      ],
      why: "Setting a clear goal upfront makes budgeting feel purposeful like choosing a destination before starting a trip.",
    },
    2: {
      title: "Adding Income & Periods",
      tips: [
        "A 'period' represents your academic term (e.g. Semester 1, Jan–June).",
        "Add all income sources: allowance, scholarship, part-time job, M-Pesa remittances, etc.",
        "Use the semester quick-fill buttons to auto-set your academic dates.",
        "Your total income determines how much goes into each spending envelope.",
        "Only 70% of your income is allocated the rest stays unallocated as a safety buffer.",
      ],
      why: "Academic income is lumpy you get bursaries or allowance in chunks. Setting a period helps you plan across the entire semester, not just month-to-month.",
    },
    3: {
      title: "Reviewing Your Envelopes",
      tips: [
        "Your envelopes have been auto-created based on common student spending patterns.",
        "Each envelope shows its monthly limit, how much has been spent, and what's remaining.",
        "Green bar = doing great. Amber = getting close. Red = almost or over the limit.",
        "You can add custom envelopes for things like 'Data & Airtime' or 'Self-Care'.",
        "Don't worry you can edit limits and add envelopes anytime from the dashboard.",
      ],
      why: "The envelope method forces you to prioritize. Once an envelope hits zero, you pause spending in that category no more guessing where your money went.",
    },
  };

export default function OnboardingHelpModal({ step, onClose }: Props) {
  const c = content[step];

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 1070,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4"
        style={{
          maxWidth: "480px",
          width: "90%",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <Info size={20} style={{ color: "#0F6E56" }} />
            <h4
              className="h5 fw-bold mb-0"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {c.title}
            </h4>
          </div>
          <button className="btn p-0 border-0 shadow-none" onClick={onClose}>
            <X size={20} className="text-muted" />
          </button>
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Lightbulb size={16} style={{ color: "#EF9F27" }} />
            <span
              className="fw-semibold small"
              style={{ color: "#0F6E56", letterSpacing: "0.03em" }}
            >
              TIPS
            </span>
          </div>
          <ul className="mb-0" style={{ paddingLeft: "1.25rem" }}>
            {c.tips.map((tip, i) => (
              <li
                key={i}
                className="small mb-2 text-secondary"
                style={{ lineHeight: 1.5 }}
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-3 p-3 d-flex align-items-start gap-2"
          style={{ backgroundColor: "#E1F5EE" }}
        >
          <p
            className="small mb-0"
            style={{ color: "#053225", lineHeight: 1.5 }}
          >
            {c.why}
          </p>
        </div>
      </div>
    </div>
  );
}
