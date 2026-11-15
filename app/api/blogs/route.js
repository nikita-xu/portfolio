import { NextResponse } from "next/server";
import { createPost, listPosts, validateBlogPost } from "@/lib/blogs";
import { readJsonBody } from "@/lib/http";

export async function GET() {
  const result = await listPosts();

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  return NextResponse.json({ blogs: result.blogs });
}

export async function POST(request) {
  const parsed = await readJsonBody(request);

  if (parsed.failure) {
    return NextResponse.json({ errors: { form: parsed.failure } }, { status: 400 });
  }

  const { errors, values } = validateBlogPost(parsed.body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const result = await createPost(values);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 500 });
  }

  return NextResponse.json({ post: result.post }, { status: 201 });
}
