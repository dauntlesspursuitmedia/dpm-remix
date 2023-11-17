import { z } from "zod";
import { PortableTextZ } from "./shared";
import { richTextPropsZ } from "~/components/modules/RichText";

export const serviceZ = z.object({
  _type: z.literal("service"),
  _id: z.string(),
  title: z.string().nullish(),
  slug: z.string().nullish(),
  description: z
    .object({
      _type: z.literal("richText"),
      content: PortableTextZ.nullish(),
    })
    .nullish(),
});


export type ServiceDoc = z.infer<typeof serviceZ>
