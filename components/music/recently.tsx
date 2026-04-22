import { useEffect, useRef, useState } from "react";

type Track = {
  artist: { "#text": string };
  name: string;
  image: { "#text": string }[];
  "@attr"?: { nowplaying?: string };
};

function Equalizer() {
  return (
    <span className="flex items-end gap-0.5 h-3">
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className="w-0.5 rounded-full bg-purple-400"
          style={{
            animation: `eq-bar ${0.6 + n * 0.15}s ease-in-out infinite alternate`,
            height: `${40 + n * 15}%`,
          }}
        />
      ))}
      <style>{`
        @keyframes eq-bar {
          from { transform: scaleY(0.3); opacity: 0.6; }
          to   { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </span>
  );
}

export default function MusicRecently() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [visible, setVisible] = useState(false);
  const prevNowPlaying = useRef<string | null>(null);
  const [flash, setFlash] = useState(false);

  const fetchTracks = async () => {
    try {
      const res = await fetch("/api/lastfm");
      const data = await res.json();
      const fetched: Track[] = data.recenttracks.track;
      setTracks(fetched);

      const nowPlaying =
        fetched.find((t) => t["@attr"]?.nowplaying)?.name ?? null;
      if (nowPlaying && nowPlaying !== prevNowPlaying.current) {
        setFlash(true);
        setTimeout(() => setFlash(false), 1200);
      }
      prevNowPlaying.current = nowPlaying;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTracks();
    const interval = setInterval(fetchTracks, 30_000);
    setTimeout(() => setVisible(true), 50);
    return () => clearInterval(interval);
  }, []);

  const nowPlaying = tracks.find((t) => t["@attr"]?.nowplaying);
  const recent = tracks.filter((t) => !t["@attr"]?.nowplaying);

  return (
    <div
      className={`w-full transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {nowPlaying && (
        <div
          className={`track-card relative w-full rounded-2xl overflow-hidden mb-4 ${flash ? "flash-anim" : ""}`}
          style={{ height: "160px" }}
        >
          <img
            src={
              nowPlaying.image[3]?.["#text"] ||
              nowPlaying.image[2]?.["#text"] ||
              "/placeholder.png"
            }
            alt={nowPlaying.name}
            className="absolute inset-0 w-full h-full object-cover scale-[1.06] blur-[3px]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="now-ring absolute left-6 top-1/2 -translate-y-1/2 w-18 h-18 rounded-xl overflow-hidden ring-1 ring-emerald-400/50 shrink-0">
            <img
              src={nowPlaying.image[2]?.["#text"] || "/placeholder.png"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute left-28 top-1/2 -translate-y-1/2 pr-6">
            <div className="flex items-center gap-2 mb-2">
              <Equalizer />
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-purple-400/80">
                Now Playing
              </span>
            </div>
            <h2 className="font-bold shimmer-text text-xl leading-tight line-clamp-1 mb-1">
              {nowPlaying.name}
            </h2>
            <p className="text-white/50 text-xs tracking-wide uppercase">
              {nowPlaying.artist["#text"]}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {recent.slice(0, 8).map((track, i) => (
          <div
            key={i}
            className="track-card group relative rounded-xl overflow-hidden bg-white/3 aspect-square "
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img
              src={track.image[2]["#text"] || "/placeholder.png"}
              alt={track.name}
              className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.08] group-hover:brightness-50"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            <span className="absolute bottom-2 left-2.5 text-[10px] text-white/30 font-mono group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none px-3">
              <h3
                className="track-title text-white text-base leading-tight text-center line-clamp-2 mb-1"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
              >
                {track.name}
              </h3>
              <p
                className="text-white/60 text-[10px] tracking-[0.15em] uppercase text-center"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
              >
                {track.artist["#text"]}
              </p>
            </div>

            <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.07] rounded-xl pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
