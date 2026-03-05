"use client";

import { FiExternalLink, FiCode } from "react-icons/fi";
import { FaCss3Alt, FaHtml5, FaJs, FaPython } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { JSX, useState } from "react";
import { TbBrandTypescript } from "react-icons/tb";
import MouseTooltip from "./mouseTooltip";

type MainProject = {
  href: string;
  name: string;
  description: string;
  language?: string;
};

type ProjectsSectionProps = {
  title: string;
  darkMode: boolean;
  mainProjects: MainProject[];
};

function getLanguageIcon(
  language: string | undefined,
  setTooltip: (text: string | null) => void,
) {
  if (!language) return null;
  const baseClass =
    "transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1";

  const icons: Record<string, JSX.Element> = {
    CSS: (
      <FaCss3Alt
        className={`text-blue-500 ${baseClass}`}
        onMouseEnter={() => setTooltip("CSS")}
        onMouseLeave={() => setTooltip(null)}
      />
    ),
    HTML: (
      <FaHtml5
        className={`text-orange-500 ${baseClass}`}
        onMouseEnter={() => setTooltip("HTML")}
        onMouseLeave={() => setTooltip(null)}
      />
    ),
    JavaScript: (
      <FaJs
        className={`text-yellow-400 ${baseClass}`}
        onMouseEnter={() => setTooltip("JavaScript")}
        onMouseLeave={() => setTooltip(null)}
      />
    ),
    TypeScript: (
      <TbBrandTypescript
        className={`text-blue-400 ${baseClass}`}
        onMouseEnter={() => setTooltip("TypeScript")}
        onMouseLeave={() => setTooltip(null)}
      />
    ),
    Python: (
      <FaPython
        className={`text-yellow-500 ${baseClass}`}
        onMouseEnter={() => setTooltip("Python")}
        onMouseLeave={() => setTooltip(null)}
      />
    ),
  };

  return icons[language] ?? null;
}

export default function ProjectsSection({
  title,
  darkMode,
  mainProjects,
}: ProjectsSectionProps) {
  const [tooltip, setTooltip] = useState<string | null>(null);
  return (
    <div className="mt-8 flex flex-col">
      <div
        className={`mb-4 text-lg md:text-xl font-medium transition-colors duration-300 ${
          darkMode ? "text-zinc-300" : "text-zinc-700"
        }`}
      >
        {title}
      </div>

      <div className="flex justify-center">
        <div className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainProjects.map((Project, index) => {
            const langIcon = getLanguageIcon(Project.language, setTooltip);

            return (
              <a
                key={index}
                href={Project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-3 rounded-lg border p-4 transition-all duration-200 hover:-translate-y-1 ${
                  darkMode
                    ? "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <FiCode
                      className={darkMode ? "text-zinc-400" : "text-zinc-600"}
                    />

                    <span
                      className={`text-sm font-semibold truncate ${
                        darkMode ? "text-zinc-200" : "text-zinc-800"
                      }`}
                    >
                      {Project.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {langIcon}

                    <FiExternalLink
                      className={`transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        darkMode
                          ? "text-zinc-500 group-hover:text-zinc-300"
                          : "text-zinc-400 group-hover:text-zinc-600"
                      }`}
                    />
                  </div>
                </div>

                <p
                  className={`text-xs leading-relaxed ${
                    darkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {Project.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
      <MouseTooltip darkMode={darkMode} visible={!!tooltip}>
        {tooltip}
      </MouseTooltip>
    </div>
  );
}
