export function diffMs(aIso: string, bIso: string): number | null {
  // expects datetime-local string; interpret as local browser time
  if (!aIso || !bIso) return null;
  const a = new Date(aIso);
  const b = new Date(bIso);
  const ax = a.getTime();
  const bx = b.getTime();
  if (!Number.isFinite(ax) || !Number.isFinite(bx)) return null;
  return bx - ax;
}

export function breakdownMs(ms: number) {
  const sign = ms < 0 ? -1 : 1;
  let x = Math.abs(ms);

  const sec = Math.floor(x / 1000);
  const days = Math.floor(sec / 86400);
  const rem1 = sec - days * 86400;
  const hours = Math.floor(rem1 / 3600);
  const rem2 = rem1 - hours * 3600;
  const minutes = Math.floor(rem2 / 60);
  const seconds = rem2 - minutes * 60;

  return { sign, days, hours, minutes, seconds };
}

export function dayCounter(targetDate: string, includeToday: boolean) {
  // targetDate: YYYY-MM-DD
  if (!targetDate) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [Y, M, D] = targetDate.split("-").map(Number);
  if ([Y, M, D].some((n) => Number.isNaN(n))) return null;

  const tgt = new Date(Y, M - 1, D);
  const diffDays = Math.round((tgt.getTime() - today.getTime()) / 86400000);
  const adjusted = includeToday ? (diffDays >= 0 ? diffDays + 1 : diffDays - 1) : diffDays;

  return { diffDays, adjusted };
}
