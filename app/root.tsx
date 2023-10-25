import type {
  LinksFunction,
  LoaderArgs,
	V2_MetaFunction,
} from "@vercel/remix";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import NavigationSwitcher from "~/nav";

import mainCss from "~/styles/main.css";

export function loader({ request }: LoaderArgs) {
  return {
    host: request.headers.get("x-forwarded-host"),
  };
}

export const meta: V2_MetaFunction<typeof loader> = ({ data: { host } }) => [
  {
    title: "Remix on Vercel Edge Functions",
  },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: mainCss,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavigationSwitcher />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
