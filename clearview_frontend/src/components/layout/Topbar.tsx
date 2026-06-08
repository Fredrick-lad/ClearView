import { Bell, Settings, User } from "lucide-react";
import { useAuth } from "../../hooks/context/userContext";

interface TopbarProps {
  onNewEnvelope: () => void;
}

export default function Topbar({ onNewEnvelope }: TopbarProps) {
  const { userData } = useAuth();

  // const [focus, setFocus] = useState(false);
  return (
    <header
      style={{
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="d-flex flex-column">
        <h2 className="" style={{ margin: 0 }}>
          Hello {userData?.firstName || userData?.username}!
        </h2>
        <p className="small" style={{ margin: 0 }}>
          Here is your financial overview of June 2026{" "}
        </p>
      </div>
      {/* <div>
        <button
          className="bg-brand text-white border-primary p-2 rounded d-flex align-items-center"
          onClick={onNewEnvelope}
          style={{ border: "none", cursor: "pointer" }}
        >
          <Plus size="16px" className="text-white" />
          New Envelope
        </button>
      </div> */}

      <div className="d-flex gap-4 align-items-center">
        <div>
          <button
            onClick={onNewEnvelope}
            type="button"
            className="bg-brand-active text-white p-2 rounded"
            style={{ border: "none" }}
          >
            New Envelope
          </button>
        </div>
        <div>
          <Bell />
        </div>
        <div className="">
          <Settings />
        </div>
        <div className="">
          <User />
        </div>
      </div>
    </header>
  );
}
