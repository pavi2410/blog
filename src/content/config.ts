import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.string().transform((str) => new Date(str)),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
