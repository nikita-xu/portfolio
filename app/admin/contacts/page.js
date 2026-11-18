import ContactsInbox from "@/components/ContactsInbox";

export const metadata = {
  title: "Contact Inbox",
};

export default function ContactsInboxPage() {
  return (
    <section>
      <h1 className="page-title">Contact Inbox</h1>
      <ContactsInbox />
    </section>
  );
}
