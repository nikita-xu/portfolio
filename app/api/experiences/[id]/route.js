import { NextResponse } from "next/server";
import { deleteExperience, getExperience, updateExperience, validateExperience } from "@/lib/experience";
import { logApiRequest, readJsonBody } from "@/lib/http";
import { checkAdminToken } from "@/lib/authorize";

function parseId(raw) {
  const id = Number(raw);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

export async function GET(request, { params }) {
  const { id: raw } = await params;
  const id = parseId(raw);

  if (id === null) {
    logApiRequest("GET", `/api/experiences/${raw}`, 404);
    return NextResponse.json({ errors: { form: "Experience not found." } }, { status: 404 });
  }

  const result = await getExperience(id);

  if (!result.ok) {
    logApiRequest("GET", `/api/experiences/${raw}`, 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  if (result.experience === null) {
    logApiRequest("GET", `/api/experiences/${raw}`, 404);
    return NextResponse.json({ errors: { form: "Experience not found." } }, { status: 404 });
  }

  logApiRequest("GET", `/api/experiences/${raw}`, 200);
  return NextResponse.json({ experience: result.experience });
}

export async function PUT(request, { params }) {
  const { id: raw } = await params;
  const id = parseId(raw);

  if (id === null) {
    logApiRequest("PUT", `/api/experiences/${raw}`, 404);
    return NextResponse.json({ errors: { form: "Experience not found." } }, { status: 404 });
  }

  const auth = checkAdminToken(request);

  if (!auth.ok) {
    logApiRequest("PUT", `/api/experiences/${raw}`, auth.status);
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    logApiRequest("PUT", `/api/experiences/${raw}`, 400);
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  const { errors, values } = validateExperience(parsed.body);

  if (Object.keys(errors).length > 0) {
    logApiRequest("PUT", `/api/experiences/${raw}`, 400);
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await updateExperience(id, values);

  if (!result.ok) {
    logApiRequest("PUT", `/api/experiences/${raw}`, 404);
    return NextResponse.json({ errors: { form: result.message } }, { status: 404 });
  }

  logApiRequest("PUT", `/api/experiences/${raw}`, 200);
  return NextResponse.json({ experience: result.experience });
}

export async function DELETE(request, { params }) {
  const { id: raw } = await params;
  const id = parseId(raw);

  if (id === null) {
    logApiRequest("DELETE", `/api/experiences/${raw}`, 404);
    return NextResponse.json({ errors: { form: "Experience not found." } }, { status: 404 });
  }

  const auth = checkAdminToken(request);

  if (!auth.ok) {
    logApiRequest("DELETE", `/api/experiences/${raw}`, auth.status);
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const result = await deleteExperience(id);

  if (!result.ok) {
    logApiRequest("DELETE", `/api/experiences/${raw}`, 404);
    return NextResponse.json({ errors: { form: result.message } }, { status: 404 });
  }

  logApiRequest("DELETE", `/api/experiences/${raw}`, 200);
  return NextResponse.json({ ok: true });
}
