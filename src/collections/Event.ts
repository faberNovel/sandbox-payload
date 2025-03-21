import type { AccessArgs, CollectionConfig } from "payload";

export const Event: CollectionConfig = {
  slug: "event",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: ({ req }) => {
      // Tous les rôles peuvent lire
      return !!req.user;
    },
    create: ({ req: { user } }: AccessArgs) => {
      // Seuls les admins et éditeurs peuvent créer
      return user?.role === "admin" || user?.role === "editor";
    },
    update: ({ req: { user } }: AccessArgs) => {
      // Seuls les admins, éditeurs et reviewers peuvent modifier
      return user?.role === "admin" || user?.role === "editor" || user?.role === "reviewer";
    },
    delete: ({ req: { user } }: AccessArgs) => {
      // Seuls les admins peuvent supprimer
      return user?.role === "admin";
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nom de l'événement",
      required: true,
    },
    {
      name: "type",
      type: "select",
      label: "Type d'événement",
      options: [
        {
          label: "Conférence",
          value: "conference",
        },
        {
          label: "Exposition",
          value: "exhibition",
        },
        {
          label: "Atelier",
          value: "workshop",
        },
        {
          label: "Autre",
          value: "other",
        },
      ],
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      label: "Date de début",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
      label: "Date de fin",
      required: true,
    },
  ],
};

export default Event;
