import type { ModalKind } from "../types";
import EnvelopePageCards from "../components/cards/EnvelopePageCards";
import { useAuth } from "../hooks/context/userContext";

interface Props {
  setModal: (m: ModalKind) => void;
}

export default function EnvelopesScreen() {
  const { envelopeData } = useAuth();

  // Guard against undefined before data loads
  const envelopes = envelopeData ?? [];

  return (
    <div style={{ padding: 18 }}>
      {/* <div className="w-75 p-3 d-flex bg-brand-light rounded flex-column ">
      <div className="d-flex justify-content-between">
        <span>Icon</span>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      <div>
        <span>Envelope name</span>
        <span>Spent amount</span>
        <div>Progress bar</div>
      </div>
      <div className="d-flex justify-content-between">
        <span>Message</span>
        <span>Percentage</span>
      </div>
    </div> */}
      {envelopes.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {/* ✅ env is the item, index is the position */}
          {envelopes.map((env: any, index: any) => (
            <div
              key={index}
              className="card"
              style={{ borderLeft: `5px solid ${env.color}` }}
            >
              <div className=" p-3 d-flex bg-brand-light rounded flex-column ">
                <div className="d-flex justify-content-between">
                  <span>Icon</span>
                  <div>
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
                <div>
                  <span>{env.name}</span>
                  <span>{env.monthly_limit}</span>
                  <span>{env.current_spend}</span>
                  <div
                    style={{
                      backgroundColor: "#eee",
                      borderRadius: 4,
                      height: 8,
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min((env.current_spend / env.monthly_limit) * 100, 100)}%`,
                        backgroundColor: env.color,
                        height: "100%",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <span>{env.description}</span>
                  <span>Percentage</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No envelopes found.</p>
      )}
    </div>
  );
}
