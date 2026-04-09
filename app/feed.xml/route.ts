import { generateRSS } from "@/lib/rss";

export async function GET() {
  const xml = await generateRSS();
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
