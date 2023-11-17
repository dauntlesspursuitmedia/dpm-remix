import { normalizePath } from "~/lib/getUrlPath";
import { PortableText } from "@portabletext/react";

import { z } from "zod";
import { PortableTextZ, ctaZ } from "types/shared";
import groq from "groq";
import { Link } from "@remix-run/react";
import { cn } from "~/lib/misc";

export const ctaSectionPropsZ = z.object({
  _type: z.literal("ctaSection"),
  _key: z.string(),
  backgroundColor: z.object({
		label: z.string(),
		value: z.string(),
	}),
  body: PortableTextZ.nullish(),
  cta: ctaZ.nullish(),
});
export const CtaSectionQuery = groq`
	_type == "ctaSection" => {
		_type,
		_key,
		 backgroundColor {
            label,
            value
          },
		body,
		cta {
			route->{
				"slug": route->slug.current
    	},
			link,
			"buttonColor": buttonColor.label,
			title
		}
	}
`;

export type CTASectionProps = z.infer<typeof ctaSectionPropsZ>;


const brandColors = {
  "gray": "bg-[#f5f5f5]",
  "yellow": "bg-yellow-500",
} as const
export const CtaSection = ({ _key, _type, backgroundColor, body, cta }: CTASectionProps) => {
  return (
    <section
      className={cn(` py-16 `, brandColors[backgroundColor.label as keyof typeof brandColors])}
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
