import { Suspense } from "react";
import type { DataFunctionArgs } from "@vercel/remix";
import { defer } from "@vercel/remix";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { parseVercelId } from "~/parse-vercel-id";
import { Layout } from "~/components/Layout";
import { Page, PageQuery } from "~/components/Page";
import { client } from "~/sanity.server";
import groq from "groq";
import { siteConfigZ } from "types/siteConfig";
import { Header } from "~/components/Header";
import { Skeleton } from "~/components/Skeleton";

export const config = { runtime: "edge" };

let isCold = true;
let initialDate = Date.now();

export async function loader({ request }: DataFunctionArgs) {
  const wasCold = isCold;
  isCold = false;

  const parsedId = parseVercelId(request.headers.get("x-vercel-id"));

	const pageData = client
		.fetch(
			groq`*[_type == "siteConfig"][0]{
				_type,
					_id,
					frontpage->{
						${PageQuery},
					}
				}
			`
		)
		.then((res) =>
			res
				? siteConfigZ
						.pick({
							frontpage: true,
							_id: true,
							_type: true,
						})
						.parse(res)
				: null
		);
  const headerData = await client
    .fetch(
      groq`*[_type == "siteConfig"][0]{
				_type,
				_id,
				mainNavigation[]{
					_key,
					itemName,
					externalLink,
					item->{
						_id,
						title,
						_type,
						"slug":slug.current
					},
					nestedRoutes[]{
						_key,
						itemName,
						externalLink,
						item->{
							_id,
							_type,
							title,
							"slug":slug.current
						}
					}
				},
			}
		`
    )
    .then((res) =>
      res
        ? siteConfigZ
            .pick({
              _id: true,
              _type: true,
              mainNavigation: true,
            })
            .parse(res)
        : null
    );


  return defer({
    isCold: wasCold,
    proxyRegion: sleep(parsedId.proxyRegion, 1000),
    computeRegion: sleep(parsedId.computeRegion, 1500),
    date: new Date().toISOString(),
    headerData,
    pageData,
  });
}

function sleep(val: any, ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export function headers() {
  return {
    "x-edge-age": Date.now() - initialDate,
    "Cache-Control":
      "s-max-age=3600, stale-while-revalidate=86400, stale-if-error=604800",
  };
}

export default function App() {
  const { proxyRegion, computeRegion, isCold, date, pageData, headerData } =
    useLoaderData<typeof loader>();
  return (
    <Layout>
      <section className="hero-gradient pb-8 ">
        <Suspense fallback={<Skeleton />}>
          <Await resolve={headerData}>
            {(headerData) => (
              <>
                <Header navigation={headerData?.mainNavigation} />
              </>
            )}
          </Await>

        </Suspense>
        <div className="container  mx-auto px-8">
          <div className="@container max-w-[740px]">
            <h1 className="text-[12cqmin] mt-8 font-semibold text-white  leading-none">
              Unlock Your Online Potential
            </h1>
            <p className="ml-4 max-w-prose text-white">
              At Dauntless Pursuit Media, we understand the power of a strong
              online presence. In today's digital age, having a compelling
              website is crucial for businesses of all sizes to stand out and
              thrive. We believe that your website should be a unique
              representation of your brand, tailored to engage your target
              audience and drive tangible results.
            </p>
            <div className="flex justify-start gap-8 my-8">
              <Link
                className="bg-yellow-300 hover:bg-yellow-200 px-4 py-2 rounded-lg inline-block"
                to="/contact/"
              >
                Let's Talk!
              </Link>
              <Link
                className="border text-white border-white  px-4 py-2 rounded-lg inline-block hover:bg-white focus:bg-white focus:text-black hover:text-black transition-colors"
                to="/portfolio/"
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<Skeleton />}>
        <Await resolve={pageData}>
          {(pageData) => <Page modules={pageData?.frontpage?.modules || []} />}
        </Await>
      </Suspense>
    </Layout>
  );
}
