import { ProjectDoc } from "types/project";
import { SanityImage } from "./SanityImage";
import { JsonPreview } from "./JsonPreview";

export const ProjectCard = ({
  categories,
  title,
  excerpt,
  mainImage,
  slug,
}: ProjectDoc) => {
  return (
    <article className=" relative @lg:flex @lg:items-center">
      {/* <JsonPreview data={mainImage} /> */}
      <SanityImage value={mainImage} width={600} className="z-10  even:order-2 w-full max-w-md" />
      <div className=" relative bg-slate-950 w-11/12 mx-auto @lg:w-max @lg:max-w-prose text-white px-8 py-4 z-20 -mt-8 @lg:-mt-0 @lg:-ml-8 shadow-black shadow-md">
        <h3 className="mt-0 ">{title}</h3>
        {excerpt && <p className="text-sm">{excerpt}</p>}
      <div className="absolute rotate-90 z-30 -right-72 top-0 origin-top-left flex gap-2">
        {categories?.map((category) => {
          return <span className="text-sm  bg-red-800 text-white px-2 py-[1px]"  key={category._id}>{category.title}</span>;
        })}
      </div>
      </div>
    </article>
  );
};
