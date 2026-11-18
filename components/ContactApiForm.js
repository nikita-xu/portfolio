"use client";

import { useEffect, useState } from "react";
import { loadContactDraft, saveContactDraft } from "@/lib/contact-draft";

const emptyValues = { name: "", email: "", message: "" };

export default function ContactApiForm() {
  const [values, setValues] = useState(emptyValues);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let active = true;

    loadContactDraft("api").then((draft) => {
      if (active) {
        setValues(draft);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  function update(field, event) {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    saveContactDraft("api", next);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);
    setIsSent(false);
    setErrors({});

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        setIsSent(true);
        setValues(emptyValues);
        saveContactDraft("api", emptyValues);
      } else {
        setErrors(data.errors || {});
      }
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {isSent && (
        <p className="form-success">
          Your message has been sent through the API. Thank you, I will get back
          to you soon!
        </p>
      )}

      {errors.form && <p className="field-error">{errors.form}</p>}

      <div className="field">
        <label htmlFor="api-name">Name</label>
        <input
          id="api-name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => update("name", event)}
          className={errors.name ? "input-invalid" : ""}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="api-email">Email</label>
        <input
          id="api-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => update("email", event)}
          className={errors.email ? "input-invalid" : ""}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="api-message">Message</label>
        <textarea
          id="api-message"
          name="message"
          value={values.message}
          onChange={(event) => update("message", event)}
          className={errors.message ? "input-invalid" : ""}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      <button type="submit" className="button" disabled={isSending}>
        {isSending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
