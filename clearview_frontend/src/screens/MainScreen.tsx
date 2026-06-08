import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import type { ScreenKey, ModalKind } from "../types";
import DashboardScreen from "./DashboardScreen";
import EnvelopesScreen from "./EnvelopesScreen";
import ExpensesScreen from "./ExpensesScreen";
import IncomeScreen from "./IncomeScreen";
import ReportsScreen from "./ReportsScreen";
import { GetData } from "../hooks/context/generalContext";
import EnvelopeModal from "../modals/EnvelopeModal";
import MobileNav from "../components/layout/MobileNav";

function MainScreen() {
  const { screen, setScreen, modal, setModal } = GetData();

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
        <Topbar onNewEnvelope={() => setModal("env")} />

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
          {screen === "Income" && (
            <IncomeScreen
              income={[]}
              envelopes={[]}
              totalInc={0}
              totalAlloc={0}
              unalloc={0}
              setModal={() => {}}
            />
          )}
          {modal === "env" ? (
            <EnvelopeModal onClose={() => setModal(null)} />
          ) : null}
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
