const slugify = (text: string): string => {
  if (!text) return "";

  return text
    .trim()
    .replace(/[\u064B-\u065F\u0610-\u061A]/g, "")
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
};

export default slugify;
