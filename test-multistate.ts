// Mocked-fetch validation of multi-state generation + timezone logic.
import { locTz, nowInTz, tzAbbrev } from "./src/lib/tz";
import { sampleWeatherDays } from "./src/lib/sample";

async function main() {
  // 1) Timezone routing
  const cases = [
    { state: "california", lon: -122.5, want: "America/Los_Angeles" },
    { state: "florida", lon: -80.19, want: "America/New_York" }, // Miami
    { state: "florida", lon: -81.78, want: "America/New_York" }, // Key West
    { state: "florida", lon: -85.66, want: "America/Chicago" }, // Panama City
    { state: "florida", lon: -87.22, want: "America/Chicago" }, // Pensacola
    { state: "florida", lon: -84.99, want: "America/New_York" }, // Apalachicola (ET)
  ];
  for (const c of cases) {
    const got = locTz(c as never);
    console.log(
      `${c.state} lon=${c.lon} -> ${got} ${got === c.want ? "OK" : "FAIL want " + c.want}`,
    );
  }

  // 2) nowInTz offsets: ET should be 3h ahead of PT
  const pt = nowInTz("America/Los_Angeles");
  const et = nowInTz("America/New_York");
  const ct = nowInTz("America/Chicago");
  console.log("ET-PT hours:", (et - pt) / 3.6e6, "(want 3)");
  console.log("ET-CT hours:", (et - ct) / 3.6e6, "(want 1)");
  console.log(
    "abbrevs:",
    tzAbbrev("America/New_York"),
    tzAbbrev("America/Chicago"),
    tzAbbrev("America/Los_Angeles"),
  );

  // 3) Mock NOAA mdapi and generate stations for both states
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("mdapi")) {
      return new Response(
        JSON.stringify({
          stations: [
            { id: "9414863", name: "RICHMOND", state: "CA", lat: 37.923, lng: -122.409 },
            { id: "9415056", name: "Point San Pedro", state: "CA", lat: 37.993, lng: -122.446 },
            { id: "8723170", name: "MIAMI BEACH", state: "FL", lat: 25.768, lng: -80.13 },
            { id: "8726724", name: "CLEARWATER BEACH", state: "FL", lat: 27.978, lng: -82.832 },
            { id: "8729941", name: "Bayou Chico", state: "FL", lat: 30.404, lng: -87.24 },
            { id: "8723214", name: "Virginia Key", state: "FL", lat: 25.731, lng: -80.162 },
            { id: "8770570", name: "Sabine Pass North", state: "TX", lat: 29.73, lng: -93.87 },
          ],
        }),
        { status: 200 },
      );
    }
    throw new Error("network blocked: " + u);
  }) as typeof fetch;

  const { getStationLocations } = await import("./src/lib/stations");
  const stations = await getStationLocations();
  for (const s of stations) {
    console.log(
      `${s.state}/${s.slug} region=${s.region} tz=${locTz(s)} nearCity=${s.nearCity ?? "-"} species=${s.speciesKeys.join(",")}`,
    );
  }
  if (!stations.some((s) => s.state === "florida")) console.log("FAIL: no FL stations");
  if (stations.some((s) => s.state === "texas")) console.log("FAIL: TX leaked in");
  // curated exclusion: Virginia Key 8723214 is the curated miami station id
  console.log(
    "curated-id excluded:",
    !stations.some((s) => s.stationId === "8723214") ? "OK" : "FAIL",
  );

  // 4) Sample-data sunrise sanity (local wall clock, August)
  globalThis.fetch = realFetch;
  const fl = {
    slug: "miami", name: "Miami", state: "florida", stateName: "Florida",
    stationId: "8723214", stationName: "Virginia Key", lat: 25.73, lon: -80.16,
    region: "atlantic", tagline: "", intro: "", speciesKeys: [], nearby: [],
  };
  const { days } = sampleWeatherDays(fl as never);
  const fmt = (t: number) => new Date(t).toISOString().slice(11, 16);
  console.log(
    `Miami sample sunrise ${fmt(days[1].sunrise)} sunset ${fmt(days[1].sunset)} (want ~06:45 / ~19:55)`,
  );
  const ca = { ...fl, slug: "monterey", state: "california", lat: 36.6, lon: -121.89, region: "central" };
  const { days: cad } = sampleWeatherDays(ca as never);
  console.log(
    `Monterey sample sunrise ${fmt(cad[1].sunrise)} sunset ${fmt(cad[1].sunset)} (want ~06:15 / ~19:55)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
