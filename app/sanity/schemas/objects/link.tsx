import { ExternalLink, Globe } from 'lucide-react'
import * as React from 'react'
import { defineField, defineType } from 'sanity'

const LinkRender = (props) => <span>
	{props.renderDefault(props)}
	<a contentEditable={false} href={props.value.href}>
		<ExternalLink/>
	</a>

</span>

export const link = {
  title: 'URL',
  name: 'link',
  type: 'object',
  fields: [
    defineField({
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    }),
  ],
	// components: {
	// 	annotation: LinkRender
	// },
	// icon: Globe
  // blockEditor: {
  //   icon: () => '🌏',
  //   render: LinkRender,
  // },
}
