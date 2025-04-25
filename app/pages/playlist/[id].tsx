import React from 'react';
import { useRouter } from 'next/router';

export default function PlaylistPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Playlist ID: {id}</h1>
    </div>
  );
}
