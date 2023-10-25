import { SquareStack } from "lucide-react";
import { defineField, defineType } from "sanity";

export const category = defineType({
	name: 'category',
	title: 'Category',
	type: 'document',
	icon: SquareStack,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'categoryImage',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title'
			}
		}),

	],
	preview: {
		select: {
			title: "title",
			subtitle: "slug.current",
			media: "categoryImage"
		},
		prepare: ({title, subtitle, media}) => {
			return {
				title,
				subtitle,
				media
			}
		}
	}
})
