import path from "path";
import { createJsonStore } from "@/lib/json-file";
import { pacificTimestamp } from "@/lib/time";

const blogStore = createJsonStore(
  path.join(process.cwd(), "data", "blogs.json"),
  "blog posts"
);

function slugify(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post"
  );
}

export function validateBlogPost(body) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";

  const errors = {};

  if (!title) {
    errors.title = "Please enter a title.";
  }

  if (!content) {
    errors.content = "Please write some content.";
  }

  return { errors, values: { title, content } };
}

export async function listPosts() {
  const result = await blogStore.read();

  if (!result.ok) {
    return result;
  }

  return { ok: true, blogs: result.data };
}

export async function createPost(values) {
  let created = null;

  const result = await blogStore.update((data) => {
    let slug = slugify(values.title);
    let suffix = 2;

    while (data.some((post) => post.slug === slug)) {
      slug = `${slugify(values.title)}-${suffix}`;
      suffix += 1;
    }

    created = {
      id: data.reduce((max, post) => Math.max(max, post.id ?? 0), 0) + 1,
      slug,
      title: values.title,
      content: values.content,
      createdAt: pacificTimestamp(),
    };

    data.push(created);
  });

  if (!result.ok) {
    return result;
  }

  return { ok: true, post: created };
}

export async function deletePost(slug) {
  return blogStore.update((data) => {
    const index = data.findIndex((post) => post.slug === slug);

    if (index === -1) {
      return { failure: "Blog post not found." };
    }

    data.splice(index, 1);
  });
}
