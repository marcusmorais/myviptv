import React from 'react';

interface PlaylistCardProps {
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'CHECKING';
  onClick: () => void;
}

export default function PlaylistCard({ name, status, onClick }: PlaylistCardProps) {
  return (
    <div
      className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
          status === 'ONLINE'
            ? 'bg-green-500 text-white'
            : status === 'OFFLINE'
            ? 'bg-red-500 text-white'
            : 'bg-yellow-500 text-white'
        }`}
      >
        {status}
      </span>
    </div>
  );
}
