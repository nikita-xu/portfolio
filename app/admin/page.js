import ProjectsManager from "@/components/ProjectsManager";
import ExperienceManager from "@/components/ExperienceManager";
import BlogManager from "@/components/BlogManager";
import ContactsInbox from "@/components/ContactsInbox";

export const metadata = {
  title: "Admin",
};

const sections = [
  { id: "projects", label: "Projects" },
  { id: "experiences", label: "Experiences" },
  { id: "blogs", label: "Blogs" },
  { id: "contacts", label: "Contacts" },
];

export default function AdminPage() {
  return (
    <section>
      <h1 className="page-title">Admin</h1>
      <p className="page-intro">
        Create, edit, and delete the live site content. Each section saves
        through its own API.
      </p>

      <nav className="admin-nav" aria-label="Admin sections">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="tag">
            {section.label}
          </a>
        ))}
      </nav>

      <section id="projects" className="detail-section admin-section">
        <h2>Projects</h2>
        <ProjectsManager />
      </section>

      <section id="experiences" className="detail-section admin-section">
        <h2>Experiences</h2>
        <ExperienceManager />
      </section>

      <section id="blogs" className="detail-section admin-section">
        <h2>Blog posts</h2>
        <BlogManager />
      </section>

      <section id="contacts" className="detail-section admin-section">
        <h2>Contact inbox</h2>
        <ContactsInbox />
      </section>
    </section>
  );
}
