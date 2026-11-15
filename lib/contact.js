import path from "path";
import { createJsonStore } from "@/lib/json-file";
import { pacificTimestamp } from "@/lib/time";

const submissions = createJsonStore(
  path.join(process.cwd(), "data", "submissions.json"),
  "submissions"
);

function isValidEmail(email) {
  if (/\s/.test(email)) {
    return false;
  }

  const parts = email.split("@");
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;
  if (!localPart) {
    return false;
  }

  if (!domain.includes(".")) {
    return false;
  }

  return domain.split(".").every((label) => label.length > 0);
}

export function validateContactForm(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors = {};

  if (!name) {
    errors.name = "Please enter your name.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  }

  return { errors, values: { name, email, message } };
}

export async function saveSubmission(values) {
  return submissions.update((data) => {
    data.push({
      name: values.name,
      email: values.email,
      message: values.message,
      submittedAt: pacificTimestamp(),
    });
  });
}
