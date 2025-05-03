import { Playlist } from '../types';

export async function getPlaylistById(id: string): Promise<Playlist | null> {
  // Busca do localStorage ou API
  if (typeof window !== 'undefined') {
    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    return playlists.find((p: Playlist) => p.id === id) || null;
  }
  return null;
}