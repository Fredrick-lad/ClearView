import { useState } from "react";

function Dashboard() {
  const [loaded, setLoaded] = useState(false);

  const timer = setTimeout(() => {
    setLoaded(true);
    clearTimeout(timer);
  }, 5000);

  return (
    <>
      {loaded ? (
        <div>
          <h1>Dashboard</h1>
        </div>
      ) : (
        <div>
          <h1>Lorem ipsum dolor sit </h1>
        </div>
      )}
    </>
  );
}

export default Dashboard;
