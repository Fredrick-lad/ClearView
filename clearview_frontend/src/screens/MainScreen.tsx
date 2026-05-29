import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import type { ScreenKey, ModalKind } from "../types";
import DashboardScreen from "./DashboardScreen";
import EnvelopesScreen from "./EnvelopesScreen";
import ExpensesScreen from "./ExpensesScreen";
import IncomeScreen from "./IncomeScreen";
import ReportsScreen from "./ReportsScreen";
import EnvelopeModal from "../modals/EnvelopeModal";

function MainScreen() {
  const [screen, setScreen] = useState<ScreenKey>("Dashboard");
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <div className="d-flex vh-100 flex-column">
      <Topbar
        title="ClearVIew"
        sub="2026 May"
        onNewEnvelope={() => setModal("env")}
      />
      <hr style={{ margin: 0 }} />
      <div className="d-flex flex-grow-1">
        <hr style={{ margin: 0 }} />
        <Sidebar screen={screen} setScreen={setScreen} setModal={setModal} />
        <main>
          {screen === "Dashboard" && (
            <DashboardScreen
              envelopes={[]}
              expenses={[]}
              totalInc={0}
              totalAlloc={0}
              totalSpent={0}
              unalloc={0}
              setScreen={function (s: ScreenKey): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {screen === "Envelopes" && (
            <EnvelopesScreen
              envelopes={[]}
              setModal={function (m: ModalKind): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {screen === "Expenses" && (
            <ExpensesScreen
              expenses={[]}
              envelopes={[]}
              setModal={function (m: ModalKind): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {modal === "env" && <EnvelopeModal />}
        </main>
      </div>
    </div>
  );
}

export default MainScreen;
