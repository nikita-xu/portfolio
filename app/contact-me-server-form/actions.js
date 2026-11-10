"use server";

import { saveSubmission, validateContactForm } from "@/lib/contact";

export async function saveContact(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const body = {
    name: typeof name === "string" ? name : "",
    email: typeof email === "string" ? email : "",
    message: typeof message === "string" ? message : "",
  };

  const { errors, values } = validateContactForm(body);

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const result = await saveSubmission(values);

  if (!result.ok) {
    return { status: "error", errors: { form: result.message } };
  }

  return { status: "success", clearedAt: Date.now() };
}
