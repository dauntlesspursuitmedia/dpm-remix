import { defineField, defineType } from "sanity";

export default defineType({
  name: "callToAction",
  type: "object",
	title: 'Call To Action',
  fields: [
    defineField({
      name: "actionTitle",
      title: "Action Title",
      type: "string",
    }),
    defineField({
      name: "route",
      type: "reference",
      to: {
        type: "route",
      },
    }),
  ],
});
