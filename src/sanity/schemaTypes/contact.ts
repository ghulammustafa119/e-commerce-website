export default {
  name: "contactSubmission",
  title: "Contact Submissions",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "subject",
      title: "Subject",
      type: "string",
      options: {
        list: [
          { title: "General Inquiry", value: "general" },
          { title: "Order Issue", value: "order" },
          { title: "Returns & Refunds", value: "returns" },
          { title: "Product Question", value: "product" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
};
