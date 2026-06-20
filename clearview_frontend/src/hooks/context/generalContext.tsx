import React, { useState } from "react";
import { createContext, useContext } from "react";
import { type ModalKind, type ScreenKey } from "../../types";

interface envelopeContextType {
  screen: ScreenKey;
  setScreen: any;
  modal: ModalKind;
  setModal: any;
  selectedOption: any;
  setSelectedOption: any;
}

export const generalContext = createContext<envelopeContextType | null>(null);

function DataContext({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<ScreenKey>("Dashboard");
  const [modal, setModal] = useState<ModalKind>(null);
  const [selectedOption, setSelectedOption] = useState<
    "preset" | "scratch" | null
  >(null);

  return (
    <generalContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
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
export default DataContext;

export const GetData = () => {
  const context = useContext(generalContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
