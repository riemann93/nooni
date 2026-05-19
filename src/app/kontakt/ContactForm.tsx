/**
 * ContactForm — client form for /kontakt.
 *
 * Wires the form fields to the `sendContactEmail` server action via
 * React's `useActionState` so we get pending/submitting state and
 * the action's return value with no fetch boilerplate. Re-uses the
 * pill-style input look from PersonalizationForm for consistency.
 */

"use client";

import { useActionState } from "react";
import {
  INITIAL_CONTACT_STATE,
  sendContactEmail,
  type ContactFormState,
} from "./actions";

const inputClass =
  "mt-2 w-full rounded-full border border-nooni-line bg-nooni-bg px-5 py-3 text-base text-nooni-ink placeholder:text-nooni-ink-soft/50 focus:border-nooni-headline focus:outline-none";
const textareaClass =
  "mt-2 w-full rounded-3xl border border-nooni-line bg-nooni-bg px-5 py-4 text-base text-nooni-ink placeholder:text-nooni-ink-soft/50 focus:border-nooni-headline focus:outline-none";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(
    sendContactEmail,
    INITIAL_CONTACT_STATE,
  );

  if (state.status === "ok") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-nooni-line bg-nooni-bg-warm px-8 py-10 text-center"
      >
        <p className="font-editorial text-xl leading-relaxed text-nooni-ink">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot — visually hidden, sighted users won't see or focus it.
          Bots fill every field; if this has a value the server silently
          drops the submission. */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0" aria-hidden>
        <label htmlFor="company">Firma (ikke udfyld)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        name="name"
        label="Navn"
        required
        autoComplete="name"
        error={state.fieldErrors?.name}
      />

      <Field
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
      />

      <Field
        name="subject"
        label="Emne (valgfrit)"
        autoComplete="off"
      />

      <div>
        <FieldLabel htmlFor="message" required>
          Besked
        </FieldLabel>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(state.fieldErrors?.message)}
          className={textareaClass}
        />
        {state.fieldErrors?.message && (
          <FieldError>{state.fieldErrors.message}</FieldError>
        )}
      </div>

      {state.status === "error" && state.message && !state.fieldErrors && (
        <p className="text-sm text-nooni-headline">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-nooni-headline px-7 py-3.5 text-sm text-white transition-colors hover:bg-[#9d6f6f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sender…" : "Send besked"}
        {!pending && <span aria-hidden>→</span>}
      </button>
    </form>
  );
}

interface FieldProps {
  name: "name" | "email" | "subject";
  label: string;
  type?: "text" | "email";
  required?: boolean;
  autoComplete?: string;
  error?: string;
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  error,
}: FieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={inputClass}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs uppercase tracking-[0.2em] text-nooni-sub"
    >
      {children}
      {required && <span aria-hidden> *</span>}
    </label>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-nooni-headline">{children}</p>;
}
