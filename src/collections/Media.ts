import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  versions: true, // payload has native versioning
  access: {
    read: ({ req }) => (req.user && "role" in req.user ? req.user.role === "admin" : false),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
