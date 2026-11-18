"use client";

import { useCallback, useEffect, useState } from "react";
import AdminGate from "@/components/AdminGate";
import ExperienceCard from "@/components/ExperienceCard";
import {
  createExperience,
  deleteExperience,
  fetchExperiences,
  updateExperience,
} from "@/lib/experience-api";

const emptyForm = {
  role: "",
  organization: "",
  location: "",
  category: "Work",
  startDate: "",
  endDate: "",
  current: false,
  summary: "",
  highlightsText: "",
  skillsText: "",
  image: "",
};

function formToValues(form) {
  return {
    role: form.role,
    organization: form.organization,
    location: form.location,
    category: form.category,
    startDate: form.startDate,
    endDate: form.current ? "Present" : form.endDate,
    summary: form.summary,
    highlights: form.highlightsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    skills: form.skillsText
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean),
    image: form.image,
  };
}

function entryToForm(entry) {
  return {
    role: entry.role,
    organization: entry.organization,
    location: entry.location ?? "",
    category: entry.category,
    startDate: entry.startDate,
    endDate: entry.endDate === "Present" ? "" : entry.endDate,
    current: entry.endDate === "Present",
    summary: entry.summary,
    highlightsText: (entry.highlights ?? []).join("\n"),
    skillsText: (entry.skills ?? []).join(", "),
    image: entry.image ?? "",
  };
}

