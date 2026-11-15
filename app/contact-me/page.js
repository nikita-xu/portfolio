import ContactApiForm from "@/components/ContactApiForm";

export const metadata = {
  title: "Contact (API)",
};

export default function ContactMePage() {
  return (
    <section className="content">
      <h1 className="page-title">Contact (API)</h1>
      <p className="page-intro">
        This form sends your message through the REST API endpoint
        (/api/contact) and saves it into the same inbox as the server form,
        which lives at /contact-me-server-form.
      </p>
      <ContactApiForm />
    </section>
  );
}
