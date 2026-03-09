import { defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(10),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "T-Shirt", value: "tshirt" },
          { title: "Short", value: "short" },
          { title: "Jeans", value: "jeans" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Shirt", value: "shirt" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "discountPercent",
      title: "Discount Percent",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    },
    {
      name: "isNew",
      type: "boolean",
      title: "New",
      initialValue: false,
    },
    {
      name: "dressStyle",
      title: "Dress Style",
      type: "string",
      options: {
        list: [
          { title: "Casual", value: "casual" },
          { title: "Formal", value: "formal" },
          { title: "Party", value: "party" },
          { title: "Gym", value: "gym" },
        ],
      },
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "stock",
      title: "Stock",
      type: "number",
      initialValue: 100,
      validation: (Rule) => Rule.min(0),
    },
    {
      name: "rating",
      title: "Rating",
      type: "string",
      validation: (Rule) => Rule.regex(/^\d+(\.\d+)?\/5$/, {
        name: "rating",
        invert: false,
      }),
    },
  ],
});
