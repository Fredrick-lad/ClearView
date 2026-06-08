import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  Eye,
  EyeClosed,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";

type passprop = {
  password: string;
  confirmpassword?: string;
};

interface securityScreen {
  initialdata: passprop;
  updateformdata: (e: any) => void;
  onContinue: () => void;
  onBack: () => void;
}

function SecurityScreen({
  initialdata,
  updateformdata,
  onContinue,
  onBack,
}: securityScreen) {
  useEffect(() => {
    if (initialdata) {
      setPassword((prev: any) => ({
        ...prev,
        ...initialdata,
      }));
    }
  }, [initialdata]);
  const [password, setPassword] = useState({
    password: "",
    confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPassword((prevdata: any) => {
      return {
        ...prevdata,
        [name]: value,
      };
    });
  };

  const onNext = (e: any) => {
    try {
      e.preventDefault();
      if (!password.password || !password.confirmpassword) {
        setError(true);
        console.log("fill fields");
        return;
      }
      if (password.password !== password.confirmpassword) {
        setError(true);
        console.log("Passworddontmatch");
        return;
      }
      const { confirmpassword, ...verified } = password;
      updateformdata(verified);
      onContinue();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>
        {`
        @keyframes slideInFromRight {
       from {
       transform: translateX(20px);
       opacity: 0;
       }
      to {
      transform: translateX(0);
      opacity: 1;
      }
      }`}
      </style>
      <div
        className="card d-flex flex-column justify-content-between p-4 p-md-5 border-ui-border"
        style={{
          maxWidth: "450px",
          height: "600px",
          backgroundColor: "var(--bs-ui-bg)",
          borderRadius: "1.25rem",
          animationName: "slideInFromRight",
          animationDuration: "0.6s",
          animationTimingFunction: "ease-in",
          animationFillMode: "forwards",
        }}
      >
        <div className="d-flex gap-3 align-items-center">
          <div className="bg-brand-active rounded p-3 ">
            <ShieldCheck className="text-white" />
          </div>
          <div>
            <h2 style={{ margin: 0 }} className="text-brand">
              Account Security
            </h2>
            <p style={{ margin: 0 }} className="text-ui-text-dim">
              Protect your account
            </p>
          </div>
        </div>
        <div className="text-muted small fw-bold text-uppercase mb-1">
          Step 2 of 5
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex input-group align-items-center  rounded ">
              <span className="input-group-text bg-brand-light border-end-0">
                <LockKeyhole className="text-brand " />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password.password}
                onChange={handleChange}
                id="pasword"
                className="form-control border-start-0 border-end-0"
                placeholder="Enter your password"
                style={{ outline: "none", boxShadow: "none" }}
              />
              <button
                className="input-group-text bg-ui-bg border-start-0"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="text-brand" />
                ) : (
                  <EyeClosed className="text-brand" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <div className="input-group d-flex align-items-center">
              <span className="input-group-text bg-brand-light border-end-0">
                <LockKeyhole className="text-brand " />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmpassword"
                id="pasword"
                value={password.confirmpassword}
                onChange={handleChange}
                className="form-control border-start-0 border-end-0"
                placeholder="Re-enter your password"
                style={{ outline: "none", boxShadow: "none" }}
              />
              <button
                className="input-group-text bg-ui-bg border-start-0"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="text-brand" />
                ) : (
                  <EyeClosed className="text-brand" />
                )}
              </button>
              {/* <Eye /> */}
            </div>
          </div>
          <div className="mt-2 d-flex align-items-center gap-2">
            <CircleAlert className="text-brand-active" />
            <p className="text-ui-text-dim mb-0">
              This will help secure your account from unauthorised access.
              Create a strong password
            </p>
          </div>
        </form>
        {error ? (
          <p className="text-danger mb-0">
            {" "}
            Ensure the passwords match or arenot left blank
          </p>
        ) : null}
        <div className="d-flex gap-2 w-100">
          <button
            type="button"
            className="border-brand-active border rounded p-2  text-primary d-flex gap-2 align-items-center"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            type="button"
            className="border border-brand-active rounded bg-brand text-white p-2 flex-grow-1 d-flex gap-2 align-items-center justify-content-center"
            onClick={onNext}
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="d-flex gap-1 align-items-center justify-content-center">
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "24px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
        </div>
      </div>
    </>
  );
}

export default SecurityScreen;
