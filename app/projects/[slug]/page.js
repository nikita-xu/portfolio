import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Image from "next/image";
import { getProject } from "@/lib/projects";

async function ProjectArticle({ params }) {
  await connection();
  const { slug } = await params;
  const result = await getProject(slug);
  const project = result.ok ? result.project : null;

  if (!project) {
    return (
      <section className="content">
        <h1 className="page-title">Project not found</h1>
        <p className="page-intro">
          We couldn&apos;t find a project at this address. It may have been
          renamed or removed.
        </p>
        <Link href="/projects" className="button">
          Back to all projects
        </Link>
      </section>
    );
  }

  return (
    <article className="content">
      <Link href="/projects" className="back-link">
        &larr; Back to all projects
      </Link>
      <h1 className="page-title">{project.title}</h1>
      {project.context && <p className="project-context">{project.context}</p>}

      {project.heroImages && project.heroImages.length > 0 && (
        <div className="image-grid">
          {project.heroImages.map((image) => (
            <figure key={image.src} className="image-card">
              <Image
                src={image.src}
                alt={image.caption || project.title}
                width={image.width}
                height={image.height}
                className="gallery-image"
              />
              {image.caption && (
                <figcaption className="image-caption">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <section className="detail-section">
        <h2>Overview</h2>
        {project.summary.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      {project.contribution && project.contribution.length > 0 && (
        <section className="detail-section">
          <h2>{project.contributionHeading || "My Contribution"}</h2>
          {project.contribution.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      )}

      {project.tools && project.tools.length > 0 && (
        <section className="detail-section">
          <h2>{project.toolsHeading || "Tools Used"}</h2>
          <div className="tag-row">
            {project.tools.map((tool) => (
              <span key={tool} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.learnings && project.learnings.length > 0 && (
        <section className="detail-section">
          <h2>What I Learned</h2>
          {project.learnings.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      )}

      {project.galleries &&
        project.galleries.map((gallery) => (
          <section key={gallery.heading} className="detail-section">
            <h2>{gallery.heading}</h2>
            {gallery.stat && <p className="stat-highlight">{gallery.stat}</p>}
            <div className="image-grid">
              {gallery.images.map((image) => (
                <figure key={image.src} className="image-card">
                  <Image
                    src={image.src}
                    alt={image.caption || gallery.heading}
                    width={image.width}
                    height={image.height}
                    className="gallery-image"
                  />
                  {image.caption && (
                    <figcaption className="image-caption">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        ))}

      {project.githubUrl && (
        <div className="project-link-row">
          <a
            className="button"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      )}
    </article>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getProject(slug);

  return {
    title: result.ok && result.project ? result.project.title : "Project Not Found",
  };
}

export default function ProjectPage({ params }) {
  return (
    <Suspense fallback={<p className="page-intro">Loading project…</p>}>
      <ProjectArticle params={params} />
    </Suspense>
  );
}
