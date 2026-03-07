import { defineType } from "sanity";

export default defineType({
  name: "newsletter",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
    },
  ],
});
