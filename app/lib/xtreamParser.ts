export interface XtreamAuth {
  username: string;
  password: string;
  url: string;
}

export async function fetchXtreamChannels(auth: XtreamAuth) {
  const baseUrl = auth.url.replace(/\/$/, '');
  const url = \`\${baseUrl}/player_api.php?username=\${auth.username}&password=\${auth.password}&action=get_live_streams\`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao conectar à API XTREAM');

  const data = await res.json();
  return data.map((item: any) => ({
    id: btoa(item.name + item.stream_id).substring(0, 12),
    name: item.name,
    url: \`\${baseUrl}/live/\${auth.username}/\${auth.password}/\${item.stream_id}.m3u8\`,
    logo: item.stream_icon,
    group: item.category_name
  }));
}
