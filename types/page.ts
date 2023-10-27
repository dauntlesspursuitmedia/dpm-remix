import { cardSectionPropsZ } from "~/components/modules/CardSection";
import { heroPropsZ, routeStubZ } from "./shared";
import { z } from "zod";
import { uiComponentRefPropsZ } from "~/components/modules/UiComponentRef";
import { ctaSectionPropsZ } from "~/components/modules/CtaSection";
import { columnsPropsZ } from "~/components/modules/Columns";
import { textWithImagePropsZ } from "~/components/modules/TextWithImage";
import { richTextPropsZ } from "~/components/modules/RichText";


export const pageZ = z.object({
  _type: z.literal("page"),
  _id: z.string(),
	modules: z.array(z.discriminatedUnion(
		"_type",
		[
			heroPropsZ,
			richTextPropsZ,
			textWithImagePropsZ,
			columnsPropsZ,
			uiComponentRefPropsZ,
			ctaSectionPropsZ,
			cardSectionPropsZ
		]
	)).nullish(),
  route: routeStubZ,
});

export type PageDoc = z.infer<typeof pageZ>;
