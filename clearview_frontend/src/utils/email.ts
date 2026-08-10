import API_BASE_URL from "./api";

export function emailReportsEnabled(): boolean {
  return (
    localStorage.getItem("cv_emailReports") === "true" ||
    localStorage.getItem("emailReports") === "true"
  );
}

const TIMEOUT_MS = 30000;

async function postJson(
  path: string,
  body: unknown,
): Promise<{ ok: boolean; data: Record<string, string> }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    let data: Record<string, string> = {};
    if (res.status !== 204) {
      try {
        data = (await res.json()) as Record<string, string>;
      } catch {
        data = {};
      }
    }
    return { ok: res.ok, data };
  } finally {
    clearTimeout(timer);
  }
}

export async function sendNotificationEmail(info: {
  title: string;
  description: string;
}): Promise<boolean> {
  try {
    const { ok } = await postJson("/send-notification-email", info);
    return ok;
  } catch {
    return false;
  }
}

export async function forgotPassword(
  email: string,
): Promise<{ ok: boolean; message: string }> {
  try {
    const { ok, data } = await postJson("/forgot-password", { email });
    return { ok, message: data.message || "" };
  } catch {
    return { ok: false, message: "Request timed out. Please try again." };
  }
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<{ ok: boolean; message: string }> {
  try {
    const { ok, data } = await postJson("/reset-password", {
      token,
      newPassword,
    });
    return { ok, message: data.message || "" };
  } catch {
    return { ok: false, message: "Request timed out. Please try again." };
  }
}
