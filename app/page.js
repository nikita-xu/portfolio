import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="hero-greeting">Hi, I&apos;m Nikita</p>
        <h1 className="hero-title">Welcome to my portfolio</h1>
        <p className="hero-text">
          I am a Business Analytics graduate student at Santa Clara University
          who enjoys building things with code. This site is where I share my
          projects, my creative work, and how to get in touch with me.
        </p>
        <div className="button-row">
          <Link href="/projects" className="button">
            View My Projects
          </Link>
          <Link href="/contact-me-server-form" className="button button-secondary">
            Contact Me
          </Link>
        </div>
      </section>

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
          <Link href="/contact-me-server-form" className="card">
            <h3>Contact Me</h3>
          </Link>
        </div>
      </section>
    </>
  );
}
