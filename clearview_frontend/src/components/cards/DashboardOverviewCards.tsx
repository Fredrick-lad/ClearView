import { useAuth } from "../../hooks/context/userContext";
interface props {
  title: string;
  amount: number;
  difference: string;
}

function DashboardOverviewCards() {
  return (
    <>
      <div className="card p-3 flex-grow-1">
        <h6>Total Income</h6>
        <h3>KSh 60,000</h3>
      </div>

      <div className="card p-3 flex-grow-1">
        <h6>Allocated</h6>
        <h3>KSh 20,000</h3>
      </div>

      <div className="card p-3 flex-grow-1">
        <h6>Remaining</h6>
        <h3>KSh 40,000</h3>
      </div>

      <div className="card p-3 flex-grow-1">
        <h6>Active Period</h6>
        <h3>June 2026</h3>
      </div>
    </>
  );
}

export default DashboardOverviewCards;
