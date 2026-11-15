import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

// The front matter a page can carry beyond Starlight's own keys.
// See CONTRIBUTING.md.
const facets = z.object({
  type: z
    .enum(["atlas", "overview", "structure", "method", "fundamental", "how-to", "worked-example", "tutorial", "tool", "reference"])
    .optional(),
  // A tutorial page lists its parts, in order, under a `## <tutorial>` heading.
  tutorial: z.string().optional(),
  eurocode: z.string().optional(),
  stage: z.array(z.string()).optional(),
  analysis_types: z.array(z.string()).optional(),
  methods: z.array(z.string()).optional(),
  uses: z.array(z.string()).optional(),
  date: z.coerce.date().optional(),
  // Citekeys rehype-citation lists in the page's references without a citation;
  // ["@*"] lists all of bibliography.json, as reference/bibliography.md does.
  noCite: z.array(z.string()).optional(),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: facets }) }),
};
