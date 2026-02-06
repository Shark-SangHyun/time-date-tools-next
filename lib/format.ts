export function formatSignedDays(n: number) {
  if (n === 0) return "D-Day";
  if (n > 0) return `D-${n}`;
  return `D+${Math.abs(n)}`;
}
