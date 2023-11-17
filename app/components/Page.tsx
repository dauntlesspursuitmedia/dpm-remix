import type { PageDoc } from "types/page";

// import {  HeroSectionQuery } from "./modules/Hero";
import { CardSectionQuery } from "./modules/CardSection";
import { ColumnsQuery } from "./modules/Columns";
import { CtaSectionQuery } from "./modules/CtaSection";
import { RichTextQuery } from "./modules/RichText";
import { TextWithImageQuery } from "./modules/TextWithImage";
import { UiComponentQuery, UiComponentRef } from "./modules/UiComponentRef";
import groq from "groq";
import { JsonPreview } from "./JsonPreview";
import React, { Suspense } from "react";
import { ImageQuery } from "~/lib/misc";

export const HeroSectionQuery = groq`
	_type == "hero" => {
		_type,
		_key,
		heros[] {
			title,
			image {
       ${ImageQuery}
			},
			action {
				actionTitle,
				route-> {
					_type,
					_key,
					"slug":slug.current,
					title,
					_id,
				}
			}
		}
	}
`;

// type guard function to check for _key
function hasKey(module: unknown): module is PageDoc["modules"][0] {
  return (
    Boolean(module) &&
    typeof module === "object" &&
    typeof (module as PageDoc["modules"][0])._type === "string" &&
    typeof (module as PageDoc["modules"][0])._key === "string"
  );
}
export const PageQuery = groq`
	_id,
	_type,
	_key,
	title,
	route->{
		"slug": slug.current,
		title,
		_id,
		_key,
		_type
	},
	modules[]{
		${HeroSectionQuery},
		${CardSectionQuery},
		${ColumnsQuery},
		${CtaSectionQuery},
		${RichTextQuery},
		${TextWithImageQuery},
		${UiComponentQuery}
	}
`;

const lookup = {
  hero: React.lazy(async () => {
    const { HeroSection: Component } = await import(
      "~/components/modules/Hero"
    );
    return {
      default: Component,
    };
  }),
  cardSection: React.lazy(async () => {
    const { CardSection: Component } = await import(
      "~/components/modules/CardSection"
    );
    return {
      default: Component,
    };
  }),
  columns: React.lazy(async () => {
    const { ColumnsSection: Component } = await import(
      "~/components/modules/Columns"
    );
    return {
      default: Component,
    };
  }),
  ctaSection: React.lazy(async () => {
    const { CtaSection: Component } = await import(
      "~/components/modules/CtaSection"
    );
    return {
      default: Component,
    };
  }),
  richText: React.lazy(async () => {
    const { RichText: Component } = await import(
      "~/components/modules/RichText"
    );
    return {
      default: Component,
    };
  }),
  textWithImage: React.lazy(async () => {
    const { TextWithImage: Component } = await import(
      "~/components/modules/TextWithImage"
    );
    return {
      default: Component,
    };
  }),
  uiComponentRef: UiComponentRef /* React.lazy(async () => {
    const { UiComponentRef: Component } = await import(
      "~/components/modules/UiComponentRef"
    );
    return {
      default: Component,
    };
  }), */
} as const;

export const Page = ({ modules }: { modules: PageDoc["modules"] }) => {
  return (
    <>
      {modules?.map((module, idx) => {
        const Component = lookup[module._type];

        if (module?._key) {
          return (
            <Suspense key={idx} fallback={<div>Loading...</div>}>
              <Component  {...module} />
            </Suspense>
          );
        }

        return null;
      })}
    </>
  );
};
