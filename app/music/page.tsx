"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SideBar from "@/components/ui/sideBar";
import MusicRecently from "@/components/music/recently";
import MusicStats from "@/components/music/stats";

export default function Music() {
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
          <div className="flex items-center gap-2 mb-1">
            <span className="h-px w-5 bg-purple-400/50" />
            <span
              className="text-[10px] tracking-[0.2em] font-medium"
              style={{ color: "rgba(200,160,255,0.55)" }}
            >
              what i've been listening to
            </span>
          </div>
        </div>

        <div className="w-full max-w-3xl mx-auto flex-1 min-h-0">
          <Tabs defaultValue="recently" className="w-full flex flex-col">
            <TabsList
              className="w-full justify-start mb-2"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <TabsTrigger
                className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10 hover:text-white"
                value="recently"
              >
                Recently
              </TabsTrigger>
              {/* <TabsTrigger
                className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10 hover:text-white"
                value="albums"
              >
                Albums
              </TabsTrigger> */}
              <TabsTrigger
                className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10 hover:text-white"
                value="stats"
              >
                Stats
              </TabsTrigger>
            </TabsList>

            <div className="h-125">
              <TabsContent value="albums">
                <p className="text-white/40 text-sm">albums</p>
              </TabsContent>

              <TabsContent value="recently">
                <MusicRecently />
              </TabsContent>

              <TabsContent value="stats">
                <MusicStats />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
