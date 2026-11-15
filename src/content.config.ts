import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

// The front matter a page can carry beyond Starlight's own keys.
// See src/content/docs/contributing/index.md.
const facets = z.object({
  type: z
    .enum(["atlas", "hub", "structure", "ground", "fundamental", "how-to", "case-study", "tutorial", "tool", "reference", "contributing"])
    .optional(),
  // A tutorial page lists its parts, in order, under a `## <tutorial>` heading.
  tutorial: z.string().optional(),
  eurocode: z.string().optional(),
  stage: z.array(z.string()).optional(),
  analysis_types: z.array(z.string()).optional(),
  methods: z.array(z.string()).optional(),
  uses: z.array(z.string()).optional(),
  date: z.coerce.date().optional(),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: facets }) }),
};
