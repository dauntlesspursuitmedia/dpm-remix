import { FileImage } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "textWithImage",
  type: "object",
  title: "Text With Image",
	icon: FileImage,
  fields: [
    defineField({
      name: "imagePlacement",
      type: "string",
      title: "Image Placement",
      options: {
        list: ["left", "right"],
        layout: "radio",
        direction: "horizontal",
      },
			initialValue: 'left'
    }),
    defineField({
      name: "image",
      type: "imageWithCaption",
    }),
    defineField({
      name: "text",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
	preview: {
		select: {
			subtitle: 'imagePlacement',
			media: 'image'
		},
		prepare: ({ subtitle, media}) => ({
			title: 'Text With Image',
			subtitle,
			media
		})
	}
});
