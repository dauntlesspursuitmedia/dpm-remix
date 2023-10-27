import { z } from "zod";
import { imagePropsZ } from "./shared";

export const authorZ = z.object({
	name: z.string(),
	slug: z.string().nullish(),
	image: imagePropsZ.nullish(),
	excerpt: z.string().nullish(),
	_id: z.string(),
	_type: z.literal("author"),
})

const authorsZ = z.array(authorZ)

export type Author = z.infer<typeof authorZ>
