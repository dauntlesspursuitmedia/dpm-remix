import type { LogoProps } from "sanity";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { colorInput } from "@sanity/color-input";
import {schemaTypes} from "~/sanity/schemas"
import { projectDetails } from "~/sanity/projectDetails";
import { defaultDocumentNode, structure } from "~/sanity/deskStructure";
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["siteConfig"]);

// function CustomLogo(props: LogoProps) {
//   return (
//     <Flex gap={4} direction={"row"} align="center" paddingX={4}>
//       <img src="/static/logo.png" width={100} alt=" " />
//       <Text weight="bold">Dashboard</Text>
//     </Flex>
//   );
// }

export const config =  defineConfig({
  basePath: "/studio", // <-- important that `basePath` matches the route you're mounting your studio from, it applies to both `/pages` and `/app`

  ...projectDetails(),

  plugins: [
    deskTool({ structure, defaultDocumentNode }),
    visionTool(),
    media(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  studio: {
    // components: {
    //   logo: CustomLogo,
    // },
  },
});
