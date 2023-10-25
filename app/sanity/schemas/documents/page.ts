
import {FileBadgeIcon} from 'lucide-react'
import {defineType, defineField} from 'sanity'
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileBadgeIcon,
  groups: [
    {
      name: 'details',
      title: 'Details',
    },
    {
      name: 'editorial',
      title: 'Editorial',
    },
  ],
  fields: [
    defineField({
      name: 'route',
      type: 'reference',
      to: {
        type: 'route',
      },
    }),
    defineField({
      name: 'modules',
      type: 'array',
      title: 'Page Modules',
      of: [
        {
          type: 'hero',
        },
        {
          type: 'richText',
        },
        {
          type: 'textWithImage',
        },
        {type: 'cardSection'},
        {type: 'ctaSection'},
        {
          type: 'columns',
        },
				{
					type: 'uiComponentRef'
				}
      ],
    }),
  ],
  preview: {
    select: {
      title: 'route.title',
      subtitle: 'route.slug.current',
    },
    prepare: ({title, subtitle}) => {
      return {
        title,
        subtitle: subtitle !== '/' ? `/${subtitle}` : '/',
      }
    },
  },
})
