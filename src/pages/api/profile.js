// src/pages/api/profile.js
import { db } from "../../../utils/db";
import { ProfileData } from "../../../utils/schema";
import { eq } from "drizzle-orm";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { clerkId } = req.body;
    try {
      // fetch profile data
      const profileData = await db
        .select()
        .from(ProfileData)
        .where(eq(ProfileData.clerkId, clerkId))
        .limit(1);

      if (profileData.length > 0) {
        res.status(200).json({ profile: profileData[0] });
      } else {
        res.status(404).json({ error: "Profile not found" });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ error: "Failed to fetch profile data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
