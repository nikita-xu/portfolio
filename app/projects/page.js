import Link from "next/link";
import projects from "@/data/projects";

export const metadata = {
  title: "My Projects",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="page-title">My Projects</h1>
      <p className="page-intro">
        A collection of projects I have built. Click one to see the details.
      </p>
      <div className="card-grid folder-grid">
        {projects.map((project) => (
          <article key={project.slug} className="card">
            <p className="card-context">{project.context}</p>
            <h2>{project.title}</h2>
            <p>{project.shortDescription}</p>
            <Link href={`/projects/${project.slug}`} className="card-link">
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
