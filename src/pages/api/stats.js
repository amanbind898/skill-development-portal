// src/pages/api/stats.js
import { db } from "../../../utils/db";
import { CodingPlatformStats } from "../../../utils/schema";
import { eq } from "drizzle-orm";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { clerkId } = req.body;

    try {
      // Fetch all platform stats for the user
      const userStats = await db
        .select()
        .from(CodingPlatformStats)
        .where(eq(CodingPlatformStats.clerkId, clerkId));

      if (userStats.length > 0) {
        res.status(200).json({ userStats });
      } else {
        res.status(404).json({ error: "No stats found for the user" });
      }
    } catch (error) {
      console.error("Error fetching userStats data:", error);
      res.status(500).json({ error: "Failed to fetch userStats data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
