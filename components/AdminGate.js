"use client";

import { useEffect, useState } from "react";

export default function AdminGate({ children }) {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  function verifyToken(candidate) {
    return fetch("/api/admin/verify", {
      headers: { Authorization: `Bearer ${candidate}` },
    }).then((response) => response.ok);
  }

  useEffect(() => {
    let cancelled = false;

    Promise.resolve().then(async () => {
      const stored = window.sessionStorage.getItem("admin-token");

      if (stored) {
        const valid = await verifyToken(stored);

        if (cancelled) return;

        if (valid) {
          setToken(stored);
        } else {
          window.sessionStorage.removeItem("admin-token");
        }
      }

      if (!cancelled) {
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function unlock(event) {
    event.preventDefault();

    const candidate = draft.trim();

    if (!candidate) {
      setError("Please enter the admin token.");
      return;
    }

    setError("");
    setChecking(true);

    try {
      const valid = await verifyToken(candidate);

      if (valid) {
        setToken(candidate);
        window.sessionStorage.setItem("admin-token", candidate);
      } else {
        setError("Invalid admin token.");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setChecking(false);
    }
  }

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
        unlock(event);
      }}
      noValidate
    >
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

      <button type="submit" className="button" disabled={checking}>
        {checking ? "Checking..." : "Unlock admin tools"}
      </button>
    </form>
  );
}
