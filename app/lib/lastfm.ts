import { env } from "@/app/lib/env";

const BASE = "https://ws.audioscrobbler.com/2.0";

export async function lastfm(method: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams({
    method,
    user: env.LASTFM_USERNAME,
    api_key: env.LASTFM_API_KEY,
    format: "json",
    ...params,
  });

  const res = await fetch(`${BASE}?${query}`);
  if (!res.ok) throw new Error(`Last.fm error: ${res.status}`);
  return res.json();
}