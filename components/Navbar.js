"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-me", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact-me", label: "Contact" },
];

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLinks({ onClose }) {
  const pathname = usePathname();

  return (
    <nav className="navbar-links" aria-label="Primary">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            isActive(pathname, link.href) ? "navbar-link navbar-link-active" : "navbar-link"
          }
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileMenu({ menuOpen, onClose }) {
  const pathname = usePathname();

  if (!menuOpen) {
    return null;
  }

  return (
    <nav className="navbar-mobile" aria-label="Mobile menu">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            isActive(pathname, link.href)
              ? "navbar-mobile-link navbar-mobile-link-active"
              : "navbar-mobile-link"
          }
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          Nikita Xu
        </Link>
        <span className="navbar-rule" aria-hidden="true" />
        <Suspense fallback={<div className="navbar-links" />}>
          <NavigationLinks onClose={() => setMenuOpen(false)} />
        </Suspense>
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-menu">
        <Suspense fallback={null}>
          <MobileMenu menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </Suspense>
      </div>
    </header>
  );
}
