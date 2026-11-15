import { NextResponse } from "next/server";
import { deletePost } from "@/lib/blogs";

export async function DELETE(request, { params }) {
  const { slug } = await params;

  const result = await deletePost(slug);

  if (!result.ok) {
    return NextResponse.json({ errors: { form: result.message } }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
