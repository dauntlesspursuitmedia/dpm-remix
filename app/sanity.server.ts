
import { createClient } from "@sanity/client";



export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? "sd6anpfo",
  dataset: import.meta.env.SANITY_DATASET ?? "development",
  apiVersion: "2023-07-07",
  useCdn: import.meta.env.NODE_ENV === "production",
  perspective: "published",
  token:
    import.meta.env.SANITY_READ_TOKEN ??
    "skcg4wITWNneE1k1rRkF0Kp5whCmxM1oEnV4okj6p02JCYH5qacm3IXIjD10KIJg1wwBT38Lkb5MuYMvAdz9thHP7j0mANlPlMFjR49DwZC8CQL0JlpaJh5C6aLL0mXe7TRYetSXQmK2chCXztZ8pSNdgMMPk14gVN26lcK6fZD62ZZla2Gl",
});

// wrap the cache function in a way that reuses the TS bindings
// export const clientFetch = cache(client.fetch.bind(client))?

// Now use it just like before, fully deduped, cached and optimized by react

