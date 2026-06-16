import React, { useState } from "react";
import { createContext, useContext } from "react";
import { type ModalKind, type ScreenKey } from "../../types";

interface envelopeContextType {
  screen: ScreenKey;
  setScreen: any;
  modal: ModalKind;
  setModal: any;
}

export const generalContext = createContext<envelopeContextType | null>(null);

function EnvelopeContext({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<ScreenKey>("Dashboard");
  const [modal, setModal] = useState<ModalKind>(null);
  return (
    <generalContext.Provider
      value={{
        screen,
        setScreen,
        setModal,
        modal,
      }}
    >
      {children}
    </generalContext.Provider>
  );
}
export default EnvelopeContext;

export const GetData = () => {
  const context = useContext(generalContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
