import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/context/userContext";
import { GetData } from "../hooks/context/generalContext";
import TopBar from "../components/layout/Topbar";

const brandColors = {
  primaryDark: "var(--cv-primary-dark)",
  cardDarkBg: "var(--cv-card-dark-bg)",
  mainBg: "var(--cv-main-bg)",
};

export default function UserProfileContent() {
  const { userData, updateProfile, changePassword, deleteAccount } = useAuth();
  const { setScreen } = GetData();

  const [pushNotifications, setPushNotifications] = useState(() => {
    return localStorage.getItem("pushNotifications") !== "false";
  });
  const [emailReports, setEmailReports] = useState(() => {
    return localStorage.getItem("emailReports") === "true";
  });

  useEffect(() => {
    localStorage.setItem("pushNotifications", String(pushNotifications));
  }, [pushNotifications]);

  useEffect(() => {
    localStorage.setItem("emailReports", String(emailReports));
  }, [emailReports]);

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [savingProfile, setSavingProfile] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const brandSerif = { fontFamily: "Georgia, serif" };

  if (!userData) return null;

  const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "User";
  const userEmail = userData.email || "";

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    const ok = await updateProfile({ firstName, lastName, email });
    setSavingProfile(false);
    if (ok) setEditing(false);
  };

  const handleCancelEdit = () => {
    setFirstName(userData.firstName || "");
    setLastName(userData.lastName || "");
    setEmail(userData.email || "");
    setEditing(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg("");
    setChangingPassword(true);
    const result = await changePassword(currentPassword, newPassword);
    setChangingPassword(false);
    setPasswordMsg(result.message);
    if (result.success) {
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => setShowPasswordModal(false), 1500);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const ok = await deleteAccount();
    if (ok) {
      window.location.href = "/login";
    }
    setDeleting(false);
    setShowDeleteConfirm(false);
  };

  const handleExportData = () => {
    const rows = [["Name", "Email", "Envelopes", "Expenses", "Income Sources"].join(",")];
    const now = new Date().toISOString().split("T")[0];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clearview-export-${now}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="px-3 px-md-4 mx-auto bg-ui-bg pb-5"
      style={{ maxWidth: "1200px" }}
    >
      <TopBar title="User Profile" showBack onBack={() => setScreen("Dashboard")} />

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-4">
          <div
            className="card h-100 p-4 border-0 text-white position-relative overflow-hidden d-flex flex-column align-items-center justify-content-between"
            style={{
              backgroundColor: brandColors.cardDarkBg,
              borderRadius: "12px",
              minHeight: "340px",
            }}
          >
            <div className="d-flex flex-column align-items-center mt-3">
              <div
                className="rounded-3 overflow-hidden border border-2 d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-white-50 w-75 h-75 mt-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </div>
              <h2 className="h4 mb-1" style={brandSerif}>
                {fullName}
              </h2>
              <p
                className="text-uppercase text-white-50 small font-monospace mb-0"
                style={{ fontSize: "0.75rem" }}
              >
                Member since {new Date().getFullYear()}
              </p>
            </div>
            <button
              className="btn btn-light w-75 fw-semibold px-4 py-2 mt-4"
              style={{ color: brandColors.primaryDark }}
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              Change Photo
            </button>
            <input id="avatar-upload" type="file" accept="image/*" className="d-none" />
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div
            className="card h-100 p-4 bg-white border-0 shadow-sm"
            style={{ borderRadius: "12px", minHeight: "340px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h5 mb-0 fw-bold" style={brandSerif}>
                Personal Details
              </h3>
              {!editing && (
                <button
                  className="btn btn-link p-0 text-muted shadow-none"
                  aria-label="Edit personal details"
                  onClick={() => {
                    setFirstName(userData.firstName || "");
                    setLastName(userData.lastName || "");
                    setEmail(userData.email || "");
                    setEditing(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                </button>
              )}
            </div>

            {editing ? (
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>First Name</label>
                  <input type="text" className="form-control form-control-sm shadow-none" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                  <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>Last Name</label>
                  <input type="text" className="form-control form-control-sm shadow-none" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div>
                  <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>Email</label>
                  <input type="email" className="form-control form-control-sm shadow-none" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-sm btn-outline-secondary shadow-none flex-fill" onClick={handleCancelEdit}>Cancel</button>
                  <button className="btn btn-sm text-white shadow-none flex-fill" style={{ backgroundColor: brandColors.primaryDark }} onClick={handleSaveProfile} disabled={savingProfile}>
                    {savingProfile ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>Full Name</label>
                  <p className="mb-0 fw-semibold text-dark">{fullName}</p>
                </div>
                <div>
                  <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>Email Address</label>
                  <p className="mb-0 fw-semibold text-dark">{userEmail}</p>
                </div>
                <div>
                  <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>Phone Number</label>
                  <p className="mb-0 fw-semibold text-dark">Not provided</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div
            className="card h-100 p-4 bg-white border-0 shadow-sm"
            style={{ borderRadius: "12px", minHeight: "340px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h5 mb-0 fw-bold" style={brandSerif}>
                Account
              </h3>
              <span className="badge text-uppercase text-white px-2 py-1" style={{ backgroundColor: brandColors.primaryDark, fontSize: "0.6rem" }}>
                Active
              </span>
            </div>
            <div className="d-flex flex-column gap-4">
              <div>
                <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                  Email
                </label>
                <p className="mb-0 h6 fw-bold" style={{ color: brandColors.primaryDark }}>
                  {userEmail}
                </p>
              </div>
              <div>
                <label className="text-uppercase text-muted fw-bold d-block mb-1" style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                  User ID
                </label>
                <p className="mb-0 fw-semibold" style={{ color: brandColors.primaryDark }}>
                  #{userData.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <h3 className="h5 mb-3 fw-bold" style={brandSerif}>
            Security & Privacy
          </h3>
          <div
            className="card bg-white border-0 shadow-sm p-0"
            style={{ borderRadius: "12px" }}
          >
            <div
              className="d-flex align-items-center justify-content-between p-3 cursor-pointer"
              onClick={() => setShowPasswordModal(true)}
            >
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">Change Password</h4>
                  <p className="text-muted small mb-0">Update your account password</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-muted" style={{ width: "16px", height: "16px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <h3 className="h5 mb-3 fw-bold" style={brandSerif}>
            Preferences
          </h3>
          <div
            className="card bg-white border-0 shadow-sm p-4 d-flex flex-column gap-4"
            style={{ borderRadius: "12px" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">Push Notifications</h4>
                  <p className="text-muted small mb-0">Alerts for unusual spending</p>
                </div>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input className="form-check-input cursor-pointer ms-0" type="checkbox" role="switch" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} style={{ width: "2.5rem", height: "1.4rem" }} />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="p-2 bg-light text-secondary rounded-3 me-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="h6 mb-0 fw-bold text-dark">Email Reports</h4>
                  <p className="text-muted small mb-0">Weekly financial digest</p>
                </div>
              </div>
              <div className="form-check form-switch fs-4 p-0 m-0 d-flex align-items-center">
                <input className="form-check-input cursor-pointer ms-0" type="checkbox" role="switch" checked={emailReports} onChange={() => setEmailReports(!emailReports)} style={{ width: "2.5rem", height: "1.4rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card bg-white border-0 shadow-sm p-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4 mb-5"
        style={{ borderRadius: "12px" }}
      >
        <div style={{ maxWidth: "650px" }}>
          <h3 className="h5 mb-1 fw-bold" style={brandSerif}>
            Data Sovereignty
          </h3>
          <p className="text-muted small mb-0 lh-base">
            Download a comprehensive archive of your financial data, or request a complete account closure and data deletion.
          </p>
        </div>
        <div className="d-flex align-items-center gap-4 flex-shrink-0">
          <button className="btn btn-white bg-white border border-secondary border-opacity-25 shadow-sm small fw-bold px-4 py-2 text-dark" onClick={handleExportData}>
            Export My Data
          </button>
          <button className="btn btn-link text-danger text-decoration-none small fw-bold p-0" onClick={() => setShowDeleteConfirm(true)}>
            Delete Account
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1060, backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 shadow-lg p-4" style={{ maxWidth: "420px", width: "90%" }}>
            <h4 className="h5 fw-bold mb-3" style={brandSerif}>Change Password</h4>
            <form onSubmit={handleChangePassword}>
              <div className="mb-3">
                <label className="form-label small fw-medium">Current Password</label>
                <input type="password" className="form-control shadow-none" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-medium">New Password</label>
                <input type="password" className="form-control shadow-none" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
              </div>
              {passwordMsg && <div className={`small mb-3 ${passwordMsg.includes("success") || passwordMsg.includes("Success") ? "text-success" : "text-danger"}`}>{passwordMsg}</div>}
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-outline-secondary shadow-none flex-fill" onClick={() => { setShowPasswordModal(false); setPasswordMsg(""); }}>Cancel</button>
                <button type="submit" className="btn text-white shadow-none flex-fill" style={{ backgroundColor: brandColors.primaryDark }} disabled={changingPassword}>
                  {changingPassword ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1060, backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-4 shadow-lg p-4" style={{ maxWidth: "400px", width: "90%" }}>
            <h4 className="h5 fw-bold mb-2" style={brandSerif}>Delete Account</h4>
            <p className="text-muted small mb-4">Are you sure? This action cannot be undone. All your data will be permanently deleted.</p>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary shadow-none flex-fill" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>Cancel</button>
              <button className="btn btn-danger shadow-none flex-fill" onClick={handleDeleteAccount} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
