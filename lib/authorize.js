import { timingSafeEqual } from "crypto";

export function checkAdminToken(request) {
  const expected = process.env.ADMIN_TOKEN;

  if (!expected) {
    return {
      ok: false,
      status: 503,
      message: "Admin access is not configured on this server.",
    };
  }

  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer (.+)$/.exec(header);

  if (!match) {
    return { ok: false, status: 401, message: "Missing admin token." };
  }

  const provided = Buffer.from(match[1], "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const same =
    provided.length === expectedBuffer.length && timingSafeEqual(provided, expectedBuffer);

  if (!same) {
    return { ok: false, status: 401, message: "Invalid admin token." };
  }

  return { ok: true };
}
