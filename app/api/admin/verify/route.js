import { NextResponse } from "next/server";
import { checkAdminToken } from "@/lib/authorize";
import { logApiRequest } from "@/lib/http";

export async function GET(request) {
  const auth = checkAdminToken(request);

  if (!auth.ok) {
    logApiRequest("GET", "/api/admin/verify", auth.status);
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  logApiRequest("GET", "/api/admin/verify", 200);
  return NextResponse.json({ ok: true });
}
