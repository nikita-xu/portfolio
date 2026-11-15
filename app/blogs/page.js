import BlogList from "@/components/BlogList";

export const metadata = {
  title: "Blog",
};

export default function BlogsPage() {
  return (
    <section>
      <h1 className="page-title">Blog</h1>
      <p className="page-intro">
        Thoughts, notes, and write-ups — loaded live from the blog API.
      </p>
      <BlogList />
    </section>
  );
}
