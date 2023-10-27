import { z } from "zod";
import { PortableTextZ } from "./shared";

export const serviceZ = z.object({
	_type: z.literal("service"),
	_id: z.string(),
	title: z.string().nullish(),
	slug: z.string().nullish(),
	description: PortableTextZ.nullish(),
})


export type ServiceDoc = z.infer<typeof serviceZ>
