
import { createClient } from "@sanity/client";

export const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID!,
	dataset: process.env.SANITY_DATASET!,
	apiVersion: "2023-07-07",
	useCdn: process.env.NODE_ENV === "production",
	perspective:"published" ,
	token: process.env.SANITY_READ_TOKEN,
})

// wrap the cache function in a way that reuses the TS bindings
// export const clientFetch = cache(client.fetch.bind(client))?

// Now use it just like before, fully deduped, cached and optimized by react

