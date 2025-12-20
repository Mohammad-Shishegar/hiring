import { useRef } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, CalendarRef, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

interface IPersianDatePicker {
  onlyMonthPicker?: boolean;
  onlyYearPicker?: boolean;
  hasTime?: boolean;
  format?: string;
  onChange: (date: DateObject | null) => void;
  [key: string]: any;
}

const PersianDatePicker = ({
  format = "YYYY/MM/DD - HH:mm:ss",
  onChange: onChangeDate,
  onlyMonthPicker,
  onlyYearPicker,
  hasTime = false,
  ...rest
}: IPersianDatePicker) => {
  const calendarRef = useRef<CalendarRef>(null);

  return (
    <>
      <Calendar
        onChange={onChangeDate}
        ref={calendarRef}
        calendar={persian}
        onlyMonthPicker={onlyMonthPicker}
        onlyYearPicker={onlyYearPicker}
        locale={persian_fa}
        format={format}
        plugins={
          hasTime && !onlyMonthPicker && !onlyYearPicker
            ? [<TimePicker position="bottom" />]
            : []
        }
        {...rest}
      />
    </>
  );
};
export default PersianDatePicker;
