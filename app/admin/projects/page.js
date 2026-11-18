import ProjectsManager from "@/components/ProjectsManager";

export const metadata = {
  title: "Projects Manager",
};

export default function ProjectsManagerPage() {
  return (
    <section>
      <h1 className="page-title">Projects Manager</h1>
      <ProjectsManager />
    </section>
  );
}
