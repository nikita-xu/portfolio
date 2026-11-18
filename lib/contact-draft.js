const DRAFT_PREFIX = "contact-form-draft:";

const emptyDraft = { name: "", email: "", message: "" };

function normalizeDraft(draft) {
  return {
    name: typeof draft?.name === "string" ? draft.name : "",
    email: typeof draft?.email === "string" ? draft.email : "",
    message: typeof draft?.message === "string" ? draft.message : "",
  };
}

export function loadContactDraft(formKey) {
  if (typeof window === "undefined") {
    return Promise.resolve({ ...emptyDraft });
  }

  return Promise.resolve().then(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_PREFIX + formKey);
      return normalizeDraft(raw ? JSON.parse(raw) : {});
    } catch {
      return { ...emptyDraft };
    }
  });
}

export function saveContactDraft(formKey, values) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      DRAFT_PREFIX + formKey,
      JSON.stringify(normalizeDraft(values))
    );
  } catch {
    return;
  }
}
