"use client"; // Mark this file as a Client Component

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import playlists from '@/data/playlists';
import { AiFillPlayCircle } from 'react-icons/ai'; // Importing an icon for a modern look
import ChatbotIcon from '@/app/components/ChatbotIcon/ChatbotIcon';

function PlaylistPage() {
  const { id } = useParams(); // Use useParams to get the playlist ID
  const playlist = playlists.find((pl) => pl.id === id);

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0); // Store video progress
  const [player, setPlayer] = useState(null);

  // If playlist not found, show an error message
  if (!playlist) {
    return <p className="text-center text-red-500 font-bold">Playlist not found.</p>;
  }

  const selectedVideo = playlist.videos[selectedVideoIndex];

  // Load the YouTube API script and initialize the player
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onload = () => {
        // Initialize the player once the API is loaded
        window.onYouTubeIframeAPIReady = () => {
          const newPlayer = new window.YT.Player('youtube-player', {
            videoId: selectedVideo.url,
            events: {
              onReady: () => {
                if (newPlayer) {
                  newPlayer.seekTo(videoProgress); // Seek to the saved progress
                  newPlayer.playVideo(); // Play the video once it's ready
                }
              },
              onStateChange: (event) => {
                // Detect when the video is paused or ended, and save progress
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setInterval(() => {
                    const currentTime = newPlayer.getCurrentTime();
                    localStorage.setItem('videoProgress', currentTime);
                  }, 1000); // Save progress every second
                }
                if (event.data === window.YT.PlayerState.ENDED) {
                  // Mark the video as watched and move to the next video
                  const nextIndex = selectedVideoIndex + 1;
                  if (nextIndex < playlist.videos.length) {
                    setSelectedVideoIndex(nextIndex);
                    localStorage.setItem('lastVideoIndex', nextIndex);
                  }
                }
              },
            },
          });
          setPlayer(newPlayer); // Set the player state
        };
      };
      document.body.appendChild(script);
    }
  }, []); // Empty dependency ensures this runs only once when component mounts

  // Check localStorage for saved progress and last video index
  useEffect(() => {
    const lastVideoIndex = parseInt(localStorage.getItem('lastVideoIndex') || '0');
    const savedProgress = parseFloat(localStorage.getItem('videoProgress') || '0');
    setSelectedVideoIndex(lastVideoIndex);
    setVideoProgress(savedProgress);
  }, []); // Empty dependency ensures this runs only once on initial load

  // Update the player when the selected video changes
  useEffect(() => {
    if (player) {
      // When selectedVideo or player changes, load the new video
      if (typeof player.loadVideoById === 'function') {
        player.loadVideoById(selectedVideo.url); // Load the video by its ID
        player.seekTo(videoProgress); // Seek to the saved progress
        player.playVideo(); // Play the newly selected video
      }
    }
  }, [selectedVideo, player, videoProgress]);

  return (
    <div className="container mx-auto px-10 py-6 mt-16">
      <h1 className="text-4xl font-bold mb-3 px-5 text-[#334155]">
        {playlist.title}
      </h1>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Side - Selected Video */}
        <div className="flex-1 shadow-lg overflow-hidden border border-gray-200 rounded-lg">
          <div id="youtube-player" className="w-full bg-black" style={{ height: '450px' }}></div>
          <p className="mt-4 mb-2 text-center font-semibold text-lg text-gray-700">
            Lecture {selectedVideoIndex + 1}: {selectedVideo.title}
          </p>
        </div>

        {/* Right Side - Video List */}
        <div className="w-full md:w-1/3 lg:w-1/4 overflow-y-auto max-h-[500px] border-l border-gray-300 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold p-4 bg-gray-100 text-gray-700">Playlist</h2>
          {playlist.videos.map((video, index) => (
            <div
              key={index}
              className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-200 ${
                index === selectedVideoIndex ? 'bg-gray-300' : ''
              }`}
              onClick={() => {
                setSelectedVideoIndex(index);
                setVideoProgress(0); // Reset progress when a new video is clicked
              }}
            >
              <AiFillPlayCircle size={24} className="text-blue-500 mr-3" />
              <p className="font-medium text-gray-800">Lecture {index + 1}: {video.title}</p>
            </div>
          ))}
        </div>
      </div>
      <ChatbotIcon />
    </div>
  );
}

export default PlaylistPage;

