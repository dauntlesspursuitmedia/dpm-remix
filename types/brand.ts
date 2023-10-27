import { z } from "zod";
import { PortableTextZ, imagePropsZ } from "./shared";

export const brandZ = z.object({
  _id: z.string(),
  _type: z.literal("brand"),
  title: z.string(),
  slug: z.string().nullish(),

  logo: imagePropsZ.nullish(),
  description: PortableTextZ.nullish(),
});

export const brandsZ = z.array(brandZ);

export type BrandDoc = z.infer<typeof brandZ>;
