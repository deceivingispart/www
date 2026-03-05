"use client";

import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  children: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
  darkMode: boolean;
};

export default function MouseTooltip({
  visible,
  children,
  offsetX = 16,
  offsetY = 16,
  darkMode,
}: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className={`fixed z-50 pointer-events-none px-4 py-2 text-sm 
      rounded-lg border shadow-xl backdrop-blur-sm transition-opacity duration-150
      ${
        darkMode
          ? "bg-zinc-800 text-zinc-200 border-zinc-700"
          : "bg-zinc-200 text-zinc-900 border-zinc-300"
      }`}
      style={{
        top: position.y + offsetY,
        left: position.x + offsetX,
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}