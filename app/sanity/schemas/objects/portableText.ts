import { defineType } from "sanity";

export default defineType({
  name: "portableText",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Internal Link",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [{ type: "project" }, { type: "service" }],
              },
            ],
          },
        ],
      },
    },
    {
      type: "textWithImage",
    },
    {
      type: "callToAction",
    },
  ],
});
