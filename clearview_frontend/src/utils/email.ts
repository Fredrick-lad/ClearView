import API_BASE_URL from "./api";

export function emailReportsEnabled(): boolean {
  return (
    localStorage.getItem("cv_emailReports") === "true" ||
    localStorage.getItem("emailReports") === "true"
  );
}

export async function sendNotificationEmail(info: {
  title: string;
  description: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/send-notification-email`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function forgotPassword(
  email: string,
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return { ok: res.ok, message: data.message || "" };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await res.json();
    return { ok: res.ok, message: data.message || "" };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}
