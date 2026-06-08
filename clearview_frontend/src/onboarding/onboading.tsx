import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingscreen";
import { useAuth } from "../hooks/context/userContext";

import { Link } from "react-router-dom";

// Log in and Register components
// function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//   });

//   const [error, setError] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [checkemail, setCheckemail] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (event: any) => {
//     const { name, value } = event.target;
//     setFormData((prevdata: any) => {
//       return {
//         ...prevdata,
//         [name]: value,
//       };
//     });
//     if (error) {
//       setError(false);
//     }
//   };
//   async function handleRegister(e: any) {
//     try {
//       e.preventDefault();
//       setLoading(true);
//       if (formData.password !== formData.confirmpassword) {
//         setError(true);
//         setSuccess(false);
//         return;
//       }
//       setError(false);

//       const { confirmpassword, ...verified } = formData;

//       const response = await fetch("http://localhost:4000/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(verified),
//       });

//       if (!response.ok) {
//         setCheckemail(true);
//         setLoading(false);
//         return;
//       }
//       const responsedata = await response.json();
//       localStorage.setItem("jwt_token", responsedata.token);
//       console.log(responsedata.Message);

//       setSuccess(true);
//       setCheckemail(false);

//       setTimeout(() => {
//         setLoading(false);
//         navigate("/dashboard");
//       }, 2000);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <>
//       {loading ? (
//         <LoadingScreen />
//       ) : (
//         <>
//           <style>
//             {`
//             @keyframes floatUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }`}
//           </style>
//           <div className="d-flex justify-content-center align-items-center vh-100 position-relative">
//             <div className="" style={style.cardAnimation}>
//               <form
//                 className="container mt-4 needs-validation"
//                 onSubmit={handleRegister}
//               >
//                 <div className="w-100 d-flex justify-content-left mb-3">
//                   <Link className="text-decoration-none" to="landingpage">
//                     &lt; Back
//                   </Link>
//                 </div>
//                 <h4>Create your free account today</h4>
//                 <p>Start managing your finances effortlessly today</p>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     name="username"
//                     className="form-control"
//                     value={formData.username}
//                     placeholder="John Doe"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     value={formData.email}
//                     placeholder="johndoe@gmial.com"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3 ">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     className="form-control"
//                     onChange={handleChange}
//                     placeholder="**********"
//                   />
//                 </div>
//                 <div className="mb-3 ">
//                   <label htmlFor="confirmpassword" className="form-label">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     name="confirmpassword"
//                     className="form-control"
//                     onChange={handleChange}
//                     placeholder="**********"
//                   />
//                 </div>
//                 {error ? (
//                   <p className="text-left text-danger">Passwords don't match</p>
//                 ) : null}
//                 {success ? (
//                   <p className="text-center text-success">
//                     Succesfully registered
//                   </p>
//                 ) : null}
//                 {checkemail ? (
//                   <p className="text-center text-danger">
//                     Email Already Exists
//                   </p>
//                 ) : null}
//                 <div className="mb-3 d-flex ">
//                   <button type="submit" className="btn btn-primary w-100">
//                     Submit
//                   </button>
//                 </div>
//                 <p className="mt-3 text-center d-block w-100">
//                   Already have an account{" "}
//                   <Link
//                     className="text-primary text-decoration-none"
//                     to="/login"
//                   >
//                     Log in
//                   </Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser, error, isLoading, setError } = useAuth();
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
    setError("");
    const { name, value } = e.target;
    setLoginFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    if (error) {
    }
  };

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      const response = await loginUser(loginFormData);

      if (response) {
        navigate("/dashboard");
      }
    } catch (err) {
      error;
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <style>
            {`
            @keyframes floatUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }`}
          </style>
          <div className="d-flex justify-content-center  align-items-center vh-100 bg-{#FAFAFA}">
            <div className="card" style={style.cardAnimation}>
              <form onSubmit={handleLogin}>
                <div className="w-100 d-flex justify-content-left mb-3">
                  <Link className="text-decoration-none" to="landingpage">
                    &lt; Back
                  </Link>
                </div>
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
                    to="/onboarding"
                  >
                    Create an Account
                  </Link>
                </p>
                <p>{message}</p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Forgotpassword() {
  return <></>;
}
const style: Record<string, React.CSSProperties> = {
  cardAnimation: {
    background: "#FFFFFF",
    border: "0.5px solid rgba(24,24,26,0.18)",
    borderRadius: "20px",
    padding: "1.75rem",
    boxShadow: "0 2px 40px rgba(24,24,26,0.06), 0 1px 4px rgba(24,24,26,0.04)",
    animation: "floatUp 0.8s ease both",
  },
};

export { Login, Forgotpassword };
