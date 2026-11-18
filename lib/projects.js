import path from "path";
import { createJsonStore } from "@/lib/json-file";
import { pacificTimestamp } from "@/lib/time";

const projectStore = createJsonStore(
  path.join(process.cwd(), "data", "projects.json"),
  "projects"
);

function slugify(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "project"
  );
}

function stringList(value, maxItems, maxLength) {
  if (!Array.isArray(value)) {
    return { list: [], error: null, required: false };
  }

  const list = value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  if (list.length > maxItems) {
    return { list, error: `Please keep this list to ${maxItems} lines or fewer.`, required: false };
  }

  if (list.some((item) => item.length > maxLength)) {
    return { list, error: `Please keep each line under ${maxLength} characters.`, required: false };
  }

  return { list, error: null, required: false };
}

function normalizeImage(image, errors, label) {
  const src = typeof image?.src === "string" ? image.src.trim() : "";
  const width = Number(image?.width);
  const height = Number(image?.height);
  const caption = typeof image?.caption === "string" ? image.caption.trim() : "";

  if (!src || !(/^(\/|https:\/\/)/.test(src)) || src.length > 300) {
    errors[label] = "Image paths must be a local /path or an https:// URL.";
    return null;
  }

  if (!Number.isInteger(width) || width < 1 || width > 10000) {
    errors[label] = "Image width must be a pixel value between 1 and 10000.";
    return null;
  }

  if (!Number.isInteger(height) || height < 1 || height > 10000) {
    errors[label] = "Image height must be a pixel value between 1 and 10000.";
    return null;
  }

  if (caption.length > 200) {
    errors[label] = "Please keep image captions under 200 characters.";
    return null;
  }

  return caption ? { src, width, height, caption } : { src, width, height };
}

function normalizeGallery(gallery, errors, label) {
  const heading = typeof gallery?.heading === "string" ? gallery.heading.trim() : "";
  const stat = typeof gallery?.stat === "string" ? gallery.stat.trim() : "";

  if (!heading || heading.length > 120) {
    errors[label] = "Each gallery needs a heading under 120 characters.";
    return null;
  }

  if (stat.length > 200) {
    errors[label] = "Please keep the gallery stat under 200 characters.";
    return null;
  }

  if (!Array.isArray(gallery?.images) || gallery.images.length === 0 || gallery.images.length > 12) {
    errors[label] = "Each gallery needs between 1 and 12 images.";
    return null;
  }

  const images = [];
  for (const [index, image] of gallery.images.entries()) {
    const normalized = normalizeImage(image, errors, label);
    if (!normalized) return null;
    images.push(normalized);
  }

  return stat ? { heading, stat, images } : { heading, images };
}

export function validateProject(body) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const context = typeof body.context === "string" ? body.context.trim() : "";
  const shortDescription =
    typeof body.shortDescription === "string" ? body.shortDescription.trim() : "";
  const contributionHeading =
    typeof body.contributionHeading === "string" ? body.contributionHeading.trim() : "";
  const toolsHeading = typeof body.toolsHeading === "string" ? body.toolsHeading.trim() : "";
  const githubUrl = typeof body.githubUrl === "string" ? body.githubUrl.trim() : "";

  const errors = {};

  if (!title) {
    errors.title = "Please enter a title.";
  } else if (title.length > 120) {
    errors.title = "Please keep the title under 120 characters.";
  }

  if (context.length > 160) {
    errors.context = "Please keep the context under 160 characters.";
  }

  if (!shortDescription) {
    errors.shortDescription = "Please enter a short description.";
  } else if (shortDescription.length > 300) {
    errors.shortDescription = "Please keep the short description under 300 characters.";
  }

  const summary = stringList(body.summary, 12, 600);
  if (!summary.list || summary.list.length === 0) {
    errors.summary = "Please add at least one summary paragraph.";
  } else if (summary.error) {
    errors.summary = summary.error;
  }

  const contribution = stringList(body.contribution, 12, 600);
  if (contribution.error) {
    errors.contribution = contribution.error;
  }

  if (contributionHeading.length > 80) {
    errors.contributionHeading = "Please keep the contribution heading under 80 characters.";
  }

  const tools = stringList(body.tools, 24, 60);
  if (tools.error) {
    errors.tools = tools.error;
  }

  if (toolsHeading.length > 80) {
    errors.toolsHeading = "Please keep the tools heading under 80 characters.";
  }

  const learnings = stringList(body.learnings, 12, 600);
  if (learnings.error) {
    errors.learnings = learnings.error;
  }

  if (githubUrl && (!/^https:\/\//.test(githubUrl) || githubUrl.length > 300)) {
    errors.githubUrl = "The GitHub link must be an https:// URL.";
  }

  let heroImages = [];
  if (body.heroImages !== undefined && body.heroImages !== null) {
    if (!Array.isArray(body.heroImages) || body.heroImages.length > 6) {
      errors.heroImages = "Projects can have at most 6 hero images.";
    } else {
      for (const [index, image] of body.heroImages.entries()) {
        const normalized = normalizeImage(image, errors, `heroImages.${index}`);
        if (!normalized) break;
        heroImages.push(normalized);
      }
    }
  }

  let galleries = [];
  if (body.galleries !== undefined && body.galleries !== null) {
    if (!Array.isArray(body.galleries) || body.galleries.length > 8) {
      errors.galleries = "Projects can have at most 8 galleries.";
    } else {
      for (const [index, gallery] of body.galleries.entries()) {
        const normalized = normalizeGallery(gallery, errors, `galleries.${index}`);
        if (!normalized) break;
        galleries.push(normalized);
      }
    }
  }

  const values = {
    title,
    context,
    shortDescription,
    summary: summary.list,
    contribution: contribution.list,
    contributionHeading,
    tools: tools.list,
    toolsHeading,
    learnings: learnings.list,
    githubUrl,
    heroImages,
    galleries,
  };

  return { errors, values };
}

export async function listProjects() {
  const result = await projectStore.read();

  if (!result.ok) {
    return result;
  }

  return { ok: true, projects: result.data };
}

export async function getProject(slug) {
  const result = await projectStore.read();

  if (!result.ok) {
    return result;
  }

  const project = result.data.find((item) => item.slug === slug) ?? null;

  return { ok: true, project };
}

export async function createProject(values) {
  let created = null;

  const result = await projectStore.update((data) => {
    let slug = slugify(values.title);
    let suffix = 2;

    while (data.some((project) => project.slug === slug)) {
      slug = `${slugify(values.title)}-${suffix}`;
      suffix += 1;
    }

    created = {
      slug,
      ...values,
      createdAt: pacificTimestamp(),
    };

    data.push(created);
  });

  if (!result.ok) {
    return result;
  }

  return { ok: true, project: created };
}

export async function updateProject(slug, values) {
  let updated = null;

  const result = await projectStore.update((data) => {
    const index = data.findIndex((project) => project.slug === slug);

    if (index === -1) {
      return { failure: "Project not found." };
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

  return { ok: true, project: updated };
}

export async function deleteProject(slug) {
  return projectStore.update((data) => {
    const index = data.findIndex((project) => project.slug === slug);

    if (index === -1) {
      return { failure: "Project not found." };
    }

    data.splice(index, 1);
  });
}
