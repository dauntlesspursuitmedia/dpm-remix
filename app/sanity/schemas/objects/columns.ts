import { Columns } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const columns = defineType({
  name: 'columns',
  title: 'Columns',
  type: 'object',
  icon: Columns,
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [{ type: 'column', title: 'Column', name: 'column' }],
    }),
  ],
  preview: {
    select: {
      subtitle: 'columns',
      // media: 'image',
    },
    prepare({ subtitle }) {
      return {
        title: `Column Section`,
        subtitle: `${subtitle?.length || 1} Column`,
      }
    },
  },
})
