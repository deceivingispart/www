import { lastfm } from "@/app/lib/lastfm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") ?? "overall";

    const data = await lastfm("user.getTopArtists", {
      period,
      limit: "10",
    });

    return NextResponse.json(data, {
      headers: {
        // 🔥 cache por 10 minutos, separado por URL (inclui ?period=)
        "Cache-Control": "s-maxage=600, stale-while-revalidate=1200",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}