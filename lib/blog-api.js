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

async function request(method, path, token, values) {
  let response;

  try {
    response = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: values ? JSON.stringify(values) : undefined,
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
    return {
      ok: false,
      status: response.status,
      errors: data.errors ?? { form: "Something went wrong. Please try again." },
    };
  }

  return { ok: true, data };
}

export async function createBlogPost(values, token) {
  const result = await request("POST", "/api/blogs", token, values);

  if (result.ok) {
    return { ok: true, post: result.data.post };
  }

  return result;
}

export async function updateBlogPost(slug, values, token) {
  const result = await request("PUT", `/api/blogs/${slug}`, token, values);

  if (result.ok) {
    return { ok: true, post: result.data.post };
  }

  return result;
}

export async function deleteBlogPost(slug, token) {
  const result = await request("DELETE", `/api/blogs/${slug}`, token);

  if (result.ok) {
    return { ok: true };
  }

  return result;
}
