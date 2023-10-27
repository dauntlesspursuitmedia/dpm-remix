import { useParams } from "@remix-run/react";
import { JsonPreview } from "~/components/JsonPreview";
import { Layout } from "~/components/Layout";

export default function SlugRoute() {
	return (
		<Layout>
			<JsonPreview data={useParams().slug} />
		</Layout>
	)
}
