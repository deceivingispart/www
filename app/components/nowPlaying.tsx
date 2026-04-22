"use client";

import { useEffect, useState } from "react";
import { FaLastfm } from "react-icons/fa";

type Track = {
  artist: { "#text": string };
  name: string;
  image: { "#text": string }[];
  "@attr"?: { nowplaying?: string };
};

export default function NowPlaying() {
  const [tracks, setTracks] = useState<Track[]>([]);

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
    <div className="mb-4 flex flex-col">
      {nowPlaying ? (
        <div
          className="relative w-full rounded-xl shadow-lg overflow-hidden flex flex-col justify-end p-6 group cursor-default"
          style={{
            backgroundImage: `url(${nowPlaying.image[3]["#text"] || "/placeholder.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100px",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

          <div className="relative z-10 flex h-full items-end justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white/80 transition-transform duration-500 ease-out transform group-hover:-translate-y-4">
                {nowPlaying.name}
              </span>
              <span className="absolute bottom-0 text-mdfont-semibold text-white/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {nowPlaying.artist["#text"]}
              </span>
            </div>

            <a
              href="https://www.last.fm/user/z7s"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLastfm className="w-10 h-10 md:w-12 md:h-12 text-white/40 hover:text-red-500 transition-colors duration-300 ease-in-out" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
