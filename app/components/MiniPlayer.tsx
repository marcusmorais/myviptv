"use client";

import { useState, useRef, useEffect } from 'react';

export default function MiniPlayer({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.load();
    }
  }, [url]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play()
          .catch(err => setError('Erro ao reproduzir: ' + err.message));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-64 bg-black rounded-lg shadow-xl z-50">
      <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full"
          controls
          muted
          playsInline
          onError={() => setError('Não foi possível carregar o vídeo')}
        />
      </div>
      
      <div className="p-2 bg-gray-800 text-white">
        <button 
          onClick={togglePlay}
          className="px-3 py-1 bg-blue-600 rounded mr-2"
        >
          {isPlaying ? 'Pausar' : 'Reproduzir'}
        </button>
        <button 
          onClick={() => videoRef.current?.requestFullscreen()}
          className="px-3 py-1 bg-gray-600 rounded"
        >
          Tela Cheia
        </button>
      </div>
      
      {error && (
        <div className="p-2 bg-red-100 text-red-800 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}