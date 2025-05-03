export interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  group?: string;
}

export async function parseM3U(content: string, channels: Channel[] ): Promise<Channel[]> {
  const lines = content.split('\n').map(line => line.trim());
  //const channels: Channel[] = [];
  let current: Partial<Channel> = {};

  for (const line of lines) {
    
    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.*)$/);
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const groupMatch = line.match(/group-title="([^"]+)"/);

      current.name = nameMatch ? nameMatch[1] : 'Sem nome';
      current.logo = logoMatch?.[1];
      current.group = groupMatch?.[1];
    } else if (line && !line.startsWith('#')) {
      current.url = line;
    //  current.id = btoa(`${current.name}-${line}`).substring(0, 12);
      current.id = `ch-${generateChannelId(current.name + line)}`;
      channels.push(current as Channel);
     
      current = {};
    }
  }

  return channels;
}

function generateChannelId(channelInfo: string): string {
  // Remove acentos e caracteres especiais
  const normalized = channelInfo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]/g, "");
    
  // Cria hash CRC32 simples
  let crc = 0 ^ (-1);
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    crc = (crc >>> 8) ^ ((crc ^ char) & 0xff);
  }
  crc = (crc ^ (-1)) >>> 0;
  
  return crc.toString(36).padStart(7, '0');
}
