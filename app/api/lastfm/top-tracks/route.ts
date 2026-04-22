import { lastfm } from "@/app/lib/lastfm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") ?? "overall";

    const data = await lastfm("user.getTopTracks", {
      period,
      limit: "10",
    });

    return NextResponse.json(data, {
      headers: {
        // 🔥 15 min de cache + serve stale enquanto revalida
        "Cache-Control": "s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}