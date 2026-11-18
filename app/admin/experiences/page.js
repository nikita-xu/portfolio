import ExperienceManager from "@/components/ExperienceManager";

export const metadata = {
  title: "Experience Manager",
};

export default function ExperienceManagerPage() {
  return (
    <section>
      <h1 className="page-title">Experience Manager</h1>
      <ExperienceManager />
    </section>
  );
}
