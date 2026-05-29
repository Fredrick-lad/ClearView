import { Link, Outlet } from "react-router-dom";
import "./App.css";

import { useState } from "react";

function App() {
  return (
    <>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
