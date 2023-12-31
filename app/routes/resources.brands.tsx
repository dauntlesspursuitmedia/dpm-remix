import { json } from "@remix-run/node";
import groq from "groq";
import { brandsZ } from "types/brand";
import { ImageQuery } from "~/lib/misc";
import { client } from "~/sanity.server";

export const config = { runtime: "edge" };

export const loader = async () => {
  const brands = await client
    .fetch(
      groq`*[_type == "brand"]{
		_id,
		_type,
		title,
		"slug":slug.current,
		description[],
		logo {
			${ImageQuery}
		}	}`
    )
    .then((res) => (res ? brandsZ.parse(res) : null));

  if (!brands) {
    throw new Response("No brands found...", { status: 404 });
  }

  return json(
    { brands },
    {
      headers: {
        "Cache-Control":
          "public max-age=3600 s-maxage=3600 stale-while-revalidate=86400",
        "CDN-Cache-Control": "public max-age=86400 ",
      },
    }
  );
};
