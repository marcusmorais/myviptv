export async function validateStream(url: string, timeout = 3000): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      const res = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
      });
      clearTimeout(timer);
      // Alguns servidores não respondem corretamente ao HEAD, mas retornam "opaque"
      return res.ok || res.type === 'opaque';
    } catch {
      return false;
    }
  }
  