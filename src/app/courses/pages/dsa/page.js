"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import initialPlaylists from '@/data/playlists';
import { CSSTransition } from 'react-transition-group';
import ChatbotIcon from '@/app/components/ChatbotIcon/ChatbotIcon';

function WebDevPage() {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [openPlaylist, setOpenPlaylist] = useState(null);

  const webDevPlaylists = playlists.filter((playlist) => playlist.category === 'dsa');

  if (webDevPlaylists.length === 0) {
    return <p>No Data Structure & Algorithm playlists found.</p>;
  }

  useEffect(() => {
    const updatedPlaylists = webDevPlaylists.map(playlist => {
      const savedWatchedStatus = JSON.parse(localStorage.getItem(playlist.id));
      if (savedWatchedStatus) {
        const updatedVideos = playlist.videos.map((video, index) => ({
          ...video,
          watched: savedWatchedStatus[index] || false,
        }));
        return { ...playlist, videos: updatedVideos };
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);
  }, []);

  const toggleWatchedStatus = (playlistId, videoId) => {
    setPlaylists(prevPlaylists => {
      const updatedPlaylists = prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          const updatedVideos = playlist.videos.map(video =>
            video.id === videoId
              ? { ...video, watched: !video.watched }
              : video
          );

          localStorage.setItem(
            playlistId,
            JSON.stringify(updatedVideos.map(video => video.watched))
          );

          return { ...playlist, videos: updatedVideos };
        }
        return playlist;
      });
      return updatedPlaylists;
    });
  };

  const markAllAsUnwatched = (playlistId) => {
    setPlaylists(prevPlaylists => {
      const updatedPlaylists = prevPlaylists.map(playlist => {
        if (playlist.id === playlistId) {
          const updatedVideos = playlist.videos.map(video => ({
            ...video,
            watched: false,
          }));

          localStorage.setItem(
            playlistId,
            JSON.stringify(updatedVideos.map(video => video.watched))
          );

          return { ...playlist, videos: updatedVideos };
        }
        return playlist;
      });
      return updatedPlaylists;
    });
  };

  const handleToggleOpenPlaylist = (playlistId) => {
    setOpenPlaylist(openPlaylist === playlistId ? null : playlistId);
  };

  return (
    <div className="container mx-auto px-10 py-6 mt-16">
      <style jsx>{`
        .status-label {
          display: inline-block;
          width: 60px; /* Adjust the width as needed */
          text-align: center;
        }
        .chapter-list {
          overflow-y: scroll;
        }
        .chapter-list::-webkit-scrollbar {
          display: none;
        }
        .chapter-list {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>


      <h1 className="text-3xl font-bold mb-6 text-[#334155]">Data Structure & Algorithm Playlists</h1>
      <p className="mb-6 italic">Explore the following DSA playlists:</p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {webDevPlaylists.map((playlist) => {
          const watchedCount = playlist.videos.filter(video => video.watched).length;
          const progress = (watchedCount / playlist.videos.length) * 100;
          const isStarted = watchedCount > 0;
          const isOpen = openPlaylist === playlist.id;

          return (
            <div
              key={playlist.id}
              className="playlist-card relative p-4 border border-gray-200 rounded-lg shadow-lg bg-white flex flex-col"
              style={{ minHeight: '280px' }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 p-2 rounded-full">
                <b className="text-white">👥</b>
              </div>

              <div className="block bg-gray-100 p-2 rounded-lg flex-grow flex flex-col justify-between text-[#334155] relative h-full">
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold mb-2 text-center">{playlist.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{playlist.description}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">
                    {playlist.videos.length} video{playlist.videos.length !== 1 ? 's' : ''}
                  </p>
                  <div className="mt-2 flex flex-col">
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium text-gray-700">Progress:</span>
                      <span className="text-sm font-bold text-gray-700">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className={`h-2.5 rounded-full ${progress > 0 ? 'bg-green-600' : 'bg-red-500'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between w-full mt-2">
                      <span className="text-sm text-gray-500">
                        {watchedCount}/{playlist.videos.length}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${isStarted ? 'bg-green-100 text-green-600' : 'bg-[#FBF0CE] text-red-500'}`}
                      >
                        {isStarted ? 'Started' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <CSSTransition
                    in={isOpen}
                    timeout={300}
                    classNames="slide"
                    unmountOnExit
                  >
                    <div
                      className="absolute top-0 left-0 w-full bg-gray-100 bg-opacity-95 p-4 rounded-tl-lg rounded-tr-lg shadow-md z-10 flex flex-col chapter-list"
                      style={{ height: '100%' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold">Chapters</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAllAsUnwatched(playlist.id);
                          }}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Mark all as unwatched
                        </button>
                      </div>
                      <ul className="flex-grow">
                        {playlist.videos.map((video) => (
                          <li key={video.id} className="flex items-center justify-between w-full py-1 border-b border-gray-300 gap-2">
                            <span className="text-sm text-gray-600 flex-grow">{video.title}</span>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={video.watched}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleWatchedStatus(playlist.id, video.id);
                                }}
                                className="mr-2"
                              />
                              <span className={`status-label text-xs px-2 py-1 rounded-full ${video.watched ? 'bg-green-100 text-green-600' : 'bg-[#FBF0CE] text-red-500'}`}>
                                {video.watched ? 'Done' : 'Pending'}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </CSSTransition>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <Link href={`/playlists/${playlist.id}`}>
                  <button className="text-blue-600 hover:underline">
                    Explore
                  </button>
                </Link>
                <button
                  onClick={() => handleToggleOpenPlaylist(playlist.id)}
                  className="text-blue-600 hover:underline"
                >
                  {isOpen ? 'Hide Chapters' : 'View Chapters'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ChatbotIcon />
    </div>
  );
}

export default WebDevPage;
