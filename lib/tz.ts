export type Parts = {
  year: number; month: number; day: number;
  hour: number; minute: number; second: number;
};

export function parseDateTimeLocal(v: string): Parts | null {
  // expects "YYYY-MM-DDTHH:mm" (from input[type=datetime-local])
  if (!v || !v.includes("T")) return null;
  const [d, t] = v.split("T");
  const [Y, M, D] = d.split("-").map(Number);
  const [h, m] = t.split(":").map(Number);
  if ([Y, M, D, h, m].some((n) => Number.isNaN(n))) return null;
  return { year: Y, month: M, day: D, hour: h, minute: m, second: 0 };
}

function partsInTimeZone(date: Date, timeZone: string): Parts {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const map = new Map<string, string>();
  for (const p of dtf.formatToParts(date)) {
    if (p.type !== "literal") map.set(p.type, p.value);
  }
  return {
    year: Number(map.get("year")),
    month: Number(map.get("month")),
    day: Number(map.get("day")),
    hour: Number(map.get("hour")),
    minute: Number(map.get("minute")),
    second: Number(map.get("second")),
  };
}

function toEpochMsFromZoned(parts: Parts, timeZone: string): number {
  // initial guess: interpret parts as UTC
  const utcGuess = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  // find actual tz offset at that instant: (tzParts - utcInstantParts) in ms
  const tzParts = partsInTimeZone(new Date(utcGuess), timeZone);
  const tzAsUTC = Date.UTC(
    tzParts.year,
    tzParts.month - 1,
    tzParts.day,
    tzParts.hour,
    tzParts.minute,
    tzParts.second
  );

  const offsetMs = tzAsUTC - utcGuess;
  return utcGuess - offsetMs;
}

export function convertZonedToZoned(
  fromDateTimeLocal: string,
  fromTimeZone: string,
  toTimeZone: string
): { epochMs: number; toISO: string; toParts: Parts } | null {
  const p = parseDateTimeLocal(fromDateTimeLocal);
  if (!p) return null;

  const epochMs = toEpochMsFromZoned(p, fromTimeZone);
  const d = new Date(epochMs);
  const toParts = partsInTimeZone(d, toTimeZone);

  // ISO-like string in target TZ (not true ISO offset string; stable display)
  const pad = (n: number) => String(n).padStart(2, "0");
  const toISO =
    `${toParts.year}-${pad(toParts.month)}-${pad(toParts.day)} ` +
    `${pad(toParts.hour)}:${pad(toParts.minute)}:${pad(toParts.second)}`;

  return { epochMs, toISO, toParts };
}

export function listCommonTimeZones(): { value: string; label: string }[] {
  // MVP: common set (추후 전체 IANA 리스트는 별도 전략 권장)
  const tz = [
    "Asia/Seoul",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Singapore",
    "Asia/Kolkata",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Sao_Paulo",
    "Australia/Sydney",
    "Pacific/Auckland",
    "UTC",
  ];
  return tz.map((v) => ({ value: v, label: v.replace("_", " ") }));
}
