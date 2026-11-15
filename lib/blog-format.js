export function formatBlogDate(iso) {
  if (typeof iso !== "string" || iso.length < 10) {
    return "Unknown date";
  }

  return iso.slice(0, 10);
}

export function formatBlogDateTime(iso) {
  if (typeof iso !== "string" || iso.length < 16) {
    return "Unknown date";
  }

  return `${iso.slice(0, 10)}, ${iso.slice(11, 16)}`;
}

export function formatBlogPreview(content) {
  if (typeof content !== "string") {
    return "";
  }

  const firstParagraph = content.split(/\n+/)[0].trim();

  if (firstParagraph.length <= 140) {
    return firstParagraph;
  }

  return `${firstParagraph.slice(0, 140).trimEnd()}…`;
}
