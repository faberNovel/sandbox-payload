import React from "react";
import Image from "next/image";
import { getPayload } from "payload";
import { headers as getHeaders } from "next/headers.js";

import config from "@/payload.config";
import "./styles.css";
import { User, UserRole } from "@/collections/Users";
import { LogoutButton } from "./components/LogoutButton";
import { HelloButton } from "./components/HelloButton";
import EventCard from "@/components/EventCard";
import { Event } from "@/collections/Events"; // Import the Event type

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

  // Fetch events
  const eventsResponse = await payload.find({
    collection: "events", // Replace with the actual collection name for events
    limit: 10, // Adjust the limit as needed
  });

  const events: Event[] = eventsResponse.docs; // Type the events array

  const SIZE_DIVIDER = 4;
  // const imageUrl = "http://localhost:9000/assets/image.high.jpg";
  // const imageResponse = await fetch(imageUrl);
  // const imageBlob = await imageResponse.blob();
  // const imageSizeKB = (imageBlob.size / 1024).toFixed(2);

  return (
    <div className="home">
      {user && (
        <div className="absolute top-0 right-0 p-8">
          <h2 className="font-bold text-center">
            {capitalizeFirstLetter(user.role)} {avatars[user.role]}
          </h2>{" "}
          <LogoutButton />
        </div>
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
        <div>
          <h1>Events</h1>
          <div className="flex flex-wrap gap-4">
            {events?.map((event, index) => (
              <EventCard key={index} event={event} rights={res.permissions.collections?.events} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
