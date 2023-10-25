import { WorkflowIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";


export const project = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	icon: WorkflowIcon,
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
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: { type: 'author' },
		}),
		defineField({
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'richText',
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
		})
	],



})
