"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/AdminGate";
import { createProject, deleteProject, fetchProjects, updateProject } from "@/lib/projects-api";

const EMPTY_FORM = {
  title: "",
  context: "",
  shortDescription: "",
  summaryText: "",
  contributionText: "",
  toolsText: "",
  learningsText: "",
  githubUrl: "",
};

function entryToForm(entry) {
  return {
    title: entry.title,
    context: entry.context ?? "",
    shortDescription: entry.shortDescription,
    summaryText: (entry.summary ?? []).join("\n"),
    contributionText: (entry.contribution ?? []).join("\n"),
    toolsText: (entry.tools ?? []).join(", "),
    learningsText: (entry.learnings ?? []).join("\n"),
    githubUrl: entry.githubUrl ?? "",
  };
}

function formToValues(form, original) {
  const splitLines = (text) =>
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  const splitList = (text) =>
    text
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

  return {
    title: form.title,
    context: form.context,
    shortDescription: form.shortDescription,
    summary: splitLines(form.summaryText),
    contribution: splitLines(form.contributionText),
    tools: splitList(form.toolsText),
    learnings: splitLines(form.learningsText),
    githubUrl: form.githubUrl.trim(),
    contributionHeading: original?.contributionHeading ?? "",
    toolsHeading: original?.toolsHeading ?? "",
    heroImages: original?.heroImages ?? [],
    galleries: original?.galleries ?? [],
  };
}

function ProjectsManagerTools({ token }) {
  const [state, setState] = useState({ status: "loading" });
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingSlug, setEditingSlug] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const load = useCallback(() => {
    return fetchProjects().then((result) => {
      if (result.ok) {
        setState({ status: "loaded", projects: result.projects });
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
    setEditingSlug(entry.slug);
    setEditingEntry(entry);
    setForm(entryToForm(entry));
    setMessage("");
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingSlug(null);
    setEditingEntry(null);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setErrors({});

    const values = formToValues(form, editingEntry);
    const result =
      editingSlug === null
        ? await createProject(values, token)
        : await updateProject(editingSlug, values, token);

    if (result.ok) {
      setForm(EMPTY_FORM);
      setMessage(editingSlug === null ? "Project published!" : "Project updated!");
      setEditingSlug(null);
      setEditingEntry(null);
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

  async function handleDelete(slug) {
    if (!window.confirm("Delete this project?")) return;
    setErrors({});

    const result = await deleteProject(slug, token);

    if (result.ok) {
      if (editingSlug === slug) {
        cancelEdit();
      }
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

  return (
    <>
      <form className="contact-form admin-form" onSubmit={handleSubmit} noValidate>
        {message && <p className="form-success">{message}</p>}

        {errors.form && <p className="field-error">{errors.form}</p>}

        <div className="field">
          <label htmlFor="project-title">Title</label>
          <input
            id="project-title"
            name="title"
            type="text"
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            className={errors.title ? "input-invalid" : ""}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="project-context">Context (optional)</label>
          <input
            id="project-context"
            name="context"
            type="text"
            value={form.context}
            onChange={(event) => update("context", event.target.value)}
            placeholder="Industry Practicum — Uber · Procurement Analytics"
            className={errors.context ? "input-invalid" : ""}
          />
          {errors.context && <p className="field-error">{errors.context}</p>}
        </div>

        <div className="field">
          <label htmlFor="project-short-description">Short description</label>
          <input
            id="project-short-description"
            name="shortDescription"
            type="text"
            value={form.shortDescription}
            onChange={(event) => update("shortDescription", event.target.value)}
            className={errors.shortDescription ? "input-invalid" : ""}
          />
          {errors.shortDescription && (
            <p className="field-error">{errors.shortDescription}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="project-summary">Summary (one paragraph per line)</label>
          <textarea
            id="project-summary"
            name="summary"
            rows={4}
            value={form.summaryText}
            onChange={(event) => update("summaryText", event.target.value)}
            className={errors.summary ? "input-invalid" : ""}
          />
          {errors.summary && <p className="field-error">{errors.summary}</p>}
        </div>

        <div className="field">
          <label htmlFor="project-contribution">My contribution (one paragraph per line, optional)</label>
          <textarea
            id="project-contribution"
            name="contribution"
            rows={3}
            value={form.contributionText}
            onChange={(event) => update("contributionText", event.target.value)}
            className={errors.contribution ? "input-invalid" : ""}
          />
          {errors.contribution && <p className="field-error">{errors.contribution}</p>}
        </div>

        <div className="field">
          <label htmlFor="project-tools">Tools (comma-separated, optional)</label>
          <input
            id="project-tools"
            name="tools"
            type="text"
            value={form.toolsText}
            onChange={(event) => update("toolsText", event.target.value)}
            className={errors.tools ? "input-invalid" : ""}
          />
          {errors.tools && <p className="field-error">{errors.tools}</p>}
        </div>

        <div className="field">
          <label htmlFor="project-learnings">What I learned (one paragraph per line, optional)</label>
          <textarea
            id="project-learnings"
            name="learnings"
            rows={3}
            value={form.learningsText}
            onChange={(event) => update("learningsText", event.target.value)}
            className={errors.learnings ? "input-invalid" : ""}
          />
          {errors.learnings && <p className="field-error">{errors.learnings}</p>}
        </div>

        <div className="field">
          <label htmlFor="project-github-url">GitHub URL (optional)</label>
          <input
            id="project-github-url"
            name="githubUrl"
            type="text"
            value={form.githubUrl}
            onChange={(event) => update("githubUrl", event.target.value)}
            placeholder="https://github.com/..."
            className={errors.githubUrl ? "input-invalid" : ""}
          />
          {errors.githubUrl && <p className="field-error">{errors.githubUrl}</p>}
        </div>

        {editingEntry && (editingEntry.heroImages?.length > 0 || editingEntry.galleries?.length > 0) && (
          <p className="page-intro">
            Photos for this project are managed in data/projects.json and are kept
            unchanged when you save.
          </p>
        )}

        <button type="submit" className="button" disabled={isSaving}>
          {isSaving ? "Saving..." : editingSlug === null ? "Publish Project" : "Save Changes"}
        </button>

        {editingSlug !== null && (
          <button type="button" className="button button-secondary" onClick={cancelEdit}>
            Cancel edit
          </button>
        )}
      </form>

      <section className="detail-section">
        <h2>Published projects</h2>
        {state.status === "loading" && <p className="page-intro">Loading projects…</p>}
        {state.status === "failed" && (
          <div className="load-error">
            <p className="field-error">{state.message}</p>
            <button type="button" className="button button-secondary" onClick={retry}>
              Try again
            </button>
          </div>
        )}
        {state.status === "loaded" && state.projects.length === 0 && (
          <p className="page-intro">No projects yet.</p>
        )}
        {state.status === "loaded" && state.projects.length > 0 && (
          <div className="admin-list">
            {state.projects.map((project) => (
              <div key={project.slug} className="admin-item">
                <div>
                  <h3>
                    <Link href={`/projects/${project.slug}`} className="text-link">
                      {project.title}
                    </Link>
                  </h3>
                  <p>/projects/{project.slug}</p>
                </div>
                <div className="admin-actions">
                  <button type="button" className="button button-secondary" onClick={() => startEdit(project)}>
                    Edit
                  </button>
                  <button type="button" className="button button-danger" onClick={() => handleDelete(project.slug)}>
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

export default function ProjectsManager() {
  return <AdminGate>{(token) => <ProjectsManagerTools token={token} />}</AdminGate>;
}
