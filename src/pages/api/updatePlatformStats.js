import { db } from "../../../utils/db";
import { CodingPlatformStats } from "../../../utils/schema";
import { 
  fetchLeetCodeStats, 
  fetchGeeksForGeeksStats, 
  fetchCodeforcesStats, 
  fetchCodeChefStats 
} from "../../../utils/platformAPI";
import { eq, and } from "drizzle-orm";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { clerkId, leetCode, geeksforgeeks, codeforces, codechef } = req.body;

  try {
    const platforms = [
      leetCode && { name: 'LeetCode', username: leetCode, fetchFn: fetchLeetCodeStats },
      geeksforgeeks && { name: 'GeeksforGeeks', username: geeksforgeeks, fetchFn: fetchGeeksForGeeksStats },
      codeforces && { name: 'Codeforces', username: codeforces, fetchFn: fetchCodeforcesStats },
      codechef && { name: 'CodeChef', username: codechef, fetchFn: fetchCodeChefStats }
    ].filter(Boolean);

    for (const platform of platforms) {
      const stats = await platform.fetchFn(platform.username);

      if (!stats) {
        throw new Error(`Failed to fetch ${platform.name} stats`);
      }

      const dataToInsertOrUpdate = {
        solvedCount: stats.solvedCount || "0",
        rating: stats.rating || null,
        highestRating: stats.highestRating || null,
        globalRank: stats.globalRank || null,
        countryRank: stats.countryRank || null,
        lastUpdated: stats.lastUpdated,
        easyCount: stats.easyCount || "0",
        mediumCount: stats.mediumCount || "0",
        hardCount: stats.hardCount || "0",
        fundamentalCount: stats.fundamentalCount || "0",
        totalcontest: stats.totalcontest || "0"
      };

      const existingRecord = await db
        .select()
        .from(CodingPlatformStats)
        .where(
          and(
            eq(CodingPlatformStats.clerkId, clerkId),
            eq(CodingPlatformStats.platform, platform.name)
          )
        )
        .limit(1);

      if (existingRecord.length > 0) {
        await db
          .update(CodingPlatformStats)
          .set(dataToInsertOrUpdate)
          .where(
            and(
              eq(CodingPlatformStats.clerkId, clerkId),
              eq(CodingPlatformStats.platform, platform.name)
            )
          );
      } else {
        await db
          .insert(CodingPlatformStats)
          .values({
            clerkId,
            platform: platform.name,
            ...dataToInsertOrUpdate
          });
      }
    }

    res.status(200).json({ message: "Platform stats updated successfully!" });
  } catch (error) {
    console.error("Database operation failed:", error.message, error.stack);
    res.status(500).json({ error: `Database operation failed: ${error.message}` });
  }
}
