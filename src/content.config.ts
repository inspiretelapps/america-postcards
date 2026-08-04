import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const blockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("prose"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("heading"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("photo"),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("gallery"),
    images: z.array(imageSchema).min(1),
  }),
  z.object({
    type: z.literal("video"),
    src: z.string(),
    poster: z.string(),
    caption: z.string().optional(),
    duration: z.string().optional(),
  }),
]);

const journal = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    location: z.string(),
    author: z.string().default("Jaco"),
    /** Higher = newer / earlier in the journal list. */
    rank: z.number(),
    blocks: z.array(blockSchema),
  }),
});

const reel = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/reel" }),
  schema: z.object({
    kind: z.enum(["photo", "video"]),
    src: z.string(),
    poster: z.string().optional(),
    alt: z.string().optional(),
    caption: z.string(),
    duration: z.string().optional(),
    stamp: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { journal, reel };
