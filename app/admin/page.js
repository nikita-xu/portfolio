import Link from "next/link";
import AdminGate from "@/components/AdminGate";

export const metadata = {
  title: "Admin",
};

const sections = [
  {
    href: "/admin/projects",
    label: "Projects",
  },
  {
    href: "/admin/experiences",
    label: "Experiences",
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
  },
  {
    href: "/admin/contacts",
    label: "Contacts",
  },
];

export default function AdminPage() {
  return (
    <section>
      <h1 className="page-title">Admin</h1>

      <AdminGate>
        <div className="admin-menu">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="admin-menu-button">
              <span className="admin-menu-label">{section.label}</span>
            </Link>
          ))}
        </div>
      </AdminGate>
    </section>
  );
}
