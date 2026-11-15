"use client";

import { useEffect, useRef } from "react";

export default function HeroSpotlight({ children }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = hero?.querySelector(".hero-glow");

    if (!hero || !glow) {
      return undefined;
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return undefined;
    }

    function move(event) {
      const rect = hero.getBoundingClientRect();
      glow.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
      glow.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
    }

    hero.addEventListener("pointermove", move);

    return () => {
      hero.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section ref={heroRef} className="spotlight-hero">
      <div className="hero-glow" aria-hidden="true" />
      {children}
    </section>
  );
}
