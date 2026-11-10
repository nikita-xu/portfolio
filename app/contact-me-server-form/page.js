import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Me",
};

export default function ContactMePage() {
  return (
    <section className="content">
      <h1 className="page-title">Contact Me</h1>
      <p className="page-intro">
        Have a question or just want to say hi? Send me a message and I will
        get back to you.
      </p>
      <ContactForm />
    </section>
  );
}
