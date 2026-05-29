import type { Envelope, ModalKind } from "../types";

interface Props {
  envelopes: Envelope[];
  setModal: (m: ModalKind) => void;
}

export default function EnvelopesScreen({ envelopes, setModal }: Props) {
  return (
    <div style={{ padding: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3>All Envelopes ({envelopes.length})</h3>
        <button
          onClick={() => setModal("env")}
          style={{ padding: "6px 10px", cursor: "pointer" }}
        >
          + New Envelope
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
        }}
      >
        {envelopes.map((e) => (
          <div
            key={e.id}
            style={{
              border: "1px solid #e5e7eb",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <div style={{ fontWeight: 700 }}>{e.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Limit: KES {e.limit.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
