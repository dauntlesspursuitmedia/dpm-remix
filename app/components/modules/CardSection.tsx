import { PortableText } from "@portabletext/react";
import { z } from "zod";
import { postZ } from "types/post";
import { ctaZ } from "types/shared";
import { projectZ } from "types/project";
import { serviceZ } from "types/service";
import groq from "groq";
import { Link } from "@remix-run/react";
import { JsonPreview } from "../JsonPreview";
import { RichText } from "./RichText";
import { ServiceCard } from "../ServiceCard";

export const cardSectionPropsZ = z.object({
  _type: z.literal("cardSection"),
  _key: z.string(),
  heading: z.string().nullish(),
  tagline: z.array(z.any()).nullish(),
  cards: z.array(z.discriminatedUnion("_type", [projectZ, serviceZ, postZ])),
  ctas: z.array(ctaZ).nullish(),
});

export const CardSectionQuery = groq`
	_type == "cardSection" => {
		_type,
		_key,
		heading,
		tagline,
		cards[]->{
			_type,
			_type == "project" => {
				_type,
				title,
				"slug":slug.current,
				_id,
				excerpt

			},
			_type == "post" => {
				_type,
				title,
				"slug":slug.current,
				_id,
				"excerpt": pt::text(body)

			},
			_type == "service" => {
				_type,
				title,
				"slug":slug.current,
				_id,
				description
			}
		}
	}
`;
export type CardSectionProps = z.infer<typeof cardSectionPropsZ>;
export const CardSection = (props: CardSectionProps) => {
  return (
    <section className="py-16 container mx-auto px-8">
      <h2 className="font-bold uppercase mb-8 mt-4">{props.heading}</h2>
      {props.tagline && <RichText content={props.tagline || []} />}
      <div className="flex gap-8 items-start">
        {props?.cards?.map((card) => {
          return (
            <div key={card._id}>
              {card._type === "project" && (
                <div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="max-w-prose">{card?.excerpt}</p>
                  <Link
                    className="border-2 py-2 px-2 rounded-md"
                    to={`/projects/${card.slug}/`}
                  >
                    Learn More
                  </Link>
                </div>
              )}
              {card._type === "post" && (
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.excerpt}</p>
                </div>
              )}
              {card._type === "service" && (
                <ServiceCard  card={card} />
              )}
            </div>
          );
        })}
      </div>
      {/* <JsonPreview {...props} /> */}
    </section>
  );
};
