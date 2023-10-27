import type { Author as AuthorType } from "~/types/author";

export const Author = (props: AuthorType) => {


	return (
    <article className="flex gap-4 items-center">
      {/* <Image
        {...imageProps}
				className="w-48 "
        alt={props.name}
        style={{ height: `auto` }}
        sizes="(max-width: 200px) 100vw, 200px"
				placeholder="blur"
        blurDataURL={props.image?.asset?.metadata?.lqip}
      /> */}
      <div className="">
				<h3 className="text-4xl mb-4 font-bold">{props?.name}</h3>
				<p className="prose max-w-prose">{props?.excerpt}</p>
			</div>
    </article>
  );
}
