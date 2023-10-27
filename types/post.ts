import { z } from "zod";
import { authorZ } from "./author";
import { PortableTextZ, imagePropsZ } from "./shared";
import { categoryZ } from "./category";

export const postZ = z.object({
	_type: z.literal("post"),
	_id: z.string(),
	title: z.string().nullish(),
	slug: z.string().nullish(),
	author: authorZ.nullish(),
	mainImage: imagePropsZ.nullish(),
	categories: z.array(categoryZ).nullish(),
	publishedAt: z.string().datetime().nullish(),
	body: PortableTextZ.nullish(),
	excerpt: z.string().nullish(),
})


export const postsZ = z.array(postZ)
export type PostDoc = z.infer<typeof postZ>
