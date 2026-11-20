import Link from "next/link";
import AdminGate from "@/components/AdminGate";

export const metadata = {
  title: "Admin",
};

const sections = [
  {
    href: "/admin/projects",
    label: "Projects",
    description: "Create, edit, and delete portfolio projects.",
  },
  {
    href: "/admin/experiences",
    label: "Experiences",
    description: "Manage the experience timeline entries.",
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    description: "Publish and edit blog posts.",
  },
  {
    href: "/admin/contacts",
    label: "Contacts",
    description: "Read and manage the contact inbox.",
  },
];

export default function AdminPage() {
  return (
    <section>
      <h1 className="page-title">Admin</h1>
      <p className="page-intro">
        Manage the live site content. Each area saves through its own API.
      </p>

      <AdminGate>
        <div className="admin-menu">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="admin-menu-button">
              <span className="admin-menu-label">{section.label}</span>
              <span className="admin-menu-desc">{section.description}</span>
            </Link>
          ))}
        </div>
      </AdminGate>
    </section>
  );
}
