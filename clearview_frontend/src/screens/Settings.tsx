import { useState, useEffect } from "react";
import { Target, PiggyBank, Calendar, CreditCard } from "lucide-react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import TopBar from "../components/layout/Topbar";

export default function SettingsContent() {
  const { userData, updateProfile, changePassword, deleteAccount, expenses, envelopeData, incomeSource } = useAuth();
  const { goBack } = GetData();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const [dateFormat, setDateFormat] = useState(() => localStorage.getItem("cv_dateFormat") || "MM/DD/YYYY");
  const [budgetRollover, setBudgetRollover] = useState(() => localStorage.getItem("cv_budgetRollover") !== "false");
  const [appearance, setAppearance] = useState(() => localStorage.getItem("cv_appearance") || "light");
  const [currency, setCurrency] = useState(() => localStorage.getItem("cv_currency") || "KES");
  const [semesterStartMonth, setSemesterStartMonth] = useState(() => localStorage.getItem("cv_semesterStart") || "January");
  const [semesterDuration, setSemesterDuration] = useState(() => parseInt(localStorage.getItem("cv_semesterDuration") || "6", 10));
  const [pushNotifications, setPushNotifications] = useState(() => localStorage.getItem("cv_pushNotifications") !== "false");
  const [emailReports, setEmailReports] = useState(() => localStorage.getItem("cv_emailReports") === "true");

  const [goal, setGoal] = useState(() => localStorage.getItem("onboardingGoal") || "track-spending");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [pendingGoal, setPendingGoal] = useState<string | null>(null);

  const goals = [
    { id: "track-spending", label: "Track my semester spending", desc: "See where my allowance and income go each term", icon: Target },
    { id: "save-more", label: "Save for tuition or books", desc: "Set money aside for academic expenses", icon: PiggyBank },
    { id: "budget-better", label: "Budget my allowance better", desc: "Make my pocket money or stipend last the semester", icon: Calendar },
    { id: "reduce-debt", label: "Manage student debt", desc: "Track loans and plan repayments wisely", icon: CreditCard },
  ];

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState("");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setEmail(userData.email || "");
    }
  }, [userData]);

  useEffect(() => { localStorage.setItem("cv_dateFormat", dateFormat); }, [dateFormat]);
  useEffect(() => { localStorage.setItem("cv_budgetRollover", String(budgetRollover)); }, [budgetRollover]);
  useEffect(() => {
    localStorage.setItem("cv_appearance", appearance);
    const updateTheme = () => {
      if (appearance === "dark") {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else if (appearance === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-bs-theme", prefersDark ? "dark" : "light");
      } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
      }
    };
    updateTheme();
    if (appearance === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", updateTheme);
      return () => mq.removeEventListener("change", updateTheme);
    }
  }, [appearance]);
  useEffect(() => { localStorage.setItem("cv_currency", currency); }, [currency]);
  useEffect(() => { localStorage.setItem("cv_semesterStart", semesterStartMonth); }, [semesterStartMonth]);
  useEffect(() => { localStorage.setItem("cv_semesterDuration", String(semesterDuration)); }, [semesterDuration]);
  useEffect(() => { localStorage.setItem("cv_pushNotifications", String(pushNotifications)); }, [pushNotifications]);
  useEffect(() => { localStorage.setItem("cv_emailReports", String(emailReports)); }, [emailReports]);
  useEffect(() => { localStorage.setItem("onboardingGoal", goal); }, [goal]);

  const brandSerif = { fontFamily: "Georgia, serif" };
  const colors = {
    deepGreen: "var(--cv-deep-green)",
    lightGreenAccent: "var(--cv-light-green-accent)",
    mintBg: "var(--cv-mint-bg)",
    dangerLight: "var(--cv-danger-light)",
    dangerText: "var(--cv-danger-text)",
    darkThemeBg: "var(--cv-dark-bg)",
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currencies = ["KES", "USD", "EUR", "GBP", "UGX", "TZS", "RWF"];

  const handleSave = async () => {
    const ok = await updateProfile({ firstName, lastName, email });
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleDiscard = () => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setEmail(userData.email || "");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMsg("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
      setPasswordMsg("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setShowPasswordModal(false), 1000);
    } else {
      setPasswordError(result.message || "Failed to change password");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") return;
    const ok = await deleteAccount();
    if (ok) {
      window.location.href = "/";
    }
  };

  const handleResetSemester = async () => {
    if (resetConfirmText !== "RESET") return;
    localStorage.removeItem("cv_resetSemester");
    setShowResetConfirm(false);
    setResetConfirmText("");
    window.location.reload();
  };

  const handleExportCSV = () => {
    const rows: string[] = ["Type,Name,Amount,Date,Envelope"];

    if (Array.isArray(incomeSource)) {
      incomeSource.forEach((inc: any) => {
        rows.push(`Income,${inc.source},${inc.total_amount || 0},${inc.date || inc.created_at || ""},`);
      });
    }

    if (Array.isArray(expenses)) {
      expenses.forEach((exp: any) => {
        const envName = Array.isArray(envelopeData)
          ? envelopeData.find((e: any) => Number(e.id) === Number(exp.envelope_id))?.name || ""
          : "";
        rows.push(`Expense,${exp.expense_name || exp.description || "Untitled"},${exp.amount},${exp.expense_date || ""},${envName}`);
      });
    }

    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clearview_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-4 p-md-3 mx-auto bg-ui-bg pb-5" style={{ maxWidth: "1200px" }}>
      <TopBar title="Settings" showBack onBack={goBack} />

      <div className="row g-4">
        <div className="col-12 col-lg-7 d-flex flex-column gap-4">
          {/* General Settings */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center mb-4">
              <div className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.mintBg, color: colors.deepGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>General Settings</h2>
            </div>

            <div className="mb-3">
              <label className="text-uppercase text-muted fw-bold d-block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="form-control py-2 px-3 border rounded-3 shadow-none text-dark fw-medium" style={{ borderColor: "rgba(0,0,0,0.12)" }} />
            </div>

            <div className="mb-3">
              <label className="text-uppercase text-muted fw-bold d-block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="form-control py-2 px-3 border rounded-3 shadow-none text-dark fw-medium" style={{ borderColor: "rgba(0,0,0,0.12)" }} />
            </div>

            <div className="mb-3">
              <label className="text-uppercase text-muted fw-bold d-block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="form-control py-2 px-3 border rounded-3 shadow-none text-dark fw-medium" style={{ borderColor: "rgba(0,0,0,0.12)" }} />
            </div>

            <div className="mb-3">
              <label className="text-uppercase text-muted fw-bold d-block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Currency</label>
              <div className="row g-2">
                {currencies.map((c) => (
                  <div className="col-3 col-md-2" key={c}>
                    <button onClick={() => setCurrency(c)}
                      className="btn w-100 py-2 rounded-3 border fw-medium"
                      style={{
                        backgroundColor: currency === c ? colors.mintBg : "#fff",
                        borderColor: currency === c ? colors.deepGreen : "rgba(0,0,0,0.12)",
                        color: currency === c ? colors.deepGreen : "#6c757d",
                        fontSize: "13px",
                      }}>{c}</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="text-uppercase text-muted fw-bold d-block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Date Format</label>
              <div className="row g-2">
                <div className="col-6">
                  <button onClick={() => setDateFormat("MM/DD/YYYY")}
                    className="btn w-100 py-2 rounded-3 border fw-medium"
                    style={{
                      backgroundColor: dateFormat === "MM/DD/YYYY" ? colors.mintBg : "#fff",
                      borderColor: dateFormat === "MM/DD/YYYY" ? colors.deepGreen : "rgba(0,0,0,0.12)",
                      color: colors.deepGreen, fontSize: "13px",
                    }}>MM/DD/YYYY</button>
                </div>
                <div className="col-6">
                  <button onClick={() => setDateFormat("DD/MM/YYYY")}
                    className="btn w-100 py-2 rounded-3 border fw-medium"
                    style={{
                      backgroundColor: dateFormat === "DD/MM/YYYY" ? colors.mintBg : "#fff",
                      borderColor: dateFormat === "DD/MM/YYYY" ? colors.deepGreen : "rgba(0,0,0,0.12)",
                      color: colors.deepGreen, fontSize: "13px",
                    }}>DD/MM/YYYY</button>
                </div>
              </div>
            </div>

            <hr className="text-muted opacity-25 my-3" />

            <div className="d-flex align-items-center justify-content-between pt-2">
              <div>
                <h4 className="h6 mb-1 fw-bold text-dark">Automatic Budget Rollover</h4>
                <p className="text-muted small mb-0">Unused funds in envelopes roll over to the next semester.</p>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input className="form-check-input cursor-pointer ms-0" type="checkbox" role="switch"
                  checked={budgetRollover} onChange={() => setBudgetRollover(!budgetRollover)}
                  style={{ width: "2.5rem", height: "1.4rem", backgroundColor: budgetRollover ? colors.deepGreen : "", borderColor: budgetRollover ? colors.deepGreen : "" }} />
              </div>
            </div>
          </div>

          {/* Semester Configuration */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center mb-4">
              <div className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.mintBg, color: colors.deepGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>Semester Configuration</h2>
            </div>

            <div className="mb-3">
              <label className="text-uppercase text-muted fw-bold d-block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Semester Start Month</label>
              <select value={semesterStartMonth} onChange={(e) => setSemesterStartMonth(e.target.value)}
                className="form-select py-2 px-3 border rounded-3 shadow-none" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <p className="text-muted small mt-1 mb-0">When does your academic year typically start?</p>
            </div>

            <div className="mb-3">
              <label className="text-uppercase text-muted fw-bold d-block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>Semester Duration (months)</label>
              <div className="row g-2">
                {[3, 4, 5, 6].map((n) => (
                  <div className="col-3" key={n}>
                    <button onClick={() => setSemesterDuration(n)}
                      className="btn w-100 py-2 rounded-3 border fw-medium"
                      style={{
                        backgroundColor: semesterDuration === n ? colors.mintBg : "#fff",
                        borderColor: semesterDuration === n ? colors.deepGreen : "rgba(0,0,0,0.12)",
                        color: semesterDuration === n ? colors.deepGreen : "#6c757d",
                        fontSize: "13px",
                      }}>{n} months</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center mb-4">
              <div className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.mintBg, color: colors.deepGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>Notifications</h2>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h4 className="h6 mb-1 fw-bold text-dark">Push Notifications</h4>
                <p className="text-muted small mb-0">Alerts when you're close to overspending</p>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input className="form-check-input cursor-pointer ms-0" type="checkbox" role="switch"
                  checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)}
                  style={{ width: "2.5rem", height: "1.4rem", backgroundColor: pushNotifications ? colors.deepGreen : "", borderColor: pushNotifications ? colors.deepGreen : "" }} />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h4 className="h6 mb-1 fw-bold text-dark">Email Reports</h4>
                <p className="text-muted small mb-0">Weekly summary of your semester spending</p>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input className="form-check-input cursor-pointer ms-0" type="checkbox" role="switch"
                  checked={emailReports} onChange={() => setEmailReports(!emailReports)}
                  style={{ width: "2.5rem", height: "1.4rem", backgroundColor: emailReports ? colors.deepGreen : "", borderColor: emailReports ? colors.deepGreen : "" }} />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="card border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: colors.mintBg }}>
            <div className="d-flex align-items-center mb-4">
              <div className="p-2 rounded-3 bg-white me-3 d-flex align-items-center justify-content-center shadow-sm" style={{ color: colors.deepGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M4.098 19.902a3.75 3.75 0 0 1 5.304 0l6.401-6.402M4.098 19.902l1.314-1.313m11.386-11.386 1.314-1.314a3 3 0 1 1 4.243 4.243l-1.314 1.314m-4.243-4.243-1.165 1.165m0 0 2.221 2.221m-2.221-2.221L12 9.176m4.243 4.243-1.165 1.165m0 0 2.221 2.221m-2.221-2.221-1.314 1.314m3.535-3.535-1.314 1.314m-5.657-5.657-1.314 1.314m0 0-2.221-2.221m2.221 2.221L7.176 12" />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={{ ...brandSerif, color: colors.deepGreen }}>Appearance</h2>
            </div>

            <div className="row g-3">
              {(["light", "dark", "system"] as const).map((mode) => (
                <div className="col-4" key={mode}>
                  <div onClick={() => setAppearance(mode)}
                    className="card p-3 text-center border cursor-pointer rounded-3 h-100 align-items-center justify-content-center shadow-sm"
                    style={{
                      borderColor: appearance === mode ? colors.deepGreen : "transparent",
                      borderWidth: "2px",
                      backgroundColor: mode === "dark" ? colors.darkThemeBg : mode === "system" ? "#f8f9fa" : "#fff",
                    }}>
                    <div className="rounded-3 p-3 d-flex align-items-center justify-content-center mb-2 w-100" style={{ height: "60px", background: mode === "system" ? "linear-gradient(90deg, #ffffff 50%, #26292B 50%)" : mode === "dark" ? "#1A1C1E" : "#f8f9fa" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={mode === "dark" ? "text-white-50" : "text-secondary"} style={{ width: "22px", height: "22px" }}>
                        {mode === "light" ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m11.37 11.37l1.59 1.59M3 12h2.25m13.5 0H21M5.81 18.19l1.59-1.59M16.81 7.19l1.59-1.59M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
                        ) : mode === "dark" ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25" />
                        )}
                      </svg>
                    </div>
                    <span className="small fw-bold" style={{ fontSize: "0.75rem", color: mode === "dark" ? "#fff" : "#000" }}>
                      {mode === "light" ? "Light Mode" : mode === "dark" ? "Dark Mode" : "System"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5 d-flex flex-column gap-4">
          {/* Account Management */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center mb-4">
              <div className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.mintBg, color: colors.deepGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>Account Management</h2>
            </div>

            <div className="p-3 rounded-3 border bg-light d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <div className="rounded-circle overflow-hidden bg-secondary bg-opacity-50 d-flex align-items-center justify-content-center border me-3" style={{ width: "46px", height: "46px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-white w-70 h-70 mt-2" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">{userData?.firstName || userData?.username || "User"}</h4>
                  <p className="text-muted small mb-0" style={{ fontSize: "0.75rem" }}>{userData?.email || ""}</p>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center justify-content-between py-2 border-bottom cursor-pointer" onClick={() => setShowPasswordModal(true)} style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-muted" style={{ width: "18px", height: "18px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <span className="small fw-semibold">Change Password</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="text-muted" style={{ width: "14px", height: "14px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Financial Goal */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center mb-3">
              <div className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.mintBg, color: colors.deepGreen }}>
                <Target size={20} />
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>Financial Goal</h2>
            </div>

            <p className="text-muted small mb-3">The main focus you selected during onboarding.</p>

            <div className="p-3 rounded-3 border bg-light d-flex align-items-start gap-3">
              {(() => {
                const g = goals.find((g) => g.id === goal);
                const Icon = g?.icon || Target;
                return (
                  <>
                    <Icon size={20} className="mt-1" style={{ color: colors.deepGreen, flexShrink: 0 }} />
                    <div className="flex-grow-1 min-w-0">
                      <p className="fw-bold text-dark mb-0 small">{g?.label || "Track my semester spending"}</p>
                      <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>{g?.desc || "See where my allowance and income go each term"}</p>
                    </div>
                  </>
                );
              })()}
            </div>

            <button onClick={() => { setPendingGoal(goal); setShowGoalModal(true); }}
              className="btn btn-outline-secondary w-100 mt-3 py-2 rounded-3 fw-semibold small shadow-none"
              style={{ borderColor: "rgba(0,0,0,0.12)", fontSize: "0.8rem" }}>
              Change Goal
            </button>
          </div>

          {/* Data & Reset */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center mb-3">
              <div className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.mintBg, color: colors.deepGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 .621-.504 1.125-1.125 1.125h-14.25c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v1.5ZM6 12a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75Z" />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>Data & Reset</h2>
            </div>

            <p className="text-muted small mb-4">Export your semester data or reset your current period.</p>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <button onClick={handleExportCSV} className="btn btn-white w-100 border p-3 rounded-3 d-flex flex-column align-items-center justify-content-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-secondary mb-2" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span className="small fw-bold text-dark" style={{ fontSize: "0.75rem" }}>Export CSV</span>
                </button>
              </div>
              <div className="col-6">
                <button onClick={() => setShowResetConfirm(true)} className="btn btn-white w-100 border p-3 rounded-3 d-flex flex-column align-items-center justify-content-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-secondary mb-2" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span className="small fw-bold text-dark" style={{ fontSize: "0.75rem" }}>Reset Semester</span>
                </button>
              </div>
            </div>

            <button onClick={() => setShowDeleteConfirm(true)}
              className="btn w-100 border-0 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 fw-semibold"
              style={{ backgroundColor: colors.dangerLight, color: colors.dangerText, fontSize: "0.85rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Delete Account & Data
            </button>
          </div>

          {/* About */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="d-flex align-items-center mb-3">
              <div className="p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: colors.mintBg, color: colors.deepGreen }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              </div>
              <h2 className="h5 mb-0 fw-medium" style={brandSerif}>About</h2>
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span className="small text-muted">App</span>
                <span className="small fw-semibold">ClearView</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small text-muted">Version</span>
                <span className="small fw-semibold">1.0.0</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small text-muted">Project</span>
                <span className="small fw-semibold">BBIT Final Year</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small text-muted">University</span>
                <span className="small fw-semibold">Kabarak University</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small text-muted">Developer</span>
                <span className="small fw-semibold">Mwangangi Fredrick</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small text-muted">Supervisor</span>
                <span className="small fw-semibold">Mr. Martin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save buttons */}
      <div className="d-flex justify-content-end align-items-center gap-3 mt-4 pt-3 pb-4">
        {saved && <span className="small text-success fw-bold">Changes saved</span>}
        <button onClick={handleDiscard} className="btn btn-white bg-white border px-4 py-2 rounded-3 text-dark fw-semibold small shadow-none" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
          Discard Changes
        </button>
        <button onClick={handleSave} className="btn text-white px-4 py-2 rounded-3 fw-semibold small shadow-none border-0" style={{ backgroundColor: colors.deepGreen }}>
          Save Changes
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050, backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 p-4 shadow-lg" style={{ maxWidth: "440px", width: "90%" }}>
            <h3 className="h5 fw-bold mb-4" style={brandSerif}>Change Password</h3>
            <form onSubmit={handleChangePassword}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Current Password</label>
                <input type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">New Password</label>
                <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Confirm New Password</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              {passwordError && <p className="text-danger small fw-bold mb-3">{passwordError}</p>}
              {passwordMsg && <p className="text-success small fw-bold mb-3">{passwordMsg}</p>}
              <div className="d-flex gap-3">
                <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordError(""); setPasswordMsg(""); }} className="btn btn-outline-secondary w-50 py-2 fw-semibold">Cancel</button>
                <button type="submit" className="btn text-white w-50 py-2 fw-semibold border-0" style={{ backgroundColor: colors.deepGreen }}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050, backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 p-4 shadow-lg" style={{ maxWidth: "440px", width: "90%" }}>
            <h3 className="h5 fw-bold mb-2 text-danger" style={brandSerif}>Delete Account</h3>
            <p className="small text-muted mb-3">This action is irreversible. All your data will be permanently deleted.</p>
            <p className="small fw-semibold mb-2">Type <span className="text-danger fw-bold">DELETE</span> to confirm:</p>
            <input type="text" className="form-control mb-3" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} placeholder="Type DELETE" />
            <div className="d-flex gap-3">
              <button onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(""); }} className="btn btn-outline-secondary w-50 py-2 fw-semibold">Cancel</button>
              <button onClick={handleDeleteAccount} disabled={deleteConfirmText !== "DELETE"} className="btn btn-danger w-50 py-2 fw-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Semester Modal */}
      {showResetConfirm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050, backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 p-4 shadow-lg" style={{ maxWidth: "440px", width: "90%" }}>
            <h3 className="h5 fw-bold mb-2" style={{ ...brandSerif, color: colors.deepGreen }}>Reset Semester Data</h3>
            <p className="small text-muted mb-3">This will clear all expenses and income entries for the current period. Your envelopes and account will be preserved.</p>
            <p className="small fw-semibold mb-2">Type <span className="fw-bold" style={{ color: colors.deepGreen }}>RESET</span> to confirm:</p>
            <input type="text" className="form-control mb-3" value={resetConfirmText} onChange={(e) => setResetConfirmText(e.target.value)} placeholder="Type RESET" />
            <div className="d-flex gap-3">
              <button onClick={() => { setShowResetConfirm(false); setResetConfirmText(""); }} className="btn btn-outline-secondary w-50 py-2 fw-semibold">Cancel</button>
              <button onClick={handleResetSemester} disabled={resetConfirmText !== "RESET"} className="btn w-50 py-2 fw-semibold text-white border-0" style={{ backgroundColor: colors.deepGreen }}>Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050, backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 p-4 shadow-lg" style={{ maxWidth: "440px", width: "90%" }}>
            <h3 className="h5 fw-bold mb-1" style={brandSerif}>Change Your Goal</h3>
            <p className="small text-muted mb-3">Select a new financial focus for your experience.</p>

            <div className="d-flex flex-column gap-2 mb-4">
              {goals.map((g) => {
                const Icon = g.icon;
                const isSelected = pendingGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setPendingGoal(g.id)}
                    className="btn w-100 p-3 d-flex align-items-start gap-3 text-start border rounded-3 shadow-sm"
                    style={{
                      backgroundColor: isSelected ? "#cbece1" : "white",
                      borderColor: isSelected ? "#053225" : "#dee2e6",
                      borderWidth: isSelected ? "2px" : "1px",
                    }}
                  >
                    <Icon size={20} className="mt-1" style={{ color: "#053225", flexShrink: 0 }} />
                    <div>
                      <p className="fw-bold text-dark mb-0" style={{ fontSize: "0.9rem" }}>{g.label}</p>
                      <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>{g.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="d-flex gap-3">
              <button onClick={() => setShowGoalModal(false)} className="btn btn-outline-secondary w-50 py-2 fw-semibold">Cancel</button>
              <button onClick={() => { setGoal(pendingGoal || goal); setShowGoalModal(false); }} className="btn text-white w-50 py-2 fw-semibold border-0" style={{ backgroundColor: colors.deepGreen }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
