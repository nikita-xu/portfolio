export async function fetchExperiences() {
  let response;

  try {
    response = await fetch("/api/experiences");
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
      message: data.errors?.form ?? "Could not load the experience entries.",
    };
  }

  if (!Array.isArray(data.experiences)) {
    return { ok: false, message: "The experience list came back in an unexpected format." };
  }

  return { ok: true, experiences: data.experiences };
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

export async function createExperience(values, token) {
  const result = await request("POST", "/api/experiences", token, values);

  if (result.ok) {
    return { ok: true, experience: result.data.experience };
  }

  return result;
}

export async function updateExperience(id, values, token) {
  const result = await request("PUT", `/api/experiences/${id}`, token, values);

  if (result.ok) {
    return { ok: true, experience: result.data.experience };
  }

  return result;
}

export async function deleteExperience(id, token) {
  const result = await request("DELETE", `/api/experiences/${id}`, token);

  if (result.ok) {
    return { ok: true };
  }

  return result;
}
