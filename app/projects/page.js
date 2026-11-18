import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { listProjects } from "@/lib/projects";

export const metadata = {
  title: "My Projects",
};

async function ProjectsGrid() {
  await connection();
  const result = await listProjects();

  if (!result.ok) {
    return (
      <div className="load-error">
        <p className="field-error">{result.message}</p>
      </div>
    );
  }

  if (result.projects.length === 0) {
    return <p className="page-intro">No projects yet.</p>;
  }

  return (
    <div className="card-grid folder-grid">
      {result.projects.map((project) => (
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
  );
}

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="page-title">My Projects</h1>
      <p className="page-intro">
        A collection of projects I have built. Click one to see the details.
      </p>
      <Suspense fallback={<p className="page-intro">Loading projects…</p>}>
        <ProjectsGrid />
      </Suspense>
    </section>
  );
}
