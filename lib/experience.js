import path from "path";
import { createJsonStore } from "@/lib/json-file";
import { pacificTimestamp } from "@/lib/time";
import skills from "@/data/skills";

const experienceStore = createJsonStore(
  path.join(process.cwd(), "data", "experiences.json"),
  "experience entries"
);

const validSkillSlugs = skills.map((skill) => skill.slug);

function validDateString(value) {
  return typeof value === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}

export function validateExperience(body) {
  const organization =
    typeof body.organization === "string" ? body.organization.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const location =
    typeof body.location === "string" ? body.location.trim() : "";
  const category =
    typeof body.category === "string" && body.category.trim()
      ? body.category.trim()
      : "Work";
  const summary = typeof body.summary === "string" ? body.summary.trim() : "";
  const startDate = validDateString(body.startDate) ? body.startDate : "";
  const endDate =
    body.endDate === "Present" ? "Present" : validDateString(body.endDate) ? body.endDate : "";

  const errors = {};

  if (!organization) {
    errors.organization = "Please enter an organization.";
  } else if (organization.length > 120) {
    errors.organization = "Please keep the organization under 120 characters.";
  }

  if (!role) {
    errors.role = "Please enter a role.";
  } else if (role.length > 120) {
    errors.role = "Please keep the role under 120 characters.";
  }

  if (location.length > 120) {
    errors.location = "Please keep the location under 120 characters.";
  }

  if (category.length > 40) {
    errors.category = "Please keep the category under 40 characters.";
  }

  if (summary.length > 1000) {
    errors.summary = "Please keep the summary under 1000 characters.";
  }

  if (!startDate) {
    errors.startDate = "Please enter a start date as YYYY-MM.";
  }

  if (!endDate) {
    errors.endDate = "Please enter an end date as YYYY-MM, or Present.";
  } else if (startDate && endDate !== "Present" && endDate < startDate) {
    errors.endDate = "The end date cannot be before the start date.";
  }

  let highlights = [];

  if (body.highlights !== undefined) {
    if (!Array.isArray(body.highlights)) {
      errors.highlights = "Highlights must be a list.";
    } else {
      highlights = body.highlights
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);

      if (highlights.some((item) => item.length > 200)) {
        errors.highlights = "Please keep each highlight under 200 characters.";
      } else if (highlights.length > 8) {
        errors.highlights = "Please keep highlights to 8 or fewer.";
      }
    }
  }

  let skillList = [];

  if (body.skills !== undefined) {
    if (!Array.isArray(body.skills)) {
      errors.skills = "Skills must be a list of skill slugs.";
    } else {
      skillList = body.skills.map((item) => (typeof item === "string" ? item.trim() : ""));
      const unknown = skillList.filter((slug) => !validSkillSlugs.includes(slug));

      if (unknown.length > 0) {
        errors.skills = `Unknown skill slugs: ${unknown.join(", ")}. Valid slugs: ${validSkillSlugs.join(", ")}.`;
      }
    }
  }

  let image = "";

  if (body.image !== undefined && body.image !== null && body.image !== "") {
    if (
      typeof body.image !== "string" ||
      !(/^(\/|https:\/\/)/.test(body.image.trim())) ||
      body.image.trim().length > 300
    ) {
      errors.image = "Image must be a local /path or an https:// URL.";
    } else {
      image = body.image.trim();
    }
  }

  const values = {
    organization,
    role,
    location,
    category,
    summary,
    startDate,
    endDate,
    highlights,
    skills: skillList,
    image,
  };

  return { errors, values };
}

export async function listExperiences() {
  const result = await experienceStore.read();

  if (!result.ok) {
    return result;
  }

  return { ok: true, experiences: result.data };
}

export async function getExperience(id) {
  const result = await experienceStore.read();

  if (!result.ok) {
    return result;
  }

  const experience = result.data.find((item) => item.id === id) ?? null;

  return { ok: true, experience };
}

export async function createExperience(values) {
  let created = null;

  const result = await experienceStore.update((data) => {
    created = {
      id: data.reduce((max, item) => Math.max(max, item.id ?? 0), 0) + 1,
      ...values,
      createdAt: pacificTimestamp(),
    };

    data.push(created);
  });

  if (!result.ok) {
    return result;
  }

  return { ok: true, experience: created };
}

export async function updateExperience(id, values) {
  let updated = null;

  const result = await experienceStore.update((data) => {
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return { failure: "Experience not found." };
    }

    updated = {
      ...data[index],
      ...values,
    };

    data[index] = updated;
  });

  if (!result.ok) {
    return result;
  }

  return { ok: true, experience: updated };
}

export async function deleteExperience(id) {
  return experienceStore.update((data) => {
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return { failure: "Experience not found." };
    }

    data.splice(index, 1);
  });
}
