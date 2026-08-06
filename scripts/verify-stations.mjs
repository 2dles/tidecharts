// Data-pipeline check: confirms every NOAA station ID in the registry is valid
// and returning predictions, and that Open-Meteo answers for each coordinate.
// Run: node scripts/verify-stations.mjs

const STATIONS = [
  ["crescent-city", "9419750", 41.745, -124.183],
  ["eureka", "9418767", 40.767, -124.217],
  ["point-arena", "9416841", 38.915, -123.711],
  ["point-reyes", "9415020", 37.994, -122.974],
  ["richmond", "9414863", 37.928, -122.4],
  ["alameda", "9414750", 37.772, -122.3],
  ["redwood-city", "9414523", 37.507, -122.212],
  ["san-simeon", "9412553", 35.642, -121.188],
  ["avila-beach", "9412110", 35.169, -120.754],
  ["bodega-bay", "9415625", 38.308, -123.055],
  ["san-francisco", "9414290", 37.806, -122.465],
  ["half-moon-bay", "9414131", 37.503, -122.482],
  ["santa-cruz", "9413745", 36.958, -122.017],
  ["monterey", "9413450", 36.605, -121.888],
  ["santa-barbara", "9411340", 34.408, -119.685],
  ["santa-monica", "9410840", 34.008, -118.5],
  ["los-angeles", "9410660", 33.72, -118.272],
  ["newport-beach", "9410580", 33.603, -117.883],
  ["la-jolla", "9410230", 32.867, -117.257],
  ["san-diego", "9410170", 32.714, -117.174],
];

const today = new Date();
const p = (n) => String(n).padStart(2, "0");
const d0 = `${today.getUTCFullYear()}${p(today.getUTCMonth() + 1)}${p(today.getUTCDate())}`;

let failures = 0;

for (const [slug, id, lat, lon] of STATIONS) {
  try {
    const meta = await fetch(
      `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${id}.json`,
    ).then((r) => r.json());
    const name = meta?.stations?.[0]?.name ?? "??";

    const pred = await fetch(
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=ustidecharts.com&begin_date=${d0}&end_date=${d0}&datum=MLLW&station=${id}&time_zone=lst_ldt&units=english&interval=hilo&format=json`,
    ).then((r) => r.json());
    const n = pred?.predictions?.length ?? 0;
    const first = pred?.predictions?.[0];

    const wx = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&forecast_days=1&timezone=America/Los_Angeles`,
    ).then((r) => r.json());
    const wxOk = Array.isArray(wx?.hourly?.time);

    const marine = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,sea_surface_temperature&forecast_days=1&timezone=America/Los_Angeles`,
    ).then((r) => r.json());
    const sst = marine?.hourly?.sea_surface_temperature?.[0];
    const wave = marine?.hourly?.wave_height?.[0];

    const ok = n > 0 && wxOk;
    if (!ok) failures++;
    console.log(
      `${ok ? "OK  " : "FAIL"} ${slug.padEnd(15)} ${id}  "${name}"  hilo=${n} first=${first?.t ?? "-"} ${first?.type ?? ""}${first?.v ?? ""}ft  wx=${wxOk}  sst=${sst ?? "n/a"}°C wave=${wave ?? "n/a"}m`,
    );
  } catch (e) {
    failures++;
    console.log(`FAIL ${slug.padEnd(15)} ${id}  ERROR: ${e.message}`);
  }
}

process.exit(failures ? 1 : 0);
