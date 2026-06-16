import { createContext, useContext, useEffect, useState } from "react";
import type {
  RegisterProps,
  LoginProps,
  initialdata,
  Envelope,
  IncomeRecord,
} from "../../types";
import LoadingScreen from "../../components/loadingscreen";
import { useNavigate } from "react-router-dom";

// The context bluePrint

interface UserContextType {
  userData: initialdata | null;
  isLoading: boolean;
  error: String;
  setError: any;
  checkEmail: (e: any) => Promise<boolean>;
  emailError: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  registerUser: (formdata: RegisterProps) => Promise<boolean>;
  loginUser: (loginFormData: LoginProps) => Promise<boolean>;

  registerEnvelope: any;
  newEnvelope: any;
  setNewEnvelope: any;
  incomeSource: any;
  envelopeData: any;

  logoutUser: () => void;
}
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<initialdata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string>(" ");
  const [emailError, setEmailError] = useState<string>(" ");
  const [newEnvelope, setNewEnvelope] = useState<Envelope | null>(null);
  const [incomeSource, setIncomeSource] = useState<
    IncomeRecord | { source: ""; total_amount: ""; create_time: "" }
  >();
  const [envelopeData, setEnvelopeData] = useState<any>(null);

  const [error, setError] = useState("");

  const [isSignedin, setIsSignedin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const fetchDashboardDetails = await fetch(`http://localhost:4000/me`, {
          method: "GET",
          credentials: "include",
        });
        if (!fetchDashboardDetails.ok) {
          setError("Failed to load dashboard");
          return;
        }
        const data = await fetchDashboardDetails.json();

        setUserData(data.user);
        setEnvelopeData(data.envelope);
        setIncomeSource(data.incomesource);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [isSignedin]);
  useEffect(() => {
    console.log("incomeSource updated:", incomeSource);
  }, [incomeSource]);
  useEffect(() => {
    console.log("envelopeData updated:", envelopeData);
  }, [envelopeData]);

  if (isLoading) return <LoadingScreen />;

  const logoutUser = () => {
    setIsLoading(true);
    setUserData(null);
    setError("");
    setIsLoading(false);
  };

  const loginUser = async (loginFormData: LoginProps) => {
    setError("");
    setIsLoading(true);
    try {
      if (!loginFormData.email || !loginFormData.password) {
        setError("All fields need to be filled");
        return false;
      }
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginFormData),
      });
      if (response.ok) {
        const { user, results } = await response.json();
        setIsSignedin(true);
        setUserData(user);
        console.log(user.id);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        setError("An error occurred during login");
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Issues logging in");
      return false;
    }
  };

  const checkEmail = async (email: string) => {
    const trimmedEmail = email?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.includes("@")) {
      setEmailError("Empty email field");
      return false;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError(
        "Please enter a valid email address (e.g., name@example.com)",
      );
      return false;
    }

    setEmail(trimmedEmail);

    try {
      const emailresponse = await fetch("http://localhost:4000/checkemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (emailresponse.ok) {
        return true;
      } else if (emailresponse.status === 409) {
        setEmailError("The email is already registered");
        return false;
      } else {
        setEmailError("This email is not available");
        return false;
      }
    } catch (error) {
      console.error(error);
      setEmailError("Could not verify the email");
      return false;
    }
  };

  const registerUser = async (formdata: RegisterProps) => {
    setIsLoading(true);
    const nameparts = formdata.username.trim().split(/\s+/);
    const firstname = nameparts[0];
    const lastname =
      nameparts.length > 1 ? nameparts[nameparts.length - 1] : firstname;
    if (!firstname || !formdata.email || !formdata.password) {
      alert("Please fill in all profile fields.");
      return false;
    }
    const payload = {
      firstname,
      lastname,
      email: formdata.email,
      password: formdata.password,
    };
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const { user, results } = await response.json();
        setUserData(user);
        setIsLoading(false);
        console.log(userData?.id);
        navigate("/onboardingStep1");
        return true;
      } else {
        alert("Registration failed");
        return false;
      }
    } catch (err) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const registerEnvelope = async (envelope_data: Envelope) => {
    try {
      setIsLoading(true);

      const payload = {
        ...envelope_data,
        userid: userData?.id,
      };
      const response = await fetch("http://localhost:4000/envelopes", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Created a new envelope");
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        error,
        checkEmail,
        emailError,
        setEmailError,
        setError,
        registerUser,
        loginUser,
        registerEnvelope,
        newEnvelope,
        setNewEnvelope,
        incomeSource,
        envelopeData,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within a UserProvider");
  return context;
};
