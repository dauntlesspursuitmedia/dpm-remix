import { defineField, defineType } from 'sanity'
export const cta = defineType({
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  validation: (Rule) =>
    Rule.custom(
      (fields: { route?: any; link?: string } = { route: '', link: '' }) =>
        !fields.route || !fields.link || 'Only one link type is allowed'
    ),
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
    },
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Internal link',
      description: 'Use this to link between pages on the website',
      name: 'route',
      type: 'reference',
      to: [{ type: 'route' },  { type: 'page' }],
      fieldset: 'link',
    }),
    defineField({
      title: 'External link',
      name: 'link',
      type: 'url',
      fieldset: 'link',
    }),
    defineField({
      name: 'buttonColor',
      title: 'Button Color',
      type: 'brandColors',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      routeTitle: 'route.title',
      slug: 'route.slug.current',
      link: 'link',
    },
    prepare({ title, routeTitle = '', slug, link }) {
      const subtitleExtra = slug ? `Slug:/${slug}/` : link ? `External link: ${link}` : 'Not set'
      return {
        title: `${title}`,
        subtitle: `${routeTitle} ${subtitleExtra}`,
      }
    },
  },
})
