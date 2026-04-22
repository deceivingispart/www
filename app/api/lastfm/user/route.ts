import { lastfm } from "@/app/lib/lastfm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await lastfm("user.getInfo");

    return NextResponse.json(data, {
      headers: {
        // 🔥 10 minutos de cache
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