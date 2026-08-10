import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.RESEND_API_KEY || "";
const isResendConfigured = () =>
  Boolean(apiKey) && !apiKey.startsWith("re_your-");

const resend = new Resend(apiKey);

const fromAddress =
  process.env.EMAIL_FROM || "onboarding@resend.dev";

const brandColor = "#0F6E56";

function wrapEmail(title: string, bodyHtml: string, bodyText: string) {
  return {
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background:#f8faf9; padding:24px;">
        <div style="max-width:520px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e6ece9;">
          <div style="background:${brandColor}; padding:20px 28px;">
            <h1 style="margin:0; color:#ffffff; font-size:20px; font-family:Georgia, serif;">ClearView</h1>
          </div>
          <div style="padding:28px;">
            <h2 style="margin:0 0 12px; color:#053225; font-size:17px;">${title}</h2>
            ${bodyHtml}
          </div>
          <div style="padding:16px 28px; border-top:1px solid #e6ece9; font-size:12px; color:#8A8A94;">
            You received this email because of activity in your ClearView budget app.
          </div>
        </div>
      </div>
    `,
    text: bodyText,
  };
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string,
) {
  if (!isResendConfigured()) {
    console.log(
      `[ClearView] Resend not configured — no email sent. Would have emailed ${to}:\n${text}`,
    );
    return;
  }
  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to,
    subject,
    html,
    text,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function sendNotificationEmail(
  to: string,
  info: { title: string; description: string },
) {
  const subject = `ClearView: ${info.title}`;
  const bodyHtml = `<p style="margin:0 0 8px; color:#3f3f46; font-size:14px; line-height:1.6;">${info.description}</p>`;
  const bodyText = `ClearView: ${info.title}\n\n${info.description}`;
  const content = wrapEmail(subject, bodyHtml, bodyText);
  await sendEmail(to, subject, content.html, content.text);
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const subject = "Reset your ClearView password";
  const content = wrapEmail(
    subject,
    `
      <p style="margin:0 0 16px; color:#3f3f46; font-size:14px; line-height:1.6;">
        We received a request to reset your password. If this wasn't you, you can safely ignore this email.
      </p>
      <a href="${resetUrl}" style="display:inline-block; background:${brandColor}; color:#ffffff; text-decoration:none; padding:12px 22px; border-radius:8px; font-size:14px; font-weight:600;">
        Reset Password
      </a>
      <p style="margin:18px 0 0; color:#8A8A94; font-size:12px;">
        Or paste this link into your browser:<br/>
        <a href="${resetUrl}" style="color:${brandColor}; word-break:break-all;">${resetUrl}</a>
      </p>
    `,
    `Reset your ClearView password\n\n${resetUrl}`,
  );
  await sendEmail(to, subject, content.html, content.text);
}
