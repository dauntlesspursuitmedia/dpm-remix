import { BadgeCheck } from "lucide-react";
import { defineField, defineType } from "sanity";

export const brand = defineType({
	name: "brand",
	title: "Brands we've worked with",
	type: "document",
	icon: BadgeCheck,
	description: "Brands we've worked with",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "logo",
			title: "Logo",
			type: "image",
			options: {
				hotspot: true,
			},
		}),

		defineField({
			name: "description",
			title: "Description",
			type: "richText",
		}),
	],
});






