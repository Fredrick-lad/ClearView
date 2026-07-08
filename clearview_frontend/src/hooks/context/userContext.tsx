"use client";
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
import API_BASE_URL from "../../utils/api";

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
  addExpense: any;
  addIncomePeriod: any;
  addIncome: any;
  newEnvelope: any;
  setNewEnvelope: any;
  incomeSource: any;
  envelopeData: any;
  setEnvelopeData: any;
  periodData: any;
  setPeriodData: any;
  getEnvelopes: any;
  expenses: any;
  fetchDashboardData: () => Promise<void>;
  updateProfile: (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => Promise<boolean>;
  updateExpense: (id: number, data: any) => Promise<boolean>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<{ success: boolean; message: string }>;
  deleteAccount: () => Promise<boolean>;

  logoutUser: () => void;
}
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<initialdata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ _ , setEmail] = useState<string>(" ");
  const [emailError, setEmailError] = useState<string>(" ");
  const [newEnvelope, setNewEnvelope] = useState<Envelope | null>(null);
  const [incomeSource, setIncomeSource] = useState<
    IncomeRecord | { source: ""; total_amount: ""; create_time: "" }
  >();
  const [envelopeData, setEnvelopeData] = useState<any>(null);
  const [periodData, setPeriodData] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);

  const [error, setError] = useState("");

  const [isSignedin, setIsSignedin] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      setUserData(data.user);
      setEnvelopeData(data.envelope);
      setIncomeSource(data.incomesource);
      setPeriodData(data.period);
      setExpenses(data.expenses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        await fetchDashboardData();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [isSignedin]);
  

  if (isLoading) return <LoadingScreen />;

  const logoutUser = () => {
    setIsLoading(true);
    setUserData(null);
    setError("");
    localStorage.removeItem("cv_screenHistory");
    localStorage.removeItem("cv_lastScreen");
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
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginFormData),
      });
      const data = await response.json();
      if (response.ok) {
        const { user } = await response.json();
        setIsSignedin(true);
        setUserData(user);
        setIsLoading(false);
        return true;
      } 
      else {
        setIsLoading(false);
        setError(data.message || "Login failed");
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
      const emailresponse = await fetch(`${API_BASE_URL}/checkemail`, {
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
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const { user } = await response.json();
        setUserData(user);
        setIsLoading(false);
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
        id: userData?.id,
      };
      await fetch(`${API_BASE_URL}/addenvelope`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      getEnvelopes();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEnvelopes = async () => {
    const response = await fetch(`${API_BASE_URL}/getenvelopes`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setEnvelopeData(data.envelope);
    return data.envelope;
  };
  const addIncomePeriod = async (period: any) => {
    try {
      const user_id = userData?.id;
      const payload = {
        ...period,
        user_id,
      };
      const response = await fetch(`${API_BASE_URL}/addperiod`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        return data.period;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addIncome = async (incomeData: any) => {
    const user_id = userData?.id;

    const payload = {
      ...incomeData,
      user_id,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/addincome`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        await fetchDashboardData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExpense = async (expenseData: any) => {
    try {
      const payload = {
        user_id: userData?.id,
        ...expenseData,
      };

      const response = await fetch(`${API_BASE_URL}/addexpense`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateExpense = async (id: number, expenseData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/editexpense/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateProfile = async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/change-password`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      return { success: response.ok, message: data.message || "" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Network error" };
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-account`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setUserData(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
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
        addExpense,
        addIncomePeriod,
        addIncome,
        setEmailError,
        setError,
        registerUser,
        loginUser,
        registerEnvelope,
        newEnvelope,
        setNewEnvelope,
        incomeSource,
        envelopeData,
        setEnvelopeData,
        periodData,
        setPeriodData,
        getEnvelopes,
        expenses,
        fetchDashboardData,
        updateProfile,
        updateExpense,
        changePassword,
        deleteAccount,
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
