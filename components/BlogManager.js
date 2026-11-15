"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createBlogPost, deleteBlogPost, fetchBlogs } from "@/lib/blog-api";

export default function BlogManager() {
  const [state, setState] = useState({ status: "loading" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [published, setPublished] = useState(false);
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

  function retry() {
    setState({ status: "loading" });
    load();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setPublished(false);
    setErrors({});

    const result = await createBlogPost({ title, content });

    if (result.ok) {
      setTitle("");
      setContent("");
      setPublished(true);
      await load();
    } else {
      setErrors(result.errors);
    }

    setIsSaving(false);
  }

  async function handleDelete(slug) {
    if (!window.confirm("Delete this blog post?")) return;
    setErrors({});

    const result = await deleteBlogPost(slug);

    if (result.ok) {
      await load();
    } else {
      setErrors(result.errors);
    }
  }

  return (
    <>
      <form className="contact-form admin-form" onSubmit={handleSubmit} noValidate>
        {published && (
          <p className="form-success">Blog post published!</p>
        )}

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
          {isSaving ? "Publishing..." : "Publish Post"}
        </button>
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
                <button
                  type="button"
                  className="button button-danger"
                  onClick={() => handleDelete(post.slug)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
