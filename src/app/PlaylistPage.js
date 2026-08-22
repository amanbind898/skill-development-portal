// src/pages/PlaylistPage.js
import React from 'react';
import playlists from '../data/playlists';
import Link from 'next/link';

function PlaylistPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Available Playlists</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <Link href={`/playlists/${playlist.id}`} key={playlist.id}>
            <div className="border p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-100">
              <h2 className="text-xl font-semibold">{playlist.title}</h2>
              <p className="text-gray-600">{playlist.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
