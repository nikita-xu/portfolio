import { NextResponse } from "next/server";
import { createProject, listProjects, validateProject } from "@/lib/projects";
import { logApiRequest, readJsonBody } from "@/lib/http";
import { checkAdminToken } from "@/lib/authorize";

export async function GET() {
  const result = await listProjects();

  if (!result.ok) {
    logApiRequest("GET", "/api/projects", 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  logApiRequest("GET", "/api/projects", 200);
  return NextResponse.json({ projects: result.projects });
}

export async function POST(request) {
  const auth = checkAdminToken(request);

  if (!auth.ok) {
    logApiRequest("POST", "/api/projects", auth.status);
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    logApiRequest("POST", "/api/projects", 400);
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  const { errors, values } = validateProject(parsed.body);

  if (Object.keys(errors).length > 0) {
    logApiRequest("POST", "/api/projects", 400);
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await createProject(values);

  if (!result.ok) {
    logApiRequest("POST", "/api/projects", 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  logApiRequest("POST", "/api/projects", 201);
  return NextResponse.json({ project: result.project }, { status: 201 });
}
