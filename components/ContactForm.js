"use client";

import { useCallback, useEffect, useState } from "react";
import { useActionState } from "react";
import { saveContact } from "@/app/contact-me-server-form/actions";
import { loadContactDraft, saveContactDraft } from "@/lib/contact-draft";

const initialState = { status: "idle" };

const emptyValues = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(emptyValues);

  useEffect(() => {
    let active = true;

    loadContactDraft("server").then((draft) => {
      if (active) {
        setValues(draft);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const handleSave = useCallback(async (prevState, formData) => {
    const result = await saveContact(prevState, formData);

    if (result.status === "success") {
      setValues(emptyValues);
      saveContactDraft("server", emptyValues);
    }

    return result;
  }, []);

  const [state, formAction, isPending] = useActionState(handleSave, initialState);

  function update(field, event) {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    saveContactDraft("server", next);
  }

  const errors = state.status === "error" ? state.errors : {};

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
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => update("name", event)}
          className={errors.name ? "input-invalid" : ""}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => update("email", event)}
          className={errors.email ? "input-invalid" : ""}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(event) => update("message", event)}
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
