"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/AdminGate";
import { clearDraft, loadDraft, saveDraft } from "@/lib/draft-storage";
import { createBlogPost, deleteBlogPost, fetchBlogs, updateBlogPost } from "@/lib/blog-api";

const DRAFT_KEY = "admin-blog";

function BlogManagerTools({ token }) {
  const [state, setState] = useState({ status: "loading" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingSlug, setEditingSlug] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const load = useCallback(() => {
    return fetchBlogs().then((result) => {
      if (result.ok) {
        setState({ status: "loaded", posts: result.blogs });
      } else {
        setState({ status: "failed", message: result.message });
      }
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const hydrated = useRef(false);

  useEffect(() => {
    loadDraft(DRAFT_KEY).then((draft) => {
      if (draft) {
        setTitle(typeof draft.title === "string" ? draft.title : "");
        setContent(typeof draft.content === "string" ? draft.content : "");
        setEditingSlug(typeof draft.editingSlug === "string" ? draft.editingSlug : null);
      }
      hydrated.current = true;
    });
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveDraft(DRAFT_KEY, { title, content, editingSlug });
  }, [title, content, editingSlug]);

  function retry() {
    setState({ status: "loading" });
    load();
  }

  function startEdit(post) {
    setEditingSlug(post.slug);
    setTitle(post.title);
    setContent(post.content);
    setMessage("");
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingSlug(null);
    setTitle("");
    setContent("");
    setErrors({});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setErrors({});

    const values = { title, content };
    const result = editingSlug === null
      ? await createBlogPost(values, token)
      : await updateBlogPost(editingSlug, values, token);

    if (result.ok) {
      setTitle("");
      setContent("");
      setMessage(editingSlug === null ? "Blog post published!" : "Blog post updated!");
      setEditingSlug(null);
      clearDraft(DRAFT_KEY);
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
    if (!window.confirm("Delete this blog post?")) return;
    setErrors({});

    const result = await deleteBlogPost(slug, token);

    if (result.ok) {
      if (editingSlug === slug) {
        setEditingSlug(null);
        setTitle("");
        setContent("");
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
        {message && <p className="form-success">{message}</p>}

        {errors.form && <p className="field-error">{errors.form}</p>}

        <div className="field">
          <label htmlFor="blog-title">Title</label>
          <input
            id="blog-title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={errors.title ? "input-invalid" : ""}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="blog-content">Content</label>
          <textarea
            id="blog-content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className={errors.content ? "input-invalid" : ""}
          />
          {errors.content && <p className="field-error">{errors.content}</p>}
        </div>

        <button type="submit" className="button" disabled={isSaving}>
          {isSaving ? "Saving..." : editingSlug === null ? "Publish Post" : "Save Changes"}
        </button>

        {editingSlug !== null && (
          <button type="button" className="button button-secondary" onClick={cancelEdit}>
            Cancel edit
          </button>
        )}
      </form>

      <section className="detail-section">
        <h2>Published posts</h2>
        {state.status === "loading" && <p className="page-intro">Loading posts…</p>}
        {state.status === "failed" && (
          <div className="load-error">
            <p className="field-error">{state.message}</p>
            <button type="button" className="button button-secondary" onClick={retry}>
              Try again
            </button>
          </div>
        )}
        {state.status === "loaded" && state.posts.length === 0 && (
          <p className="page-intro">No blog posts yet.</p>
        )}
        {state.status === "loaded" && state.posts.length > 0 && (
          <div className="admin-list">
            {state.posts.map((post) => (
              <div key={post.slug} className="admin-item">
                <div>
                  <h3>
                    <Link href={`/blogs/${post.slug}`} className="text-link">
                      {post.title}
                    </Link>
                  </h3>
                  <p>/blogs/{post.slug}</p>
                </div>
                <div className="admin-actions">
                  <button type="button" className="button button-secondary" onClick={() => startEdit(post)}>
                    Edit
                  </button>
                  <button type="button" className="button button-danger" onClick={() => handleDelete(post.slug)}>
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

export default function BlogManager() {
  return <AdminGate>{(token) => <BlogManagerTools token={token} />}</AdminGate>;
}
