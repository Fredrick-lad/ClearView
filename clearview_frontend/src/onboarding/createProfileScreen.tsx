import { User, CircleAlert, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Onboarding } from "../types";

function CreateProfileScreen({
  initialdata,
  updateformdata,
  onBack,
  onContinue,
}: Onboarding) {
  useEffect(() => {
    if (initialdata) {
      setdata(initialdata);
    }
  }, [initialdata]);
  const [data, setdata] = useState({ username: "", email: "" });

  // Tis methd is for uodating the data entered by the users on the inut field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setdata((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onNext = (e: any) => {
    e.preventDefault();
    updateformdata(data);
    onContinue();
  };

  return (
    <>
      <div
        className="card d-flex flex-column justify-content-between p-4 p-md-5 border-ui-border"
        style={{
          maxWidth: "450px",
          height: "600px",
          backgroundColor: "var(--bs-ui-bg)",
          borderRadius: "1.25rem",
        }}
      >
        <div className="d-flex gap-3 mb-3 align-items-center ">
          <div className="border rounded bg-brand-active p-3">
            <User className="text-white" />
          </div>
          <div>
            <h2 style={{ margin: 0 }} className="text-brand">
              Set up your profile
            </h2>
            <p className="text-ui-text-dim" style={{ margin: 0 }}>
              Tell us about yourself
            </p>
          </div>
        </div>
        <div className="text-muted small fw-bold text-uppercase mb-1">
          Step 1 of 5
        </div>
        <form className="mb-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Full Name
            </label>
            <div className="d-flex input-group align-items-center ">
              <span className="input-group-text bg-brand-light border-end-0">
                <User className="text-brand" />
              </span>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleChange}
                className="form-control border-start-0 "
                placeholder="Enter your full name"
                style={{ outline: "none", boxShadow: "none" }}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <div className="d-flex input-group align-items-center ">
              <span className="input-group-text bg-brand-light border-end-0">
                <Mail className="text-brand" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                className=" form-control border-start-0"
                placeholder="Enter your email"
                style={{ outline: "none", boxShadow: "none" }}
              />
            </div>
          </div>
          <div className="mt-2 d-flex align-items-center gap-2">
            <CircleAlert className="text-brand-active" />
            <p className="text-ui-text-dim mb-0">
              Well use this to send you important updates and notifications
            </p>
          </div>
        </form>

        <div className="d-flex gap-2 w-100">
          <button
            className="border-brand-active border rounded p-2  text-primary d-flex gap-2 align-items-center"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            type="submit"
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
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
        </div>
      </div>
    </>
  );
}

export default CreateProfileScreen;
