import BlogManager from "@/components/BlogManager";

export const metadata = {
  title: "Blog Manager",
};

export default function BlogManagerPage() {
  return (
    <section>
      <h1 className="page-title">Blog Manager</h1>
      <BlogManager />
    </section>
  );
}
