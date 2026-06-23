import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingScreen from "../components/loadingscreen";
import { useAuth } from "../hooks/context/userContext";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";

const brand = {
  primary: "#0F6E56",
  dark: "#053225",
  lightBg: "#E1F5EE",
  serif: { fontFamily: "'Playfair Display', Georgia, serif" },
};

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { registerUser } = useAuth();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setEmailError, emailError, checkEmail } = useAuth();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setEmailError("");
    setFormData((prevdata: any) => ({ ...prevdata, [name]: value }));
    if (error) setError(false);
  };

  async function handleRegister(e: any) {
    try {
      e.preventDefault();
      setLoading(true);
      if (formData.password !== formData.confirmpassword) {
        setError(true);
        setSuccess(false);
        setLoading(false);
        return;
      }
      setError(false);
      const { confirmpassword, ...verified } = formData;
      await registerUser(verified);
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? <LoadingScreen /> : (
        <div style={{ minHeight: "100vh", background: "#f8faf9", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
          <div
            style={{
              background: "#FFFFFF",
              border: "0.5px solid rgba(24,24,26,0.10)",
              borderRadius: "20px",
              padding: "2.25rem",
              boxShadow: "0 2px 40px rgba(24,24,26,0.06)",
              maxWidth: "440px",
              width: "100%",
              animation: "floatUp 0.6s ease both",
            }}
          >
            <form onSubmit={handleRegister}>
              <Link to="/" style={{ color: brand.primary, fontSize: "13px", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "1.5rem" }}>
                <ArrowLeft size={14} /> Back to home
              </Link>

              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ ...brand.serif, fontSize: "1.6rem", fontWeight: 700, color: brand.dark, marginBottom: "0.3rem" }}>
                  Create your account
                </h1>
                <p style={{ fontSize: "14px", color: "#8A8A94", margin: 0, lineHeight: 1.5 }}>
                  Start managing your semester budget the smart way.
                </p>
              </div>

              <div className="mb-3">
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#4A4A50", marginBottom: "4px", display: "block", letterSpacing: "0.03em" }}>Username</label>
                <div style={{ position: "relative" }}>
                  <User size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8A8A94", pointerEvents: "none" }} />
                  <input type="text" name="username" value={formData.username} placeholder="e.g. johnkabarak" onChange={handleChange} required
                    style={{ width: "100%", padding: "10px 12px 10px 38px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafafa", boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = brand.primary}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#4A4A50", marginBottom: "4px", display: "block", letterSpacing: "0.03em" }}>Email</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8A8A94", pointerEvents: "none" }} />
                  <input type="email" name="email" value={formData.email} placeholder="you@kabarak.ac.ke" onChange={handleChange} required
                    style={{ width: "100%", padding: "10px 12px 10px 38px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafafa", boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = brand.primary}
                    onBlur={(e) => {
                      checkEmail(e.target.value);
                      e.target.style.borderColor = emailError ? "#dc3545" : "#e2e8f0";
                    }}
                  />
                </div>
                {emailError && <p style={{ fontSize: "12px", color: "#dc3545", margin: "4px 0 0 0" }}>{emailError}</p>}
              </div>

              <div className="mb-3">
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#4A4A50", marginBottom: "4px", display: "block", letterSpacing: "0.03em" }}>Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8A8A94", pointerEvents: "none" }} />
                  <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="At least 6 characters" required
                    style={{ width: "100%", padding: "10px 38px 10px 38px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafafa", boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = brand.primary}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", padding: 0, cursor: "pointer", color: "#8A8A94", lineHeight: 0 }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#4A4A50", marginBottom: "4px", display: "block", letterSpacing: "0.03em" }}>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8A8A94", pointerEvents: "none" }} />
                  <input type={showConfirm ? "text" : "password"} name="confirmpassword" onChange={handleChange} placeholder="Repeat your password" required
                    style={{ width: "100%", padding: "10px 38px 10px 38px", border: `1px solid ${error ? "#dc3545" : "#e2e8f0"}`, borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafafa", boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = brand.primary}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", padding: 0, cursor: "pointer", color: "#8A8A94", lineHeight: 0 }}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error && <p style={{ fontSize: "12px", color: "#dc3545", margin: "4px 0 0 0" }}>Passwords don't match</p>}
              </div>

              {success && (
                <p style={{ fontSize: "13px", color: brand.primary, margin: "0 0 1rem 0", textAlign: "center", background: brand.lightBg, padding: "8px", borderRadius: "8px", fontWeight: 500 }}>
                  Account created successfully! Redirecting...
                </p>
              )}

              <button type="submit"
                style={{ width: "100%", padding: "12px", background: brand.primary, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Create Account
              </button>

              <p style={{ fontSize: "13px", color: "#8A8A94", textAlign: "center", marginTop: "1.25rem", marginBottom: 0 }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: brand.primary, fontWeight: 600, textDecoration: "none" }}>
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Login() {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser, error, setError } = useAuth();

  const handleChange = (e: any) => {
    setError("");
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await loginUser(loginFormData);
      if (response) navigate("/dashboard");
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <LoadingScreen /> : (
        <div style={{ minHeight: "100vh", background: "#f8faf9", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
          <div
            style={{
              background: "#FFFFFF",
              border: "0.5px solid rgba(24,24,26,0.10)",
              borderRadius: "20px",
              padding: "2.25rem",
              boxShadow: "0 2px 40px rgba(24,24,26,0.06)",
              maxWidth: "420px",
              width: "100%",
              animation: "floatUp 0.6s ease both",
            }}
          >
            <form onSubmit={handleLogin}>
              <Link to="/" style={{ color: brand.primary, fontSize: "13px", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "1.5rem" }}>
                <ArrowLeft size={14} /> Back to home
              </Link>

              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ ...brand.serif, fontSize: "1.6rem", fontWeight: 700, color: brand.dark, marginBottom: "0.3rem" }}>
                  Welcome back
                </h1>
                <p style={{ fontSize: "14px", color: "#8A8A94", margin: 0, lineHeight: 1.5 }}>
                  Sign in to your semester budget.
                </p>
              </div>

              <div className="mb-3">
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#4A4A50", marginBottom: "4px", display: "block", letterSpacing: "0.03em" }}>Email</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8A8A94", pointerEvents: "none" }} />
                  <input type="email" name="email" onChange={handleChange} placeholder="you@kabarak.ac.ke" required
                    style={{ width: "100%", padding: "10px 12px 10px 38px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafafa", boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = brand.primary}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#4A4A50", marginBottom: "4px", display: "block", letterSpacing: "0.03em" }}>Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8A8A94", pointerEvents: "none" }} />
                  <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="Enter your password" required
                    style={{ width: "100%", padding: "10px 38px 10px 38px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafafa", boxSizing: "border-box" }}
                    onFocus={(e) => e.target.style.borderColor = brand.primary}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", padding: 0, cursor: "pointer", color: "#8A8A94", lineHeight: 0 }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <p style={{ fontSize: "13px", color: "#dc3545", textAlign: "center", background: "#fef2f2", padding: "8px", borderRadius: "8px", marginBottom: "1rem", fontWeight: 500 }}>
                  {error}
                </p>
              )}

              <button type="submit"
                style={{ width: "100%", padding: "12px", background: brand.primary, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Sign In
              </button>

              <Link to="/forgotpassword" style={{ color: brand.primary, fontSize: "13px", fontWeight: 500, textDecoration: "none", textAlign: "center", display: "block", marginTop: "1rem" }}>
                Forgot password?
              </Link>

              <p style={{ fontSize: "13px", color: "#8A8A94", textAlign: "center", marginTop: "1.25rem", marginBottom: 0 }}>
                New to ClearView?{" "}
                <Link to="/register" style={{ color: brand.primary, fontWeight: 600, textDecoration: "none" }}>
                  Create an account
                </Link>
              </p>
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
