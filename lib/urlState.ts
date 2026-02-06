export function readQS<T extends Record<string, string>>(defaults: T): T {
  if (typeof window === "undefined") return defaults;
  const u = new URL(window.location.href);
  const out = { ...defaults };
  for (const k of Object.keys(defaults)) {
    const v = u.searchParams.get(k);
    if (v !== null) (out as any)[k] = v;
  }
  return out;
}

export function writeQS(next: Record<string, string>) {
  const u = new URL(window.location.href);
  for (const [k, v] of Object.entries(next)) {
    if (v === "" || v == null) u.searchParams.delete(k);
    else u.searchParams.set(k, v);
  }
  window.history.replaceState(null, "", u.toString());
}
