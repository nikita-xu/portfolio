import BlogList from "@/components/BlogList";

export const metadata = {
  title: "Blog",
};

export default function BlogsPage() {
  return (
    <section>
      <h1 className="page-title">Blog</h1>
      <BlogList />
    </section>
  );
}
