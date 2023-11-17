import type { BrandDoc } from "types/brand";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { SanityImage } from "~/components/SanityImage";
import { JsonPreview } from "../JsonPreview";

export const BrandList = () => {
  const brandFetcher = useFetcher<{ brands: BrandDoc[] }>();

  useEffect(() => {
    if (brandFetcher.state === "idle" && brandFetcher.data == null) {
      brandFetcher.load("/resources/brands");
    }
  }, [brandFetcher]);

  const brands = brandFetcher.data?.brands ?? [];

  return (
    <section className="my-32 container mx-auto">
      <h3 className="text-4xl font-bold mb-6">Brands we've worked with</h3>
      <ul className="flex gap-16  object-contain items-center flex-wrap justify-center">
        {brands?.map(({ title, logo, slug }) => {
          const isOpaque = logo?.asset?.metadata?.isOpaque;

					// if(!logo) return null
          return (
            <li
              key={slug}
              className="flex gap-16 w-48 object-contain items-center flex-wrap justify-center"
            >
              {/* <JsonPreview {...logo} /> */}
              <SanityImage
                value={logo }
								width={400}
                alt={""}
                className={`w-full object-contain ${isOpaque ? "mix-blend-darken" : ""}`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
