import React from 'react';
import { useRouter } from 'next/router';
import ChannelList from '../../components/ChannelList';
import { getPlaylistById } from '../../lib/playlist-utils';

interface Params {
  id: string;
}

export default async function PlaylistPage({ params }: { params: Params }) {
  const playlist = await getPlaylistById(params.id);
  const router = useRouter();
  const { id } = router.query;
  
  if (!playlist) {
    return <div>Playlist não encontrada</div>;
  }

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">Playlist ID: {id}</h1>
      <h1 className="text-2xl font-bold mb-6">{playlist.name}</h1>
      <ChannelList channels={playlist.channels} />
    </div>
  
  );
}
