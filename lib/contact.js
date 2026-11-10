import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

const submissionsFile = path.join(process.cwd(), "data", "submissions.json");

const pacificFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZoneName: "longOffset",
});

function pacificTimestamp(date = new Date()) {
  const parts = {};
  for (const part of pacificFormatter.formatToParts(date)) {
    parts[part.type] = part.value;
  }

  const offset = parts.timeZoneName.replace("GMT", "");

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
}

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

async function readSubmissions() {
  let content;

  try {
    content = await fs.readFile(submissionsFile, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return { submissions: [] };
    }

    return {
      failure:
        "We could not read the existing submissions. Nothing was saved, and the file was left unchanged.",
    };
  }

  try {
    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed)) {
      return {
        failure:
          "The submissions file is damaged. Nothing was saved, and the file was left unchanged.",
      };
    }

    return { submissions: parsed };
  } catch {
    return {
      failure:
        "The submissions file is damaged. Nothing was saved, and the file was left unchanged.",
    };
  }
}

async function appendSubmission(values) {
  const result = await readSubmissions();

  if (result.failure) {
    return { ok: false, message: result.failure };
  }

  result.submissions.push({
    name: values.name,
    email: values.email,
    message: values.message,
    submittedAt: pacificTimestamp(),
  });

  const tempFile = `${submissionsFile}.${process.pid}.${randomBytes(4).toString("hex")}.tmp`;

  try {
    await fs.writeFile(tempFile, JSON.stringify(result.submissions, null, 2));
    await fs.rename(tempFile, submissionsFile);
    return { ok: true };
  } catch {
    await fs.unlink(tempFile).catch(() => null);
    return { ok: false, message: "Saving failed. Please try again." };
  }
}

let writeQueue = Promise.resolve();

export function saveSubmission(values) {
  const task = writeQueue.then(() => appendSubmission(values));
  writeQueue = task.then(() => {}, () => {});
  return task;
}
