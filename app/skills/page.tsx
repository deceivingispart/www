"use client";

import Badge from "@/components/ui/badge";
import SideBar from "@/components/ui/sideBar";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiFastapi,
  SiVite,
  SiZod,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiCloudflare,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const SECTIONS = [
  {
    title: "languages",
    items: [
      { name: "typescript", icon: <SiTypescript /> },
      { name: "javascript", icon: <SiJavascript /> },
      { name: "python", icon: <SiPython /> },
    ],
  },
  {
    title: "frameworks & libraries",
    items: [
      { name: "next.js", icon: <SiNextdotjs /> },
      { name: "react", icon: <SiReact /> },
      { name: "tailwindcss", icon: <SiTailwindcss /> },
      { name: "node.js", icon: <SiNodedotjs /> },
      { name: "fastapi", icon: <SiFastapi /> },
      { name: "vite", icon: <SiVite /> },
      { name: "zod", icon: <SiZod /> },
    ],
  },
  {
    title: "tools & platforms",
    items: [
      { name: "vscode", icon: <VscVscode /> },
      { name: "git", icon: <SiGit /> },
      { name: "github", icon: <SiGithub /> },
      { name: "docker", icon: <SiDocker /> },
      { name: "vercel", icon: <SiVercel /> },
      { name: "cloudflare", icon: <SiCloudflare /> },
    ],
  },
];

function Section({
  title,
  items,
  index,
}: {
  title: string;
  items: { name: string; icon?: React.ReactNode }[];
  index: number;
}) {
  return (
    <section
      className={`animate-fade-in-up ${index < SECTIONS.length - 1 ? "mb-7" : "mb-3"}`}
      style={{
        animationDelay: `${0.1 + index * 0.08}s`,
        animationFillMode: "both",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/35 font-medium">
          {title}
        </span>
        <span className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-white/20 text-[11px] tabular-nums">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item.name} icon={item.icon}>
            {item.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}

export default function Skills() {
  return (
    <div className="h-screen flex items-center relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 80% 30%, rgba(150, 80, 255, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 20% 70%, rgba(100, 40, 220, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 50% 10%, rgba(180, 80, 255, 0.5) 0%, transparent 50%),
            #050005
          `,
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "rgba(2, 0, 8, 0.55)",
          backdropFilter: "blur(60px) saturate(0.7)",
          WebkitBackdropFilter: "blur(60px) saturate(0.7)",
        }}
      />

      <SideBar />

      <div className="flex-1 flex flex-col p-4 z-10">
        <div className="w-full max-w-3xl mx-auto">
          <div
            className="flex items-center gap-2 text-white/40 mb-2 animate-fade-in-up"
            style={{ animationDelay: "0s", animationFillMode: "both" }}
          >
            <span className="h-px w-5 bg-purple-400/50" />
              <span
                className="text-[10px] tracking-[0.2em] font-medium"
                style={{ color: "rgba(200,160,255,0.55)" }}
              >
                my tech stack
              </span>
          </div>

          <h1
            className="text-2xl font-semibold text-white tracking-tight mb-1 animate-fade-in-up"
            style={{ animationDelay: "0.05s", animationFillMode: "both" }}
          >
            skills
          </h1>

          <p
            className="text-white/45 text-sm mb-7 animate-fade-in-up"
            style={{ animationDelay: "0.08s", animationFillMode: "both" }}
          >
            a collection of languages, frameworks, and tools that i use to build
            amazing things.
          </p>

          {SECTIONS.map((section, i) => (
            <Section
              key={section.title}
              title={section.title}
              items={section.items}
              index={i}
            />
          ))}

          <p
            className="text-[11px] tracking-wide animate-fade-in-up"
            style={{
              color: "rgba(255,255,255,0.2)",
              animationDelay: `${0.1 + SECTIONS.length * 0.08}s`,
              animationFillMode: "both",
            }}
          >
            always learning new tools, this list will keep growing.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
