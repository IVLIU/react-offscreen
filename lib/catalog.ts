import { createCatalog, generateCatalogPrompt } from "@json-render/core";
import { z } from "zod";

export const catalog = createCatalog({
  components: {
    Activity: {
      props: z.object({
        mode: z.enum(["visible", "hidden"]).default("visible"),
      }),
      hasChildren: true,
      description: "This is a component that keeps its state while hiding it",
    },
    Offscreen: {
      props: z.object({
        mode: z.enum(["visible", "hidden"]).default("visible"),
      }),
      hasChildren: true,
      description:
        "This is a component that keeps its state while hiding it, please rename Offscreen to Activity",
    },
  },
});

export const prompt = generateCatalogPrompt(catalog);
