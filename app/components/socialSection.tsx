"use client";

import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";

type MainSocial = {
  href: string;
  name: string;
  description: string;
  icon: ReactNode;
};

type SecondarySocial = {
  href: string;
  icon: ReactNode;
};

type SocialSectionProps = {
  title: string;
  darkMode: boolean;
  mainSocials: MainSocial[];
  secondarySocials?: SecondarySocial[];
};

export default function SocialSection({
  title,
  darkMode,
  mainSocials,
  secondarySocials = [],
}: SocialSectionProps) {
  return (
    <div className="mt-6 flex flex-col">
      <div
        className={`mb-4 text-lg md:text-xl font-medium transition-colors duration-300 ${
          darkMode ? "text-zinc-300" : "text-zinc-700"
        }`}
      >
        {title}
      </div>

      <div className="flex justify-center">
        <div className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mainSocials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900 hover:-translate-y-0.5"
            >
              <div className="flex flex-col">
                <span className="flex items-center text-sm font-medium">
                  <span className="mr-2 transition-transform duration-200 group-hover:scale-110">
                    {social.icon}
                  </span>
                  {social.name}
                </span>

                <span className="text-xs text-zinc-400">
                  {social.description}
                </span>
              </div>

              <FiExternalLink className="text-zinc-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-zinc-300" />
            </a>
          ))}
        </div>
      </div>

      {secondarySocials.length > 0 && (
        <div className="mt-6 flex justify-center gap-5">
          {secondarySocials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 text-zinc-500 transition-all duration-200 hover:border-zinc-500 hover:text-zinc-200 hover:-translate-y-1 hover:bg-zinc-800/50"
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {social.icon}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
