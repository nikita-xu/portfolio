import { NextResponse } from "next/server";
import { saveSubmission, validateContactForm } from "@/lib/contact";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: { form: "Invalid request. Please try again." } },
      { status: 400 }
    );
  }

  const { errors, values } = validateContactForm(body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await saveSubmission(values);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
