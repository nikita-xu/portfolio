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
  let created = null;

  const result = await submissions.update((data) => {
    created = {
      id: data.reduce((max, item) => Math.max(max, item.id ?? 0), 0) + 1,
      name: values.name,
      email: values.email,
      message: values.message,
      read: false,
      submittedAt: pacificTimestamp(),
    };

    data.push(created);
  });

  if (!result.ok) {
    return result;
  }

  return { ok: true, submission: created };
}

export async function listSubmissions() {
  const result = await submissions.read();

  if (!result.ok) {
    return result;
  }

  if (result.data.some((item) => item.id === undefined)) {
    const migrated = await submissions.update((data) => {
      let next = data.reduce((max, item) => Math.max(max, item.id ?? 0), 0) + 1;

      for (const item of data) {
        if (item.id === undefined) {
          item.id = next;
          next += 1;
        }
      }
    });

    if (!migrated.ok) {
      return migrated;
    }

    const refreshed = await submissions.read();

    if (!refreshed.ok) {
      return refreshed;
    }

    return { ok: true, submissions: refreshed.data };
  }

  return { ok: true, submissions: result.data };
}

export async function setSubmissionRead(id, read) {
  return submissions.update((data) => {
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return { failure: "Submission not found." };
    }

    data[index].read = read;
  });
}

export async function deleteSubmission(id) {
  return submissions.update((data) => {
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return { failure: "Submission not found." };
    }

    data.splice(index, 1);
  });
}
