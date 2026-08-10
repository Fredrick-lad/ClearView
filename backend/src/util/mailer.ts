import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const isSmtpConfigured = () =>
  Boolean(process.env.SMTP_USER) &&
  !process.env.SMTP_USER.includes("your-email") &&
  Boolean(process.env.SMTP_PASS) &&
  !process.env.SMTP_PASS.includes("your-app-password");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

const fromAddress =
  process.env.SMTP_FROM || `ClearView <${process.env.SMTP_USER || "no-reply@clearview.app"}>`;

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

export async function sendNotificationEmail(
  to: string,
  info: { title: string; description: string },
) {
  const { title, bodyHtml, bodyText } = (() => {
    const subject = `ClearView: ${info.title}`;
    const body = `<p style="margin:0 0 8px; color:#3f3f46; font-size:14px; line-height:1.6;">${info.description}</p>`;
    return {
      title: subject,
      bodyHtml: body,
      bodyText: `ClearView: ${info.title}\n\n${info.description}`,
    };
  })();
  const content = wrapEmail(title, bodyHtml, bodyText);

  if (!isSmtpConfigured()) {
    console.log(
      `[ClearView] SMTP not configured — no email sent. Would have emailed ${to}:\n${content.text}`,
    );
    return;
  }

  await transporter.sendMail({
    from: fromAddress,
    to,
    subject: title,
    html: content.html,
    text: content.text,
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const title = "Reset your ClearView password";
  const content = wrapEmail(
    title,
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

  if (!isSmtpConfigured()) {
    console.log(
      `[ClearView] SMTP not configured — no email sent. Would have emailed ${to}:\n${content.text}`,
    );
    return;
  }

  await transporter.sendMail({
    from: fromAddress,
    to,
    subject: title,
    html: content.html,
    text: content.text,
  });
}
