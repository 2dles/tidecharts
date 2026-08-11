// fetch with one retry + backoff. NOAA and Open-Meteo occasionally throttle
// bursts (e.g. many pages revalidating at once); a single retry converts most
// of those transient 429/5xx blips into live data instead of sample fallback.

export async function fetchRetry(
  url: string,
  init?: RequestInit & { next?: { revalidate?: number } },
  tries = 2,
): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, init);
      if (res.ok) return res;
      lastErr = new Error(`HTTP ${res.status} for ${url.split("?")[0]}`);
      // Don't retry client errors other than 429 — they won't change.
      if (res.status >= 400 && res.status < 500 && res.status !== 429) break;
    } catch (e) {
      lastErr = e;
    }
    if (i < tries - 1) {
      await new Promise((r) => setTimeout(r, 500 + 500 * i));
    }
  }
  throw lastErr;
}
