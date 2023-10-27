import { z } from "zod";
import { imagePropsZ } from "./shared";

export const categoryZ = z.object({
	_id: z.string(),
	_type: z.literal("category"),
	title: z.string().nullish(),
	slug: z.string().nullish(),
	categoryImage: imagePropsZ.nullish(),
})


export const categoriesZ = z.array(categoryZ)
export type CategoryDoc = z.infer<typeof categoryZ>
