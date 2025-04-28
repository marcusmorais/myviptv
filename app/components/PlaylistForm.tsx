"use client";
import { t } from 'i18next';
import React, { useState } from 'react';

type PlaylistType = 'M3U_URL' | 'M3U_FILE' | 'XTREAM';

export default function PlaylistForm() {
  const [type, setType] = useState<PlaylistType>('M3U_URL');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [xtream, setXtream] = useState({ username: '', password: '', url: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrar com parsing e validação
    console.log({ type, name, url, file, xtream });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Adicionar Playlist</h2>
      
      <div className="flex space-x-2">
        {['M3U_URL', 'M3U_FILE', 'XTREAM'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t as PlaylistType)}
            className={`px-4 py-2 rounded-full ${
              type === t ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-zinc-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Nome da Playlist"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 rounded border"
      />

      {type === 'M3U_URL' && (
        <input
          type="url"
          placeholder="URL da Playlist (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full p-2 rounded border"
        />
      )}

      {type === 'M3U_FILE' && (
        <input
          type="file"
          accept=".m3u, .m3u8"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="w-full p-2 rounded border"
        />
      )}

      {type === 'XTREAM' && (
        <>
          <input
            type="text"
            placeholder="Usuário"
            value={xtream.username}
            onChange={(e) => setXtream({ ...xtream, username: e.target.value })}
            required
            className="w-full p-2 rounded border"
          />
          <input
            type="password"
            placeholder="Senha"
            value={xtream.password}
            onChange={(e) => setXtream({ ...xtream, password: e.target.value })}
            required
            className="w-full p-2 rounded border"
          />
          <input
            type="url"
            placeholder="URL do Servidor XTREAM"
            value={xtream.url}
            onChange={(e) => setXtream({ ...xtream, url: e.target.value })}
            required
            className="w-full p-2 rounded border"
          />
        </>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar
      </button>
    </form>
  );
}
