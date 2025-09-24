// Validation helper functions

export function validateTitle(title) {
  if (!title || title.trim().length < 3) {
    return "Title must be at least 3 characters long.";
  }
  return null;
}

export function validateContent(content) {
  if (!content || content.trim().length < 10) {
    return "Content must be at least 10 characters long.";
  }
  return null;
}

export function validateTags(tags) {
  if (!tags) return null;
  const arr = tags.split(",").map((t) => t.trim()).filter(Boolean);
  if (arr.length > 5) {
    return "You can add a maximum of 5 tags.";
  }
  return null;
}
