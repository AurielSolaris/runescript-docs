import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(["Guide", "Reference", "Project"]),
    order: z.number(),
    source: z.string(),
    summary: z.string(),
  }),
});

// Translated guide pages, one folder per language (bn/, heb/); ids are "bn/trace".
// page "" is the guide index.
const translations = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/translations" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    order: z.number(),
    page: z.string(),
    source: z.string(),
  }),
});

export const collections = { docs, translations };
