import {
  defer,
  type DataFunctionArgs,
  type LinksFunction,
  type MetaFunction,
} from "@vercel/remix";

import {
  Await,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
	useOutlet,
} from "@remix-run/react";
import mainCss from "~/styles/main.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import inter from "@fontsource-variable/inter/slnt.css";
import nunito from "@fontsource-variable/nunito/wght-italic.css";
import { client } from "./sanity.server";
import groq from "groq";
import { siteConfigNoFrontPage } from "types/siteConfig";
import { Header } from "./components/Header";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Skeleton } from "./components/Skeleton";

export function loader({ request }: DataFunctionArgs) {
  const data = client
    .fetch(
      groq`*[_type == "siteConfig"][0]{
					_id,
					logo,
					footerText,
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

					mobileNavigation[]{
						_key,
						itemName,
						externalLink,
						item->{
							_type,
							_id,
							title,
							"slug":slug.current
						},
					},
					privacyNavigation[]{
						_key,
						itemName,
						externalLink,
						item->{
							_type,
							_id,
							title,
							"slug":slug.current
						},
					},
					socialLinks[]{
						_key,
						platform,
						url
					},
					title,
					url
				}
			`
    )
    .then((res) => (res ? siteConfigNoFrontPage.parse(res) : null));

  return defer({
    data,
  });
}

export function headers() {
  return {
    "Cache-Control":
      "s-max-age=2592000, stale-while-revalidate=86400, stale-if-error=604800",
  };
}
export const meta: MetaFunction<typeof loader> = ({ data: { host } }) => [
  {
    title: "Dauntless Pursuit Media",
  },
];

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: mainCss },
  {
    rel: "stylesheet",
    href: inter,
  },
  {
    rel: "stylesheet",
    href: nunito,
  },
];

export default function App() {
	const outlet = useOutlet()
  const { data } = useLoaderData<typeof loader>();
  const location = useLocation();
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AnimatePresence initial={false} mode="wait">
          <Suspense fallback={<Skeleton />}>
            <Await resolve={data}>
              {(data) => (
                <>
                  <Header navigation={data?.mainNavigation} />
                </>
              )}
            </Await>
            {/* {location.pathname !== "/" && (
              <Header navigation={data?.mainNagivation} />
            )} */}
          </Suspense>
          <NavLink to="/test">Test</NavLink>
          <NavLink to="/">home</NavLink>
					{outlet}
          {/* <Outlet /> */}
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
