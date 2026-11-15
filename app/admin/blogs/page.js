import BlogManager from "@/components/BlogManager";

export const metadata = {
  title: "Blog Manager",
};

export default function BlogManagerPage() {
  return (
    <section>
      <h1 className="page-title">Blog Manager</h1>
      <p className="page-intro">
        Create and manage your blog posts. Everything published here appears on
        the Blog page immediately.
      </p>
      <BlogManager />
    </section>
  );
}
