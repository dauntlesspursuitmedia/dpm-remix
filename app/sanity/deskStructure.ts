import { Cog } from "lucide-react";
import { DefaultDocumentNodeResolver, StructureResolver } from "sanity/desk";

export const structure: StructureResolver = (S) => {
	return S.list()
    .title("Content")
    .items([
      // Pur singleton type has a list item with a custom child
      S.listItem().title("Site Settings").id("siteConfig").icon(Cog).child(
        // Instead of rendering a list of documents, we render a single
        // document, specifying the documentId manually to ensure
        // that we're eding the single insance of the document
        S.document()
          .schemaType("siteConfig")
          .documentId("88832991-c8d7-4f20-9c3f-a9161b3b1bc0")
      ),

			// Regular document types
      S.documentTypeListItem('route').title('Routes'),
      S.documentTypeListItem('page').title('Pages'),
			S.divider(),
			S.documentTypeListItem("author").title("Authors"),
			S.documentTypeListItem("category").title("Categories"),
			S.documentTypeListItem("post").title("Posts"),
			S.divider(),
			S.documentTypeListItem("brand").title("Brands"),
			S.documentTypeListItem("project").title("Projects"),
			S.documentTypeListItem("service").title("Services"),

    ]);
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, getClient }
) => {
  const client = getClient({ apiVersion: "2023-02-22" });

  return S.document().views([S.view.form()]);
};
