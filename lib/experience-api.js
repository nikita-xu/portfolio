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
