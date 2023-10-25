import type { LinksFunction } from "@remix-run/server-runtime";
import type { MetaFunction } from "@vercel/remix";
import { Studio } from "sanity";
import { config } from "sanity.config";
import { Hydrated } from "~/components/Hydrated";

export const meta: MetaFunction = () => {
  return [
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ];
};

export const links: LinksFunction = () => {};

export default function StudioPage() {
  return (
    <Hydrated>
      <Studio config={config} />
    </Hydrated>
  );
}
