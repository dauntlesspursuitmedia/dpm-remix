import { normalizePath } from "~/lib/getUrlPath";
import { PortableText } from "@portabletext/react";

import { z } from "zod";
import { PortableTextZ, ctaZ } from "types/shared";
import groq from "groq";
import { Link } from "@remix-run/react";

export const ctaSectionPropsZ = z.object({
  _type: z.literal("ctaSection"),
  _key: z.string(),
  backgroundColor: z.string().nullish(),
  body: PortableTextZ.nullish(),
  cta: ctaZ.nullish(),
});
export const CtaSectionQuery = groq`
	_type == "ctaSection" => {
		_type,
		_key,
		"backgroundColor": backgroundColor.hex,
		body,
		cta {
			route->{
				"slug":slug.current,
			},
			link,
			"buttonColor": buttonColor.hex,
			title
		}
	}
`;

export type CTASectionProps = z.infer<typeof ctaSectionPropsZ>;


const brandColors = {
  "#f5f5f5": "bg-[#f5f5f5]",
  "#fcc764": "bg-[#fcc764]",
} as const
export const CtaSection = ({ _key, _type, backgroundColor, body, cta }: CTASectionProps) => {
	console.log({backgroundColor, cta})
  return (
    <section
      className={` py-16 ${
        brandColors[backgroundColor as keyof typeof brandColors]
      } `}
    >
      <div className="container mx-auto px-8 flex flex-wrap gap-8 text-white items-center justify-center">
        {body && <PortableText value={body} />}
        {cta && (
          <Link
            className={` px-8 py-4 text-black ${
              brandColors[cta?.buttonColor as keyof typeof brandColors]
            }`}
            to={normalizePath(cta.route?.slug ?? cta?.link ?? "")}
          >
            {cta?.title}
          </Link>
        )}
      </div>
    </section>
  );
};
