const PREFIX = 'ghuf_cache_v1_';
const DEFAULT_TTL = 1000*60*30; // 30 min

type CacheEntry<T> = { ts: number; ttl: number; value: T; };

export const setCache = <T>(key: string, value: T, ttl = DEFAULT_TTL) => {
  try { const entry: CacheEntry<T> = { ts: Date.now(), ttl, value }; localStorage.setItem(PREFIX+key, JSON.stringify(entry)); } catch(e) {}
};

export const getCache = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(PREFIX+key);
    if(!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if(Date.now() - entry.ts > entry.ttl){ localStorage.removeItem(PREFIX+key); return null; }
    return entry.value;
  } catch(e){ return null; }
};

export const clearCache = (key?: string) => {
  if(!key) { Object.keys(localStorage).filter(k=>k.startsWith(PREFIX)).forEach(k=>localStorage.removeItem(k)); }
  else localStorage.removeItem(PREFIX+key);
};
