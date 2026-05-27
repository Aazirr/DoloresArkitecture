import { projects, services, blog } from "@/.velite";

// ─── Projects ─────────────────────────────────────────────────────────────────

export function getAllProjects() {
  return projects.sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects() {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getProjectSlugs() {
  return projects.map((p) => p.slug);
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function getAllServices() {
  return services.sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export function getAllPosts(includeDrafts = false) {
  const posts = blog.filter((p) => includeDrafts || !p.draft);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string) {
  return blog.find((p) => p.slug === slug && !p.draft) ?? null;
}

export function getPostsByTag(tag: string) {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getAllTags() {
  return [...new Set(blog.flatMap((p) => p.tags))].sort();
}
