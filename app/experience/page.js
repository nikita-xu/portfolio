import ExperienceList from "@/components/ExperienceList";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <section>
      <h1 className="page-title">Experience</h1>
      <ExperienceList />
    </section>
  );
}
