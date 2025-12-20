import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";

export const persianToGregorian = (
  date: string | DateObject,
  inputFormat = "YYYY/MM/DD",
  outputFormat = "YYYY-MM-DD"
) => {
  try {
    const d =
      date instanceof DateObject
        ? date
        : new DateObject({ date, format: inputFormat, calendar: persian });

    return d.convert(gregorian).format(outputFormat);
  } catch {
    return null;
  }
};

export const gregorianToPersian = (
  date: string | DateObject,
  inputFormat: string = "YYYY-MM-DD",
  outputFormat: string = "YYYY/MM/DD"
): string | null => {
  try {
    const d =
      date instanceof DateObject
        ? date
        : new DateObject({
            date,
            format: inputFormat,
            calendar: gregorian,
          });

    return d.convert(persian).format(outputFormat);
  } catch {
    return null;
  }
};

export const p2e = (str: string): string =>
  str.replace(/[۰-۹]/g, (d: string) =>
    String.fromCharCode(d.charCodeAt(0) - 1728)
  );
