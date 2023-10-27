import type { SanityImageSource } from "@sanity/asset-utils";
import type { PortableTextBlock } from "sanity";
import { z } from "zod";

export const PortableTextZ: z.ZodType<PortableTextBlock> = z.any();

export const activityZ = z.object({
  _id: z.string(),
  _createdAt: z.string().nullish(),
  _updatedAt: z.string(),
  image: z.any().nullish(),
  address: z
    .object({
      city: z.string().nullish(),
      state: z.string().nullish(),
      zipcode: z.string().nullish(),
      streetAddress: z.string().nullish(),
    })
    .nullish(),
  content: PortableTextZ,
  name: z.string(),
  website: z.string().url().nullish(),
  slug: z.string().nullish(),
});

export const activitiesZ = z.array(activityZ);

export const routeStubZ = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  _type: z.string().nullish(),
  seo: z
    .object({
      metaTitle: z.string().nullish(),
      metaDescription: z.string().nullish(),
      ogTitle: z.string().nullish(),
      ogDescription: z.string().nullish(),
      ogImage: z.any().nullish(),
    })
    .nullish(),
});

export const ctaZ = z
  .object({
    route: z
      .object({
        slug: z.string().nullish(),
      })
      .optional(),
    link: z.string().nullish().optional(),
    buttonColor: z.string().nullish(),
    title: z.string().nullish(),
  })
  .nullish();

export const extendedImageZ = z.object({
  _id: z.string(),
  _key: z.string(),
  _type: z.string(),
  url: z.string(),
  alt: z.string().nullish(),
  caption: z.string().nullish(),
  asset: z.object({
    _id: z.string(),
    altText: z.string().nullish(),
    description: z.string().nullish(),
    metadata: z
      .object({
        blurHash: z.string().nullish(),
      })
      .nullish(),
  }),
  crop: z
    .object({
      bottom: z.number(),
      left: z.number(),
      right: z.number(),
      top: z.number(),
    })
    .nullish(),
  hotspot: z.object({
    height: z.number(),
    width: z.number(),
    x: z.number(),
    y: z.number(),
  }),
});

export type ExtendedImageType = z.infer<
  typeof extendedImageZ & SanityImageSource
>;

export const imagePropsZ = z.object({
		asset: z.object({
			_ref: z.string().nullish(),
			_id: z.string().nullish(),
			assetId: z.string().nullish(),
			metadata: z.object({
				lqip: z.string().nullish(),
				isOpaque: z.boolean().nullish(),
			}).nullish()
		}).nullish(),
	})

	export const heroPropsZ = z.object({
    _type: z.literal("hero"),
    _key: z.string(),
    heros: z.array(
      z.object({
        title: z.string().nullish(),
        image: imagePropsZ,
        action: z.object({
          actionTitle: z.string().nullish(),
          route: routeStubZ
            .pick({ _id: true, slug: true, title: true })
            .nullish(),
        }),
      })
    ),
  });
