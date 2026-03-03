import { defineType } from "sanity";

export default defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "shippingForm",
      title: "Shipping Form",
      type: "reference",
      to: [{ type: "shippingForm" }],
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Product Name",
              type: "string",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
            {
              name: "qty",
              title: "Quantity",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    },
    {
      name: "total",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "stripeSessionId",
      title: "Stripe Session ID",
      type: "string",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
});
