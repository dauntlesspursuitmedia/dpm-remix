import type { BrandDoc } from "types/brand";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { SanityImage } from "~/components/SanityImage";
import { JsonPreview } from "../JsonPreview";

export const BrandList = () => {
  const brandFetcher = useFetcher<{ brands: BrandDoc[] }>();

  useEffect(() => {
    if (brandFetcher.type === "init") {
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
          console.log(isOpaque);
          return (
            <li
              key={slug}
              className="flex gap-16  object-contain items-center flex-wrap justify-center"
            >
              {/* <JsonPreview {...logo} /> */}
              <SanityImage
                value={logo}
								width={400}
                alt={""}
                className={`w-48 ${isOpaque ? "mix-blend-darken" : ""}`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
