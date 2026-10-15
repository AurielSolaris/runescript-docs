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

export const collections = { docs };
