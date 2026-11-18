import { NextResponse } from "next/server";
import { deletePost, updatePost, validateBlogPost } from "@/lib/blogs";
import { readJsonBody } from "@/lib/http";
import { checkAdminToken } from "@/lib/authorize";

export async function PUT(request, { params }) {
  const { slug } = await params;

  const auth = checkAdminToken(request);

  if (!auth.ok) {
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  const { errors, values } = validateBlogPost(parsed.body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await updatePost(slug, values);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 404 });
  }

  return NextResponse.json({ post: result.post });
}

export async function DELETE(request, { params }) {
  const { slug } = await params;

  const auth = checkAdminToken(request);

  if (!auth.ok) {
    return NextResponse.json({ errors: { form: auth.message } }, { status: auth.status });
  }

  const result = await deletePost(slug);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
