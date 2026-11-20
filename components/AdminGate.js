"use client";

import { useEffect, useState } from "react";

export default function AdminGate({ children }) {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.resolve().then(() => {
      const stored = window.sessionStorage.getItem("admin-token");

      if (stored) {
        setToken(stored);
      }

      setReady(true);
    });
  }, []);

  if (!ready) {
    return null;
  }

  if (token) {
    return (
      <>
        {typeof children === "function" ? children(token) : children}
        <form
          className="admin-lock"
          onSubmit={(event) => {
            event.preventDefault();
            window.sessionStorage.removeItem("admin-token");
            setToken(null);
          }}
        >
          <button type="submit" className="button button-secondary">
            Lock admin tools
          </button>
        </form>
      </>
    );
  }

  return (
    <form
      className="contact-form admin-form"
      onSubmit={(event) => {
        event.preventDefault();

        if (!draft.trim()) {
          setError("Please enter the admin token.");
          return;
        }

        setError("");
        setToken(draft.trim());
        window.sessionStorage.setItem("admin-token", draft.trim());
      }}
      noValidate
    >
      <p className="page-intro">
        This tool changes live site data, so it needs the server&apos;s admin
        token. The token is the ADMIN_TOKEN value from the server environment —
        it is checked on every save and never stored on the site itself.
      </p>

      {error && <p className="field-error">{error}</p>}

      <div className="field">
        <label htmlFor="admin-token">Admin token</label>
        <input
          id="admin-token"
          type="password"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Paste the ADMIN_TOKEN value"
        />
      </div>

      <button type="submit" className="button">
        Unlock admin tools
      </button>
    </form>
  );
}
