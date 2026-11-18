import { NextResponse } from "next/server";
import { deleteProject, getProject, updateProject, validateProject } from "@/lib/projects";
import { logApiRequest, readJsonBody } from "@/lib/http";
import { checkAdminToken } from "@/lib/authorize";

export async function GET(request, { params }) {
  const { slug } = await params;
  const result = await getProject(slug);

  if (!result.ok) {
    logApiRequest("GET", `/api/projects/${slug}`, 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  if (!result.project) {
    logApiRequest("GET", `/api/projects/${slug}`, 404);
    return NextResponse.json({ errors: { form: "Project not found." } }, { status: 404 });
  }

  logApiRequest("GET", `/api/projects/${slug}`, 200);
  return NextResponse.json({ project: result.project });
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  const auth = checkAdminToken(request);

  if (!auth.ok) {
    logApiRequest("PUT", `/api/projects/${slug}`, auth.status);
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    logApiRequest("PUT", `/api/projects/${slug}`, 400);
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  const { errors, values } = validateProject(parsed.body);

  if (Object.keys(errors).length > 0) {
    logApiRequest("PUT", `/api/projects/${slug}`, 400);
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await updateProject(slug, values);

  if (!result.ok) {
    logApiRequest("PUT", `/api/projects/${slug}`, 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  logApiRequest("PUT", `/api/projects/${slug}`, 200);
  return NextResponse.json({ project: result.project });
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  const auth = checkAdminToken(request);

  if (!auth.ok) {
    logApiRequest("DELETE", `/api/projects/${slug}`, auth.status);
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const result = await deleteProject(slug);

  if (!result.ok) {
    logApiRequest("DELETE", `/api/projects/${slug}`, result.message === "Project not found." ? 404 : 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: result.message === "Project not found." ? 404 : 500 });
  }

  logApiRequest("DELETE", `/api/projects/${slug}`, 200);
  return NextResponse.json({ ok: true });
}
