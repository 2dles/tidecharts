// Serves /ads.txt — required by AdSense. Populated automatically once
// NEXT_PUBLIC_ADSENSE_CLIENT is set (e.g. "ca-pub-1234567890123456").

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const body = client
    ? `google.com, ${client.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt — populated automatically when NEXT_PUBLIC_ADSENSE_CLIENT is configured\n";
  return new Response(body, {
    headers: { "content-type": "text/plain" },
  });
}
