import Sidebar from "../components/layout/Sidebar";
import type { ScreenKey, ModalKind } from "../types";
import DashboardScreen from "./DashboardScreen";
import EnvelopesScreen from "./EnvelopesScreen";
import ExpensesScreen from "./ExpensesScreen";
import IncomeScreen from "./IncomeScreen";
import ReportsScreen from "./ReportsScreen";
import { GetData } from "../hooks/context/generalContext";
import MobileNav from "../components/layout/MobileNav";
import SettingsContent from "./Settings";
import UserProfileContent from "./UserProfile";
import CreateEnvelopeModal from "../modals/EnvelopeModal";
import AddExpenseModal from "../modals/AddExpenseModal";
import AddIncomeModal from "../modals/IncomeModal";
import NotificationsView from "./NotificationScreen";
import DeleteEnvelopeModal from "../modals/DeleteModal";
import EditEnvelopeModal from "../modals/EditenvModal";
import EnvelopeSuccessModal from "../modals/EnvelopeSucces";
function MainScreen() {
  const { screen, setScreen, modal, setModal } = GetData();
  // const { envelopeData, incomeSource } = useAuth();

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div
        className="d-flex flex-column  d-none d-md-block"
        style={{
          height: "100%",
        }}
      >
        <Sidebar
          title="ClearView"
          screen={screen}
          setScreen={setScreen}
          setModal={setModal}
        />
      </div>
      <div className="d-flex flex-column flex-grow-1 overflow-auto">
        <main>
          {screen === "Dashboard" && (
            <DashboardScreen
              envelopes={[]}
              expenses={[]}
              totalInc={0}
              totalAlloc={12000}
              totalSpent={1200}
              unalloc={0}
              setScreen={function (s: ScreenKey): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {screen === "Envelopes" && <EnvelopesScreen />}
          {screen === "Expenses" && (
            <ExpensesScreen
              expenses={[]}
              envelopes={[]}
              setModal={function (m: ModalKind): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {screen === "Income" && <IncomeScreen />}
          {screen === "Reports" && <ReportsScreen />}
          {screen === "settings" && <SettingsContent />}
          {screen === "Profile" && <UserProfileContent />}
          {screen === "Notifications" && <NotificationsView />}
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
            <DeleteEnvelopeModal isOpen={true} onClose={() => setModal(null)} />
          )}
          {modal === "edit" && (
            <EditEnvelopeModal isOpen={true} onClose={() => setModal(null)} />
          )}
          {modal === "envSuccess" && (
            <EnvelopeSuccessModal
              isOpen={true}
              onClose={() => setModal(null)}
            />
          )}
        </main>
        <div
          className="d-flex bg-brand-light  sticky-bottom z-5 d-md-none"
          style={{
            width: "100%",
          }}
        >
          <MobileNav />
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
