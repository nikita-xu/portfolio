export async function readJsonBody(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return { failure: "Request body must be valid JSON." };
  }

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { failure: "Request body must be a JSON object." };
  }

  return { body };
}
