import { useEffect, useState } from "react";
import type { Envelope, Expense, ScreenKey } from "../types";
import DashboardCard from "../components/cards/DashboardOverviewCards";
import { useAuth } from "../hooks/context/userContext";
import { EnvelopeStatusCards } from "../components/cards/EnvelopeStatusCards";
import { Link } from "react-router-dom";
import TransactionsCard from "../components/cards/TransactionsCard";
import DashboardOverviewCards from "../components/cards/DashboardOverviewCards";

type Props = {
  envelopes: Envelope[];
  expenses: Expense[];
  totalInc: number;
  totalAlloc: number;
  totalSpent: number;
  unalloc: number;
  setScreen: (s: ScreenKey) => void;
};

export default function DashboardScreen(_: Props) {
  // if (!userData) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <div>Loading your financial dashboard...</div>
  //     </div>
  //   );
  // }
  const [amount, setAmount] = useState(0);
  const { incomeSource, envelopeData } = useAuth();

  const icon = [{}];

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between ">
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex flex-row gap-2 flex-wrap flex-xl-nowrap">
            <DashboardOverviewCards />
          </div>
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-end">
              <Link to="/envelopes" className="mt-1 text-decoration-none">
                View all
              </Link>
            </div>
            <div className="d-flex flex-column gap-2 flex-md-row">
              {envelopeData.map((env: any, index: any) => (
                <div key={index} className="card">
                  <div className=" p-3 d-flex bg-brand-light rounded flex-column ">
                    <div className="d-flex justify-content-between">
                      <span>Icon</span>
                    </div>
                    <div>
                      <span>{env.name}</span>
                      <div className="d-flex flex-column">
                        <span>Limit: {env.monthly_limit}</span>
                        <span>Spend: {env.current_spend}</span>
                      </div>
                      <div
                        style={{
                          backgroundColor: "#eee",
                          borderRadius: 4,
                          height: 8,
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.min((env.current_spend / env.monthly_limit) * 100, 100)}%`,
                            backgroundColor: env.color,
                            height: "100%",
                            borderRadius: 4,
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>{env.description}</span>
                      <span>Percentage</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column mt-2">
              <div className="d-flex justify-content-end">
                <Link to="/envelopes" className="mt-1 text-decoration-none">
                  View all
                </Link>
              </div>
              <TransactionsCard />
              <TransactionsCard />
              <TransactionsCard />
              <TransactionsCard />
              <TransactionsCard />
              <TransactionsCard />
            </div>
          </div>
        </div>

        <div className="w-100 flex-lg-shrink-0" style={{ maxWidth: "400px" }}>
          <div className="card p-2 m-2 d-flex flex-column ">
            <span className="fs-6 fw-bold">At a glance</span>
            <div className="d-flex flex-row gap-2">
              <div>cirle reahar overview</div>
              <div className="d-flex flex-wrap flex-column">
                <p>
                  You have <span className="text-brand">{amount}</span>remaining
                  to spend this month
                </p>
                <Link
                  to="/envelopes"
                  className="text-decoration-none text-brand-active"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column card p-2 m-2">
            <div className="d-flex flex-row justify-content-between">
              <span className="fs-6 fw-bold">Upcoming expenses</span>
              <Link className="text-brand text-decoration-none" to="expenses">
                View All
              </Link>
            </div>
            <div className="d-flex flex-row justify-content-space-between">
              <p>bill</p>
              <p>amouunt</p>
            </div>
          </div>
          <div className="d-flex flex-column card p-2 m-2">
            <div className="d-flex flex-row justify-content-between">
              <span className="fs-6 fw-bold">Recent Transactions</span>
              <Link className="text-brand text-decoration-none" to="expenses">
                View All
              </Link>
            </div>
            <div className="d-flex flex-row justify-content-space-between">
              <p>bill</p>
              <p>amouunt</p>
            </div>
            <div>
              <button type="button">Add Transaction</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
