import Link from "next/link";

export default function ExperienceCard({ entry }) {
  const dates =
    entry.endDate === "Present"
      ? `${entry.startDate} – Present`
      : `${entry.startDate} – ${entry.endDate}`;

  return (
    <article className="timeline-item">
      <p className="experience-dates">{dates}</p>
      <h2 className="experience-role">{entry.role}</h2>
      <p className="experience-meta">
        {entry.organization}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <p className="experience-category">{entry.category}</p>
      <p className="experience-summary">{entry.summary}</p>

      {entry.highlights?.length > 0 && (
        <ul className="experience-highlights">
          {entry.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      )}

      {entry.skills?.length > 0 && (
        <div className="experience-skills">
          {entry.skills.map((slug) => (
            <Link key={slug} href={`/skills/${slug}`} className="tag">
              {slug.replace(/-/g, " ")}
            </Link>
          ))}
        </div>
      )}

      {entry.image && (
        <img
          src={entry.image}
          alt={`${entry.role} at ${entry.organization}`}
          className="experience-image"
        />
      )}
    </article>
  );
}
