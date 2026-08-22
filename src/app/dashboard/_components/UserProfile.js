import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import {
  FaMapMarkerAlt, FaUniversity, FaEnvelope, FaBirthdayCake,
  FaGithub, FaMedal, FaInstagram, FaLinkedin,
  FaTwitter, FaGlobe,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef, SiGeeksforgeeks } from "react-icons/si";

const InfoItem = ({ icon: Icon, text, link, className = "" }) => {
  const content = (
    <div className={`flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 min-h-[3rem] sm:min-h-[3.5rem] ${className}`}>
      <div className="flex-shrink-0">
        <Icon className="text-white/70 w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-white/90 text-sm sm:text-base break-all">{text}</span>
      </div>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : content;
};

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-2 mb-3 sm:mb-4 pb-2 border-b border-white/10">
    <Icon className="text-indigo-400 w-4 h-4 sm:w-5 sm:h-5" />
    <h3 className="text-sm sm:text-base font-medium text-white/90">{title}</h3>
  </div>
);

export default function UserProfile({ profileData = {} }) {
  const { user } = useUser();

  return (
    <div className="w-full mx-auto p-2 sm:p-3">
      <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 shadow-xl sm:shadow-2xl border border-white/10">
        {/* Header Section */}
        <div className="relative h-24 sm:h-32">
          {/* Profile Image Container */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl border-4 border-white/10 shadow-xl sm:shadow-2xl overflow-hidden backdrop-blur-sm bg-gray-900">
              <Image
                src={user.imageUrl}
                alt="User Profile"
                width={128}
                height={128}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-3 sm:px-6 pt-16 sm:pt-20 pb-4 sm:pb-6 relative z-0">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              {profileData.name || "Anonymous User"}
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-1">@{profileData.clerkId}</p>
            {profileData.bio && (
              <p className="mt-3 sm:mt-4 text-white/70 text-xs sm:text-sm max-w-xl mx-auto break-words">
                {profileData.bio}
              </p>
            )}
          </div>

          <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
            <div>
              <SectionTitle icon={FaEnvelope} title="Personal Information" />
              <div className="space-y-3 sm:space-y-4">
                <InfoItem icon={FaEnvelope} text={profileData.primaryEmail} />
                <InfoItem icon={FaMapMarkerAlt} text={profileData.location || "Location not specified"} />
                <InfoItem icon={FaBirthdayCake} text={profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : "Birth date not specified"} />
                <InfoItem 
                  icon={FaUniversity} 
                  text="Indian Institute of Information Technology (IIIT), Bhagalpur" 
                  className="break-words"
                />
              </div>
            </div>

            <div>
              <SectionTitle icon={FaGlobe} title="Social Links" />
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: FaGithub, name: "github", hoverClass: "hover:border-gray-400" },
                  { icon: FaLinkedin, name: "linkedin", hoverClass: "hover:border-blue-400" },
                  { icon: FaTwitter, name: "twitter", hoverClass: "hover:border-sky-400" },
                  { icon: FaInstagram, name: "instagram", hoverClass: "hover:border-pink-400" },
                  { icon: FaGlobe, name: "portfolio", hoverClass: "hover:border-emerald-400" }
                ].map(({ icon, name, hoverClass }) => (
                  <InfoItem
                    key={name}
                    icon={icon}
                    text={profileData[name] || name.charAt(0).toUpperCase() + name.slice(1)}
                    link={profileData[name]}
                    className={hoverClass}
                  />
                ))}
              </div>
            </div>

            <div>
              <SectionTitle icon={FaMedal} title="Coding Profiles" />
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: SiLeetcode, name: "leetCode", url: "leetcode.com", hoverClass: "hover:border-yellow-400" },
                  { icon: SiCodeforces, name: "codeforces", url: "codeforces.com/profile", hoverClass: "hover:border-blue-400" },
                  { icon: SiCodechef, name: "codechef", url: "codechef.com/users", hoverClass: "hover:border-yellow-400" },
                  { icon: SiGeeksforgeeks, name: "geeksforgeeks", url: "auth.geeksforgeeks.org/user", hoverClass: "hover:border-green-400" }
                ].map(({ icon, name, url, hoverClass }) => (
                  <InfoItem
                    key={name}
                    icon={icon}
                    text={profileData[name] || name}
                    link={profileData[name] ? `https://${url}/${profileData[name]}` : undefined}
                    className={hoverClass}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-white/40 text-right">
            Member since: {new Date(profileData.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}