"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-me", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact-me-server-form", label: "Contact (Server Form)" },
  { href: "/contact-me", label: "Contact (API)" },
  { href: "/admin/blogs", label: "Admin" },
];

function NavigationLinks() {
  const pathname = usePathname();

  return (
    <nav className="navbar-links">
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);

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
  );
}

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          Nikita Xu
        </Link>
        <Suspense fallback={<div className="navbar-links" />}>
          <NavigationLinks />
        </Suspense>
      </div>
    </header>
  );
}
