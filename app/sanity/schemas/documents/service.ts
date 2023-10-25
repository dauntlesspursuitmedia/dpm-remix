import { Boxes } from "lucide-react";
import { defineField, defineType } from "sanity";

export const service = defineType({
	name: 'service',
	title: 'Service',
	type: 'document',
	icon: Boxes,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			title: 'Slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'richText',
		}),
	]
})
