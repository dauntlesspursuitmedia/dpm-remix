import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PropsWithChildren } from "react";
import { UiComponentRef } from "~/components/modules/UiComponentRef";

export const components: PortableTextComponents = {
  types: {
    richText: (props) => <PortableText value={props.value.content || []}  />,
    uiComponentRef: (props) => <UiComponentRef {...props.value} />,
  },
  block: {
    normal: (props) => <p className="max-w-prose w-full ">{props.children}</p>,
    blockquote: ({ children, value }) => (
      <blockquote className=" border-l-4 border-red-500 ml-8 my-8 flex flex-col items-center @md:max-w-prose @md:mx-auto @md:text-2xl @6xl:text-3xl">
        <p className="mb-0 text-black/60 italic text-center text pl-8 ">
          "{children}"
        </p>
      </blockquote>
    ),
  },
  marks: {
    code: ({ children }: PropsWithChildren) => {
      const isBBB = children
        ?.filter((child) => typeof child === `string`)
        .map((child: ReactNode) => {
          if (typeof child === `string`) {
            if (child.search(`bbb`) > -1) return true;
            return false;
          }
          return true;
        })[0];

      return (
        <div
          dangerouslySetInnerHTML={{ __html: `${children}` }}
          className={` mx-auto w-full ${isBBB ? "flex justify-center" : ""}`}
        />
      );
    },
  },
};
