export async function fetchProjects() {
  let response;

  try {
    response = await fetch("/api/projects");
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
      message: data.errors?.form ?? "Could not load the projects.",
    };
  }

  if (!Array.isArray(data.projects)) {
    return { ok: false, message: "The project list came back in an unexpected format." };
  }

  return { ok: true, projects: data.projects };
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

export async function createProject(values, token) {
  const result = await request("POST", "/api/projects", token, values);

  if (result.ok) {
    return { ok: true, project: result.data.project };
  }

  return result;
}

export async function updateProject(slug, values, token) {
  const result = await request("PUT", `/api/projects/${slug}`, token, values);

  if (result.ok) {
    return { ok: true, project: result.data.project };
  }

  return result;
}

export async function deleteProject(slug, token) {
  const result = await request("DELETE", `/api/projects/${slug}`, token);

  if (result.ok) {
    return { ok: true };
  }

  return result;
}
