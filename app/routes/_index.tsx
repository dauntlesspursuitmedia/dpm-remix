import { Suspense } from 'react';
import type { DataFunctionArgs} from '@vercel/remix';
import { defer } from '@vercel/remix';
import { Await, useLoaderData } from '@remix-run/react';

import { Footer } from '~/components/footer';
import { Region } from '~/components/region';
import { parseVercelId } from '~/parse-vercel-id';
import { Layout } from '~/components/Layout';

export const config = { runtime: 'edge' };

let isCold = true;
let initialDate = Date.now();

export async function loader({ request }: DataFunctionArgs) {
  const wasCold = isCold;
  isCold = false;

  const parsedId = parseVercelId(request.headers.get("x-vercel-id"));

  return defer({
    isCold: wasCold,
    proxyRegion: sleep(parsedId.proxyRegion, 1000),
    computeRegion: sleep(parsedId.computeRegion, 1500),
    date: new Date().toISOString(),
  });
}

function sleep(val: any, ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export function headers() {
  return {
    'x-edge-age': Date.now() - initialDate,
  };
}

export default function App() {
  const { proxyRegion, computeRegion, isCold, date } = useLoaderData<typeof loader>();
  return (
   <Layout>
			<h1>test from the layout</h1>
	 </Layout>
  );
}
