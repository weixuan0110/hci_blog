import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { BlogMetadata } from "./schemas/blog";
import { CardMetadata } from "./schemas/card";
import { DoodleMetadata } from "./schemas/doodle";
import { SlideMetadata } from "./schemas/slide";

const blogs = defineCollection({
  loader: glob({
    base: "./src/content/blogs",
    pattern: "**/[0-9][0-9][0-9][0-9]-[0-9][0-9]/*.{md,mdx}",
  }),
  schema: BlogMetadata,
});

const slides = defineCollection({
  loader: glob({
    base: "./src/content/slides",
    pattern: "**/[0-9][0-9][0-9][0-9]-[0-9][0-9]/*.{md,mdx}",
  }),
  schema: SlideMetadata,
});

const cards = defineCollection({
  loader: glob({
    base: "./src/content/cards",
    pattern: "**/[0-9][0-9][0-9][0-9]-[0-9][0-9]/*.{md,mdx}",
  }),
  schema: CardMetadata,
});

const doodles = defineCollection({
  loader: glob({
    base: "./src/content/doodles",
    pattern: "**/[0-9][0-9][0-9][0-9]-[0-9][0-9]/*.{md,mdx}",
  }),
  schema: DoodleMetadata,
});

export const collections = { blogs, slides, cards, doodles };
