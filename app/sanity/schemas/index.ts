import { color } from "@sanity/color-input";
import { author } from "./documents/author";
import { category } from "./documents/category";
import { page } from "./documents/page";
import { post } from "./documents/post";
import { project } from "./documents/project";
import { route } from "./documents/route";
import { service } from "./documents/service";
import { siteConfig } from "./documents/siteConfig";
import callToAction from "./objects/callToAction";
import { cardSection } from "./objects/cardSection";
import { brandColors } from "./objects/colorList";
import { column } from "./objects/column";
import { columns } from "./objects/columns";
import { cta } from "./objects/cta";
import { ctaSection } from "./objects/ctaSection";
import { hero } from "./objects/hero";
import { heroContent } from "./objects/heroContent";
import { imageWithCaption } from "./objects/imageWithCaption";
import { internalLink } from "./objects/internalLink";
import { link } from "./objects/link";
import { menuItem } from "./objects/menuItem";
import portableText from "./objects/portableText";
import { richText } from "./objects/richText";
import { seoType } from "./objects/seo";
import { simplePortableText } from "./objects/simplePortableText";
import { socialLink } from "./objects/socialLink";
import textWithImage from "./objects/textWithImage";
import { uiComponentRef } from "./objects/uiComponent";
import { brand } from "./documents/brand";

export const schemaTypes = [
  author,
	category,
	page,
	post,
	project,
	route,
	service	,
	siteConfig,
	callToAction,
	cardSection,
	brandColors,
	column,
	columns,
	cta,
	ctaSection,
	hero,
	heroContent,
	imageWithCaption,
	internalLink,
	link,
	menuItem,
	portableText,
	richText,
	seoType,
	simplePortableText,
	socialLink,
	textWithImage,
	uiComponentRef,
	brand
];
