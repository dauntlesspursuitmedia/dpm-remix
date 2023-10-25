import { AlertOctagonIcon } from 'lucide-react'
import * as React from 'react'
import { defineField, defineType } from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
	icon: AlertOctagonIcon,

  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background color',
      type: 'brandColors',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richText',
    }),
    defineField({
      name: 'cta',
      title: 'Cta',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'body',
      subtitle: 'cta.title',
      route: 'cta.route.slug.current',
      sectionBg: 'backgroundColor.hex',
    },

    prepare({ subtitle, sectionBg, route }) {
      return {
        title: subtitle,
        subtitle: `CTA Section - /${route}`,
        media: (
          <span
            style={{
              backgroundColor: sectionBg as string,
              height: `100%`,
              width: `100%`,
              border: `none`,
              borderRadius: `100%`,
            }}
          />
        ),
      }
    },
  },
})
