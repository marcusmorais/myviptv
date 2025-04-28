// Substitua sua função parseM3U atual por esta versão aprimorada
const parseM3U = (content: string): Channel[] => {
    const channels: Channel[] = [];
    const lines = content.split('\n');
    let currentChannel: Partial<Channel> = {};
  
    for (const line of lines) {
      if (line.startsWith('#EXTINF:')) {
        const durationMatch = line.match(/-?\d+/)?.[0] || '0';
        const infoParts = line.split(',').slice(1).join(',').trim();
        
        currentChannel = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: infoParts,
          tvgId: line.match(/tvg-id="([^"]*)"/)?.[1],
          tvgName: line.match(/tvg-name="([^"]*)"/)?.[1],
          tvgLogo: line.match(/tvg-logo="([^"]*)"/)?.[1],
          groupTitle: line.match(/group-title="([^"]*)"/)?.[1],
          duration: parseInt(durationMatch),
          url: ''
        };
      } 
      else if (line.trim() && !line.startsWith('#') && currentChannel.name) {
        currentChannel.url = line.trim();
        channels.push(currentChannel as Channel);
        currentChannel = {};
      }
    }
  
    return channels;
  };