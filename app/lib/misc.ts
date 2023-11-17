import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import groq from "groq";
export const projectDetails = {
  projectId: import.meta.env.SANITY_PROJECT_ID ?? "sd6anpfo",
  dataset: import.meta.env.SANITY_DATASET ?? "development",
  token:
    import.meta.env.SANITY_READ_TOKEN ??
    "skcg4wITWNneE1k1rRkF0Kp5whCmxM1oEnV4okj6p02JCYH5qacm3IXIjD10KIJg1wwBT38Lkb5MuYMvAdz9thHP7j0mANlPlMFjR49DwZC8CQL0JlpaJh5C6aLL0mXe7TRYetSXQmK2chCXztZ8pSNdgMMPk14gVN26lcK6fZD62ZZla2Gl",
  perspective: "published",
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const ImageQuery = groq`
	asset->{
		_ref,
		_id,
		altText,
		assetId,
		metadata {
			lqip,
		}
	}
`;
