"use client";
import { t } from 'i18next';
import React, { useState } from 'react';
import { Channel, parseM3U } from '../lib/m3uParser';
import { v4 as uuidv4 } from 'uuid';
import { validateStream } from '../lib/validateStream';


type PlaylistType = 'M3U_URL' | 'M3U_FILE' | 'XTREAM';

export default function PlaylistForm() {
  const [type, setType] = useState<PlaylistType>('M3U_URL');
  const [id, setId] = useState(uuidv4());
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [xtream, setXtream] = useState({ username: '', password: '', url: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Evita múltiplos envios
    if (isLoading) return;

    setIsLoading(true);
    setError(''); // Limpa erros anteriores
    setId(uuidv4());


    try {
      let channels: Channel[] = [];

      
      if (type === 'M3U_URL' && url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao carregar a playlist');
        const text = await response.text();
         parseM3U(text, channels );

      }
      else if (type === 'M3U_FILE' && file) {
        const content = await file.text();
        //channels = parseM3U(content);
        parseM3U(content, channels );
      }


      console.log('channels.length: ' + channels.length);


      if (!validateStream(url))
        {
        throw new Error('URL invalida!');
      }

      if (channels.length === 0) {
        throw new Error('Nenhum canal encontrado na playlist');
      }


      // Armazenamento no localStorage (mantenha sua lógica atual)
      const stored = JSON.parse(localStorage.getItem('playlists') || '[]');
      //stored.push({ id, name, channels, type, addedAt: new Date(), url });
      stored.push({ id, name, type, addedAt: new Date(), url });
      localStorage.setItem('playlists', JSON.stringify(stored));

      // Reset do formulário

      setName('');
      setId(uuidv4());
      setUrl('');
      setFile(null);

      console.log({ id, type, name, url, file, xtream, channels });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Error:', err);

    } finally {
      setIsLoading(false);
    }


  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Adicionar Playlist</h2>
      <p>http://ldns.live/get.php?username=cm8vzs&password=rw7ccf&type=m3u_plus&output=ts</p>
      <p>http://ldns.live/get.php?username=cm8vzs&password=rw7ccf&type=m3u_plus&output=m3u8</p>
      <div className="flex space-x-2">
        {['M3U_URL', 'M3U_FILE', 'XTREAM'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t as PlaylistType)}
            className={`px-4 py-2 rounded-full ${type === t ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-zinc-700'
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
