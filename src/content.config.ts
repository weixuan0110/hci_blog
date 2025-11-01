import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { BlogMetadata } from "./schemas/blog";

const blogs = defineCollection({
  loader: glob({
    base: "./src/content/blogs",
    pattern: "**/[0-9][0-9][0-9][0-9]-[0-9][0-9]/*.{md,mdx}",
  }),
  schema: BlogMetadata,
});

export const collections = { blogs };
