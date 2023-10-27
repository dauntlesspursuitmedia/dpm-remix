import { z } from "zod";
import { authorZ } from "./author";
import { PortableTextZ, imagePropsZ } from "./shared";
import { categoryZ } from "./category";

export const projectZ = z.object({
	_type: z.literal("project"),
	_id: z.string(),
	title: z.string().nullish(),
	slug: z.string().nullish(),
	author: authorZ.nullish(),
	image: imagePropsZ.nullish(),
	categories: z.array(categoryZ).nullish(),
	publishedAt: z.string().datetime().nullish(),
	body: PortableTextZ.nullish(),
	excerpt: z.string().nullish(),

})

export const projectsZ = z.array(projectZ)

export type ProjectDoc = z.infer<typeof projectZ>
