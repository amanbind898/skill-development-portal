"use client";
import { useEffect, useState } from "react";
import UserProfile from "./_components/UserProfile";
import { ProfileData } from "../../../utils/schema";
import PlatfromCards from "./_components/PlatfromCards";
import DsaStatsCard from "./_components/DsaStatsCard";
import { useUser } from "@clerk/clerk-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CPStatsCard from "./_components/CPStatsCard";

export default function Dashboard() {
  const { user } = useUser();
  const clerkUserId = user?.id;
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshCodingStats = async () => {
    setIsRefreshing(true);
    toast.info("Updating coding stats...");
    try {
      const response = await fetch("/api/updatePlatformStats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: clerkUserId,
          leetCode: profileData.leetCode,
          geeksforgeeks: profileData.geeksforgeeks,
          codeforces: profileData.codeforces,
          codechef: profileData.codechef
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update stats");
      }

      await fetchStatsData();
      toast.success("Stats updated successfully!");
    } catch (error) {
      console.error("Error refreshing coding stats:", error);
      toast.error("Failed to update stats");
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: clerkUserId }),
      });
      const data = await response.json();
      
      if (response.status === 200) {
        if (data.isNew) {
          setIsNew(true);
          toast.success("Welcome, new user! Please fill in your profile.");
        }
        setProfileData(data.profile);
        return data.profile;
      } else {
        throw new Error(data.error || "Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Failed to fetch profile data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatsData = async (profile) => {
    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: clerkUserId }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setUserData(data.userStats || []);
      } else {
        throw new Error(data.error || "Failed to fetch stats data");
      }
    } catch (error) {
      console.error("Error fetching stats data:", error);
      toast.error("Failed to fetch stats data. Please try again later.");
    }
  };

  useEffect(() => {
    if (clerkUserId) {
      Promise.all([fetchProfileData(), fetchStatsData()]);
    }
  }, [clerkUserId]);

  const NoDataCard = ({ message }) => (
    <Card className="bg-gray-50/80 backdrop-blur-sm">
      <CardContent className="flex items-center justify-center min-h-[12rem]">
        <p className="text-sm sm:text-base text-gray-500 px-4 text-center">{message}</p>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-4">
            <Skeleton className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl" />
          </div>
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8">
            <Skeleton className="h-[150px] sm:h-[180px] lg:h-[200px] rounded-xl" />
            <Skeleton className="h-[300px] sm:h-[350px] lg:h-[400px] rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 max-w-[100vw] sm:max-w-7xl">
        {isNew && (
          <Alert className="mb-6 sm:mb-8 bg-blue-50/80 backdrop-blur-sm text-blue-700 border-blue-200">
            <AlertDescription className="text-sm sm:text-base">
              Welcome! Please complete your profile to get started.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-4">
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  {profileData ? (
                    <UserProfile profileData={profileData} isEditing={true} />
                  ) : (
                    <NoDataCard message="No profile data available" />
                  )}
                </CardContent>
              </Card>
              {profileData && (
                <Button 
                  className="w-full text-sm sm:text-base py-2 sm:py-3"
                  onClick={handleRefreshCodingStats}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`mr-2 h-3 w-3 sm:h-4 sm:w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh Coding Stats'}
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 sm:space-y-6 lg:space-y-8">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {userData ? (
                  <>
                    <DsaStatsCard stats={userData} />
                    <CPStatsCard stats={userData} />
                  </>
                ) : (
                  <NoDataCard message="No platform stats available" />
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                {userData ? (
                  <PlatfromCards stats={userData} />
                ) : (
                  <NoDataCard message="No platform stats available" />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}