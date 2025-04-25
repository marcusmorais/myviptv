export interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  group?: string;
}

export async function parseM3U(content: string): Promise<Channel[]> {
  const lines = content.split('\n').map(line => line.trim());
  const channels: Channel[] = [];
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
      current.id = btoa(`${current.name}-${line}`).substring(0, 12);
      channels.push(current as Channel);
      current = {};
    }
  }

  return channels;
}
