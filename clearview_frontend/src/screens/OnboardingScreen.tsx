import { useState } from "react";
import type { onboardingScreenKey } from "../types";
import { Icon } from "../components/ui/iconMap";
import GetStartedScreen from "../onboarding/getStartedScreen";
import IncomeSourcesScreen from "../onboarding/incomeSourcesScreen";
import CreateProfileScreen from "../onboarding/createProfileScreen";
import CreateEnvelopesScreen from "../onboarding/createEnvelopesScreen";
import CondtionsScreen from "../onboarding/condtionsScreen";
import SecurityScreen from "../onboarding/securityScreen";
import type { RegisterProps } from "../types";

function OnboardingScreen() {
  const [screen, setScreen] = useState<onboardingScreenKey>("getStarted");
  const [screenNumber, setScreenNumber] = useState(0);
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const updateFormdata = (newdata: RegisterProps) => {
    setFormdata((prev: RegisterProps) => ({
      ...prev,
      ...newdata,
    }));
  };

  const Allscreens: Array<{
    screenNumber: number;
    id: onboardingScreenKey;
    label: string;
  }> = [
    { screenNumber: 0, id: "getStarted", label: "Get Started" },
    { screenNumber: 1, id: "createProfile", label: "Create Profile" },
    { screenNumber: 2, id: "securityScreen", label: "Secure Your Account" },
    { screenNumber: 3, id: "incomeSources", label: "Income Sources" },
    { screenNumber: 4, id: "createEnvelopes", label: "Create Envelopes" },
    { screenNumber: 5, id: "conditions", label: "Terms and Conditons" },
  ];

  const handleNext = () => {
    // Allscreens.map((screen)=>{
    const nextscreen = screenNumber + 1;

    if (nextscreen < Allscreens.length) {
      setScreenNumber(nextscreen);
      setScreen(Allscreens[nextscreen].id);
    }

    console.log(formdata);
  };

  const handleBack = () => {
    // Allscreens.map((screen)=>{
    const nextscreen = screenNumber - 1;

    if (nextscreen < Allscreens.length) {
      setScreenNumber(nextscreen);
      setScreen(Allscreens[nextscreen].id);
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center vw-100 vh-100">
        <div>
          <button
            className="bg-light border border-primary-light rounded-circle p-3"
            style={{ border: "none" }}
            type="button"
            onClick={handleBack}
          >
            <Icon name="moveLeft" className="text-primary" />
          </button>
        </div>
        <div>
          {screen === "getStarted" && (
            <GetStartedScreen onBack={handleBack} onContinue={handleNext} />
          )}
          {screen === "createProfile" && (
            <CreateProfileScreen
              initialdata={formdata}
              updateformdata={updateFormdata}
              onBack={handleBack}
              onContinue={handleNext}
            />
          )}
          {screen === "securityScreen" && (
            <SecurityScreen
              initialdata={formdata}
              updateformdata={updateFormdata}
              onBack={handleBack}
              onContinue={handleNext}
            />
          )}
          {screen === "incomeSources" && (
            <IncomeSourcesScreen onBack={handleBack} onContinue={handleNext} />
          )}
          {screen === "createEnvelopes" && <CreateEnvelopesScreen />}
          {screen === "conditions" && <CondtionsScreen />}
        </div>
        <div>
          <button
            className="bg-light border border-primary-light rounded-circle p-3"
            style={{ border: "none" }}
            type="button"
            onClick={handleNext}
          >
            <Icon name="moveRight" className="text-primary" />
          </button>
        </div>
      </div>
    </>
  );
}
export default OnboardingScreen;
