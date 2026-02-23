"use client";

import { useState, useEffect } from "react";
import MouseTooltip from "@/app/components/mouseTooltip";
import RecentTracks from "@/app/components/recentTracks";
import { Sun, Moon } from "lucide-react";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";
import { locales } from "./lib/locales";
import { FiExternalLink } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import SocialGrid from "./components/socialSection";
import SocialSection from "./components/socialSection";

type Track = {
  artist: { "#text": string };
  name: string;
  image: { "#text": string }[];
  "@attr"?: { nowplaying?: string };
};

export default function Home() {
  const [hover, setHover] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<"en" | "br">("en");

  const t = locales[language]; // puxando todas as strings do idioma atual

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

  const lightBg = "bg-zinc-100"; // off-white
  const lightText = "text-zinc-900";
  const darkBg = "bg-zinc-900";
  const darkText = "text-zinc-100";

  const buttonClass =
    "p-2 rounded-full cursor-pointer transition-colors duration-200 font-semibold opacity-70 hover:opacity-100";

  return (
    <main
      className={`min-h-screen px-8 md:px-16 pt-24 transition-colors duration-300 ${
        darkMode ? `${darkBg} ${darkText}` : `${lightBg} ${lightText}`
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-semibold leading-[1.05] cursor-default">
          {t.greeting}{" "}
          <span
            className="font-bold text-purple-600"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            martins!
          </span>
        </h1>

        <div
          className={`mt-2 text-lg md:text-xl font-medium transition-colors duration-300 ${
            darkMode ? "text-zinc-400" : "text-zinc-700"
          }`}
        >
          {t.age}
        </div>

        <div className="mt-4">
          <p
            className={`text-sm md:text-base leading-relaxed font-light rounded-lg px-4 py-2 backdrop-blur-sm transition-colors duration-300 ${
              darkMode ? "text-zinc-200" : "text-zinc-900"
            }`}
          >
            {t.description}
          </p>
        </div>
        <hr className="h-px border-none mx-auto w-full bg-zinc-700" />

        <div className="flex flex-col">
          <SocialSection
            title={t.findMe}
            darkMode={darkMode}
            mainSocials={[
              {
                href: "https://discord.com/users/599988978531172352",
                name: "Discord",
                description: t.discord,
                icon: <FaDiscord className="text-purple-400" />,
              },
              {
                href: "https://t.me/iezusss",
                name: "Telegram",
                description: t.telegram,
                icon: <FaTelegramPlane className="text-purple-400" />,
              },
              {
                href: "https://instagram.com/deceivingispart",
                name: "Instagram",
                description: t.instagram,
                icon: <FaInstagram className="text-purple-400" />,
              },
            ]}
            secondarySocials={[
              {
                href: "https://github.com/seuuser",
                icon: <FaGithub />,
              },
              {
                href: "https://twitter.com/seuuser",
                icon: <FaXTwitter />,
              },
            ]}
          />
        </div>

        <RecentTracks darkMode={darkMode} t={t} />

        <hr className="my-8 h-px border-none mx-auto w-full bg-zinc-700" />
        <div className="flex items-center justify-center">
          <p className="text-sm text-zinc-500">{t.footerText}</p>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 flex space-x-2 z-50">
        <button
          onClick={() => setLanguage(language === "br" ? "en" : "br")}
          className={`${buttonClass} ${darkMode ? "text-zinc-100" : "text-zinc-900"}`}
        >
          {language === "br" ? "BR" : "EN"}
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`${buttonClass} ${darkMode ? "text-zinc-100" : "text-zinc-900"}`}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 inline" />
          ) : (
            <Moon className="w-5 h-5 inline" />
          )}
        </button>
      </div>

      <MouseTooltip darkMode={darkMode} visible={hover}>
        <span
          className={`font-bold px-1 rounded-sm ${
            darkMode ? "bg-zinc-900 text-zinc-100" : "bg-zinc-300 text-zinc-900"
          }`}
        >
          {t.aka}
        </span>{" "}
        vz, yeezus
      </MouseTooltip>
    </main>
  );
}
