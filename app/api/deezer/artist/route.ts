// /app/api/deezer/artist/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return Response.json({ error: "missing name" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 🔥 24 horas
      },
    },
  );

  const data = await res.json();

  return Response.json(
    {
      image: data.data?.[0]?.picture_medium || null,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
