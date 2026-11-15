export async function fetchBlogs() {
  let response;

  try {
    response = await fetch("/api/blogs");
  } catch {
    return { ok: false, message: "Could not reach the server. Please try again." };
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    return {
      ok: false,
      message: data.errors?.form ?? "Could not load the blog posts.",
    };
  }

  if (!Array.isArray(data.blogs)) {
    return { ok: false, message: "The blog list came back in an unexpected format." };
  }

  return { ok: true, blogs: data.blogs };
}

export async function fetchBlogPost(slug) {
  const result = await fetchBlogs();

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    post: result.blogs.find((item) => item.slug === slug) ?? null,
  };
}

export async function createBlogPost(values) {
  let response;

  try {
    response = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    return { ok: false, errors: { form: "Could not reach the server. Please try again." } };
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    return { ok: false, errors: data.errors ?? { form: "Could not publish the blog post." } };
  }

  return { ok: true, post: data.post };
}

export async function deleteBlogPost(slug) {
  let response;

  try {
    response = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
  } catch {
    return { ok: false, errors: { form: "Could not reach the server. Please try again." } };
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    return { ok: false, errors: data.errors ?? { form: "Delete failed." } };
  }

  return { ok: true };
}
