export function loadDraft(key) {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  return Promise.resolve().then(() => {
    try {
      const raw = window.localStorage.getItem(`admin-draft:${key}`);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  });
}

export function saveDraft(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(`admin-draft:${key}`, JSON.stringify(value));
  } catch {
    return;
  }
}

export function clearDraft(key) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(`admin-draft:${key}`);
  } catch {
    return;
  }
}
