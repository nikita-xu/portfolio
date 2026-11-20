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

function yearLabel(entry) {
  const start = /^(\d{4})/.exec(entry.startDate ?? "");
  if (!start) return "";
  const end =
    entry.endDate === "Present"
      ? "Present"
      : /^(\d{4})/.exec(entry.endDate ?? "")?.[1];

  if (!end || end === start[1]) return start[1];

  return `${start[1]} – ${end}`;
}

function durationLabel(entry) {
  const start = /^(\d{4})-(\d{2})$/.exec(entry.startDate ?? "");
  if (!start) return "";

  const now = new Date();
  const end =
    entry.endDate === "Present"
      ? [now.getFullYear(), now.getMonth() + 1]
      : /^(\d{4})-(\d{2})$/
          .exec(entry.endDate ?? "")
          ?.slice(1)
          .map(Number);

  if (!end) return "";

  const months = Math.max(
    1,
    (Number(end[0]) - Number(start[1])) * 12 +
      (end[1] - Number(start[2])) +
      1
  );
  const years = Math.floor(months / 12);
  const rest = months % 12;

  return [
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "",
    rest > 0 ? `${rest} mo${rest > 1 ? "s" : ""}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function ExperienceCard({ entry }) {
  const [expanded, setExpanded] = useState(false);

  const dates =
    entry.endDate === "Present"
      ? `${monthLabel(entry.startDate)} – Present`
      : `${monthLabel(entry.startDate)} – ${monthLabel(entry.endDate)}`;

  const years = yearLabel(entry);
  const duration = durationLabel(entry);
  const kind = entry.category === "Education" ? "education" : "work";

  return (
    <article className={`xp-item xp-${kind}${expanded ? " is-open" : ""}`}>
      <span className="xp-marker" aria-hidden="true" />

      {years && (
        <span className="xp-year" aria-hidden="true">
          <span className="xp-year-range">{years}</span>
          {duration && <span className="xp-year-length">{duration}</span>}
        </span>
      )}

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

            {entry.projectSlug && (
              <div className="xp-project">
                <Link href={`/projects/${entry.projectSlug}`} className="button">
                  View project
                </Link>
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
