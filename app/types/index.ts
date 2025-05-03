export interface Channel {
    id: string;
    name: string;
    url: string;
    tvgId?: string;
    tvgName?: string;
    tvgLogo?: string;
    groupTitle?: string;
  }
  
  export interface Playlist {
    id: string;
    name: string;
    channels: Channel[];
    createdAt: string;
  }