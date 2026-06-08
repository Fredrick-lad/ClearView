import type { ReactNode } from "react";

export type ScreenKey =
  | "Dashboard"
  | "Envelopes"
  | "Expenses"
  | "Income"
  | "Reports"
  | "settings"
  | "helpCenter"
  | "logout"
  | "Profile"


export type onboardingScreenKey = 
  | "getStarted"
  | "createProfile"
  | "securityScreen"
  | "incomeSources"
  | "createEnvelopes"
  | "conditions"


export type Icons = 
  | "dashboard"
  | "envelope"
  | "expenses"
  | "income"
  | "reports"
  | "moveLeft"
  | "moveRight"

export type ModalKind = "env" | "exp" | "inc" | null;

export type Envelope = {
  id: number;
  name: string;
  limit: number;
  spent: number;
  color: string;
};

export type Expense = {
  id: number;
  envelope: string;
  amount: number;
  note: string;
  date: string;
};

export type IncomeRecord = {
  id: number;
  source: string;
  amount: number;
  date: string;
};

export type RegisterProps= {
  username: string;
  email: string;
  password: string;
}

export type LoginProps= {
  email : string;
  password: string;
}

export interface BadgeProps {
  pct: number;
}

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}
export type initialdata={
  id?:number,
  firstName?: string,
  lastName?: string,
  username: string,
  email: string
}
export interface Onboarding {
  initialdata:  initialdata;
  updateformdata: (e: any)=> void;
  onBack: () => void;
  onContinue: ()=> void;
}