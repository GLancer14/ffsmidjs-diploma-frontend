export function parseRuDate(ruDateString: string) {
  const parts = ruDateString.split(".");
  return (new Date(
    Number(parts[2]),
    Number(parts[1]) - 1,
    Number(parts[0]),
  )).toString();
}