import {  UserCircle } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
	icon: UserCircle,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Bio Excerpt",
      type: "text",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
  ],
	preview: {
		select: {
			title: "name",
			media: "image",
		},
		prepare({ title, media }) {
			return {
				title,
				media
			}
		}
	}
});
