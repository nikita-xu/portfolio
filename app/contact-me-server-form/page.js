import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact (Server Form)",
};

export default function ContactMePage() {
  return (
    <section className="content">
      <h1 className="page-title">Contact (Server Form)</h1>
      <p className="page-intro">
        Have a question or just want to say hi? This form sends your message
        through a Server Action and saves it into the same inbox as the API
        form, which lives at /contact-me.
      </p>
      <ContactForm />
    </section>
  );
}
