// define a sanity v3 schema for a blog post
import { BellRingIcon } from 'lucide-react'
import { defineType, defineField } from 'sanity'
export const post = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	icon: BellRingIcon,
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
			of: [{ type: 'reference', to: { type: 'category' } }],
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
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'slug.current',
			media: 'mainImage',
		},
		prepare({ title, subtitle, media }) {
			return {
				title,
				subtitle,
				media,
			}
		}
	},
})

