export function parseRuDate(ruDateString: string) {
  const parts = ruDateString.split(".");
  return (new Date(
    Number(parts[2]),
    Number(parts[1]) - 1,
    Number(parts[0]),
  )).toISOString();
}

export function parseDateFromUTCToRu(UTCString: string | undefined) {
  if (UTCString) {
    return (new Date(UTCString)).toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}

export function parseDateFromUTCToRuTime(UTCString: string | undefined) {
  if (UTCString) {
    return (new Date(UTCString)).toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

