import { useState } from "react";
import { Plus, ArrowDown, DollarSign, Wallet } from "lucide-react";
import { GetData } from "../hooks/context/generalContext";
import Sidebar from "../components/layout/Sidebar";
import DashboardScreen from "./DashboardScreen";
import EnvelopesScreen from "./EnvelopesScreen";
import ExpensesScreen from "./ExpensesScreen";
import IncomeScreen from "./IncomeScreen";
import ReportsScreen from "./ReportsScreen";
import MobileNav from "../components/layout/MobileNav";
import SettingsContent from "./Settings";
import UserProfileContent from "./UserProfile";
import CreateEnvelopeModal from "../modals/EnvelopeModal";
import AddExpenseModal from "../modals/AddExpenseModal";
import AddIncomeModal from "../modals/IncomeModal";
import NotificationsView from "./NotificationScreen";
import HelpScreen from "./HelpScreen";
import LogoutScreen from "./LogoutScreen";
import ContactSupport from "./ContactSupport";
import DeleteEnvelopeModal from "../modals/DeleteModal";
import EditEnvelopeModal from "../modals/EditenvModal";
import EditExpenseModal from "../modals/EditExpenseModal";
import EnvelopeSuccessModal from "../modals/EnvelopeSucces";

function MainScreen() {
  const { screen, setScreen, modal, setModal } = GetData();
  const [fabOpen, setFabOpen] = useState(false);

  const handleFabAction = (action: () => void) => {
    setFabOpen(false);
    action();
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Sidebar - desktop only */}
      <div
        className="d-none d-lg-flex flex-column flex-shrink-0"
        style={{ width: "220px", height: "100%" }}
      >
        <Sidebar
          title="ClearView"
          screen={screen}
          setScreen={setScreen}
          setModal={setModal}
        />
      </div>

      {/* Main content area */}
      <div className="d-flex flex-column flex-grow-1">
        {/* Scrollable content */}
        <div className="flex-grow-1 overflow-auto position-relative">
          <main>
            {screen === "Dashboard" && (
              <DashboardScreen
                envelopes={[]}
                expenses={[]}
                totalInc={0}
                totalAlloc={12000}
                totalSpent={1200}
                unalloc={0}
                setScreen={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}
            {screen === "Envelopes" && <EnvelopesScreen />}
            {screen === "Expenses" && <ExpensesScreen />}
            {screen === "Income" && <IncomeScreen />}
            {screen === "Reports" && <ReportsScreen />}
            {screen === "settings" && <SettingsContent />}
            {screen === "Profile" && <UserProfileContent />}
            {screen === "Notifications" && <NotificationsView />}
            {screen === "helpCenter" && <HelpScreen />}
            {screen === "logout" && <LogoutScreen />}
            {screen === "contactSupport" && <ContactSupport />}
            {modal === "env" ? (
              <CreateEnvelopeModal
                isOpen={true}
                onClose={() => {
                  setModal(null);
                }}
              />
            ) : null}
            {modal === "exp" && (
              <AddExpenseModal isOpen={true} onClose={() => setModal(null)} />
            )}

            {modal === "inc" && (
              <AddIncomeModal isOpen={true} onClose={() => setModal(null)} />
            )}
            {modal === "del" && (
              <DeleteEnvelopeModal
                isOpen={true}
                onClose={() => setModal(null)}
              />
            )}
            {modal === "edit" && (
              <EditEnvelopeModal isOpen={true} onClose={() => setModal(null)} />
            )}
            {modal === "editexp" && (
              <EditExpenseModal isOpen={true} onClose={() => setModal(null)} />
            )}
            {modal === "envSuccess" && (
              <EnvelopeSuccessModal
                isOpen={true}
                onClose={() => setModal(null)}
              />
            )}
          </main>
        </div>

        {/* Floating Action Button - mobile/tablet only */}
        <div
          className="d-lg-none"
          style={{
            position: "fixed",
            bottom: "76px",
            right: "16px",
            zIndex: 1030,
          }}
        >
          {/* FAB menu items */}
          {fabOpen && (
            <div className="d-flex flex-column align-items-end gap-2 mb-3">
              <button
                className="btn btn-light shadow-sm d-flex align-items-center gap-2 border-0 fw-semibold"
                style={{
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "13px",
                }}
                onClick={() => handleFabAction(() => setModal("inc"))}
              >
                <ArrowDown
                  size={16}
                  style={{ color: "var(--cv-insight-bg)" }}
                />
                Add Income
              </button>
              <button
                className="btn btn-light shadow-sm d-flex align-items-center gap-2 border-0 fw-semibold"
                style={{
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "13px",
                }}
                onClick={() => handleFabAction(() => setModal("exp"))}
              >
                <DollarSign
                  size={16}
                  style={{ color: "var(--cv-insight-bg)" }}
                />
                Add Expense
              </button>
              <button
                className="btn btn-light shadow-sm d-flex align-items-center gap-2 border-0 fw-semibold"
                style={{
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "13px",
                }}
                onClick={() => handleFabAction(() => setModal("env"))}
              >
                <Wallet size={16} style={{ color: "var(--cv-insight-bg)" }} />
                New Envelope
              </button>
            </div>
          )}

          {/* Backdrop for FAB */}
          {fabOpen && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{ zIndex: -1 }}
              onClick={() => setFabOpen(false)}
            />
          )}

          {/* FAB toggle button */}
          <button
            className="btn text-white d-flex align-items-center justify-content-center shadow-lg border-0"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "var(--cv-insight-bg)",
              transition: "transform 0.15s",
              transform: fabOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
            onClick={() => setFabOpen(!fabOpen)}
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Bottom nav - mobile and tablet (stuck to viewport bottom) */}
        <div className="d-lg-none" style={{ width: "100%" }}>
          <MobileNav />
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
