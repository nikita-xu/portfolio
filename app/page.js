import Link from "next/link";
import HeroSpotlight from "@/components/HeroSpotlight";

export default function HomePage() {
  return (
    <>
      <HeroSpotlight>
        <div className="container">
          <div className="spotlight-content">
            <span className="accent-line" aria-hidden="true" />
            <h1 className="hero-name">Nikita Xu.</h1>
            <p className="hero-tagline">Marketing. Analytics. Motion.</p>
            <p className="hero-categories">Sports / Motorsport / Brand / Analytics.</p>
            <div className="hero-links">
              <Link href="/projects" className="hero-link">
                Explore my work &rarr;
              </Link>
              <Link href="/about-me" className="hero-link hero-link-muted">
                About me
              </Link>
            </div>
          </div>
        </div>
      </HeroSpotlight>

      <section className="home-section">
        <h2 className="section-title">Explore the site</h2>
        <div className="card-grid">
          <Link href="/about-me" className="card">
            <h3>About Me</h3>
          </Link>
          <Link href="/projects" className="card">
            <h3>My Projects</h3>
          </Link>
          <Link href="/skills" className="card">
            <h3>Skills</h3>
          </Link>
          <Link href="/blogs" className="card">
            <h3>Blog</h3>
          </Link>
          <Link href="/contact-me-server-form" className="card">
            <h3>Contact (Server Form)</h3>
          </Link>
          <Link href="/contact-me" className="card">
            <h3>Contact (API)</h3>
          </Link>
        </div>
      </section>
    </>
  );
}
