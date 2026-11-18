"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchExperiences } from "@/lib/experience-api";
import ExperienceCard from "@/components/ExperienceCard";

export default function ExperienceList() {
  const [state, setState] = useState({ status: "loading" });

  const load = useCallback(() => {
    fetchExperiences().then((result) => {
      if (result.ok) {
        const entries = [...result.experiences].sort(
          (a, b) => b.startDate.localeCompare(a.startDate) || b.id - a.id
        );
        setState({ status: "loaded", entries });
      } else {
        setState({ status: "failed", message: result.message });
      }
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function retry() {
    setState({ status: "loading" });
    load();
  }

  if (state.status === "loading") {
    return <p className="page-intro">Loading experience…</p>;
  }

  if (state.status === "failed") {
    return (
      <div className="load-error">
        <p className="field-error">{state.message}</p>
        <button type="button" className="button button-secondary" onClick={retry}>
          Try again
        </button>
      </div>
    );
  }

  if (state.entries.length === 0) {
    return <p className="page-intro">No experience entries yet.</p>;
  }

  return (
    <div className="timeline">
      {state.entries.map((entry) => (
        <ExperienceCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
