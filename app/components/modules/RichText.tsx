import { PortableTextZ } from "types/shared";
import { PortableText } from "@portabletext/react";
import { z } from "zod"
import groq from "groq";

export const richTextPropsZ = z.object({
	_type: z.literal("richText"),
	_key: z.string(),
	content: PortableTextZ.nullish(),
})

export const RichTextQuery = groq`
	_type == "richText" => {
		_type,
		_key,
		content[]
	}
`;
export type RichTextProps = z.infer<typeof richTextPropsZ>
export const RichText = ({_key,_type, content}: RichTextProps) => {
	return (
		<section><h1 className="font-bold uppercase">Rich Text</h1>
			<PortableText value={content || []} />
		</section>
	)
}
