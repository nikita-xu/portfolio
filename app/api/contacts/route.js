import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/contact";
import { handleContactPost } from "@/lib/contacts-api";
import { checkAdminToken } from "@/lib/authorize";

export async function GET(request) {
  const auth = checkAdminToken(request);

  if (!auth.ok) {
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const result = await listSubmissions();

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  return NextResponse.json({ submissions: result.submissions });
}

export const POST = handleContactPost;
