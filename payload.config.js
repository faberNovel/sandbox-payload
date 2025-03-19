import { buildConfig } from "payload/config";
import sqliteAdapter from "@payloadcms/db-sqlite";
import path from "path";
import Events from "./collections/Events";
import Users from "./collections/Users";

export default buildConfig({
  serverURL: "http://localhost:3001",
  admin: {
    user: Users.slug,
  },
  collections: [Events, Users],
  db: sqliteAdapter({
    url: `sqlite://${path.resolve(__dirname, "database.sqlite")}`,
  }),
  upload: {
    staticDir: path.resolve(__dirname, "uploads"),
    staticURL: "/uploads",
  },
});
