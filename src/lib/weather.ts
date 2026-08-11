// Open-Meteo weather + marine forecasts (free, no key).

import type { DayAstro, HourlyMarine, HourlyWeather } from "./types";
import { fetchRetry } from "./fetch-retry";
import { parseNaive } from "./tz";

const M_TO_FT = 3.28084;

export async function fetchWeather(
  lat: number,
  lon: number,
  tz = "America/Los_Angeles",
): Promise<{ hourly: HourlyWeather[]; days: DayAstro[] }> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly:
      "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover",
    daily: "sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    timezone: tz,
    forecast_days: "8",
  });
  const res = await fetchRetry(
    `https://api.open-meteo.com/v1/forecast?${params}`,
    { next: { revalidate: 1800 } },
  );
  const data = (await res.json()) as {
    hourly: {
      time: string[];
      temperature_2m: (number | null)[];
      weather_code: (number | null)[];
      wind_speed_10m: (number | null)[];
      wind_direction_10m: (number | null)[];
      wind_gusts_10m: (number | null)[];
      cloud_cover: (number | null)[];
    };
    daily: {
      time: string[];
      sunrise: string[];
      sunset: string[];
      weather_code: (number | null)[];
      temperature_2m_max: (number | null)[];
      temperature_2m_min: (number | null)[];
    };
  };

  const hourly: HourlyWeather[] = data.hourly.time.map((time, i) => ({
    t: parseNaive(time),
    tempF: data.hourly.temperature_2m[i],
    weatherCode: data.hourly.weather_code[i],
    windMph: data.hourly.wind_speed_10m[i],
    windDir: data.hourly.wind_direction_10m[i],
    gustMph: data.hourly.wind_gusts_10m[i],
    cloudPct: data.hourly.cloud_cover[i],
  }));

  const days: DayAstro[] = data.daily.time.map((date, i) => ({
    date,
    sunrise: parseNaive(data.daily.sunrise[i]),
    sunset: parseNaive(data.daily.sunset[i]),
    weatherCode: data.daily.weather_code[i],
    tempMaxF: data.daily.temperature_2m_max[i],
    tempMinF: data.daily.temperature_2m_min[i],
  }));

  return { hourly, days };
}

export async function fetchMarine(
  lat: number,
  lon: number,
  tz = "America/Los_Angeles",
): Promise<HourlyMarine[]> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: "wave_height,wave_period,sea_surface_temperature",
    timezone: tz,
    forecast_days: "8",
  });
  const res = await fetchRetry(
    `https://marine-api.open-meteo.com/v1/marine?${params}`,
    { next: { revalidate: 3600 } },
  );
  const data = (await res.json()) as {
    hourly: {
      time: string[];
      wave_height: (number | null)[];
      wave_period: (number | null)[];
      sea_surface_temperature: (number | null)[];
    };
  };
  return data.hourly.time.map((time, i) => {
    const waveM = data.hourly.wave_height[i];
    const sstC = data.hourly.sea_surface_temperature[i];
    return {
      t: parseNaive(time),
      waveFt: waveM == null ? null : waveM * M_TO_FT,
      wavePeriodS: data.hourly.wave_period[i],
      waterTempF: sstC == null ? null : sstC * 1.8 + 32,
    };
  });
}

/** Nearest hourly record to time t, within 90 minutes. */
export function nearestHour<T extends { t: number }>(
  rows: T[],
  t: number,
): T | null {
  let best: T | null = null;
  let bestDiff = Infinity;
  for (const r of rows) {
    const d = Math.abs(r.t - t);
    if (d < bestDiff) {
      bestDiff = d;
      best = r;
    }
  }
  return bestDiff <= 5_400_000 ? best : null;
}

export function weatherLabel(code: number | null): string {
  if (code == null) return "—";
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Mixed";
}

export function weatherEmoji(code: number | null): string {
  if (code == null) return "·";
  if (code === 0 || code === 1) return "☀️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

export function windCompass(deg: number | null): string {
  if (deg == null) return "—";
  const dirs = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
  ];
  return dirs[Math.round(deg / 22.5) % 16];
}
