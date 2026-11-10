"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-me", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact-me-server-form", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          Nikita Xu
        </Link>
        <nav className="navbar-links">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "navbar-link navbar-link-active" : "navbar-link"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
