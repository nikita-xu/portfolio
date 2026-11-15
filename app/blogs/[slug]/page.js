import { Suspense } from "react";
import BlogPost from "@/components/BlogPost";

export const metadata = {
  title: "Blog Post",
};

export default function BlogPostPage() {
  return (
    <Suspense fallback={<p className="page-intro">Loading post…</p>}>
      <BlogPost />
    </Suspense>
  );
}
