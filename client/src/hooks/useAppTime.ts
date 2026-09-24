import { useProfile } from "@/contexts/ProfileContext";

/**
 * Formats a given date/time string or Date object to a 24-hour time format,
 * respecting the globally selected timezone from the analyst profile.
 *
 * Example: 03:15, 14:30, 21:05
 */
export function useAppTime() {
  const { profile } = useProfile();

  const formatTime = (date: string | Date | number | null | undefined): string => {
    if (!date) return "--:--";

    try {
      const parsedDate = new Date(date);
      // Intl.DateTimeFormat handles daylight saving automatically
      return new Intl.DateTimeFormat("en-US", {
        timeZone: profile.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(parsedDate);
    } catch (e) {
      console.error("Invalid date format", date);
      return "--:--";
    }
  };

  const formatDateWithTime = (date: string | Date | number | null | undefined): string => {
    if (!date) return "--:--";

    try {
      const parsedDate = new Date(date);
      return new Intl.DateTimeFormat("en-US", {
        timeZone: profile.timezone,
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(parsedDate);
    } catch (e) {
      console.error("Invalid date format", date);
      return "--:--";
    }
  };

  return { formatTime, formatDateWithTime };
}
