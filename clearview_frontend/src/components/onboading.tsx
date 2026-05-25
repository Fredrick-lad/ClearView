import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

// Log in and Register components
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkemail, setCheckemail] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevdata: any) => {
      return {
        ...prevdata,
        [name]: value,
      };
    });
    if (error) {
      setError(false);
    }
  };
  async function handleRegister(e: any) {
    try {
      e.preventDefault();
      if (formData.password !== formData.confirmpassword) {
        setError(true);
        setSuccess(false);
        return;
      }
      setError(false);

      const { confirmpassword, ...verified } = formData;

      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verified),
      });

      if (!response.ok) {
        setCheckemail(true);
        return;
      }
      const responsedata = await response.json();
      console.log(responsedata.Message);

      setSuccess(true);
      setCheckemail(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ padding: "20px" }}>
          <form
            className="container mt-4 needs-validation"
            onSubmit={handleRegister}
          >
            <h4>Create your free account today</h4>
            <p>Start managing your finances effortlessly today</p>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                placeholder="johndoe@gmial.com"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                placeholder="**********"
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="confirmpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                className="form-control"
                onChange={handleChange}
                placeholder="**********"
              />
            </div>
            {error ? (
              <p className="text-left text-danger">Passwords don't match</p>
            ) : null}
            {success ? (
              <p className="text-center text-success">Succesfully registered</p>
            ) : null}
            {checkemail ? (
              <p className="text-center text-danger">Email Already Exists</p>
            ) : null}
            <div className="mb-3 d-flex ">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
            <p className="mt-3 text-center d-block w-100">
              Already have an account{" "}
              <Link className="text-primary text-decoration-none" to="/login">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // function loader() {
  //   return (
  //     <>
  //       <div className="bg-dark opacity-50 vh-100 vw-100">
  //         <h4 className="text-primary">Loading.......</h4>
  //       </div>
  //     </>
  //   );
  // }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    if (error) {
      setError("");
    }
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });
      const loginresponse: any = await response.json();

      if (!response.ok) {
        setError(loginresponse.message || "Login failed");
        setLoading(false);
        return;
      }

      if (response.status === 200) {
        console.log("Login successful");
        setMessage(loginresponse.Message || "Login successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError("An error occurred during login");
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <>
      {loading ? (
        <div className="position-absolute top-0 bg-dark opacity-10 vh-100 vw-100 d-flex justify-content-center  align-items-center vh-100">
          <h4 className="text-primary text-center">Loading.......</h4>
        </div>
      ) : (
        <div className="d-flex justify-content-center  align-items-center vh-100 bg-{#FAFAFA}">
          <div className="card" style={{ width: "20rem", padding: "20px" }}>
            <form onSubmit={handleLogin}>
              <h4>
                Sign in to{" "}
                <span className="text-primary fw-light">
                  {" "}
                  <span className="fw-bold">Clear</span>View{" "}
                </span>
              </h4>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  placeholder="johndoe@gmail.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  placeholder="**********"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </div>
              <p className="text-danger text-center">{error}</p>
              <Link
                className=" mt-3 text-primary text-center d-block w-100 text-decoration-none"
                to="/forgotpassword"
              >
                Forgot Password?
              </Link>
              <p className="mt-3 text-center d-block w-100">
                New to ClearView?{" "}
                <Link
                  className="text-primary text-decoration-none"
                  to="/register"
                >
                  Create an Account
                </Link>
              </p>
              <p>{message}</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Forgotpassword() {
  return <></>;
}

export { Login, Register, Forgotpassword };
// // export default register;

// function Register() {
//   return (
//     <>
//       <div className="container-fluid px-0">
//         <div className="row g-0">
//           <div className="col-lg-6 vh-100 bg-primary d-flex align-items-center justify-content-center flex-column">
//             <div className="mb-6 d-flex flex-row">
//               <img src="" alt="Loggo" />
//               <h3>
//                 Clear<section>View</section>
//               </h3>
//             </div>
//             <div className="mb-3">
//               <h1>Gain a clear view of your money.</h1>
//             </div>
//             <div className="mb-3">
//               <img
//                 className="img-fluid bg-primary"
//                 src="./public/img.png"
//                 alt="description"
//               />
//             </div>
//           </div>
//           <div className="p-40 col-lg-6 vh-100 bg-light d-flex flex-column ">
//             <nav className=" navbar">
//               <div className="container-fluid">
//                 <ul className="navbar-nav">
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/landingpage">
//                       Features
//                     </Link>
//                   </li>
//                 </ul>
//                 <ul className="navbar-nav">
//                   <li className="nav-item">
//                     <Link className="nav-link" to="">
//                       Resources
//                     </Link>
//                   </li>
//                 </ul>
//                 <ul className="navbar-nav">
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/login">
//                       Log In
//                     </Link>
//                   </li>
//                 </ul>
//                 <ul className="navbar-nav">
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/register">
//                       Sign Up
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </nav>
//             <div className="card">
//               <h3></h3>
//               <p></p>
//               <form action=""></form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// function Login() {
//   return (
//     <>
//       <div className="container-fluid px-0">
//         <div className="row g-0">
//           <div className="col-lg-12 vh-100 bg-light d-flex align-items-center justify-content-center">
//             <div>
//               <img src="" alt="" />
//               <h4></h4>
//             </div>
//             <div>
//               <h3></h3>
//             </div>
//             <div>
//               <form action=""></form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export { Register, Login };
