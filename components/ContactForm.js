"use client";

import { useActionState } from "react";
import { saveContact } from "@/app/contact-me-server-form/actions";

const initialState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(saveContact, initialState);

  const errors = state.status === "error" ? state.errors : {};
  const fieldKey = state.clearedAt ?? "new";

  return (
    <form className="contact-form" action={formAction} noValidate>
      {state.status === "success" && (
        <p className="form-success">
          Your message has been sent. Thank you, I will get back to you soon!
        </p>
      )}

      {errors.form && <p className="field-error">{errors.form}</p>}

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          key={`name-${fieldKey}`}
          id="name"
          name="name"
          type="text"
          className={errors.name ? "input-invalid" : ""}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          key={`email-${fieldKey}`}
          id="email"
          name="email"
          type="email"
          className={errors.email ? "input-invalid" : ""}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          key={`message-${fieldKey}`}
          id="message"
          name="message"
          className={errors.message ? "input-invalid" : ""}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      <button type="submit" className="button" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
