export function formatNumber(value: number | string): string | number {
  if (typeof value === "undefined") return 0;
  if (typeof value !== "number") return String(value);

  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + "b";
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + "m";
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + "k";
  }
  return value.toString();
}
