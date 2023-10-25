import { defineField, defineType } from "sanity";

// const Colors = (props) => {
//   console.log(props)
//   return <span>Hi</span>
// }

export const brandColors = defineField({
  title: "Brand Colors",
  type: "color",
  name: "brandColors",
  options: {
    colorList: [
      { h: 300, s: 11, l: 4, a: 1 },
      { h: 300, s: 11, l: 4, a: 0.45 },
      { h: 0, s: 100, l: 32, a: 1 },
      { h: 39, s: 96, l: 69, a: 1 },
      { h: 39, s: 6, l: 99, a: 1 },
      '#f5f5f5',
      '#fff',
    ],
  },
});
