"use client";

import { useState } from "react";
import Link from "next/link";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function monthLabel(value) {
  const match = /^(\d{4})-(\d{2})$/.exec(value ?? "");
  if (!match) return value ?? "";
  return `${MONTHS[Number(match[2]) - 1]} ${match[1]}`;
}

export default function ExperienceCard({ entry }) {
  const [expanded, setExpanded] = useState(false);

  const dates =
    entry.endDate === "Present"
      ? `${monthLabel(entry.startDate)} – Present`
      : `${monthLabel(entry.startDate)} – ${monthLabel(entry.endDate)}`;

  const kind = entry.category === "Education" ? "education" : "work";

  return (
    <article className={`xp-item xp-${kind}${expanded ? " is-open" : ""}`}>
      <span className="xp-marker" aria-hidden="true" />

      <div className="xp-card">
        <button
          type="button"
          className="xp-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          <span className="xp-head-row">
            <span className="xp-dates">{dates}</span>
            {entry.category && <span className="xp-kind">{entry.category}</span>}
            <span className="xp-chevron" aria-hidden="true" />
          </span>
          <span className="xp-role">{entry.role}</span>
          <span className="xp-org">
            {entry.organization}
            {entry.location ? ` · ${entry.location}` : ""}
          </span>
        </button>

        <div className="xp-details">
          <div className="xp-details-inner">
            {entry.summary && <p className="xp-summary">{entry.summary}</p>}

            {entry.highlights?.length > 0 && (
              <ul className="xp-highlights">
                {entry.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            )}

            {entry.skills?.length > 0 && (
              <div className="xp-skills">
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
                className="xp-image"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
