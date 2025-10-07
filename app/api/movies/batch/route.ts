import { NextRequest } from "next/server";
import { getMovieDetails } from "@/lib/tmdb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { ids } = (await req.json()) as { ids: number[] };
    if (!Array.isArray(ids)) {
      return Response.json({ error: "Invalid ids" }, { status: 400 });
    }
    const take = ids.slice(0, 24);
    const results = await Promise.all(
      take.map((id) => getMovieDetails(id).catch(() => null))
    );
    return Response.json({ movies: results.filter(Boolean) });
  } catch (e: any) {
    return Response.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ ok: true });
}