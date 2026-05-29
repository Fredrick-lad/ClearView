import { useState } from "react";

interface TopbarProps {
  title: string;
  sub: string;
  onNewEnvelope: () => void;
}

export default function Topbar({ title, sub, onNewEnvelope }: TopbarProps) {
  return (
    <header
      style={{
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div className="text-primary" style={{ fontSize: 18, fontWeight: 800 }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{sub}</div>
      </div>

      <div>
        <button
          className="bg-primary text-white border-primary"
          onClick={onNewEnvelope}
          style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}
        >
          + New Envelope
        </button>
      </div>
    </header>
  );
}
