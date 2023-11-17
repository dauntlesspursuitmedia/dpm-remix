import { json } from "@remix-run/node";
import groq from "groq";
import { brandsZ } from "types/brand";
import { serviceZ } from "types/service";
import { z } from "zod";
import { client } from "~/sanity.server";

export const config = { runtime: "edge" };
export const loader = async () => {
  const services = await client
    .fetch(
      groq`*[_type == "service"]{
		_id,
		_type,
		title,
		"slug":slug.current,
		description
		}`
    )
    .then((res) => (res ? z.array(serviceZ).parse(res) : null));

  if (!services) {
    throw new Response("No brands found...", { status: 404 });
  }

  return json(
    { services: services },
    {
      headers: {
        "Cache-Control":
          "public max-age=3600 s-maxage=3600 stale-while-revalidate=86400",
        "CDN-Cache-Control": "public max-age=86400 ",
      },
    }
  );
};
