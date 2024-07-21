export function timeConversion(
  timestamp: number,
  activeRange: string | undefined
): string {
  const date = new Date(timestamp);

  if (activeRange === "30" || activeRange === "60") {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
    };

    return new Intl.DateTimeFormat("en-IN", options).format(date);
  } else {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-IN", options).format(date);
  }
}
