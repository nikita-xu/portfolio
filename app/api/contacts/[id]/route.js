import { NextResponse } from "next/server";
import { deleteSubmission, setSubmissionRead } from "@/lib/contact";
import { readJsonBody } from "@/lib/http";
import { checkAdminToken } from "@/lib/authorize";

function parseId(raw) {
  const id = Number(raw);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

export async function PATCH(request, { params }) {
  const { id: raw } = await params;
  const id = parseId(raw);

  if (id === null) {
    return NextResponse.json({ errors: { form: "Submission not found." } }, { status: 404 });
  }

  const auth = checkAdminToken(request);

  if (!auth.ok) {
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  if (typeof parsed.body.read !== "boolean") {
    return NextResponse.json(
      { errors: { form: "The read field must be true or false." } },
      { status: 400 }
    );
  }

  const result = await setSubmissionRead(id, parsed.body.read);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const { id: raw } = await params;
  const id = parseId(raw);

  if (id === null) {
    return NextResponse.json({ errors: { form: "Submission not found." } }, { status: 404 });
  }

  const auth = checkAdminToken(request);

  if (!auth.ok) {
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const result = await deleteSubmission(id);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
