import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export const CONTACT_FIELD_LIMITS = {
  name: 200,
  email: 320,
  message: 1500,
} as const

const LIMITS = CONTACT_FIELD_LIMITS

export function validateContactPayload(
  input: unknown,
): { ok: true; value: ContactPayload } | { ok: false; error: string } {
  if (input === null || typeof input !== "object") {
    return { ok: false, error: "Invalid body" };
  }
  const o = input as Record<string, unknown>;

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!name) return { ok: false, error: "Name is required" };
  if (name.length > LIMITS.name)
    return { ok: false, error: "Name is too long" };

  if (!email) return { ok: false, error: "Email is required" };
  if (email.length > LIMITS.email)
    return { ok: false, error: "Email is too long" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Invalid email address" };
  }

  if (!message) return { ok: false, error: "Message is required" };
  if (message.length > LIMITS.message)
    return { ok: false, error: "Message is too long" };

  return { ok: true, value: { name, email, message } };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildText(p: ContactPayload): string {
  return [`Name: ${p.name}`, `Email: ${p.email}`, "", p.message].join("\n");
}

function buildHtml(p: ContactPayload): string {
  const n = escapeHtml(p.name);
  const e = escapeHtml(p.email);
  const m = escapeHtml(p.message).replace(/\n/g, "<br />");
  return `<p><strong>Name</strong><br />${n}</p><p><strong>Email</strong><br />${e}</p><p><strong>Message</strong></p><p>${m}</p>`;
}

/** Sends to CONTACT_TO_EMAIL; Reply-To = visitor. */
export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    const err = new Error("MISSING_EMAIL_CONFIG");
    (err as Error & { code?: string }).code = "MISSING_EMAIL_CONFIG";
    throw err;
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `Portfolio contact: ${payload.name}`,
    text: buildText(payload),
    html: buildHtml(payload),
  });
  if (error) {
    const err = new Error(error.message);
    (err as Error & { code?: string }).code = "RESEND_ERROR";
    throw err;
  }
}
