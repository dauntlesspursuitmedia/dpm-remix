import { z } from "zod";
import { routeStubZ } from "./shared";
import { pageZ } from "./page";

export const menuItemZ = z.object({
  _key: z.string(),
  _type: z.string().nullish(),
  item: routeStubZ.nullish(),
  externalLink: z.string().nullish(),
  itemName: z.string().nullish(),
});

export const siteConfigZ = z.object({
  _id: z.string(),
  title: z.string(),
  url: z.string().nullish(),
  logo: z.object({
    _type: z.literal("image"),
    asset: z
      .object({
        _ref: z.string().nullish(),
        _id: z.string().nullish(),
        assetId: z.string().nullish(),
        metadata: z
          .object({
            lqip: z.string().optional(),
          })
          .nullish(),
      })
      .nullish(),
  }),
  frontpage: pageZ,
  mainNavigation: z.array(
    menuItemZ.extend({
      nestedRoutes: z.array(menuItemZ).nullish(),
    })
  ),
  mobileNavigation: z.array(menuItemZ.nullish()),
  privacyNavigation: z.array(menuItemZ.nullish()).nullish(),
  footerText: z.array(z.any()).nullish(),
  socialLinks: z.array(
    z.object({
      _key: z.string(),
      platform: z.string(),
      url: z.string(),
    })
  ),
});

export const siteConfigNoFrontPage = siteConfigZ.omit({frontpage: true})


export type SiteConfigDoc = z.infer<typeof siteConfigZ>;
