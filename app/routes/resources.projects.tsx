import { json } from "@remix-run/node";
import groq from "groq";
import { brandsZ } from "types/brand";
import { projectZ } from "types/project";
import { serviceZ } from "types/service";
import { z } from "zod";
import { ImageQuery } from "~/lib/misc";
import { client } from "~/sanity.server";

export const config = { runtime: "edge" };
export const loader = async () => {
  const projects = await client
    .fetch(
      groq`*[_type == "project"]{
		_id,
		_type,
		title,
		"slug":slug.current,
		author->{
			_id,
			_type,
			name,
			"slug":slug.current,
			image {
				${ImageQuery}
			}
		},
		mainImage {
			${ImageQuery}
		},
		categories[]->{
			_id,
			_type,
			title,
			"slug":slug.current,
		},
		body,
		excerpt
		}`
    )
    .then((res) => (res ? z.array(projectZ).parse(res) : null));

  if (!projects) {
    throw new Response("No projects found...", { status: 404 });
  }

  return json(
    {  projects },
    {
      headers: {
        "Cache-Control":
          "public max-age=3600 s-maxage=3600 stale-while-revalidate=86400",
        "CDN-Cache-Control": "public max-age=86400 ",
      },
    }
  );
};
