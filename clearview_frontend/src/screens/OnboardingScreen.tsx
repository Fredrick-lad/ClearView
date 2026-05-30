import { useState } from "react";
import type { onboardingScreenKey } from "../types";
import { Icon } from "../components/ui/iconMap";
import GetStartedScreen from "../onboarding/getStartedScreen";
import IncomeSourcesScreen from "../onboarding/incomeSourcesScreen";
import CreateProfileScreen from "../onboarding/createProfileScreen";
import CondtionsScreen from "../onboarding/condtionsScreen";
import SecurityScreen from "../onboarding/securityScreen";
import type { RegisterProps } from "../types";
import { Navigate, useNavigate } from "react-router-dom";

function OnboardingScreen() {
  const [screen, setScreen] = useState<onboardingScreenKey>("getStarted");
  const [screenNumber, setScreenNumber] = useState(0);
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [incomedata, setincomedata] = useState<
    { source: string; amount: number }[]
  >([]);
  const updateFormdata = (newdata: RegisterProps) => {
    setFormdata((prev: RegisterProps) => ({
      ...prev,
      ...newdata,
    }));
  };

  async function register() {
    if (!formdata.username || !formdata.email || !formdata.password) {
      alert("Please fill in all profile fields.");
      return;
    }
    const payload = {
      ...formdata,
      incomedata,
    };
    console.log(payload);
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const Allscreens: Array<{
    screenNumber: number;
    id: onboardingScreenKey;
    label: string;
  }> = [
    { screenNumber: 0, id: "getStarted", label: "Get Started" },
    { screenNumber: 1, id: "createProfile", label: "Create Profile" },
    { screenNumber: 2, id: "securityScreen", label: "Secure Your Account" },
    { screenNumber: 3, id: "incomeSources", label: "Income Sources" },
    { screenNumber: 4, id: "conditions", label: "Terms and Conditons" },
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

    if (nextscreen >= 0) {
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
            <IncomeSourcesScreen
              onBack={handleBack}
              onContinue={handleNext}
              incomedata={setincomedata}
            />
          )}
          {screen === "conditions" && (
            <CondtionsScreen onContinue={register} onBack={handleBack} />
          )}
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
