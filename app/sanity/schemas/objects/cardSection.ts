import { List } from 'lucide-react'
import { defineField } from 'sanity'
import { defineType } from 'sanity'

export const cardSection = defineType({
  name: 'cardSection',
  title: 'Card Section',
  type: 'object',
	icon: List,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'simplePortableText',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' },{type: 'project'}, {type: 'service'}],
        },
      ],
    }),

    defineField({
      name: 'ctas',
      title: 'Call to actions',
      type: 'array',
      of: [{ type: 'cta', title: 'Call to action' }],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title as string,
        subtitle: `Card Section`,
      }
    },
  },
})
