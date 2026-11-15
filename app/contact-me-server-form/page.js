import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact (Server Form)",
};

export default function ContactMePage() {
  return (
    <section className="content">
      <h1 className="page-title">Contact (Server Form)</h1>
      <p className="page-intro">
        Send me a message here if you have questions or just want to say hi!
      </p>
      <ContactForm />
    </section>
  );
}
