import { DataFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import groq from "groq";
import { pageZ } from "types/page";
import { JsonPreview } from "~/components/JsonPreview";
import { Layout } from "~/components/Layout";
import { Page, PageQuery } from "~/components/Page";
import { parseVercelId } from "~/parse-vercel-id";
import { client } from "~/sanity.server";

export async function loader({ request, params }: DataFunctionArgs) {
  const slug = params.slug;
  const parsedId = parseVercelId(request.headers.get("x-vercel-id"));

  const pageData = await client
    .fetch(
      groq`*[_type == "page" && $slug == route->slug.current][0]{
				_type,
					_id,
				${PageQuery},
				}
			`,
      {
        slug: slug,
      }
    )
    .then((res) => (res ? pageZ.parse(res) : null));

  if (!pageData) {
    throw new Response("No page found...", { status: 404 });
  }

  return json({
    date: new Date().toISOString(),
    page: pageData,
  });
}

export default function SlugRoute() {
  const { page } = useLoaderData<typeof loader>();
  return (
    <Layout>
      <Page modules={page.modules} />
      {/* <JsonPreview data={page} /> */}
    </Layout>
  );
}
