import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-name">Nikita Xu</p>
          <p className="footer-copy">
            © 2026 Nikita Xu. Built with Next.js.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/contact-me">Contact</Link>
          <Link href="/contact-me-server-form">Contact (server form)</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/admin">Admin</Link>
          <a href="https://canva.link/l341fabyggsh1ht" target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </div>
    </footer>
  );
}
