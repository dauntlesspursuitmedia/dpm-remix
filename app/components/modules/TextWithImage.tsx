import { PortableTextZ, imagePropsZ } from "types/shared";
import { PortableText } from "@portabletext/react";
import { z } from "zod"
import { SanityImage } from "../SanityImage";
import groq from "groq";

export const textWithImagePropsZ = z.object({
	_type: z.literal("textWithImage"),
	_key: z.string(),
	imagePlacement: z.enum(["left", "right"]).default("left"),
	image: imagePropsZ.nullish(),
	text: PortableTextZ.nullish(),
})

export const TextWithImageQuery = groq`
	_type == "textWithImage" => {
		_type,
		_key,
		imagePlacement,
		text[],
		image {
			asset->{
				_ref,
				_id,
				assetId,
				metadata {
					lqip,
				}
			}
		}
	}
`;
export type TextWithImageProps = z.infer<typeof textWithImagePropsZ>
export const TextWithImage = ({_key,_type, text, image, imagePlacement}: TextWithImageProps) => {
	return (
		<section className="container mx-auto px-8">
			<div className="flex items-center gap-32 justify-center">
				<div className={`${imagePlacement === "left" ? "order-2" : "order-1"}`}>
					<PortableText value={text || []} />
				</div>
				<SanityImage image={image} className={`w-96 ${imagePlacement === "left" ? "order-1" : "order-2"} `} />
			</div>
		</section>
	)
}
