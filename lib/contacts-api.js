import { NextResponse } from "next/server";
import { saveSubmission, validateContactForm } from "@/lib/contact";
import { readJsonBody } from "@/lib/http";

export async function handleContactPost(request) {
  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  const { errors, values } = validateContactForm(parsed.body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await saveSubmission(values);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
