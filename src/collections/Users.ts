import type { CollectionConfig } from "payload";

const userRoleOptions = [
  {
    label: "Administrateur",
    value: "admin",
  },
  {
    label: "Contributeur",
    value: "editor",
  },
  {
    label: "Validateur",
    value: "reviewer",
  },
  {
    label: "User",
    value: "user",
  },
];

export type UserRole = (typeof userRoleOptions)[number]["value"];

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    read: ({ req }) => (req.user && "role" in req.user ? req.user.role === "admin" : false),
    update: ({ req }) => req.user?.id === req.query.id || req.user?.role === "admin",
    delete: () => false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "role",
      type: "select",
      options: userRoleOptions,
      required: true,
      defaultValue: "contributor", // Default role
      hidden: false, // Ensure the role is visible in API responses
    },
  ],
};
