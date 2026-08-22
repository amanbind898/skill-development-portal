"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../../utils/db";
import { eq } from "drizzle-orm";
import { ProfileData } from "../../../utils/schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  Edit3, RefreshCw, User, Mail, Key, Save, X, MapPin, Calendar,
  Github, Linkedin, Twitter, Instagram, Globe, Code
} from "lucide-react";


function ProfilePage() {
  const { user } = useUser();
  const clerkUserId = user?.id;
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  useEffect(() => {
    if (!clerkUserId) return;
    fetchProfileData();
  }, [clerkUserId]);
  
  const fetchProfileData = async () => {
    try {
      const userProfile = await db
        .select()
        .from(ProfileData)
        .where(eq(ProfileData.clerkId, clerkUserId))
        .then(([result]) => result);

      if (!userProfile) {
        await db.insert(ProfileData).values({
          primaryEmail: user.primaryEmailAddress?.emailAddress || "",
          name: user.fullName || "",
          clerkId: clerkUserId,
          createdAt: new Date().toISOString(),
        });
        setIsNew(true);
        toast.success("Welcome! Please complete your profile.");
      } else {
        setProfileData(userProfile);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Failed to fetch profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clerkUserId) fetchProfileData();
  }, [clerkUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    toast.info("Saving changes...");
    try {
      await db
        .update(ProfileData)
        .set({
          dateOfBirth: profileData.dateOfBirth,
          location: profileData.location,
          bio: profileData.bio,
          instagram: profileData.instagram,
          linkedin: profileData.linkedin,
          twitter: profileData.twitter,
          github: profileData.github,
          portfolio: profileData.portfolio,
          leetCode: profileData.leetCode,
          codeforces: profileData.codeforces,
          codechef: profileData.codechef,
          geeksforgeeks: profileData.geeksforgeeks,
        })
        .where(eq(ProfileData.clerkId, clerkUserId));

      setIsEditing(false);
      setIsNew(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile data:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleRefreshCodingStats = async () => {
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
      
      toast.success("Stats updated successfully!");
    } catch (error) {
      console.error("Error refreshing coding stats:", error);
      toast.error("Failed to update stats");
    }
  };

  const renderProfileHeader = () => (
    <div className="relative mb-8">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg" />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
        <div className="relative">
          {isLoading ? (
            <Skeleton circle={true} height={128} width={128} />
          ) : (
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          )}
          {!isLoading && (
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderUserInfo = () => (
    <div className="mt-20 text-center space-y-2">
      <h1 className="text-2xl font-bold text-gray-800">
        {isLoading ? <Skeleton width={200} /> : user?.fullName}
      </h1>
      <div className="flex items-center justify-center gap-2 text-gray-600">
        <Mail className="w-4 h-4" />
        <span>{isLoading ? <Skeleton width={200} /> : user?.primaryEmailAddress?.emailAddress}</span>
      </div>
      {!isLoading && profileData?.location && (
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{profileData.location}</span>
        </div>
      )}
      {!isLoading && profileData?.bio && (
        <p className="text-gray-600 mt-4 max-w-md mx-auto">{profileData.bio}</p>
      )}
    </div>
  );

  const renderTabs = () => (
    <div className="border-b border-gray-200 mt-8">
      <nav className="flex justify-center space-x-8">
        {[
          { id: 'personal', label: 'Personal Info', icon: User },
          { id: 'social', label: 'Social Links', icon: Globe },
          { id: 'coding', label: 'Coding Profiles', icon: Code }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`pb-4 px-4 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData?.dateOfBirth || ""}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={profileData?.location || ""}
            onChange={handleInputChange}
            placeholder="Your location"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          value={profileData?.bio || ""}
          onChange={handleInputChange}
          placeholder="Tell us about yourself"
          rows={4}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const socialLinks = [
    { name: 'github', icon: Github, label: 'GitHub' },
    { name: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { name: 'twitter', icon: Twitter, label: 'Twitter' },
    { name: 'instagram', icon: Instagram, label: 'Instagram' },
    { name: 'portfolio', icon: Globe, label: 'Portfolio' },
  ];

  const renderSocialLinks = () => (
    <div className="space-y-4">
      {socialLinks.map(({ name, icon: Icon, label }) => (
        <div key={name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </label>
          <input
            type="url"
            name={name}
            value={profileData?.[name] || ""}
            onChange={handleInputChange}
            placeholder={`Your ${label} URL`}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!isEditing}
          />
        </div>
      ))}
    </div>
  );

  const renderCodingProfiles = () => (
    <div className="space-y-4">
      {['leetCode', 'codeforces', 'codechef','geeksforgeeks'].map((platform) => (
        <div key={platform} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {platform} Username
          </label>
          <input
            name={platform}
            value={profileData?.[platform] || ""}
            onChange={handleInputChange}
            placeholder={`Enter your ${platform} username`}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!isEditing}
          />
        </div>
      ))}
      {!isEditing && (
        <button
          onClick={handleRefreshCodingStats}
          className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Stats
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-6">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {renderProfileHeader()}
          {renderUserInfo()}
          {renderTabs()}
          
          <div className="p-6">
            {/* Edit/Save Buttons */}
            <div className="flex justify-end mb-6">
              {isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  {isNew ? "Complete Profile" : "Edit Profile"}
                </button>
              )}
            </div>

            {/* Tab Content */}
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'social' && renderSocialLinks()}
            {activeTab === 'coding' && renderCodingProfiles()}
          </div>
        </div>
      </div>
   
    </div>
  );
}

export default ProfilePage;