"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Instagram,
  Linkedin,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function AboutUs() {
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);

  const developers = [
    {
      name: "Ashutosh Singh",
      role: "Frontend Developer",
      image: "/images/ashu.jpg",
      social: {
        instagram: "https://www.instagram.com/ashutosh820singh/",
        linkedin: "https://www.linkedin.com/in/ashutosh-singh-27ba2b259/",
        github: "https://github.com/19ashutoshsingh",
      },
    },
    {
      name: "Himanshu Kumar",
      role: "Full Stack Developer",
      image: "/images/him.jpg",
      social: {
        instagram: "https://www.instagram.com/_himanshuk__/",
        linkedin: "https://www.linkedin.com/in/himanshu-kumar---/",
        github: "https://github.com/Himanshukumar56",
      },
    },
    {
      name: "Sahil Morwal",
      role: "Backend Developer",
      image: "/images/sahilmc.jpg",
      social: {
        instagram: "https://www.instagram.com/sahil_morwal11/",
        linkedin: "https://www.linkedin.com/in/sahil-morwal-20a456257/",
        github: "https://github.com/SahilMorwal",
      },
    },
    {
      name: "Aman Kumar Bind",
      role: "FullStack Developer",
      image: "/images/aman.jpg",
      social: {
        instagram: "https://www.instagram.com/aman.bind0909/",
        linkedin: "https://www.linkedin.com/in/aman-bind-306152289/",
        github: "https://github.com/amanbind898",
      },
    },
    {
      name: "Ankit Kumar Patel",
      role: "UI/UX Developer",
      image: "/images/ankit.jpg",
      social: {
        instagram: "https://www.instagram.com/ankit_patel_1006/",
        linkedin: "https://www.linkedin.com/in/ankit-kumar-patel-b51489259/",
        github: "https://github.com/ak2patel",
      },
    },
  ];

  // Add duplicates to create an infinite scrolling effect
  const extendedDevelopers = [...developers, ...developers];

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current;

    const startAutoScroll = () => {
      if (container && isAutoScrolling) {
        autoScrollIntervalRef.current = setInterval(() => {
          container.scrollBy({ left: 2, behavior: "smooth" });

          // Reset position seamlessly when reaching the end
          if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollTo({ left: 0, behavior: "instant" });
          }
        }, 16); // Adjust speed by changing interval time
      }
    };

    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };

    if (isAutoScrolling) {
      startAutoScroll();
    }

    return () => stopAutoScroll();
  }, [isAutoScrolling]);

  // Stop auto-scroll when user interacts
  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };

  // Manual scrolling with buttons
  const scroll = (direction) => {
    setIsAutoScrolling(false); // Stop auto-scroll on manual action
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth / 2; // Scroll by half the visible width
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            About <span className="text-blue-600">SkillUp</span>
          </h1>
          <div className="text-lg text-gray-600 space-y-6 max-w-4xl mx-auto">
            <p>
              SkillUp is IIIT Bhagalpur's premier learning platform, dedicated
              to empowering students with the skills and knowledge they need to
              excel in their academic and professional journeys.
            </p>
            <p>
              Founded with the vision of bridging the gap between academic
              learning and industry requirements, SkillUp provides comprehensive
              courses, hands-on projects, and personalized mentoring to ensure
              our students are well-prepared for their future careers.
            </p>
            <p>
              Our platform combines cutting-edge technology with expert
              instruction to deliver an unparalleled learning experience. We
              focus on practical skills, industry-relevant projects, and
              real-world applications to ensure our students are job-ready upon
              completion of their courses.
            </p>
            {/* <p>
              Additionally, SkillUp promotes collaborative learning by offering
              team projects, peer-to-peer interactions, and dynamic study paths,
              enabling students to explore their potential to the fullest.
            </p> */}
          </div>
        </div>
      </div>

      {/* Developers Section */}
      <div className="py-14 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Meet Our <span className="text-blue-600">Developers</span>
          </h2>

          {/* Scrollable Container */}
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onClick={handleInteraction}
              onTouchStart={handleInteraction}
              onMouseEnter={handleInteraction}
            >
              {extendedDevelopers.map((developer, index) => (
                <div
                  key={`${developer.name}-${index}`}
                  className="flex-none w-72 bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center">
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {developer.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{developer.role}</p>
                    <div className="flex justify-center space-x-4">
                      <a
                        href={developer.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a
                        href={developer.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={developer.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-gray-900"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
//update 1
//newly forked