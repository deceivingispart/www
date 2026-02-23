"use client";

import { useEffect, useState } from "react";
import { FaLastfm } from "react-icons/fa";
import MouseTooltip from "@/app/components/mouseTooltip";

type Track = {
  artist: { "#text": string };
  name: string;
  image: { "#text": string }[];
  "@attr"?: { nowplaying?: string };
};

type Props = {
  darkMode: boolean;
  t: any;
};

export default function recentTracks({ darkMode, t }: Props) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tooltip, setTooltip] = useState(false);

  const fetchTracks = async () => {
    try {
      const res = await fetch("/api/lastfm");
      const data = await res.json();
      setTracks(data.recenttracks.track);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTracks();
    const interval = setInterval(fetchTracks, 30_000);
    return () => clearInterval(interval);
  }, []);

  const nowPlaying = tracks.find((track) => track["@attr"]?.nowplaying);

  return (
    <div className="mt-4 flex flex-col">
      <div
        className={`mb-2 text-lg md:text-xl font-medium transition-colors duration-300 ${
          darkMode ? "text-zinc-300" : "text-zinc-700"
        }`}
      >
        {nowPlaying ? t.nowPlaying : t.recentlyPlayed}
      </div>

      {nowPlaying ? (
        <div
          className="relative w-full rounded-xl shadow-lg overflow-hidden flex flex-col justify-end p-6 group cursor-default"
          style={{
            backgroundImage: `url(${nowPlaying.image[3]["#text"] || "/placeholder.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "250px",
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

          <div className="relative z-10 flex h-full items-end justify-between">
            <div className="flex flex-col">
              <span className="text-2xl md:text-4xl font-bold text-white/80 transition-transform duration-500 ease-out transform group-hover:-translate-y-8">
                {nowPlaying.name}
              </span>
              <span className="absolute bottom-0 text-lg md:text-2xl font-semibold text-white/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {nowPlaying.artist["#text"]}
              </span>
            </div>

            <a
              href="https://www.last.fm/user/z7s"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
            >
              <FaLastfm className="w-10 h-10 md:w-12 md:h-12 text-white/40 hover:text-red-500 transition-colors duration-300 ease-in-out" />
            </a>
          </div>

          <MouseTooltip visible={tooltip} darkMode={darkMode}>
            {t.lastFmTooltip}
          </MouseTooltip>
        </div>
      ) : (
        <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 w-full">
          {tracks.map((track, i) => (
            <div
              key={i}
              className="flex-none w-40 md:w-48 rounded-xl cursor-pointer flex flex-col items-center p-3"
            >
              <img
                src={track.image[2]["#text"] || "/placeholder.png"}
                alt={track.name}
                className="w-full h-40 md:w-40 md:h-40 object-cover rounded-lg mb-2"
              />
              <span className="text-sm md:text-base font-light text-center line-clamp-2">
                {track.name}
              </span>
              <span className="text-xs md:text-sm text-zinc-400 text-center line-clamp-1">
                {track.artist["#text"]}
              </span>
            </div>
          ))}
        </div>
      )}
      <MouseTooltip darkMode={darkMode} visible={tooltip}>
        {t.lastFmTooltip}
      </MouseTooltip>
    </div>
  );
}