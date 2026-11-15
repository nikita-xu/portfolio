"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogs } from "@/lib/blog-api";
import { formatBlogDate, formatBlogPreview } from "@/lib/blog-format";

export default function BlogList() {
  const [state, setState] = useState({ status: "loading" });

  const load = useCallback(() => {
    fetchBlogs().then((result) => {
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

  if (state.status === "loading") {
    return <p className="page-intro">Loading posts…</p>;
  }

  if (state.status === "failed") {
    return (
      <div className="load-error">
        <p className="field-error">{state.message}</p>
        <button type="button" className="button button-secondary" onClick={retry}>
          Try again
        </button>
      </div>
    );
  }

  if (state.posts.length === 0) {
    return (
      <p className="page-intro">
        No blog posts yet. Create the first one in the admin area.
      </p>
    );
  }

  return (
    <div className="card-grid">
      {state.posts.map((post) => (
        <article key={post.slug} className="card blog-card">
          <h2 className="blog-card-title">
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="blog-card-date">{formatBlogDate(post.createdAt)}</p>
          <p className="blog-card-preview">{formatBlogPreview(post.content)}</p>
          <Link href={`/blogs/${post.slug}`} className="blog-card-link">
            Read more &rarr;
          </Link>
        </article>
      ))}
    </div>
  );
}
