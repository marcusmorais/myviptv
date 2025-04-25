'use client';
import React, { useEffect, useState } from 'react';
import PlaylistCard from './components/PlaylistCard';

interface Playlist {
  id: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'CHECKING';
}

export default function HomeIndex() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('playlists');
    if (stored) {
      try {
        setPlaylists(JSON.parse(stored));
      } catch (e) {
        console.error( 'Erro ao carregar playlists do localStorage');
      }
    }
  }, []);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Minhas Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {playlists.map((pl) => (
          <PlaylistCard
            key={pl.id}
            name={pl.name}
            status={pl.status}
            onClick={() => window.location.href = `/playlist/${pl.id}`}
          />
        ))}
      </div>
    </main>
  );
}
