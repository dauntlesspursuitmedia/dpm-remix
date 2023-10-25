import {ListChecksIcon, Paperclip} from 'lucide-react'
import { PropsWithChildren } from 'react'
import {defineField, defineType} from 'sanity'

const BgDecorator = (props: PropsWithChildren) => <span style={{background: `#228ABA`}}>{props.children}</span>

export const richText = defineType({
  title: 'Rich Text',
  type: 'object',
  name: 'richText',
  icon: ListChecksIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Rich Text',
      type: 'array',
      of: [
        {type: 'imageWithCaption'},
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
            {title: 'Code', value: 'code'},
          ],

          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {
                title: 'Colored Bg',
                value: 'coloredBg',
                icon: () => <span>BG</span>,
                component: BgDecorator,
              },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'link',
                fields: [
                  {
                    name: 'url',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.regex(/https:\/\/(www\.|)(portabletext\.org|sanity\.io)\/.*/gi, {
                        name: 'internal url',
                        invert: true,
                      }).warning(
                        `This is not an external link. Consider using internal links instead.`
                      ),
                  },
                ],
              },
              {
                title: 'Internal link to another document',
                name: 'internalLink',
                type: 'reference',
                icon: Paperclip,
                description: 'Locate a document you want to link to',
                to: [{type: 'page'}, {type: 'route'}],
                // blockEditor: {
                //   icon: () => '🔗',
                //   render: InternalLinkRender,
                // },
              },
            ],
          },
        },
        {type: 'reference', to: {type: 'author'}, name: 'author'},
				{type: 'reference', to: {type: 'post'}, name: 'post'},
				{type: 'reference', to: {type: 'project'}, 		name: 'project'},
        {type: 'uiComponentRef'},
      ],
    }),
  ],
})
