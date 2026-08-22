import * as cheerio from 'cheerio';

/**
 * Fetch LeetCode stats for a user.
 * @param {string} username
 * @returns {Promise<object>}
 */
export async function fetchLeetCodeStats(username) {
    try {
      const query = `
        query userProfilePublicProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              reputation
              solutionCount
            }
          }
          userContestRanking(username: $username) {
            rating
            attendedContestsCount
            globalRanking
          }
        }
      `;
  
      const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com',
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
      });
  
      if (!response.ok) {
        throw new Error(`GraphQL API Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const { matchedUser, userContestRanking } = data.data;
  
      if (!matchedUser) {
        throw new Error('User not found');
      }
  
      return {
        platform: "LeetCode",
        username,
        solvedCount: matchedUser.submitStats?.acSubmissionNum?.[0]?.count?.toString() || "0",
        rating: userContestRanking?.rating ? Math.round(userContestRanking.rating).toString() : null,
        globalRank: userContestRanking?.globalRanking?.toString() || null,
        totalContests: userContestRanking?.attendedContestsCount?.toString() || "0",
        easyCount: matchedUser.submitStats?.acSubmissionNum?.[1]?.count?.toString() || "0",
        mediumCount: matchedUser.submitStats?.acSubmissionNum?.[2]?.count?.toString() || "0",
        hardCount: matchedUser.submitStats?.acSubmissionNum?.[3]?.count?.toString() || "0",
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error fetching LeetCode stats via GraphQL:", error.message);
      return {
        platform: "LeetCode",
        username,
        error: error.message,
      };
    }
  }
  

/**
 * Fetch GeeksforGeeks stats for a user.
 * @param {string} username
 * @returns {Promise<object>}
 */
export async function fetchGeeksForGeeksStats(username) {
    try {
        const response = await fetch(`https://auth.geeksforgeeks.org/user/${username}`);
        if (!response.ok) {
            throw new Error(`GeeksforGeeks API Error: ${response.statusText}`);
        }
        const html = await response.text();
        const $ = cheerio.load(html);

        const getProblemCount = (text) => text?.match(/\((\d+)\)/)?.[1] || "0";

        const problemNavs = $('.problemNavbar_head_nav__a4K6P');
        const schoolCount = getProblemCount(problemNavs.eq(0).text());
        const basicCount = getProblemCount(problemNavs.eq(1).text());
        const easyCount = getProblemCount(problemNavs.eq(2).text());
        const mediumCount = getProblemCount(problemNavs.eq(3).text());
        const hardCount = getProblemCount(problemNavs.eq(4).text());

        const fundamentalCount =(parseInt(schoolCount || 0) + parseInt(basicCount || 0)).toString();

       

        const scoreCards = $('.scoreCard_head__nxXR8');
        const codingScore = scoreCards.eq(0).find('.scoreCard_head_left--score__oSi_x').text().trim() || "0";
        const totalSolved = scoreCards.eq(1).find('.scoreCard_head_left--score__oSi_x').text().trim() || "0";
        const contestRating = scoreCards.eq(2).find('.scoreCard_head_left--score__oSi_x').text().trim() || "0";

        const instituteRank = $('.educationDetails_head_left_userRankContainer--text__wt81s b')
            .text()
            .replace('Rank', '')
            .trim() || null;

        return {
            platform: "GeeksforGeeks",
            username,
            solvedCount: totalSolved,
            rating: contestRating,
            globalRank: instituteRank,
            easyCount: easyCount,
            mediumCount,
            hardCount,
            fundamentalCount,
            codingScore,
            lastUpdated: new Date().toISOString(),
        };
    } catch (error) {
        console.error("Error fetching GeeksforGeeks stats:", error.message);
        return {
            platform: "GeeksforGeeks",
            username,
            error: error.message,
        };
    }
}


