// src/app/playlists/page.js

import Link from 'next/link';
import playlists from '@/data/playlists';

export default function PlaylistsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Playlists</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item">
            <Link href={`/playlists/${playlist.id}`}>
              <a>
                <img src={playlist.image} alt={playlist.title} className="w-full h-48 object-cover mb-4" />
                <h2 className="text-xl font-semibold">{playlist.title}</h2>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
