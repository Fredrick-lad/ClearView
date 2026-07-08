import { LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/context/userContext";
import TopBar from "../components/layout/Topbar";
import { GetData } from "../hooks/context/generalContext";

export default function LogoutScreen() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const { goBack } = GetData();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div
      className="px-2 px-sm-3 px-md-4 mx-auto bg-ui-bg"
      style={{ maxWidth: "600px" }}
    >
      <TopBar title="Logout" showBack onBack={goBack} />

      <div
        className="card bg-white border-0 shadow-sm p-5 text-center"
        style={{ borderRadius: "12px", marginTop: "2rem" }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
          style={{
            width: "72px",
            height: "72px",
            backgroundColor: "#fef2f2",
          }}
        >
          <LogOut size={32} style={{ color: "#dc2626" }} />
        </div>

        <h2
          className="h4 fw-bold mb-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Leave so soon?
        </h2>
        <p className="text-muted small mb-4" style={{ maxWidth: "360px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
          You'll need to sign back in to access your semester budget. Make sure all your expenses are saved before you go.
        </p>

        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <button
            className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 px-4 py-2 shadow-none"
            style={{ borderRadius: "8px", fontSize: "14px" }}
            onClick={goBack}
          >
            <ArrowLeft size={16} />
            Stay logged in
          </button>
          <button
            className="btn text-white d-inline-flex align-items-center gap-2 px-4 py-2 border-0 shadow-none"
            style={{ backgroundColor: "#dc2626", borderRadius: "8px", fontSize: "14px" }}
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Yes, log me out
          </button>
        </div>
      </div>
    </div>
  );
}
