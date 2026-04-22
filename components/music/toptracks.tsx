"use client";

import { useEffect, useRef, useState } from "react";

type Track = {
  name: string;
  playcount: string;
  artist: { name: string };
  image: { "#text": string; size: string }[];
  url: string;
};

function MarqueeText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      setShouldMarquee(
        textRef.current.scrollWidth > containerRef.current.clientWidth,
      );
    }
  }, [text]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <span
        ref={textRef}
        style={
          shouldMarquee
            ? {
                display: "inline-block",
                whiteSpace: "nowrap",
                animation: "marquee 8s linear infinite",
                paddingRight: "2rem",
              }
            : { whiteSpace: "nowrap" }
        }
      >
        {text}
      </span>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          30%  { transform: translateX(0); }
          70%  { transform: translateX(-50%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function TopTracks({ period = "overall" }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/lastfm/top-tracks`)
      .then((r) => r.json())
      .then((data) => {
        setTracks(data.toptracks?.track ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [period]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-1 w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-10 sm:h-12 rounded-lg bg-white/3 animate-pulse"
            style={{ animationDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1 w-full">
      {tracks.map((track, i) => {
        const img = track.image?.length
          ? track.image.filter((x) => x["#text"]).slice(-1)[0]?.["#text"]
          : "";

        return (
          <a
            key={i}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block font-mono"
          >
            <div className="flex items-center relative overflow-hidden transition-all duration-300 bg-white/2 backdrop-blur-sm border border-white/8 rounded-lg shadow-lg group-hover:border-white/15 group-hover:bg-white/5 h-10 sm:h-12">
              {img && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("${img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(8px) saturate(0.8)",
                    opacity: 0.3,
                  }}
                />
              )}
              <div className="absolute inset-0 bg-black/20" />

              <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 w-full relative z-10">
                <span className="text-white/40 font-mono text-xs w-6 shrink-0 hidden sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/8">
                  {img ? (
                    <img
                      src={img}
                      alt={track.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <MarqueeText
                    text={track.name}
                    className="font-medium text-white text-xs sm:text-sm leading-tight"
                  />
                  <MarqueeText
                    text={track.artist.name}
                    className="text-white/60 text-xs"
                  />
                </div>

                <span className="text-white/40 text-xs shrink-0 font-mono hidden sm:inline">
                  {Number(track.playcount).toLocaleString()}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
