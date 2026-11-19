import { NextResponse } from "next/server";
import { createExperience, listExperiences, validateExperienceWithProjects } from "@/lib/experience";
import { logApiRequest, readJsonBody } from "@/lib/http";
import { checkAdminToken } from "@/lib/authorize";

export async function GET() {
  const result = await listExperiences();

  if (!result.ok) {
    logApiRequest("GET", "/api/experiences", 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  logApiRequest("GET", "/api/experiences", 200);
  return NextResponse.json({ experiences: result.experiences });
}

export async function POST(request) {
  const auth = checkAdminToken(request);

  if (!auth.ok) {
    logApiRequest("POST", "/api/experiences", auth.status);
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    logApiRequest("POST", "/api/experiences", 400);
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  const { errors, values } = await validateExperienceWithProjects(parsed.body);

  if (Object.keys(errors).length > 0) {
    logApiRequest("POST", "/api/experiences", 400);
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await createExperience(values);

  if (!result.ok) {
    logApiRequest("POST", "/api/experiences", 500);
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  logApiRequest("POST", "/api/experiences", 201);
  return NextResponse.json({ experience: result.experience }, { status: 201 });
}
