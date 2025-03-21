import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Delete cookie PayloadCMS
  res.setHeader("Set-Cookie", "payload-token=; Path=/; HttpOnly; Max-Age=0");

  res.status(200).json({ message: "Logged out successfully" });
}
