import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { defined } from "@shared/defined";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.published !== true) {
    return undefined;
  }

  type Post = {
    [key: string]: string;
  };

  const post: Post = {};

  fields.forEach((field) => {
    if (field === "slug") {
      post[field] = realSlug;
    }

    if (field === "content") {
      post[field] = content;
    }

    if (data[field]) {
      post[field] = data[field];
    }
  });

  return post;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();

  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => post !== undefined)
    .filter(defined)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
