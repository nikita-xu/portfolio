"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchBlogPost } from "@/lib/blog-api";
import { formatBlogDateTime } from "@/lib/blog-format";

export default function BlogPost() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading" });

  const load = useCallback(() => {
    fetchBlogPost(slug).then((result) => {
      if (result.ok) {
        setState({ status: "loaded", post: result.post });
      } else {
        setState({ status: "failed", message: result.message });
      }
    });
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  function retry() {
    setState({ status: "loading" });
    load();
  }

  if (state.status === "loading") {
    return <p className="page-intro">Loading post…</p>;
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

  if (state.post === null) {
    return (
      <section className="content">
        <h1 className="page-title">Blog post not found</h1>
        <p className="page-intro">
          The blog post you are looking for does not exist.
        </p>
        <Link href="/blogs" className="button">
          Back to all posts
        </Link>
      </section>
    );
  }

  return (
    <article className="content">
      <Link href="/blogs" className="back-link">
        &larr; Back to all posts
      </Link>
      <h1 className="page-title">{state.post.title}</h1>
      <p className="post-date">{formatBlogDateTime(state.post.createdAt)}</p>
      <div className="post-content">
        {state.post.content.split(/\n+/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
