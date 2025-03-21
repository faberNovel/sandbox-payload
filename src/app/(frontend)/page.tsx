import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { getPayload } from "payload";
import React from "react";
import { fileURLToPath } from "url";

import config from "@/payload.config";
import "./styles.css";
import { User, UserRole } from "@/collections/Users";
import { LogoutButton } from "./components/LogoutButton";
import { HelloButton } from "./components/HelloButton";
// import { LogoutButton } from "./components/LogoutButton";

const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

const avatars: Record<UserRole, string> = {
  admin: "👑",
  editor: "🎨",
  reviewer: "🔍",
  user: "👤",
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const res = await payload.auth({ headers });
  const user = res.user as User | null;

  const SIZE_DIVIDER = 4;
  // const imageUrl = "http://localhost:9000/assets/image.high.jpg";
  // const imageResponse = await fetch(imageUrl);
  // const imageBlob = await imageResponse.blob();
  // const imageSizeKB = (imageBlob.size / 1024).toFixed(2);

  return (
    <div className="home">
      {user && (
        <h2 className="role">
          {capitalizeFirstLetter(user.role)} {avatars[user.role]} <LogoutButton />
        </h2>
      )}

      <div className="content">
        {/* <Image alt="Mask" height={750 / SIZE_DIVIDER} src={imageUrl} width={565 / SIZE_DIVIDER} />
        <p>Image size: {imageSizeKB} KB</p> */}
        {!user && <h1>Welcome to Payload POC.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          {user?.role === "user" ? (
            <a
              className="admin"
              href={payloadConfig.routes.admin}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to events
            </a>
          ) : (
            <a
              className="admin"
              href={payloadConfig.routes.admin}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to admin panel
            </a>
          )}
          <HelloButton />
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  );
}
