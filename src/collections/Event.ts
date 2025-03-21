import type { AccessArgs, CollectionConfig } from "payload";

export const Event: CollectionConfig = {
  slug: "event",
  labels: {
    singular: {
      fr: "Événement",
      en: "Event",
    },
    plural: {
      fr: "Événements",
      en: "Events",
    },
  },
  admin: {
    useAsTitle: "name",
  },
  versions: true, // payload has native versioning
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
      localized: true,
      label: { fr: "Nom de l'événement", en: "Event name" },
      required: true,
    },
    {
      name: "type",
      type: "select",
      localized: true,
      label: { fr: "Type d'événement", en: "Event type" },
      options: [
        {
          label: { fr: "Conférence", en: "Conference" },
          value: "conference",
        },
        {
          label: { fr: "Exposition", en: "Exhibition" },
          value: "exhibition",
        },
        {
          label: { fr: "Atelier", en: "Workshop" },
          value: "workshop",
        },
        {
          label: { fr: "Autre", en: "Other" },
          value: "other",
        },
      ],
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      localized: true,
      label: { fr: "Date de début", en: "Start date" },
      required: true,
    },
    {
      name: "endDate",
      type: "date",
      localized: true,
      label: { fr: "Date de fin", en: "End date" },
      required: true,
    },
  ],
};

export default Event;
