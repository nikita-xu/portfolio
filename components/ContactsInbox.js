"use client";

import { useCallback, useEffect, useState } from "react";
import AdminGate from "@/components/AdminGate";

function ContactsInboxTools({ token }) {
  const [state, setState] = useState({ status: "loading" });
  const [errors, setErrors] = useState({});

  const load = useCallback(() => {
    let response;

    return Promise.resolve()
      .then(() => {
        response = fetch("/api/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response;
      })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setState({ status: "failed", message: data.errors?.form ?? "Could not load the inbox." });
          return;
        }

        setState({ status: "loaded", submissions: data.submissions });
      })
      .catch(() => {
        setState({ status: "failed", message: "Could not reach the server. Please try again." });
      });
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  function retry() {
    setState({ status: "loading" });
    load();
  }

  function handleFailure(result) {
    setErrors(result.errors);

    if (result.status === 401) {
      window.sessionStorage.removeItem("admin-token");
      window.location.reload();
    }
  }

  async function toggleRead(submission) {
    setErrors({});

    const result = await fetch(`/api/contacts/${submission.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ read: !submission.read }),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          return { ok: false, status: response.status, errors: data.errors ?? {} };
        }

        return { ok: true };
      })
      .catch(() => ({ ok: false, errors: { form: "Could not reach the server. Please try again." } }));

    if (result.ok) {
      await load();
    } else {
      handleFailure(result);
    }
  }

  async function handleDelete(submission) {
    if (!window.confirm(`Delete the message from ${submission.name}?`)) return;
    setErrors({});

    const result = await fetch(`/api/contacts/${submission.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          return { ok: false, status: response.status, errors: data.errors ?? {} };
        }

        return { ok: true };
      })
      .catch(() => ({ ok: false, errors: { form: "Could not reach the server. Please try again." } }));

    if (result.ok) {
      await load();
    } else {
      handleFailure(result);
    }
  }

  return (
    <section className="detail-section">
      <h2>Messages</h2>
      {state.status === "loading" && <p className="page-intro">Loading messages…</p>}
      {state.status === "failed" && (
        <div className="load-error">
          <p className="field-error">{state.message}</p>
          <button type="button" className="button button-secondary" onClick={retry}>
            Try again
          </button>
        </div>
      )}
      {state.status === "loaded" && state.submissions.length === 0 && (
        <p className="page-intro">No contact submissions yet.</p>
      )}
      {state.status === "loaded" && state.submissions.length > 0 && (
        <div className="admin-list">
          {state.submissions.map((submission) => (
            <div key={submission.id} className="admin-item">
              <div>
                <h3>
                  {submission.name}{" "}
                  <span className={submission.read ? "tag" : "tag tag-unread"}>
                    {submission.read ? "read" : "unread"}
                  </span>
                </h3>
                <p>
                  <a href={`mailto:${submission.email}`} className="text-link">
                    {submission.email}
                  </a>
                </p>
                <p className="admin-message">{submission.message}</p>
                <p className="post-date">{submission.submittedAt}</p>
              </div>
              <div className="admin-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => toggleRead(submission)}
                >
                  {submission.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  type="button"
                  className="button button-danger"
                  onClick={() => handleDelete(submission)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ContactsInbox() {
  return <AdminGate>{(token) => <ContactsInboxTools token={token} />}</AdminGate>;
}
