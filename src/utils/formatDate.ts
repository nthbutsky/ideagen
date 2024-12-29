export function formatDate(
  dateString: string,
  locale: string = "en-US",
  options: {
    day?: string;
    weekday: string;
    month?: string;
    year?: string;
    hour?: string;
    minute?: string;
    timeZone?: string;
  } = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  },
) {
  return new Date(dateString).toLocaleDateString(
    locale,
    options as Intl.DateTimeFormatOptions,
  );
}
