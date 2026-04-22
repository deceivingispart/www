"use client";

import { useEffect, useState } from "react";
import SideBar from "@/components/ui/sideBar";
import Badge from "@/components/ui/badge";
import { BsDiscord, BsGithub, BsTelegram } from "react-icons/bs";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-screen flex items-center relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 75% 25%, rgba(140, 60, 255, 0.55) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 75%, rgba(90, 30, 200, 0.45) 0%, transparent 50%),
            radial-gradient(ellipse at 55% 5%,  rgba(180, 70, 255, 0.40) 0%, transparent 45%),
            #04000a
          `,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "rgba(3, 0, 10, 0.52)",
          backdropFilter: "blur(72px) saturate(0.65)",
          WebkitBackdropFilter: "blur(72px) saturate(0.65)",
        }}
      />

      <svg
        className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <SideBar />

      <main
        className="flex-1 flex flex-col p-6 z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="w-full max-w-2xl mx-auto space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-px w-5 bg-purple-400/50" />
              <span
                className="text-[10px] tracking-[0.2em] font-medium"
                style={{ color: "rgba(200,160,255,0.55)" }}
              >
                hey there, i'm
              </span>
            </div>

            <h1
              className="text-4xl font-semibold tracking-tight leading-none"
              style={{
                color: "#fff",
                fontFamily: "'Geist', 'Inter', sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              martins
            </h1>
          </div>

          <div
            className="relative rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 0 60px -20px rgba(120,50,255,0.25)",
            }}
          >
            <div
              className="absolute -top-px left-[8%] right-[8%] h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(180,120,255,0.35), transparent)",
              }}
            />

            <p
              className="text-sm leading-[1.9] tracking-wide"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              i'm a <Hl>fullstack developer</Hl> building things for myself,
              friends, and anyone who finds them useful. started{" "}
              <Hl>back-end</Hl> in 2016, went fullstack by 2019. mostly{" "}
              <Hl>python, typescript</Hl> and <Hl>self-hosted infra</Hl> —
              learning <Hl>rust</Hl> now.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge href="https://discord.com/users/599988978531172352" key="Discord" icon=<BsDiscord />>
              Discord
            </Badge>
            <Badge href="https://github.com/deceivingispart" key="Github" icon=<BsGithub />>
              Github
            </Badge>
            <Badge href="https://t.me/iezusss" key="Telegram" icon=<BsTelegram />>
              Telegram
            </Badge>
          </div>
        </div>
      </main>
    </div>
  );
}

function Hl({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium" style={{ color: "rgba(255,255,255,0.88)" }}>
      {children}
    </span>
  );
}
