import { Outlet, Link, useNavigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingpage";
import { Login } from "./components/onboading";
import { useState } from "react";

function App() {
  const [showNav, setShowNav] = useState(false);

  const navigate = useNavigate();

  function displaynav() {
    return (
      <>
        <div>
          <ul>
            <li>
              <Link to=""></Link>
            </li>
            <li>
              <Link to=""></Link>
            </li>
            <li>
              <Link to=""></Link>
            </li>
            <li>
              <Link to=""></Link>
            </li>
            <li>
              <Link to=""></Link>
            </li>
          </ul>
        </div>
      </>
    );
  }

  return (
    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //     <div className="container-fluid">
    //       <Link className="navbar-brand" to="/">ClearView</Link>
    //       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav ms-auto">
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/">Home</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/dashboard">Dashboard</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/budgeting">Budgeting</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/login">Login</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/register">Register</Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    //   <main>
    //     <Outlet />
    //   </main>
    // </div>
    <>
      <div>
        <header className="position-sticky top-0">
          <nav>
            <div className="px-5 w-100 d-flex align-items-center justify-content-between ">
              <div>
                <Link
                  className="text-decoration-none d-flex  align-items-center"
                  to=""
                >
                  <img src="" alt="" />
                  <h3>
                    <span className="text-main font-family-sans-serif fw-light">
                      {" "}
                      <span className="fw-bold">Clear</span>View{" "}
                    </span>
                  </h3>
                </Link>
              </div>
              <div className="d-flex gap-5">
                <Link
                  className="text-decoration-none text-muted nav-link"
                  to=""
                >
                  Features
                </Link>
                <Link
                  className="text-decoration-none text-muted nav-link"
                  to=""
                >
                  Resources
                </Link>
              </div>
              <div className="d-flex gap-2 ">
                <button
                  type="button"
                  className="btn btn-primary rounded text-light"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded text-light"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </div>
            </div>
            <hr className="w-100" />
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
