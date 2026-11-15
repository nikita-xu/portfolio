import ContactApiForm from "@/components/ContactApiForm";

export const metadata = {
  title: "Contact (API)",
};

export default function ContactMePage() {
  return (
    <section className="content">
      <h1 className="page-title">Contact (API)</h1>
      <p className="page-intro">
        Send me a message here if you have questions or just want to say hi!
      </p>
      <ContactApiForm />
    </section>
  );
}