export async function fetchCodeforcesStats(username) {
    try {
      // Fetch user info
      const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
      if (!userInfoResponse.ok) {
        throw new Error(`Codeforces API Error: ${userInfoResponse.statusText}`);
      }
  
      const userInfoData = await userInfoResponse.json();
      if (userInfoData.status !== "OK" || !userInfoData.result || userInfoData.result.length === 0) {
        throw new Error('User not found or invalid response from Codeforces API');
      }
  
      const user = userInfoData.result[0];
  
      // Fetch user submissions
      const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
      if (!submissionsResponse.ok) {
        throw new Error(`Codeforces API Error: ${submissionsResponse.statusText}`);
      }
  
      const submissionsData = await submissionsResponse.json();
      if (submissionsData.status !== "OK" || !submissionsData.result) {
        throw new Error('Error fetching submission data from Codeforces API');
      }
  
      // Count unique problems solved
      const problemsSolved = new Set();
      submissionsData.result.forEach((submission) => {
        if (submission.verdict === "OK") {
          problemsSolved.add(`${submission.contestId}-${submission.problem.index}`);
        }
      });
  
      // Return data in the desired schema format
      return {
       
        platform: "Codeforces",
        solvedCount: problemsSolved.size.toString(),
        rating: user.rating ? Math.round(user.rating).toString() : null,
        highestRating: user.maxRating ? Math.round(user.maxRating).toString() : null,
        globalRank: null, // Not provided by Codeforces API
        countryRank: null, // Not provided by Codeforces API
        lastUpdated: new Date().toISOString(),
        easyCount: "0", // Not specifically categorized in Codeforces
        mediumCount: "0", // Not specifically categorized in Codeforces
        hardCount: "0", // Not specifically categorized in Codeforces
        fundamentalCount: "0", // Not specifically categorized in Codeforces
        totalcontest: user.rating ? "1" : "0", // Assuming rating implies contest participation
      };
    } catch (error) {
      console.error("Error fetching Codeforces stats:", error.message);
      return {
   
       
        platform: "Codeforces",
        solvedCount: "0",
        rating: null,
        highestRating: null,
        globalRank: null,
        countryRank: null,
        lastUpdated: new Date().toISOString(),
        easyCount: "0",
        mediumCount: "0",
        hardCount: "0",
        fundamentalCount: "0",
        totalcontest: "0",
        error: error.message,
      };
    }
  }
  

  export async function fetchCodeChefStats(username) {
    try {
      const response = await fetch(`https://www.codechef.com/users/${username}`);
      if (!response.ok) {
        throw new Error(`CodeChef Error: ${response.statusText}`);
      }
  
      const html = await response.text();
      const $ = cheerio.load(html);
  
      // Extract ratings
      const currentRating = $('.rating-number').text().replace('?', '').trim();
      const highestRating = $('.rating-header small').text().match(/Highest Rating (\d+)/)?.[1];
  
      // Extract ranks
      const globalRank = $('.rating-ranks ul li:first-child strong').text().trim();
      const countryRank = $('.rating-ranks ul li:last-child strong').text().trim();
  
      // Extract total problems solved
      const problemsSection = $('.rating-data-section.problems-solved');
      const totalProblems = problemsSection.find('h3:contains("Total Problems Solved:")').text().match(/\d+/)?.[0] || "0";
  
      // Count contests
      const contestsHeader = problemsSection.find('h3:contains("Contests")').text();
      const contestCount = contestsHeader.match(/Contests \((\d+)\)/)?.[1] || "0";
  
      return {
        platform: "CodeChef",
        solvedCount: totalProblems,
        rating: currentRating ? Math.round(parseFloat(currentRating)).toString() : null,
        highestRating: highestRating ? highestRating.toString() : null,
        globalRank: globalRank,
        countryRank: countryRank,
        lastUpdated: new Date().toISOString(),
        easyCount: "0",
        mediumCount: "0",
        hardCount: "0",
        fundamentalCount: "0",
        totalcontest: contestCount
      };
    } catch (error) {
      console.error("Error fetching CodeChef stats:", error.message);
      return {
        platform: "CodeChef",
        solvedCount: "0",
        rating: null,
        highestRating: null,
        globalRank: null,
        countryRank: null,
        lastUpdated: new Date().toISOString(),
        easyCount: "0",
        mediumCount: "0",
        hardCount: "0",
        fundamentalCount: "0",
        totalcontest: "0",
        error: error.message
      };
    }
  }
  