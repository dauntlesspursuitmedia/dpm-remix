import {defineField, defineType} from 'sanity'
export const heroContent = defineType({
  name: 'heroContent',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'action',
      title: 'Call To Action',
      type: 'callToAction',
    }),
  ],
})
