import Link from "next/link";
import Image from "next/image";
import skills from "@/data/skills";
import projects from "@/data/projects.json";

const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project])
);

export function generateStaticParams() {
  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const skill = skills.find((item) => item.slug === slug);

  return {
    title: skill ? skill.title : "Skill Not Found",
  };
}

export default async function SkillPage({ params }) {
  const { slug } = await params;
  const skill = skills.find((item) => item.slug === slug);

  if (!skill) {
    return (
      <section className="content">
        <h1 className="page-title">Skill not found</h1>
        <p className="page-intro">
          We couldn&apos;t find a skill at this address. It may have been
          renamed or removed.
        </p>
        <Link href="/skills" className="button">
          Back to Skills
        </Link>
      </section>
    );
  }

  return (
    <article className="content">
      <Link href="/skills" className="back-link">
        &larr; Back to Skills
      </Link>
      <h1 className="page-title">{skill.title}</h1>

      <section className="detail-section">
        {skill.summary.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      {skill.tools && skill.tools.length > 0 && (
        <section className="detail-section">
          <h2>Tools &amp; related projects</h2>
          <ul className="skill-tool-list">
            {skill.tools.map((tool) => {
              const slugs = skill.toolProjects?.[tool] ?? [];
              const matches = slugs
                .map((slug) => projectsBySlug[slug])
                .filter(Boolean);

              return (
                <li key={tool} className="skill-tool-row">
                  <span className="skill-tool-name">{tool}</span>
                  {matches.length > 0 ? (
                    <span className="skill-tool-projects">
                      {matches.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="text-link"
                        >
                          {project.title}
                        </Link>
                      ))}
                    </span>
                  ) : (
                    <span className="skill-tool-none">No project yet</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {skill.sections.map((section) => (
        <section key={section.heading} className="detail-section">
          <h2>{section.heading}</h2>
          {section.paragraphs &&
            section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          {section.video && (
            <video
              className="gallery-video"
              controls
              poster={section.video.poster}
            >
              <source src={section.video.src} type="video/mp4" />
            </video>
          )}
          {section.images && section.images.length > 0 && (
            <div className={skill.uniform ? "image-grid photo-grid" : "image-grid"}>
              {section.images.map((image) => (
                <figure key={image.src} className="image-card">
                  <Image
                    src={image.src}
                    alt={image.caption || section.heading}
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
          )}
        </section>
      ))}
    </article>
  );
}
