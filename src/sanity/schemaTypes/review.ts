import { defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    {
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
      validation: (Rule) => Rule.required().min(5),
    },
    {
      name: "verified",
      title: "Verified Purchase",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
  orderings: [
    {
      title: "Newest First",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
});
