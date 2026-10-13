import { NextResponse } from "next/server";

// Fixed public upstream: no user-supplied URL and no token required.
export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/users/mccrking/repos?type=owner&sort=pushed&per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Mehdi-Chmiti-Portfolio",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4500),
      },
    );
    if (!response.ok) return NextResponse.json({ repos: [] });
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return NextResponse.json({ repos: [] });
    const curated = new Set([
      "media360_project",
      "FraudGuard",
      "RecoMate",
      "meteoflow-etl",
      "SentimentScope",
      "deeplearning",
    ]);
    const repos = data
      .filter(
        (repo: Record<string, unknown>) =>
          !repo.private &&
          curated.has(String(repo.name)) &&
          typeof repo.pushed_at === "string" &&
          !Number.isNaN(Date.parse(repo.pushed_at)),
      )
      .slice(0, 3)
      .map((repo: Record<string, unknown>) => ({
        name: String(repo.name),
        url: `https://github.com/mccrking/${encodeURIComponent(String(repo.name))}`,
        language: typeof repo.language === "string" ? repo.language : null,
        updated: repo.pushed_at,
      }));
    return NextResponse.json(
      { repos },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json({ repos: [] });
  }
}
