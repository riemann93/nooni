/**
 * Contact form server actions.
 *
 * Sends the form submission as an email to hej@nooni.dk via Resend.
 * The form's client component imports `sendContactEmail` and passes
 * it to React's `useActionState`, which gives us pending state and
 * the latest result without writing a fetch handler.
 *
 * Environment:
 *   - RESEND_API_KEY  required at runtime
 *   - CONTACT_FROM    optional; defaults to "Nooni Kontakt
 *                     <onboarding@resend.dev>". Once nooni.dk is
 *                     verified in Resend, swap to a noreply@nooni.dk
 *                     address so deliverability and reply-handling
 *                     line up with the brand domain.
 *
 * Anti-spam: a hidden "company" honeypot field. Bots fill every
 * field they see; humans can't see it. If it has a value, we
 * silently succeed (the bot thinks it worked, but no email is sent).
 */

"use server";

import { Resend } from "resend";

/** Destination — where Camilla actually reads mail. */
const CONTACT_TO = "hej@nooni.dk";

/** Sender. Must be a Resend-verified address once nooni.dk is set up. */
const CONTACT_FROM = process.env.CONTACT_FROM ?? "Nooni Kontakt <onboarding@resend.dev>";

export interface ContactFormState {
  status: "idle" | "ok" | "error";
  /** Human-readable message shown back to the user. */
  message?: string;
  /** Field-level validation errors, keyed by form field name. */
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
}

export const INITIAL_CONTACT_STATE: ContactFormState = { status: "idle" };

/** Loose RFC 5322-ish email check — good enough for a contact form. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — bots fill every field. If "company" has any value, treat
  // the submission as spam and silently succeed.
  if ((formData.get("company") as string | null)?.trim()) {
    return { status: "ok", message: "Tak — vi vender tilbage snart." };
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Skriv lige dit navn.";
  if (!email) fieldErrors.email = "Vi skal bruge en mail for at svare dig.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Mailadressen ser ikke rigtig ud.";
  if (!message) fieldErrors.message = "Skriv en kort besked.";
  else if (message.length < 5) fieldErrors.message = "Lidt mere tekst, tak.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Tjek lige felterne herunder.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Visible in the Vercel logs but not the user — keep the user
    // message neutral so we don't leak setup state.
    console.error("[contact] RESEND_API_KEY is not set");
    return {
      status: "error",
      message: "Beskeden kunne ikke sendes lige nu. Prøv igen om lidt.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const subjectLine = subject
      ? `[nooni.dk] ${subject}`
      : `[nooni.dk] Ny besked fra ${name}`;

    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: subjectLine,
      text: [
        `Fra: ${name} <${email}>`,
        subject ? `Emne: ${subject}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("[contact] Resend send failed", err);
    return {
      status: "error",
      message: "Beskeden kunne ikke sendes lige nu. Prøv igen om lidt.",
    };
  }

  return {
    status: "ok",
    message: "Tak for beskeden — vi svarer så hurtigt vi kan.",
  };
}