function ExperienceManagerTools({ token }) {
  const [state, setState] = useState({ status: "loading" });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const [errors, setErrors] = useState({});

  const load = useCallback(() => {
    return fetchExperiences().then((result) => {
      if (result.ok) {
        const entries = [...result.experiences].sort(
          (a, b) => b.startDate.localeCompare(a.startDate) || b.id - a.id
        );
        setState({ status: "loaded", entries });
      } else {
        setState({ status: "failed", message: result.message });
      }
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function retry() {
    setState({ status: "loading" });
    load();
  }

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startEdit(entry) {
    setEditingId(entry.id);
    setForm(entryToForm(entry));
    setSaved("");
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setSaved("");
    setErrors({});

    const values = formToValues(form);
    const result = editingId === null
      ? await createExperience(values, token)
      : await updateExperience(editingId, values, token);

    if (result.ok) {
      setSaved(editingId === null ? "Experience added." : "Experience updated.");
      setEditingId(null);
      setForm(emptyForm);
      await load();
    } else {
      setErrors(result.errors);

      if (result.status === 401) {
        window.sessionStorage.removeItem("admin-token");
        window.location.reload();
      }
    }

    setIsSaving(false);
  }

  async function handleDelete(entry) {
    if (!window.confirm(`Delete "${entry.role} at ${entry.organization}"?`)) return;
    setErrors({});

    const result = await deleteExperience(entry.id, token);

    if (result.ok) {
      if (editingId === entry.id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      await load();
    } else {
      setErrors(result.errors);

      if (result.status === 401) {
        window.sessionStorage.removeItem("admin-token");
        window.location.reload();
      }
    }
  }

  return (
    <>
      <form className="contact-form admin-form" onSubmit={handleSubmit} noValidate>
        {saved && <p className="form-success">{saved}</p>}

        {errors.form && <p className="field-error">{errors.form}</p>}

        <div className="field">
          <label htmlFor="experience-role">Role</label>
          <input
            id="experience-role"
            type="text"
            value={form.role}
            onChange={(event) => update("role", event.target.value)}
            className={errors.role ? "input-invalid" : ""}
          />
          {errors.role && <p className="field-error">{errors.role}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-organization">Organization</label>
          <input
            id="experience-organization"
            type="text"
            value={form.organization}
            onChange={(event) => update("organization", event.target.value)}
            className={errors.organization ? "input-invalid" : ""}
          />
          {errors.organization && <p className="field-error">{errors.organization}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-location">Location (optional)</label>
          <input
            id="experience-location"
            type="text"
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            className={errors.location ? "input-invalid" : ""}
          />
          {errors.location && <p className="field-error">{errors.location}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-category">Category</label>
          <input
            id="experience-category"
            type="text"
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            className={errors.category ? "input-invalid" : ""}
          />
          {errors.category && <p className="field-error">{errors.category}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-start">Start date (YYYY-MM)</label>
          <input
            id="experience-start"
            type="month"
            value={form.startDate}
            onChange={(event) => update("startDate", event.target.value)}
            className={errors.startDate ? "input-invalid" : ""}
          />
          {errors.startDate && <p className="field-error">{errors.startDate}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-end">End date (YYYY-MM)</label>
          <input
            id="experience-end"
            type="month"
            value={form.current ? "" : form.endDate}
            onChange={(event) => update("endDate", event.target.value)}
            disabled={form.current}
            className={errors.endDate && !form.current ? "input-invalid" : ""}
          />
          {errors.endDate && <p className="field-error">{errors.endDate}</p>}
          <label className="experience-current">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(event) => {
                setForm((current) => ({
                  ...current,
                  current: event.target.checked,
                  endDate: event.target.checked ? "Present" : current.endDate,
                }));
              }}
            />
            This is my current role
          </label>
        </div>

        <div className="field">
          <label htmlFor="experience-summary">Summary (optional)</label>
          <textarea
            id="experience-summary"
            value={form.summary}
            onChange={(event) => update("summary", event.target.value)}
            className={errors.summary ? "input-invalid" : ""}
          />
          {errors.summary && <p className="field-error">{errors.summary}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-highlights">Highlights (one per line, optional)</label>
          <textarea
            id="experience-highlights"
            value={form.highlightsText}
            onChange={(event) => update("highlightsText", event.target.value)}
            className={errors.highlights ? "input-invalid" : ""}
          />
          {errors.highlights && <p className="field-error">{errors.highlights}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-skills">Skill slugs (comma-separated, optional)</label>
          <input
            id="experience-skills"
            type="text"
            value={form.skillsText}
            onChange={(event) => update("skillsText", event.target.value)}
            placeholder="photo-video, adobe-creative-cloud"
            className={errors.skills ? "input-invalid" : ""}
          />
          {errors.skills && <p className="field-error">{errors.skills}</p>}
        </div>

        <div className="field">
          <label htmlFor="experience-image">Image path or URL (optional)</label>
          <input
            id="experience-image"
            type="text"
            value={form.image}
            onChange={(event) => update("image", event.target.value)}
            placeholder="/images/about/... or https://..."
            className={errors.image ? "input-invalid" : ""}
          />
          {errors.image && <p className="field-error">{errors.image}</p>}
        </div>

        <button type="submit" className="button" disabled={isSaving}>
          {isSaving ? "Saving..." : editingId === null ? "Add Experience" : "Save Changes"}
        </button>

        {editingId !== null && (
          <button type="button" className="button button-secondary" onClick={cancelEdit}>
            Cancel edit
          </button>
        )}
      </form>

      <section className="detail-section">
        <h2>Experience entries</h2>
        {state.status === "loading" && <p className="page-intro">Loading entries…</p>}
        {state.status === "failed" && (
          <div className="load-error">
            <p className="field-error">{state.message}</p>
            <button type="button" className="button button-secondary" onClick={retry}>
              Try again
            </button>
          </div>
        )}
        {state.status === "loaded" && state.entries.length === 0 && (
          <p className="page-intro">No experience entries yet.</p>
        )}
        {state.status === "loaded" && state.entries.length > 0 && (
          <div className="admin-list">
            {state.entries.map((entry) => (
              <div key={entry.id} className="admin-item admin-item-managed">
                <ExperienceCard entry={entry} />
                <div className="admin-actions">
                  <button type="button" className="button button-secondary" onClick={() => startEdit(entry)}>
                    Edit
                  </button>
                  <button type="button" className="button button-danger" onClick={() => handleDelete(entry)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function ExperienceManager() {
  return <AdminGate>{(token) => <ExperienceManagerTools token={token} />}</AdminGate>;
}
