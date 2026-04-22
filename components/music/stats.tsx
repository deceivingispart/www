import { useEffect, useState } from "react";

type Artist = {
  name: string;
  playcount: string;
  image: { "#text": string; size: string }[];
  "@attr": { rank: string };
  deezerImage?: string | null;
};

type User = {
  name: string;
  playcount: string;
  track_count: string;
  album_count: string;
  artist_count: string;
};

export default function MusicStats() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchArtists() {
      const res = await fetch("/api/lastfm/top-artists");
      const data = await res.json();

      const baseArtists: Artist[] = data.topartists.artist;

      const enrichedArtists = await Promise.all(
        baseArtists.slice(0, 5).map(async (artist) => {
          try {
            const deezerRes = await fetch(
              `/api/deezer/artist?name=${encodeURIComponent(artist.name)}`,
            );
            const deezerData = await deezerRes.json();

            return {
              ...artist,
              deezerImage: deezerData.image, // 👈 aqui mudou
            };
          } catch {
            return {
              ...artist,
              deezerImage: null,
            };
          }
        }),
      );

      setArtists(enrichedArtists);
    }

    fetchArtists();
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      const res = await fetch("/api/lastfm/user");
      const data = await res.json();

      setUser(data.user);
    }

    fetchUserInfo();
  }, []);

  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition">
          <p className="text-sm text-zinc-400 tracking-wide">Tracks</p>
          <p className="text-2xl font-semibold mt-1">
            {user ? Number(user.track_count).toLocaleString() : "..."}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition">
          <p className="text-sm text-zinc-400 tracking-wide">Albums</p>
          <p className="text-2xl font-semibold mt-1">
            {user ? Number(user.album_count).toLocaleString() : "..."}
          </p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition">
        <p className="text-sm text-zinc-400 mb-3">Top Artists</p>

        <div className="flex flex-col gap-3">
          {artists.map((artist) => {
            const lastfmImage = artist.image.find(
              (img) => img.size === "medium",
            )?.["#text"];

            const image = artist.deezerImage || lastfmImage || "/fallback.png";

            return (
              <div
                key={artist.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <p className="text-xs text-zinc-500 w-5">
                    {artist["@attr"].rank.padStart(2, "0")}
                  </p>

                  <img
                    src={image}
                    alt={artist.name}
                    className="w-8 h-8 rounded-md object-cover"
                  />

                  <p className="text-sm font-medium">{artist.name}</p>
                </div>

                <p className="text-sm text-zinc-400 font-medium">
                  {Number(artist.playcount).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
