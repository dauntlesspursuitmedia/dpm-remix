import {Hammer} from 'lucide-react'
import {defineField, defineType} from 'sanity'
export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: Hammer,
  fields: [
    defineField({
      name: 'heros',
      title: 'Hero Content',
      description: 'The large image at the top of the homepage',
      type: 'array',
			of: [{type: 'heroContent'}]

      // hidden: ({ document, parent }) => {
      // 	console.log({document, parent})
      // 	return (!document?._id.includes("home") ? true : false)},
    }),
  ],
  preview: {
    select: {
      title: 'heros.0.title',
      media: 'heros.0.image',
    },
    prepare: ({title, media}) => {
      console.log({title, media})
      return {
        title,
        media,
      }
    },
  },
})
