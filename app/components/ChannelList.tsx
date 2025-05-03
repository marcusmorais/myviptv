"use client";

import { Channel } from '../types';
import MiniPlayer from './MiniPlayer';
import { useState } from 'react';

export default function ChannelList({ channels }: { channels: Channel[] }) {
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [groupExpanded, setGroupExpanded] = useState<Record<string, boolean>>({});

  // Agrupa canais por groupTitle
  const groupedChannels = channels.reduce((acc, channel) => {
    const group = channel.groupTitle || 'Sem Grupo';
    if (!acc[group]) acc[group] = [];
    acc[group].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  const toggleGroup = (group: string) => {
    setGroupExpanded(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedChannels).map(([group, channels]) => (
        <div key={group} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleGroup(group)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 flex justify-between items-center"
          >
            <h3 className="font-semibold">{group}</h3>
            <span>{groupExpanded[group] ? '−' : '+'}</span>
          </button>
          
          {groupExpanded[group] && (
            <div className="divide-y">
              {channels.map(channel => (
                <div 
                  key={channel.id}
                  onClick={() => setCurrentChannel(channel)}
                  className={`p-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    currentChannel?.id === channel.id ? 'bg-blue-50 dark:bg-blue-900' : ''
                  }`}
                >
                  {channel.tvgLogo && (
                    <img 
                      src={channel.tvgLogo} 
                      alt={channel.name}
                      className="w-10 h-10 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-channel.png';
                      }}
                    />
                  )}
                  <span className="truncate">{channel.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {currentChannel && (
        <MiniPlayer url={currentChannel.url} />
      )}
    </div>
  );
}