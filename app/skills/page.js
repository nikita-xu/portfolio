import Link from "next/link";
import skills from "@/data/skills";

export const metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return (
    <section>
      <h1 className="page-title">Skills</h1>
      <p className="page-intro">
        Beyond data and code, these are the creative skills I have been
        developing. Click a card to see the work.
      </p>
      <div className="card-grid">
        {skills.map((skill) => (
          <article key={skill.slug} className="card">
            <h2>{skill.title}</h2>
            <p>{skill.shortDescription}</p>
            <Link href={`/skills/${skill.slug}`} className="card-link">
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
